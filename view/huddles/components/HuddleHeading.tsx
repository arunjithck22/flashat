"use client";

import React from "react";
import EditButton from "@/components/ui/Button/EditButton";
import HuddleMetaInfo from "@/components/cards/huddle/components/HuddleMetaInfo";
import { Icons } from "@/components/ui/icons/icons";
import VerticalMoreDropdown from "@/components/ui/Button/VerticalMoreDropdown";

interface HuddleHeadingProps {
  title: string;
  participants: number;
  online?: number;
  message?: string;
  onEdit?: () => void;
  onMore?: () => void;
  imageUrl?: string | null;
  premium?: boolean;
}

const HuddleHeading: React.FC<HuddleHeadingProps> = ({
  title,
  participants,
  online,
  message,
  onEdit,
  onMore,
  imageUrl,
  premium = false,
}) => {
  return (
    <div className="flex items-center justify-between ">
      {/* Left side: Avatar + info */}
      <HuddleMetaInfo
        title={title}
        participants={participants}
        online={online}
        message={message}
        imageUrl={imageUrl}
        premium={premium}
      />

      {/* Right side: Edit + More */}
      <div className="flex items-center gap-3">
        <EditButton onClick={onEdit} />
        <VerticalMoreDropdown
          items={[
            {
              label: "Edit Huddle",
              onClick: () => alert("Edit clicked"),
              icon: <Icons.Edit className="w-4 h-4" />,
            },
            {
              label: "Delete Huddle",
              onClick: () => alert("Delete clicked"),
              icon: <Icons.Edit className="w-4 h-4" />,
            },
            {
              label: "Copy Link",
              onClick: () => alert("Link copied"),
              icon: <Icons.Edit className="w-4 h-4" />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default HuddleHeading;
