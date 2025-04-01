"use client";
// import { STATUS } from "@auth/AuthProvider";
// import { useMedia } from "@hooks/huddles/useMedia";
import { Thumbnail } from "./Thumbnail";

import { useMedia } from "@/app/hooks/useMedia";
import { useEffect } from "react";
import { API_STATUS } from "@/common/constant";

interface VideoProps {
  mime_type: string | null;

  thumbnail?: string;
  messageId: string;
  roomId: string;
}

export const Video = ({
  thumbnail,

  mime_type,

  messageId,
  roomId,
}: VideoProps) => {
  const { data, status, fetchFromAPI, fetchFromCache } = useMedia(
    messageId,
    roomId
  );

  const onDownloadClick = () => {
    fetchFromAPI();
  };
  useEffect(() => {
    fetchFromCache();
  }, []);
  return (
    <div className="mt-4  bg-transparent flex align-center justify-left w-full">
      {!data && (
        <Thumbnail
          thumbnail={thumbnail}
          onDownloadClick={onDownloadClick}
          status={status}
          icon="/tw/chat/play.svg"
        />
      )}

      {status === API_STATUS.SUCCESS && (
        <video controls className="h-96   bg-transparent ">
          <source src={data || ""} type={mime_type || undefined}></source>
        </video>
      )}
    </div>
  );
};
