"use client";

import React from "react";
import Images from "@/components/ui/Images/Images";
import { Icons } from "@/components/ui/icons/icons";

interface ProfileImgCardProps {
  imageUrl?: string | null;
  premium?: boolean;
  width?: number;
  height?: number;
}

const ProfileImgCard: React.FC<ProfileImgCardProps> = ({
  imageUrl,
  premium = false,
  width = 48,
  height = 48,
}) => {
  const hasImage = Boolean(imageUrl);

  return (
    <div className="relative w-10 h-10 rounded-md border border-primary items-center">
      {hasImage ? (
        <Images
          src={imageUrl!}
          alt="profile"
          width={width}
          height={height}
          rounded
          className="object-cover rounded-md"
        />
      ) : (
        <div className="flex flex-col justify-center items-center text-center mt-2">
          <Icons.Users />
        </div>
      )}

      {premium && (
        <span className="absolute top-[-9px] -right-2 border border-primary rounded-full">
          <Images
            src="/icons/huddle/Group 2609631.svg"
            alt="badge"
            width={16}
            height={16}
          />
        </span>
      )}
    </div>
  );
};

export default ProfileImgCard;
