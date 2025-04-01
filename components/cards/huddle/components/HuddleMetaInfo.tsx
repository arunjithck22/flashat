"use client";

import React from "react";
import Images from "@/components/ui/Images/Images";
import ProfileImgCard from "@/components/images/ProfileImgCard";

interface HuddleMetaInfoProps {
  title: string;
  participants: number;
  message?: string;
  online?: number;
  imageUrl?: string | null;
  premium?: boolean;
}

const HuddleMetaInfo: React.FC<HuddleMetaInfoProps> = ({
  title,
  participants,
  message,
  online,
  imageUrl,
  premium = false,
}) => {
  return (
    <div className="flex gap-3 items-start w-72 ">
      {/* Avatar */}
      <ProfileImgCard imageUrl={imageUrl} premium={premium} />

      {/* Text Content */}
      <div>
        <h3 className="text-base font-semibold text-visitorText">{title}</h3>

        <div className="flex items-center text-sm mt-1">
          <Images
            src="/icons/huddle/user.svg"
            width={18}
            height={18}
            alt="user"
          />
          <span className="mr-3 ml-2 text-visitorText">{participants}</span>
          <span className="mx-1 text-darkGray">|</span>

          {typeof online === "number" ? (
            <span className="flex items-center gap-1 text-green-600">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              {online} online
            </span>
          ) : (
            <span className="truncate text-tsecond">
              {message
                ? message.length > 20
                  ? `${message.slice(0, 20)}...`
                  : message
                : "No message"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HuddleMetaInfo;
