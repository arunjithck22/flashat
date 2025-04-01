"use client";

import { Thumbnail } from "./Thumbnail";
import downloadIcon from "@/public/icons/download.svg";
import { useMedia } from "@/app/hooks/useMedia";
import { MESSAGE_TYPE, STATUS } from "@/common/constant";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MediaProps {
  // name: string;
  // s3_key: string;
  thumbnail?: string | null;
  // unicode: string;
  messageId: string;
  roomId: string;
  type: string | null;
  mediaUrl?: string | null;
}

export const MediaImage = ({
  thumbnail,
  messageId,
  roomId,
  type,
  mediaUrl,
}: MediaProps) => {
  const { data, status, fetchFromAPI, fetchFromCache } = useMedia(
    messageId,
    roomId
  );
  const [defaultImage, setDefaultImage] = useState("/empty/failed-image.svg");
  console.log("data downloaded", data);

  useEffect(() => {
    if (data) setDefaultImage(data);
  }, [data]);
  const onDownloadClick = () => {
    fetchFromAPI();
  };
  useEffect(() => {
    fetchFromCache();
  }, []);
  return (
    <>
      {type !== MESSAGE_TYPE.STICKER && status !== STATUS.SUCCESS && !data && (
        <div className="w-full flex align-center justify-left">
          <Thumbnail
            thumbnail={thumbnail}
            icon={downloadIcon}
            onDownloadClick={onDownloadClick}
            status={status}
          />
        </div>
      )}
      {type === MESSAGE_TYPE.STICKER && (
        <div className="w-full flex align-center justify-left">
          <Thumbnail
            type={type}
            thumbnail={mediaUrl}
            // onDownloadClick={onDownloadClick}
            status={status}
          />
        </div>
      )}

      {status === STATUS.SUCCESS && type !== MESSAGE_TYPE.STICKER && (
        <div className={`w-full flex align-center justify-left `}>
          <Image
            width={384} // Set to match w-96 in pixels
            height={384}
            alt="image"
            src={defaultImage || ""}
            className="w-96 h-auto"
            quality={100}
            onError={() => {
              setDefaultImage("/empty/failed-image.svg");
            }}
          />
        </div>
      )}
    </>
  );
};
