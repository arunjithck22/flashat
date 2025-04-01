"use client";

import React from "react";

import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import { CoinPackagesList } from "./components/CoinPackagesList";
import Profile from "@/components/buy-flix-coins/Profile";

const BuyCoins = () => {
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
        <CoinPackagesList />
      </section>
    </div>
  );
};

export default BuyCoins;
