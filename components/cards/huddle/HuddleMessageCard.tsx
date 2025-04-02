import React from "react";
import VerticalMoreDropdown from "@/components/ui/Button/VerticalMoreDropdown";
import { Icons } from "@/components/ui/icons/icons";
import Images from "@/components/ui/Images/Images";
import CommentTag from "./CommentTag";

interface MediaData {
  type: string;
  thumbnail: string;
  mimeType: string;
  s3Key: string;
  width: string;
  height: string;
  cloudfront: string;
}

interface HuddleMessageCardProps {
  leaderShip?: string;
  senderName: string;
  huddle_type?: string;
  avatar: string;
  flag?: string;
  message: string;
  timestamp: string;
  commentCount?: number;
  media_data?: MediaData;
}

const HuddleMessageCard: React.FC<HuddleMessageCardProps> = ({
  leaderShip = "PRESIDENT",
  senderName,
  huddle_type,
  avatar,
  flag,
  message,
  timestamp,
  commentCount = 0,
  media_data,
}) => {
  const titleImage = [
    { path: "/icons/huddle/President.svg", title: "PRESIDENT" },
    { path: "/icons/huddle/Ambassador.svg", title: "AMBASSADOR" },
    { path: "/icons/huddle/Citizen.svg", title: "CITIZEN" },
    { path: "/icons/huddle/Minister.svg", title: "MINISTER" },
    { path: "/icons/huddle/Officer.svg", title: "OFFICER" },
    { path: "/icons/huddle/Resident.svg", title: "RESIDENT" },
    { path: "/icons/huddle/Visitor.svg", title: "VISITOR" },
  ];

  const selected = titleImage.find(
    (item) => item.title.toUpperCase() === leaderShip.toUpperCase()
  );

  const renderMedia = () => {
    if (!media_data?.cloudfront || !media_data?.type) return null;

    const type = media_data.type.toUpperCase();

    if (type === "IMAGE") {
      return (
        <div className="px-4 pb-2">
          <img
            src={media_data.cloudfront}
            alt="media"
            className="rounded-lg w-full object-cover max-h-96"
          />
        </div>
      );
    }

    if (type === "VIDEO") {
      return (
        <div className="px-4 pb-2">
          <video
            controls
            className="rounded-lg w-full max-h-96"
            src={media_data.cloudfront}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white border border-lightGray rounded-md shadow-sm relative mt-1">
      {/* Banner */}
      {selected && (
        <div className="relative w-full">
          <Images
            src={selected.path}
            width={1500}
            height={60}
            alt={selected.title}
            className="object-contain w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-purple-800 font-semibold text-sm uppercase">
              {selected.title}
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 p-3">
        <div className="relative">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-white shadow"
          />
          {flag && (
            <span className="absolute bottom-0 right-0 text-xl">{flag}</span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{senderName}</span>
          </div>
          {message && (
            <p className="text-sm mt-1 text-gray-800 whitespace-pre-line">
              {message}
            </p>
          )}
        </div>

        {huddle_type !== "public" && (
          <div className="flex gap-2">
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
        )}
      </div>

      {/* Media */}
      {renderMedia()}

      {/* Footer */}
      <div className="px-7 py-2">
        <div className="text-sm text-gray-500">
          <p>{timestamp}</p>
        </div>
        <div className="flex justify-center mt-2">
          <CommentTag count={commentCount} />
        </div>
      </div>
    </div>
  );
};

export default HuddleMessageCard;
