"use client";
import Profile from "@/components/buy-flix-coins/Profile";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";
import PackagesList from "./components/PackagesList";

const BuyFlix = () => {
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  return (
    <div className="overflow-y-auto custom-scrollbar w-full flex">
      <section className="flex flex-col ">
        <Profile />
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="pl-4 ltr:md:pl-32 rtl:pr-32 font-semibold text-lg pt-4 md:pt-16">
            {t("recharge")} :
          </div>
          <div className="flex justify-center items-center gap-2	font-bold text-xl text-red-500 px-4 md:px-2 pt-4 md:pt-16">
            {t("recharge_tip")}
            {/* <img width={20} height={20} src={infoIcon} alt="info" /> */}
          </div>
        </div>

        {/* <Flix /> */}
        <PackagesList />
      </section>
    </div>
  );
};

export default BuyFlix;
