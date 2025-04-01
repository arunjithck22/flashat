"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import KindBadge from "./KindBadge";
import PodiumSettingsWheel from "./PodiumSettingsWheel";
import { Params } from "@/types";

interface FriendsListItemProps {
  podium_id: string;
  name: string;
  podium_name: string;
  podium_kind: string;
  podium_live_users_count: number;
  user_id?: string;
  role: string;

  profile_url: string;
}

const FriendsListItem = ({
  podium_id,
  podium_kind,
  podium_live_users_count,
  name,
  podium_name,

  role,

  profile_url,
}: FriendsListItemProps) => {
  const params: Params = useParams();
  return (
    <article
      className={` relative w-full  bg-podiumItemBg rounded-md    border border-bgray hover:cursor-pointer hover:bg-huddlegray`}
    >
      <Link
        // onClick={handleHuddleClick}
        href={{
          pathname: `/podiums/${params?.type}`,
          query: {
            role: role,
            podiumId: podium_id,
          },
        }}
        prefetch={true}
        className="flex justify-between"
      >
        <div className=" flex py-3 px-2 gap-2  ">
          <figure className="relative">
            <Image
              src={profile_url || ""}
              width={100}
              height={100}
              alt="podium"
              className="rounded-full bg-center w-20 h-20 object-cover border-red-500  border "
            />
            <span
              style={{
                fontSize: "6px",
              }}
              className="absolute bottom-0 base-bold tracking-wider left-1/2 transform -translate-x-1/2 text-xs bg-red-500 text-white px-2"
            >
              LIVE
            </span>
          </figure>
          <figcaption className="flex flex-col justify-center gap-2  w-max">
            <h2 className="text-sm base-semibold">{name}</h2>
            <div className="flex justify-center items-center gap-3">
              <span className="text-xs ">{podium_name}</span>
              <div className="flex justify-center items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{podium_live_users_count}</span>
              </div>
              <KindBadge
                bg_color="bg-green-500"
                text_color="text-primary"
                kind={podium_kind}
              />
            </div>
          </figcaption>
        </div>
        <div className="flex justify-center items-center h-full p-2">
          <PodiumSettingsWheel />
        </div>
      </Link>
    </article>
  );
};

export default FriendsListItem;
