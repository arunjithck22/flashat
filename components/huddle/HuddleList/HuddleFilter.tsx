"use client";

import { HUDDLES_TABS } from "@/common/constant";
import IconButton from "@/components/ui/IconButton";
import { useAuth } from "@/contexts/AuthContext";

import RequestAndInvites from "./RequestAndInvites";
import {  useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";

// import huddlesSmall from "../../../tw/huddles-small.svg";

interface HuddleFilterProps {
  
  currentStatus: string;
}
const HuddleFilter = ({ currentStatus }: HuddleFilterProps) => {
  const t: TranslationFunction = useTranslations("huddles");
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const router = useRouter();

  if (!isAuthenticated) return null;

  const renderIconButton = (tab: string, label: string) => (
    <IconButton
      variant={currentStatus === tab ? "primary" : ""}
      href={`/huddles/${tab}`}
    >
      <span>{label}</span>
    </IconButton>
  );

  return params?.type !== HUDDLES_TABS.REQUEST ? (
    <div className="sticky w-full z-50 bg-white">
      <div className="p-2 lg:p-3 xl:p-4 flex flex-col gap-2 bg-white">
        {/* Navigation Buttons */}
        <div className="w-full flex justify-between">
          {renderIconButton(HUDDLES_TABS.USER_MANAGED, t("my_huddles"))}
          {renderIconButton(HUDDLES_TABS.ADMIN, t("admin"))}
          {renderIconButton(HUDDLES_TABS.USER_PARTICIPATED, t("joined"))}
          {renderIconButton(HUDDLES_TABS.SEARCH, t("others"))}
        </div>
      </div>

      {/* Conditional Render */}
      {(params?.type === HUDDLES_TABS.USER_PARTICIPATED ||
        params?.type === HUDDLES_TABS.SEARCH) && <RequestAndInvites />}
    </div>
  ) : (
    <div className="sticky w-full z-50 bg-white">
      <div className="p-2 py-2 lg:px-3 xl:px-4 flex  w-full   gap-2 bg-white">
        <Image
          // onClick={backToInfo}
          onClick={() => {
            router.push(`/huddles/${HUDDLES_TABS?.USER_PARTICIPATED}`);
          }}
          src="/tw/HuddleInfo/back-arrow.svg"
          alt="close-icon"
          width={25}
          height={25}
          className=" top-2 left-0  cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
        />
        <h1 className="base-semibold text-lg">{t("requests_and_invites")}</h1>
      </div>
    </div>
  );
};

export default HuddleFilter;
