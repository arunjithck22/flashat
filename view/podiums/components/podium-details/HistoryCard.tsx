"use client";
import { useProfileContext } from "@/contexts/ProfileContext";
import { TranslationFunction } from "@/types";
import { PodiumSessions } from "@/types/podiums";
import { formatDate, convertToAmPmFormat } from "@/utils/clientUtils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

const HistoryCard = ({
  duration,
  started,
  ended,
  likes,
  total_speakers,
  total_users,
  ...item
}: PodiumSessions) => {
  const t: TranslationFunction = useTranslations("podiums");
  const { timeZone } = useProfileContext();
  const [historyAccordion, setHistoryAccordion] = useState(false);
  return (
    <div className="p-2 bg-white border border-1 rounded-lg w-full flex flex-col">
      <div className="p-2  flex justify-between ">
        <div className="flex flex-col gap-1">
          <p className="text-xs base-semibold">{formatDate(started, "/")}</p>
          {!historyAccordion && (
            <span
              className="text-gray-500 flex justify-center gap-1 items-center"
              style={{
                fontSize: "8px",
              }}
            >
              <Image
                src="/podiums/clock.svg"
                alt="chevron"
                width={8}
                height={8}
              />
              <span className="text-gray-500 flex justify-center gap-1 items-center">
                {duration}
              </span>
            </span>
          )}
        </div>
        {!historyAccordion && (
          <div className="flex gap-5 w-full justify-center items-center">
            <div className="flex gap-1  px-2 sm:px-5 py-1 bg-gray-200 rounded">
              <Image
                src="/podiums/speaker.svg"
                alt="chevron"
                width={15}
                height={15}
              />
              <span>{total_speakers}</span>
            </div>
            <div className="flex gap-1 px-2 sm:px-5  py-1 bg-gray-200 rounded">
              <Image
                src="/podiums/likes.svg"
                alt="chevron"
                width={15}
                height={15}
                style={{
                  filter:
                    "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
                }}
              />
              <span>{likes}</span>
            </div>
            <div className="flex gap-1  px-2 sm:px-5 items-center py-1 bg-gray-200 rounded">
              <span className="bg-black rounded-full w-2 h-2"></span>
              <span>{total_users}</span>
            </div>
          </div>
        )}
        <div className="flex items-center">
          <Image
            onClick={() => {
              setHistoryAccordion(!historyAccordion);
            }}
            src={
              historyAccordion
                ? "/podiums/chevron-up.svg"
                : "/podiums/chevron-down.svg"
            }
            alt="chevron"
            width={15}
            height={15}
          />
        </div>
      </div>
      {historyAccordion && (
        <>
          <div className="py-2 justify-center items-center gap-2 grid grid-cols-3 ">
            <div className="flex  flex-col gap-1 items-center justify-center bg-gray-200 p-2 rounded-lg">
              <p className="text-xs text-primary">{t("total_joined")}</p>
              <div className="flex items-center gap-1">
                <span className="bg-black rounded-full w-2 h-2"></span>
                <span>{total_users}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center bg-gray-200 p-2 rounded-lg">
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
            <div className="flex flex-col gap-1 items-center justify-center bg-gray-200 p-2 rounded-lg">
              <p className="text-xs text-primary">{t("total_likes")}</p>
              <div className="flex items-center gap-1">
                <Image
                  src="/podiums/likes.svg"
                  alt="chevron"
                  width={15}
                  height={15}
                />
                <span>{likes}</span>
              </div>
            </div>
          </div>
          <div className="  gap-2 grid grid-cols-[1fr_2fr]">
            <div className="flex w-full gap-1  justify-center text-xs">
              <div>
                <Image
                  src="/podiums/clock.svg"
                  alt="chevron"
                  width={10}
                  height={10}
                />
              </div>
              <span>{duration}</span>
            </div>
            <div className="text-xs flex justify-between ">
              <span className="text-center w-full ">
                {convertToAmPmFormat(started, timeZone)}
              </span>
              <span className="text-center ">to</span>
              <span className="text-center w-full ">
                {convertToAmPmFormat(ended, timeZone)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-xs">{t("started_by")}</span>
            <Image
              src={item?.started_by?.profile_url}
              alt="chevron"
              width={20}
              height={20}
              className="rounded-full object-cover bg-cover w-6 h-6"
            />
            <span className="text-xs">{item?.started_by?.name}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryCard;
