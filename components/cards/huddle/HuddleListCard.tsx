"use client";

import React from "react";
import clsx from "clsx";
import HuddleMetaInfo from "./components/HuddleMetaInfo";

interface HuddleCardProps {
  title: string;
  message?: string;
  time: string;
  participants: number;
  online?: number;
  imageUrl?: string | null;
  premium?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const HuddleListCard: React.FC<HuddleCardProps> = ({
  title,
  message,
  time,
  participants,
  online,
  imageUrl,
  premium = true,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex justify-between items-start p-4 border-b cursor-pointer transition",
        isSelected
          ? "bg-primary/10 border-primary"
          : "bg-white border-gray-200",
        "hover:bg-lightGray"
      )}
    >
      {/* Left Side - Avatar + Info */}
      <div className=""> 
        <HuddleMetaInfo
          title={title}
          message={message}
          participants={participants}
          imageUrl={imageUrl}
          premium={premium}
          online={online}
        />
      </div>

      {/* Right Side - Time */}
      <div className="text-sm text-visitorText whitespace-nowrap ">{time}</div>
    </div>
  );
};

export default HuddleListCard;
