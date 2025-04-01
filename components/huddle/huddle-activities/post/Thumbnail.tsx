"use client";
import { API_STATUS, HUDDLES_TABS, MESSAGE_TYPE } from "@/common/constant";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export const Thumbnail = ({
  thumbnail,
  onDownloadClick,
  status,
  icon,
  type,
}: {
  thumbnail?: string | null | undefined;
  onDownloadClick?: () => void;
  status: string;
  icon?: string;
  type?: string;
}) => {
  const [imageSrc, setImageSrc] = useState(thumbnail ? thumbnail : "");
  const params = useParams();
  return (
    <div
      className={`relative rounded  overflow-hidden ${
        type === MESSAGE_TYPE.STICKER ? "" : "border border-purple-100"
      }`}
    >
      <Image
        className={`object-cover bg-cover bg-transparent 
        } ${type === MESSAGE_TYPE.STICKER ? "w-32  " : "w-96 "} rounded`}
        src={imageSrc || ""}
        width={type === MESSAGE_TYPE.STICKER ? 300 : 48}
        height={type === MESSAGE_TYPE.STICKER ? 300 : 48}
        alt="thumbnail"
        onError={() => setImageSrc("/empty/failed-image.svg")}
      />
      <div
        className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16  z-10 flex justify-center align-center rounded-full"
        style={{}}
      >
        {status === API_STATUS?.LOADING && (
          <svg
            className="animate-spin  h-16 w-16 text-green-400 absolute"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && status !== API_STATUS?.LOADING && (
          <button
            disabled={params?.type === HUDDLES_TABS.PUBLIC}
            className="rounde-full inline-block"
            onClick={onDownloadClick}
          >
            <Image
              width={48}
              height={48}
              src={icon}
              className="w-16 h-16"
              alt=""
            />
          </button>
        )}

        {/* <progress value="75" max="100" className="h-0 w-0 ">
          75%
        </progress> */}
      </div>
    </div>
  );
};
