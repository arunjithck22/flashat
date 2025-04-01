"use client";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUploadButtons from "./FileUploadButtons";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { createHuddlePost } from "@/actions/huddles/actions";
import { formatDuration } from "../../../../../lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_HUDDLE_MESSAGES } from "@/app/hooks/huddles/useHuddleMessages";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
// import { CreatePostPayload } from "@/types/huddles";

interface CreatePostProps {
  type: string;
  id: string;
}

interface Credentials {
  access_key: string;
  secret_key: string;
  session_token: string;
  media_bucket: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ type, id }) => {
  const t: TranslationFunction = useTranslations("huddles");
  const placeholder: TranslationFunction = useTranslations(
    "common_placeholders"
  );
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const { state } = useHuddleProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [errormessage, setErrorMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mediaHeight, setMediaHeight] = useState<number | null>(null);
  const [mediaWidth, setMediaWidth] = useState<number | null>(null);
  const [mediaDuration, setMediaDuration] = useState<string>("");
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];

      if (file) {
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

  useEffect(() => {
    const fetchCredentials = async () => {
      // setLoading(true);
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
          setErrorMessage(error.message); // Accessing properties safely
        } else {
          console.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    setLoading(true);
    try {
      const mediaUUID = uuidv4();
      const payload: Record<string, unknown> = {
        huddle_id: state.currentHuddle || "",
        message,
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
        type,
        id,
      });
      setIsOpen(false);
      setLoading(false);
      setErrorMessage("");
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
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(!isOpen)}>
        <Image
          alt="create post"
          width={30}
          height={30}
          src="/tw/post/add-post.svg"
          className="hover:cursor-pointer mr-4"
        />
      </DialogTrigger>
      <DialogContent className="bg-white max-w-[300px] md:max-w-[430px]">
        <button
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          x
        </button>
        <DialogHeader>
          <DialogTitle className="text-sm text-center">
            {t("create_new_post")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              onClick={handleCreatePost}
              className="bg-primary px-4 text-white base-bold"
            >
              {loading ? t("sending") : t("send")}
            </Button>
          </div>
          <div className="bg-gray-200 h-60">
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder("item1")}
              className="bg-transparent w-full border border-gray-200 custom-scrollbar rounded-md p-2  h-24 resize-none placeholder-gray-500 focus:outline-none focus:border-gray-200"
            />
            {selectedFiles.length > 0 && (
              <div className="px-2 flex items-center gap-2">
                <div className="relative flex bg-white items-center justify-center gap-2 w-32 h-32 rounded-md">
                  {selectedFiles[0]?.type.startsWith("image/") ? (
                    // For images
                    <Image
                      src={URL.createObjectURL(selectedFiles[0])}
                      alt={selectedFiles[0]?.name || "Uploaded file"}
                      width={100}
                      height={100}
                      className="rounded-md object-cover w-full h-full bg-transparent"
                    />
                  ) : selectedFiles[0]?.type.startsWith("video/") ? (
                    // For videos
                    <video
                      src={URL.createObjectURL(selectedFiles[0])}
                      className="rounded-md object-cover w-full h-full bg-transparent"
                      controls // Adds play, pause, and other controls
                    />
                  ) : (
                    // Fallback for unsupported file types
                    <p className="text-white">Unsupported file type</p>
                  )}
                  <button
                    onClick={() => setSelectedFiles([])}
                    className="text-black bg-white rounded-full p-2 font-bold absolute text-xl top-0 right-0 hover:text-red-700"
                    aria-label="Remove file"
                  >
                    <Image
                      src="/icons/close-1.svg"
                      width={10}
                      height={10}
                      alt="close"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center">
            <span className="px-2">{t("attach")}</span>
            <div className="flex gap-2">
              <FileUploadButtons onFileChange={handleFileChange} />
            </div>
          </div>
          <span>{errormessage}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
