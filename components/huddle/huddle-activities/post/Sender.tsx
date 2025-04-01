// import premium from "@assets/tw/post/premium.svg";
// import postMenuIcon from "@assets/tw/post/More-info.svg";
"use client";

import { HUDDLES_TABS, HUDDLE_USER_STATUS } from "@/common/constant";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { TranslationFunction } from "@/types";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

interface SenderProps {
  thumbnail_url?: string | undefined;
  name: string | undefined;
  country_code?: string | undefined;
  isCurrentUser?: boolean;
  is_premium?: boolean | undefined;
  broadcastType?: string;
  reply?: string;
  sender?: number;
  user_status?: string | undefined;
}
export const Sender = ({
  thumbnail_url,
  name,
  country_code,
  isCurrentUser,
  is_premium,

  sender,
  user_status,
}: SenderProps) => {
  const t: TranslationFunction = useTranslations("huddles");
  const { actions } = useHuddleProvider();
  const params = useParams();
  return (
    <section className="flex items-center justify-between">
      <figure className="flex items-center gap-4 ">
        <div
          onClick={() => {
            if (
              params?.type !== HUDDLES_TABS.PUBLIC &&
              user_status !== HUDDLE_USER_STATUS?.ADMIN_BLOCKED
            ) {
              // Only execute if not PUBLIC
              actions.updateCurrentSender(sender?.toString());
              actions.toggleDrawer(true);
              actions.toggleVisibility("cloudIdcard", true);
            }
          }}
          className="relative"
        >
          {is_premium && (
            <Image
              src="/tw/post/premium.svg"
              width={15}
              height={15}
              className="absolute -top-1"
              alt="premium"
            />
          )}
          <Image
            alt="user"
            width={20}
            height={20}
            src={thumbnail_url || "/icons/user-default.svg"}
            className="w-10 h-10 p-2  rounded-full   bg-gray-300"
          />
        </div>

        <figcaption className="flex gap-1">
          <p className="base-bold inline-block ltrt:mr-2 rtl:ml-2">
            {isCurrentUser ? t("you") : name}
          </p>
          <span
            className={`fi fi-${country_code?.toLowerCase()} text-xs `}
          ></span>
        </figcaption>
      </figure>
    </section>
  );
};
