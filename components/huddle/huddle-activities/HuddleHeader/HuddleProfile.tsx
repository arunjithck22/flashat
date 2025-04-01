"use client";

import { HUDDLES_TABS, HUDDLE_USER_STATUS } from "@/common/constant";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HuddleProfile = ({ data }: { data: any }) => {
  const { state, actions } = useHuddleProvider();
  const params = useParams();

  const toggleDrawer = () => {
    actions.toggleVisibility("huddleInfo", true);
    actions.toggleDrawer(!state.drawerOpen);
    actions.openFromOutsideOptions(true);
  };

  return (
    <figure
      onClick={() => {
        if (
          params?.type !== HUDDLES_TABS.SEARCH &&
          data?.result?.user_status !== HUDDLE_USER_STATUS.ADMIN_BLOCKED
        ) {
          toggleDrawer();
        }
      }}
      className="flex cursor-pointer gap-2"
    >
      <div className="relative">
        {data?.result?.manager_premium_status && (
          <Image
            src="/tw/huddle-premium.svg"
            width={20}
            height={20}
            alt="crown"
            className="absolute -top-2 right-3 "
          />
        )}

        <Image
          alt="group"
          src={`${
            data?.result?.group_photo ||
            "/tw/placeholder/huddle-default-profile.svg"
          }`}
          className="h-12 w-12 rounded object-cover position-center ltr:mr-4 rtl:ml-4 border border-primary"
          style={{ backgroundColor: "rgba(116, 125, 135, 0.202484)" }}
          width={100}
          height={100}
        />
      </div>
      <figcaption className="flex flex-col justify-between">
        <p className="font-bold text-tprimary">{data?.result?.name}</p>
        <p className="flex items-center text-sm text-tprimary gap-2">
          {" "}
          <Image
            src="/tw/group-line.svg"
            width={16}
            height={16}
            alt="groupline"
          />{" "}
          {data?.result?.total_members}
          <span className="h-3  bg-gray-200 w-0.5"></span>
          <span className="rounded bg-green-500 w-2 h-2 "></span>
          <span>{data?.result?.online_participants}</span>
        </p>
      </figcaption>
    </figure>
  );
};

export default HuddleProfile;
