import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface TotalCardProps {
  total_likes: number;
  total_joined: number;
  total_speakers: number;
  live_times: number;
  total_duration: string;
}

const TotalCard = ({
  total_likes,
  total_joined,
  total_speakers,
  live_times,
  total_duration,
}: TotalCardProps) => {
  const t: TranslationFunction = useTranslations("podiums");
  return (
    <>
      <div className="py-2  justify-center items-center gap-2 grid grid-cols-3 ">
        <div className="flex  flex-col gap-1 items-center justify-center bg-white p-2 rounded-lg">
          <p className="text-xs text-primary">{t("total_joined")}</p>
          <div className="flex items-center gap-1">
            <span className="bg-black rounded-full w-2 h-2"></span>
            <span>{total_joined}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center bg-white p-2 rounded-lg">
          <p className="text-xs text-primary">{t("total_speakers")}</p>
          <div className="flex items-center gap-1">
            <Image
              src="/podiums/speaker.svg"
              alt="chevron"
              width={15}
              height={15}
            />
            <span>{total_speakers}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center bg-white p-2 rounded-lg">
          <p className="text-xs text-primary">{t("total_likes")}</p>
          <div className="flex items-center gap-1">
            <Image
              src="/podiums/likes.svg"
              alt="chevron"
              width={15}
              height={15}
            />
            <span>{total_likes}</span>
          </div>
        </div>
      </div>
      <div className="py-2  justify-center items-center gap-2 grid grid-cols-2 ">
        <div className="flex  flex-col gap-1 items-center justify-center bg-white p-2 rounded-lg">
          <p className="text-xs text-primary">{t("no_of_live_times")}</p>
          <div className="flex items-center gap-1">
            <span className="bg-green-500 rounded-full w-2 h-2"></span>
            <span>{live_times}</span>
          </div>
        </div>
        <div className="flex  flex-col  gap-1 items-center justify-center bg-white p-2 rounded-lg">
          <p className="text-xs text-primary ">{t("total_live_duration")}</p>
          <div className="flex items-center gap-1">
            <Image
              src="/podiums/clock.svg"
              alt="chevron"
              width={15}
              height={15}
            />
            <span>{total_duration}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalCard;
