"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import KindBadge from "./KindBadge";
import PodiumSettingsWheel from "./PodiumSettingsWheel";
import TypeBadge from "./TypeBadge";
import { TranslationFunction } from "@/types";

interface PodiumListItemProps {
  manager_profile: string;
  podium_profile: string;
  name: string;
  about: string;
  kind: string;
  live: boolean;
  live_users: number;
  is_private: boolean;
  role: string;
  id: string;
}

const PodiumListItem = ({
  manager_profile,
  podium_profile,
  name,
  about,
  kind,
  live,
  live_users,
  is_private,
  role,
  id,
}: PodiumListItemProps) => {
  const t: TranslationFunction = useTranslations("podiums");
  const params = useParams();

  return (
    <article
      className={`rounded-md relative w-full bg-podiumItemBg      border border-bgray hover:cursor-pointer hover:bg-gray-100`}
    >
      <Link
        href={{
          pathname: `/podiums/${params?.type}`,
          query: {
            role: role,
            podiumId: id,
            kind: kind,
          },
        }}
        prefetch={true}
        className="flex justify-between"
      >
        <div className=" flex py-3 px-2 gap-2  ">
          <figure className="relative">
            <Image
              src={podium_profile || manager_profile || "/podiums/default.svg"}
              width={100}
              height={100}
              alt="podium"
              className="rounded-md bg-center w-20 h-20 object-cover "
            />
            <span
              style={{
                fontSize: "8px",
              }}
              className="absolute  italic bottom-1 base-bold tracking-wider left-1/2 transform -translate-x-1/2 text-xs opacity-80 border text-white border-white bg-black px-1 rounded-md"
            >
              {t(role?.toLowerCase())}
            </span>
          </figure>
          <figcaption className="flex flex-col justify-center gap-2  w-max">
            <h4 className="text-sm base-semibold">{name}</h4>
            <p className="text-xs text-gray-500">{about}</p>
            <div className="flex gap-1">
              <KindBadge
                bg_color="bg-yellow-500"
                text_color="text-primary"
                kind={kind}
              />
              {is_private && <TypeBadge />}
            </div>
          </figcaption>
        </div>
        <div className="p-2 flex gap-3 h-full justify-center items-center ">
          {live ? (
            <div className="flex items-center justify-center gap-1 text-green-500 text-xs base-semibold uppercase">
              <span>{t("live")}</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-center">{live_users}</span>
            </div>
          ) : (
            <div className="flex items-center uppercase gap-1 text-red-500 base-semibold text-xs">
              <span>{t("offline")}</span>
            </div>
          )}
          <div className="flex justify-center items-center">
            <PodiumSettingsWheel role={role} live={live} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PodiumListItem;
