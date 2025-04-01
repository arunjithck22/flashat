import { PODIUM_LIVE_CHAT_TYPE } from "@/constants/podiums/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const CommentMessage = ({
  chat_user_id,
  current_user_id,
  message,
  chat_type,
  generosity,
  skills,
  rating,
}: {
  chat_user_id: string | undefined;
  current_user_id: string | undefined;
  message: string | undefined;
  chat_type: string;
  generosity: string;
  skills: string;
  rating: number;
}) => {
  const t: any = useTranslations("podiums");
  console.log("live chat", message, chat_type);
  return (
    <div>
      <p
        className={`text-xs   ${
          chat_user_id === current_user_id ||
          chat_type === PODIUM_LIVE_CHAT_TYPE?.PAID_LIKE ||
          chat_type === PODIUM_LIVE_CHAT_TYPE?.USER_JOIN
            ? "text-purple-500  "
            : "text-gray-600"
        }`}
      >
        {chat_type === PODIUM_LIVE_CHAT_TYPE?.NORMAL && message}
        {chat_type === PODIUM_LIVE_CHAT_TYPE?.USER_JOIN &&
          `Rating ${rating}% - Generosity ${generosity} - Skills ${skills} `}
        {chat_type === PODIUM_LIVE_CHAT_TYPE?.PAID_LIKE && (
          <span className="flex gap-2 items-center text-xs">
            {" "}
            {t("supported_the_podium")}
            <Image
              alt="send"
              src="/podiums/paid-likes.svg"
              width={20}
              height={20}
            />
          </span>
        )}
      </p>
    </div>
  );
};

export default CommentMessage;
