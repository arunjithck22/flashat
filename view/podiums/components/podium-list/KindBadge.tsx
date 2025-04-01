import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

const KindBadge = ({
  bg_color,
  text_color,
  kind,
}: {
  bg_color: string;
  text_color: string;
  kind: string;
}) => {
  const t: TranslationFunction = useTranslations("podiums");
  return (
    <div
      style={{
        fontSize: "8px",
      }}
      className={`w-max py-0.5 px-2 rounded-md uppercase  ${bg_color} ${text_color}`}
    >
      {t(kind?.toLowerCase())}
    </div>
  );
};

export default KindBadge;
