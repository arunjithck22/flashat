"use client";
import { PODIUM_ROLES, PODIUM_TABS } from "@/constants/podiums/constants";
import { useProfileContext } from "@/contexts/ProfileContext";
import { TranslationFunction } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

interface PodiumSettingsWheelProps {
  role?: string;
  live?: boolean;
}

const PodiumSettingsWheel = ({ role, live }: PodiumSettingsWheelProps) => {
  const { profileData, empowerments } = useProfileContext();

  console.log("profile data", profileData);
  const params = useParams();
  const t: TranslationFunction = useTranslations("podiums");
  const dropDownItems = [
    {
      label: t("join"),
      onClick: () => {},
      condition:
        params?.type === PODIUM_TABS.LIVE_PODIUMS ||
        params?.type === PODIUM_TABS.LIVE_FRIENDS,
    },
    // {
    //   label: t("info"),
    //   onClick: () => {},
    //   condition: true,
    // },
    {
      label: t("podium_info"),
      onClick: () => {},
      condition: true,
    },
    {
      label: t("remove"),
      onClick: () => {},
      condition:
        params?.type === PODIUM_TABS.MY_PODIUMS &&
        role === PODIUM_ROLES.INVITED,
    },

    {
      label: t("live_list"),
      onClick: () => {},
      condition:
        params?.type === PODIUM_TABS.LIVE_PODIUMS ||
        params?.type === PODIUM_TABS.LIVE_FRIENDS,
    },
    {
      label: t("end_podium"),
      onClick: () => {},
      condition:
        live &&
        (role === PODIUM_ROLES?.MANAGER || empowerments?.allow_end_podium),
    },
    {
      label: t("flashat_id"),
      onClick: () => {},
      condition: params?.type === PODIUM_TABS.LIVE_FRIENDS,
    },
    {
      label: t("unfollow"),
      onClick: () => {},
      condition: params?.type === PODIUM_TABS.LIVE_FRIENDS,
    },
    {
      label: t("admins"),
      onClick: () => {},
      condition:
        params?.type === PODIUM_TABS.MY_PODIUMS &&
        role === PODIUM_ROLES?.MANAGER,
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src="/podiums/settings.svg"
          width={20}
          height={20}
          alt="podium"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" shadow-md bg-white text-black flex flex-col  px-3 rounded  gap-2 py-2 w-48 text-md font-medium z-50  max-w-md">
        {dropDownItems
          .filter((item) => item.condition) // Filter items based on condition
          .map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              {item.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PodiumSettingsWheel;
