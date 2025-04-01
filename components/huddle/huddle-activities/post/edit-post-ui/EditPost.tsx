/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { editHuddlePost } from "@/actions/huddles/actions";
import { QKEY_HUDDLE_MESSAGES } from "@/app/hooks/huddles/useHuddleMessages";

import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { formatDuration } from "@/lib/utils";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FileUploadButtons from "../../HuddleHeader/CreatePost/FileUploadButtons";

import { Sender } from "../Sender";

interface Credentials {
  access_key: string;
  secret_key: string;
  session_token: string;
  media_bucket: string;
}

const EditPost = ({ bg, roomId, isCurrentUser, ...message }: any) => {
  const { state, actions } = useHuddleProvider();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [errormessage, setErrorMessage] = useState<string>("");
  const [textMessage, SetTextMessage] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [mediaHeight, setMediaHeight] = useState<number | null>(null);
  const [mediaWidth, setMediaWidth] = useState<number | null>(null);
  const [mediaDuration, setMediaDuration] = useState<string>("");
  const [mediaName, setMediaName] = useState("");
  const [mediaTye, setMediaType] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const [mimeType, setMimeType] = useState("");
  //   const [disabled, setDisabled] = useState(true);
  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  useEffect(() => {
    SetTextMessage(message?.message);
    setMediaWidth(message?.media_meta?.media_width || null);
    setMediaHeight(message?.media_meta?.media_height || null);
    setMediaDuration(message?.media_meta?.media_duration || "");
    setMimeType(message?.media_meta?.mime_type);
    setMediaName(message?.media_meta?.media_name);
    setMediaType(message?.media_meta?.media_type);
    setMediaUrl(message?.media_meta?.thumbnail);
  }, [message?.media_meta, message?.message]);

  useEffect(() => {
    const fetchCredentials = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch("/api/aws-credentials");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();

        setCredentials(data.credentials?.result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to fetch AWS credentials", error);
          setErrorMessage(error.message);
        } else {
          console.error("An unexpected error occurred", error);
          throw new Error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);
  useEffect(() => {
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];

      if (file) {
        setMimeType(file.type);
        setMediaName(file.name);
        setMediaType(file.type.split("/")[0].toUpperCase());
        setMediaUrl(URL?.createObjectURL(selectedFiles[0]));
        if (file.type.startsWith("image/")) {
          const img = new window.Image();
          img.onload = () => {
            setMediaHeight(img.height);
            setMediaWidth(img.width);
          };
          img.src = URL.createObjectURL(file);
        } else if (file.type.startsWith("video/")) {
          const video = document.createElement("video");
          video.onloadedmetadata = () => {
            setMediaHeight(video.videoHeight);
            setMediaWidth(video.videoWidth);
            setMediaDuration(formatDuration(video.duration)); // Format video duration
          };
          video.src = URL.createObjectURL(file);
        }
      }
    }
  }, [selectedFiles]);
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (containerRef && containerRef.current) {
    //   containerRef.current.scrollTop = 0;
    // }
    setLoading(true);
    try {
      const messageId = message.message_id;
      const payload: any = {
        huddle_id: state.currentHuddle,
        message: textMessage,
        message_id: messageId,
      };

      if (mimeType && credentials) {
        const file = selectedFiles[0];

        const fileExtension = mimeType.split("/")[1];

        const S3_BUCKET = credentials?.media_bucket;

        const s3Client = new S3Client({
          region: "ap-southeast-1",
          credentials: {
            accessKeyId: credentials?.access_key,
            secretAccessKey: credentials?.secret_key,
            sessionToken: credentials?.session_token,
          },
        });

        const s3Key = `${process.env.NEXT_PUBLIC_S3_BUCKET_ENV}/HUDDLE-${state.currentHuddle}/${messageId}.${fileExtension}`;

        const uploadParams = {
          Bucket: S3_BUCKET,
          Key: s3Key,
          Body: file,
        };

        const command = new PutObjectCommand(uploadParams);

        const data = await s3Client.send(command);

        if (mimeType.startsWith("image/")) {
          payload.media_height = mediaHeight;
          payload.media = mediaName;
          payload.media_name = `${messageId}.${fileExtension}`;
          payload.media_type = mediaTye;
          payload.media_width = mediaWidth;
          payload.mime_type = mimeType;
          payload.s3_key = s3Key;
          payload.thumbnail = `https://messej-media-thumbnails.s3.ap-southeast-1.amazonaws.com/${s3Key}`;
        } else if (mimeType.startsWith("video/")) {
          payload.color = "";
          payload.media_height = mediaHeight;
          payload.media = mediaName;
          payload.media_name = `${messageId}.${fileExtension}`;
          payload.media_type = mediaTye;
          payload.media_width = mediaWidth;
          payload.media_duration = mediaDuration;
          payload.mime_type = mimeType;
          payload.s3_key = s3Key;
          payload.thumbnail = `https://messej-media-thumbnails.s3.ap-southeast-1.amazonaws.com/${s3Key}`;
        } else {
          console.log("The file is neither an image nor a video.");
        }
      }

      await editHuddlePost({
        huddleId: state.currentHuddle,
        body: payload,
      });

      setLoading(false);

      setErrorMessage("");
      actions.editPostUI(false);
      queryClient.invalidateQueries({
        queryKey: [QKEY_HUDDLE_MESSAGES, state.currentHuddle],
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to create post");
      console.error("Failed to create post:", (error as Error).message);
    }
  };

  return (
    <div>
      {(mimeType || selectedFiles?.length > 0) && (
        <div
          className={`w-full flex flex-col md:w-3/4 lg:w-1/3 text-xs relative ${bg}`}
        >
          <section className="mt-4 flex flex-col rounded border border-gray-300 p-4 px-10 pb-6 ">
            <div
              onClick={(e) => {
                e.preventDefault();
                setSelectedFiles([]);
                setMimeType("");
              }}
              className="text-2xl absolute cursor-pointer  -right-1 top-0"
            >
              x
            </div>
            <Sender
              isCurrentUser={isCurrentUser}
              name={message.sender_name}
              {...message.sender_details}
            />
            <div className="w-full flex align-center justify-left py-2 ">
              {selectedFiles[0]?.type.startsWith("image/") ||
              mimeType?.startsWith("image/") ? (
                // For images
                <Image
                  className="object-cover bg-cover bg-transparent w-96"
                  src={mediaUrl}
                  width={300}
                  height={300}
                  alt="thumbnail"
                />
              ) : selectedFiles[0]?.type.startsWith("video/") ||
                mimeType?.startsWith("video/") ? (
                // For videos
                <video
                  src={mediaUrl}
                  width={300}
                  height={300}
                  className="rounded-md"
                  controls
                />
              ) : selectedFiles[0]?.type.startsWith("audio/") ||
                mimeType?.startsWith("audio/") ? (
                // For audio files
                <audio src={mediaUrl} className="rounded-md" controls />
              ) : null}
            </div>
          </section>
        </div>
      )}

      <div className={`w-full py-5 `}>
        <form onSubmit={handleCreatePost}>
          <textarea
            className={`w-full  border-b px-3 text-sm outline-none bg-transparent`}
            placeholder="Type Your Message"
            onChange={(e) => {
              //   e.preventDefault();
              SetTextMessage(e.target.value);
            }}
            name=""
            value={textMessage}
            id=""
            cols={30}
            rows={2}
          ></textarea>

          <footer className="flex justify-between gap-2 py-2">
            <div className="flex gap-2">
              <span className="flex justify-center items-center">Attach :</span>
              <FileUploadButtons onFileChange={handleFileChange} />
            </div>
            <span>{errormessage}</span>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  actions.editPostUI(false);
                }}
                // disabled={loading}
                className="uppercase px-3 py-1  border-2 border-red-500 rounded-lg text-red-500 text-md base-semibold"
              >
                cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="uppercase bg-primary px-3 py-1 text-white border-red-500 rounded-lg  text-md base-semibold"
              >
                POST
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
