"use client";
import Image from "next/image";
import React from "react";
import { formatDate } from "@/utils/clientUtils";

interface PodiumAboutProps {
  profile_pic: string;
  about: string | null;
  name: string;
  created_on: string;
}

const PodiumAbout = ({
  profile_pic,
  name,
  about,
  created_on,
}: PodiumAboutProps) => {
  return (
    <section className="w-full flex  flex-col   items-center ">
      <Image
        src={profile_pic || "/podiums/default.svg"}
        width={100}
        height={100}
        alt="profile"
        className="w-20 h-20 rounded-lg"
        // onError
      />
      <div className=" flex flex-col  items-center">
        <h3 className="base-semibold text-md">{name}</h3>
        <div className="flex gap-2 items-center text-sm ">
          <span className=" text-primary">Created Since:</span>
          <Image
            src="/podiums/calendar.svg"
            width={15}
            height={15}
            alt="calendar"
          />
          <span>{formatDate(created_on, "/")}</span>
        </div>
      </div>
      <p className="text-sm py-2">{about}</p>
    </section>
  );
};

export default PodiumAbout;
