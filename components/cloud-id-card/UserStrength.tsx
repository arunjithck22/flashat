import Image from "next/image";
import React, { useState } from "react";

import Others from "./Others";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import Modal from "../ui/modal/Modal";

interface UserStrengthProps {
  dears?: number;
  fans?: number;
  likers?: number;
  stars?: number;
  rating?: number;
  gnr?: string;
  skl?: string;
  is_premium: boolean;
  total_received_gifts?: number | null;
  total_huddle_owned?: number | null;
  user_managed_huddles_participants?: number | null;
  total_huddles_participant?: number | null;
  total_flash_published?: number | null;
  total_postat_published?: number | null;
  total_public_podiums?: number | null;
  total_broadcasts?: number | null;
  citizenship?: string | null;
  total_huddles_admin?: number | null;
}

const UserStrength: React.FC<UserStrengthProps> = ({
  dears,
  fans,
  likers,
  stars,
  rating,
  gnr,
  skl,
  is_premium,
  total_received_gifts,
  total_huddle_owned,
  total_huddles_participant,
  user_managed_huddles_participants,
  total_flash_published,
  total_public_podiums,
  citizenship,
  total_broadcasts,
  total_huddles_admin,
}) => {
  const t: TranslationFunction = useTranslations("id_card");
  const common: TranslationFunction = useTranslations("common");
  const [othersOpen, setOthersOpen] = useState(false);
  const cn = classNames({
    "bg-[url('/bg/min-id.svg')]": citizenship === "minister",
    "bg-[url('/bg/cit-id.svg')]": citizenship === "citizen",
    "bg-[url('/bg/res-id.svg')]": citizenship === "resident",
    "bg-[url('/bg/off-id.svg')]": citizenship === "officer",
    "bg-[url('/bg/pre-id.svg')]": citizenship === "president",
    "bg-[url('/bg/amb-id.svg')]": citizenship === "ambassador",
    "bg-[#E0E0E0]": citizenship === "visitor",
  });
  const headerCn = classNames({
    "bg-[url('/bg/min-header.svg')] text-[#771082]": citizenship === "minister",
    "bg-[url('/bg/coa-header.svg')] text-[#FFFCEC]":
      citizenship === "citizen" ||
      citizenship === "ambassador" ||
      citizenship === "officer",
    "bg-[url('/bg/pre-header.svg')] text-[#771082]":
      citizenship === "president",
    "bg-[#E0E0E0] text-[#3F464E] ": citizenship === "visitor",
    "bg-[url('/bg/res-header.svg')] text-[#FFFFFF] ":
      citizenship === "resident",
  });
  return (
    <div
      className={` w-full flex  p-3 relative rounded-lg ${cn} bg-cover bg-center `}
    >
      <header
        className={`absolute ltr:left-0 rtl:right-0 top-5 ${headerCn} bg-cover bg-center w-[120px] h-8 flex justify-center items-center text-lg base-bold  ltr:rounded-r-lg rtl:rounded-l-lg`}
      >
        {t("user_strength")}
      </header>
      <div
        className={`bg-white w-full flex flex-col gap-6 p-2 rounded-lg ${
          is_premium ? "text-primary" : "text-gray-700"
        }`}
      >
        <div className="flex w-full  h-8 "></div>
        <div className="flex w-full   ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-1/4">
                <figure className="flex gap-1 w-full">
                  <Image
                    style={{
                      filter: !is_premium ? "grayscale(1)" : "none", // Conditional filter for premium users
                    }}
                    src="/tw//id/pl.svg"
                    alt="skl"
                    width={30}
                    height={30}
                  />
                  <figcaption className="flex flex-col">
                    <span className="base-semibold text-xs ltr:text-left rtl:text-right">
                      {" "}
                      {skl?.replace(/\D/g, "") || 0}
                    </span>
                    <span className="text-xs">{t("skl")}</span>
                  </figcaption>
                </figure>
              </TooltipTrigger>
              <TooltipContent
                align="start"
                side="bottom"
                sideOffset={-5}
                alignOffset={5}
                className="bg-white shadow-lg border w-60 p-2 "
              >
                <p className="break-words base-semibold text-xs ">
                  {t("skl_tip")}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-1/4">
                <figure className="flex gap-1 w-full">
                  <Image
                    style={{
                      filter: !is_premium ? "grayscale(1)" : "none", // Conditional filter for premium users
                    }}
                    src="/tw//id/lv.svg"
                    alt="skl"
                    width={30}
                    height={30}
                  />
                  <figcaption className="flex flex-col ">
                    <span className="base-semibold text-xs ltr:text-left rtl:text-right">
                      {gnr?.replace(/\D/g, "") || 0}
                    </span>
                    <span className="text-xs">{t("gnr")}</span>
                  </figcaption>
                </figure>
              </TooltipTrigger>
              <TooltipContent
                align="start"
                side="bottom"
                sideOffset={-5}
                alignOffset={5}
                className="bg-white shadow-lg border w-40 "
              >
                <p className="break-words base-semibold text-xs">
                  {t("gnr_tip")}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <figure className="flex gap-1 w-1/4">
            <Image
              style={{
                filter: !is_premium ? "grayscale(1)" : "none", // Conditional filter for premium users
              }}
              src="/tw/id/rating.svg"
              alt="skl"
              width={30}
              height={30}
            />
            <figcaption className="flex flex-col">
              <span className="base-semibold text-xs">
                {" "}
                {rating && Math.round(rating)}%
              </span>
              <span className="text-xs">{common("rating")}</span>
            </figcaption>
          </figure>

          <figure className="flex flex-col  w-1/4 cursor-pointer relative">
            <Image
              style={{
                filter: !is_premium ? "grayscale(1)" : "none", // Conditional filter for premium users
              }}
              src="/tw/id/others.svg"
              alt="skl"
              width={30}
              height={30}
              onClick={() => {
                setOthersOpen(true);
              }}
            />

            <span className="absolute ltr:left-0 rtl:right-0 -bottom-2 text-xs">
              {t("others")}
            </span>

            <Modal
              isOpen={othersOpen}
              onClose={() => {
                setOthersOpen(false);
              }}
            >
              <Others
                total_received_gifts={total_received_gifts || 0}
                total_huddle_owned={total_huddle_owned || 0}
                total_huddles_participant={total_huddles_participant || 0}
                user_managed_huddles_participants={
                  user_managed_huddles_participants || 0
                }
                total_public_podiums={total_public_podiums || 0}
                total_flash_published={total_flash_published || 0}
                total_broadcasts={total_broadcasts || 0}
                total_huddles_admin={total_huddles_admin || 0}
              />
            </Modal>
          </figure>
        </div>
        <div className="flex w-full   ">
          <figure className="flex gap-1 w-1/4">
            <Image
              style={{
                filter: !is_premium ? "grayscale(1)" : "none", // Conditional filter for premium users
              }}
              src="/tw/id/dears.svg"
              alt="skl"
              width={30}
              height={30}
            />
            <figcaption className="flex flex-col">
              <span className="base-semibold text-xs">{dears}</span>
              <span className="text-xs">{common("dears")}</span>
            </figcaption>
          </figure>
          <figure className="flex gap-1 w-1/4">
            <Image
              style={{
                filter: !is_premium ? "grayscale(1)" : "none", // Conditional filter for premium users
              }}
              src="/tw/id/fans.svg"
              alt="skl"
              width={30}
              height={30}
            />
            <figcaption className="flex flex-col">
              <span className="base-semibold text-xs">{fans}</span>
              <span className="text-xs">{common("fans")}</span>
            </figcaption>
          </figure>
          <figure className="flex gap-1 w-1/4">
            <Image
              style={{
                filter: !is_premium ? "grayscale(1)" : "none", // Conditional filter for premium users
              }}
              src="/tw/id/likers.svg"
              alt="skl"
              width={30}
              height={30}
            />
            <figcaption className="flex flex-col">
              <span className="base-semibold text-xs">{likers}</span>
              <span className="text-xs">{common("likers")}</span>
            </figcaption>
          </figure>
          <figure className="flex gap-1 w-1/4">
            <Image
              style={{
                filter: !is_premium ? "grayscale(1)" : "none", // Conditional filter for premium users
              }}
              src="/tw/id/stars.svg"
              alt="skl"
              width={30}
              height={30}
            />
            <figcaption className="flex flex-col">
              <span className="base-semibold text-xs">{stars}</span>
              <span className="text-xs">{common("stars")}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default UserStrength;
