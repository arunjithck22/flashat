import { useCoinsOrFlixBalance } from "@/app/hooks/buy-flix-coins/useCoinsOrFlixBalance";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

const Balance = ({ type }: { type: string }) => {
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  const { data, isSuccess } = useCoinsOrFlixBalance();

  return (
    <>
      <span className="flex whitespace-nowrap text-md">
        <span className="text-md text-secGray">
          {type !== "flix" ? t("coins_balance") : t("flix_balance")}
        </span>
        <span className="font-semibold px-1">
          {isSuccess && type === "flix"
            ? data?.result?.flax_balance
            : data?.result?.coin_balance}
        </span>
      </span>
    </>
  );
};

export default Balance;
