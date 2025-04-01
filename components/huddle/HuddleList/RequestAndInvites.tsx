import { HUDDLES_TABS } from "@/common/constant";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RequestAndInvites = () => {
  const t: TranslationFunction = useTranslations("huddles");
  return (
    <Link className="w-full " href={`/huddles/${HUDDLES_TABS.REQUEST}`}>
      <div className="px-2 lg:px-3 py-2 xl:px-4 flex justify-between cursor-pointer shadow-sm hover:bg-gray-200">
        <div className="flex">
          <Image
            src="/tw/huddles-small.svg"
            alt="requests"
            width={30}
            height={30}
          />
          <div className="flex gap-2 font-semibold flex-nowrap px-1">
            <span>{t("requests")} </span>
            <span>&</span> <span>{t("invites")} </span>
          </div>
        </div>
        <div>
          {/* <button className="rounded-full w-6 h-6 bg-primary text-sm text-white ">
            1
          </button> */}
        </div>
      </div>
    </Link>
  );
};

export default RequestAndInvites;
