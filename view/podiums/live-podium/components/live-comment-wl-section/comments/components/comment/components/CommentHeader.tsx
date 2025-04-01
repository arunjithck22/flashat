import CountryFlag from "@/components/ui/country-flag/CountryFlag";
import { PODIUM_LIVE_CHAT_TYPE } from "@/constants/podiums/constants";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

const CommentHeader = ({
  chat_user_id,
  current_user_id,
  sender,
  country_code,
  chat_type,
}: {
  chat_user_id: string | undefined;
  current_user_id: string | undefined;
  sender: string | undefined;
  country_code: string;
  chat_type?: string;
}) => {
  const t: TranslationFunction = useTranslations("podiums");
  return (
    <div className="flex items-center space-x-2">
      <span
        className={`text-sm font-semibold ${
          chat_type === PODIUM_LIVE_CHAT_TYPE.USER_JOIN
            ? "text-violet-500"
            : chat_user_id === current_user_id
            ? "text-yellow-500"
            : "text-gray-400"
        }`}
      >
        {chat_type === PODIUM_LIVE_CHAT_TYPE.USER_JOIN
          ? `${t("welcome")}... ${sender}`
          : sender}
      </span>
      {/* Country Flag */}
      <CountryFlag country_code={country_code} />
    </div>
  );
};

export default CommentHeader;
