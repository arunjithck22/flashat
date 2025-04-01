import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

const TypeBadge = () => {
  const t: TranslationFunction = useTranslations("podiums");
  return (
    <div
      style={{
        fontSize: "8px",
      }}
      className={`w-max py-0.5 px-1   text-gray-500  border border-gray-500   rounded-full `}
    >
      {t("private")}
    </div>
  );
};

export default TypeBadge;
