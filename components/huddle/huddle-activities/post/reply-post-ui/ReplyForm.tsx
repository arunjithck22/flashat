/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createHuddlePost } from "@/actions/huddles/actions";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { formatDuration } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import FileUploadButtons from "../../HuddleHeader/CreatePost/FileUploadButtons";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_HUDDLE_MESSAGES } from "@/app/hooks/huddles/useHuddleMessages";
// import { HuddleMessage } from "@/types/huddles";

interface Credentials {
  access_key: string;
  secret_key: string;
  session_token: string;
  media_bucket: string;
}

const ReplyForm = ({ bg, messageId }: { bg: any; messageId: string }) => {
  console.log("reply_to_id", messageId);
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
  const [disabled, setDisabled] = useState(true);
  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];

      if (file) {
        if (file.type.startsWith("image/")) {
          const img = new Image();
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

  useEffect(() => {
    if (!textMessage && selectedFiles.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [textMessage, selectedFiles]);

  useEffect(() => {
    const fetchCredentials = async () => {
      setLoading(true);
      setErrorMessage(""); // Reset error state on each attempt
      try {
        const response = await fetch("/api/aws-credentials");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();

        // Assuming the credentials are in 'data.credentials'
        setCredentials(data.credentials?.result); // Store the credentials in state
      } catch (error) {
        console.error("Failed to fetch AWS credentials", error);
        setErrorMessage("failed"); // Set the error message in state
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchCredentials();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (containerRef && containerRef.current) {
    //   containerRef.current.scrollTop = 0;
    // }
    setLoading(true);
    try {
      const mediaUUID = uuidv4();
      const payload: any = {
        huddle_id: state.currentHuddle,
        message: textMessage,
        // message_id: message.message_id,
        reply_id: mediaUUID,
        reply_to: messageId,
        // reply_to: "",
      };

      if (selectedFiles.length > 0 && credentials) {
        const file = selectedFiles[0];
        const fileType = file.type;

        const fileExtension = fileType.split("/")[1];

        const S3_BUCKET = credentials?.media_bucket;

        // Set up AWS S3 configuration using AWS SDK v3
        const s3Client = new S3Client({
          region: "ap-southeast-1", // Set the region for your S3 bucket
          credentials: {
            accessKeyId: credentials?.access_key,
            secretAccessKey: credentials?.secret_key,
            sessionToken: credentials?.session_token,
          },
        });

        const s3Key = `${process.env.NEXT_PUBLIC_S3_BUCKET_ENV}/HUDDLE-${state.currentHuddle}/${mediaUUID}.${fileExtension}`;

        const uploadParams = {
          Bucket: S3_BUCKET,
          Key: s3Key,
          Body: file,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        if (fileType.startsWith("image/")) {
          payload.media_height = mediaHeight;
          payload.media = file.name;
          payload.media_name = `${mediaUUID}.${fileExtension}`;
          payload.media_type = file.type.split("/")[0].toUpperCase();
          payload.media_width = mediaWidth;
          payload.mime_type = file.type;
          payload.s3_key = s3Key;
          payload.thumbnail = `https://messej-media-thumbnails.s3.ap-southeast-1.amazonaws.com/${s3Key}`;
        } else if (fileType.startsWith("video/")) {
          payload.color = "";
          payload.media_height = mediaHeight;
          payload.media = file.name;
          payload.media_name = `${mediaUUID}.${fileExtension}`;
          payload.media_type = file.type.split("/")[0].toUpperCase();
          payload.media_width = mediaWidth;
          payload.media_duration = mediaDuration;
          payload.mime_type = file.type;
          payload.s3_key = s3Key;
          payload.thumbnail = `https://messej-media-thumbnails.s3.ap-southeast-1.amazonaws.com/${s3Key}`;
        } else {
          console.log("The file is neither an image nor a video.");
        }
      }

      await createHuddlePost({
        huddleId: state.currentHuddle,
        body: payload,
      });

      setLoading(false);
      setErrorMessage("");
      actions.replyPostUI(false);
      queryClient.invalidateQueries({
        queryKey: [QKEY_HUDDLE_MESSAGES, state.currentHuddle],
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to reply post");
      console.error("Failed to create post:", (error as Error).message);
    }
  };
  return (
    <div className={`w-full py-5 ${bg}`}>
      <form onSubmit={handleCreatePost}>
        <textarea
          className={`w-full  border-b px-3 text-sm outline-none bg-transparent`}
          placeholder="Type Your Message"
          onChange={(e) => {
            e.preventDefault();
            SetTextMessage(e.target.value);
          }}
          name=""
          id=""
          cols={30}
          rows={2}
        ></textarea>
        {selectedFiles.length > 0 && (
          <div className="px-2 flex items-center gap-2">
            <div className="relative flex  items-center gap-2 rounded-md">
              {selectedFiles[0]?.type.startsWith("image/") ? (
                // For images
                <img
                  src={URL.createObjectURL(selectedFiles[0])}
                  alt={selectedFiles[0]?.name || "Uploaded file"}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              ) : selectedFiles[0]?.type.startsWith("video/") ? (
                // For videos
                <video
                  src={URL.createObjectURL(selectedFiles[0])}
                  width={100}
                  height={100}
                  className="rounded-md"
                  controls // Adds play, pause, and other controls
                />
              ) : (
                // Fallback for unsupported file types
                <p className="text-white">Unsupported file type</p>
              )}
              <button
                onClick={() => setSelectedFiles([])}
                className="text-black font-bold absolute text-xl -top-1 right-1 hover:text-red-700"
                aria-label="Remove file"
              >
                &times;
              </button>
            </div>
          </div>
        )}
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
                actions.replyPostUI(false);
              }}
              disabled={loading}
              className="uppercase px-3 py-1 border border-2 border-red-500 rounded-lg text-red-500 text-md base-semibold"
            >
              cancel
            </button>
            <button
              disabled={loading || disabled}
              type="submit"
              className="uppercase bg-primary px-3 py-1 text-white border-red-500 rounded-lg  text-md base-semibold"
            >
              POST
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default ReplyForm;
