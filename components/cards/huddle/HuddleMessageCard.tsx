import React from "react";
import VerticalMoreDropdown from "@/components/ui/Button/VerticalMoreDropdown";
import { Icons } from "@/components/ui/icons/icons";
import Images from "@/components/ui/Images/Images";
import CommentTag from "./CommentTag";

interface HuddleMessageCardProps{
  
}

const HuddleMessageCard = () => {

  const titleImage = [
    {
      path: "/icons/huddle/President.svg",
      title: "PRESIDENT",
    },
    {
      path: "/icons/huddle/Ambassador.svg",
      title: "Ambassador",
    },
    {
      path: "/icons/huddle/Citizen.svg",
      title: "Citizen",
    },
    {
      path: "/icons/huddle/Minister.svg",
      title: "Minister",
    },
    {
      path: "/icons/huddle/Officer.svg",
      title: "Officer",
    },
    {
      path: "/icons/huddle/Resident.svg",
      title: "Resident",
    },
    {
      path: "/icons/huddle/Visitor.svg",
      title: "Visitor",
    },
  ];
  return (
    <div className="bg-white border border-lightGray rounded-md shadow-sm relative">
      {/* Banner Image */}
      <div className="relative w-full h-[20px] ">
        <Images
          src="/icons/huddle/President.svg"
          width={1500}
          height={60}
          alt=""
          className="object-contain w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-purple-800 font-semibold text-sm">
            PRESIDENT
          </span>
        </div>
      </div>
      <Images
        src="/icons/huddle/Ambassador.svg"
        width={1500}
        height={60}
        alt=""
        className="object-contain"
      />
      <Images
        src="/icons/huddle/Citizen.svg"
        width={1500}
        height={60}
        alt=""
        className="object-contain"
      />
      <Images
        src="/icons/huddle/Minister.svg"
        width={1500}
        height={60}
        alt=""
        className="object-contain"
      />
      <Images
        src="/icons/huddle/Officer.svg"
        width={1500}
        height={60}
        alt=""
        className="object-contain"
      />
      <Images
        src="/icons/huddle/Resident.svg"
        width={1500}
        height={60}
        alt=""
        className="object-contain"
      />

      <Images
        src="/icons/huddle/Visitor.svg"
        width={1500}
        height={60}
        alt=""
        className="object-contain"
      />

      {/* Header Row */}
      <div className="flex items-start gap-4 p-2 ">
        {/* Avatar */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/48?img=3"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-white shadow"
          />
          <span className="absolute bottom-0 right-0 text-xl">🇩🇪</span>
        </div>

        {/* Name & Text */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">You</span>
            <Images
              src="/icons/huddle/BADGE.svg"
              width={50}
              height={50}
              alt=""
            />
          </div>
          <p className="text-sm mt-1 text-gray-800">
            The United Arab Emirates, or simply the Emirates, is a country in
            Western Asia. It is located at the eastern end of the Arabian
            Peninsula and shares borders with Oman and Saudi Arabia, while
            having maritime borders in the Persian Gulf with Qatar and Iran. The
            United Arab Emirates, or simply the Emirates, is a country in
            Western Asia. It is located at the eastern end of the Arabian
            Peninsula and shares borders with Oman and Saudi Arabia, while
            having maritime borders in the Persian Gulf with Qatar and Iran.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Images
            src="/icons/huddle/BADGE.svg"
            width={60}
            height={60}
            alt=""
            className="object-contain"
          />
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

      {/* Footer */}
      <div className="px-7 py-2">
        <div className="text-sm text-gray-500">
          <p>22/03/2023 | 12:30PM</p>
        </div>
        <div className="flex justify-center mt-2">
          <CommentTag count={100} />
        </div>
      </div>
    </div>
  );
};

export default HuddleMessageCard;
