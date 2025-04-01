/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface CoinCardProps {
  flax: any;
  price: any;
  flixHistoryType?: string;
  userName: any;
  purchasedBy: any;
}

const FlixCards: React.FC<CoinCardProps> = ({
  flax,
  price,
  flixHistoryType,
  userName = "",
  purchasedBy,
}) => {
  const pathname = usePathname();
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  const common: TranslationFunction = useTranslations("common");
  return (
    <article className="flex flex-col md:flex-row  px-2  gap-4 w-full  bg-bgLightPink  rounded-lg">
      <section className="flex gap-4 w-full md:w-2/3">
        <figure className="flex-shrink-0">
          <Image
            className="rounded-full w-8 h-8 md:w-8 md:h-8 object-cover"
            alt="user"
            src={"/buy-flix-coins/flix-icon.png"}
            width={100}
            height={100}
          />
        </figure>
        <div className="flex flex-col gap-3 flex-grow ">
          <div className="inline-flex flex-grow  px-2  rounded-lg text-xs font-semibold items-center  ">
            <div>
              {flixHistoryType && flixHistoryType === "others"
                ? `${t("purchased_for")} ${userName}  `
                : purchasedBy
                ? `${t("purchased_by")} ${purchasedBy}`
                : ""}
            </div>
            <div className="bg-yellow-300 p-1 px-2 rounded-lg ml-3">
              {flax}{" "}
              {pathname === "/COiNS-purchase-history"
                ? common("coins")
                : common("flix")}
            </div>
          </div>
          <div className="flex flex-wrap flex-grow gap-1">
            <span className="text-primary text-xs ml-2  ">AED {price}</span>
          </div>
        </div>
      </section>
    </article>
  );
};

export default FlixCards;
