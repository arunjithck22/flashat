"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LikeButton from "./LikeButton";

import { useParams, useSearchParams } from "next/navigation";
import { useProfileContext } from "@/contexts/ProfileContext";

import {
  PODIUM_JOINING_MODES,
  PODIUM_LIVE_CHAT_TYPE,
  PODIUM_ROLES,
} from "@/constants/podiums/constants";
import { useSendMessage } from "@/app/hooks/podiums/useSendLiveChat";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";

import { PODIUM_EVENTS } from "@/constants/events";
import { SinglePodium } from "@/types/podiums";
import { isAdmin } from "@/utils/podiums/utils";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";

const CommentInput = ({
  role,
  chat_disabled,
  chat_disabled_by,
}: {
  role: string;
  chat_disabled: boolean | undefined;
  chat_disabled_by: string | null | undefined;
}) => {
  const t: TranslationFunction = useTranslations("podiums");
  const [chatDisabled, setChatDisabled] = useState(chat_disabled);
  const [chatDisabledBy, setChatDisabledBy] = useState(chat_disabled_by);
  const params = useParams<{ tag: string; item: string; id: string }>();
  const searchParams = useSearchParams();
  const podiumId = params?.id || "";

  const mode = searchParams.get("mode");
  const { userStats } = usePodiumContext();

  const { profileData } = useProfileContext();

  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage(podiumId);
  const { setPodiumData, podiumData, adminsList } = usePodiumContext();

  console.log("comment input profile data", podiumData);

  const { socket } = usePodiumSocket();

  useEffect(() => {
    if (
      mode === PODIUM_JOINING_MODES.JOIN &&
      userStats?.generosity &&
      userStats?.skills &&
      userStats?.rating
    ) {
      sendMessage({
        chatType: PODIUM_LIVE_CHAT_TYPE.USER_JOIN,
      });
    }
  }, [userStats, mode]);

  return (
    <div className="w-full h-full flex justify-center items-center py-2 px-2 gap-3 ">
      {!podiumData?.freeze ? (
        <>
          <div className="flex flex w-[75%] justify-center items-center">
            <input
              disabled={
                podiumData?.chat_disabled && role !== PODIUM_ROLES.MANAGER
                  ? true
                  : false
              }
              className="w-full py-3 px-2 rounded-lg bg-gray-200 outline-none"
              placeholder={
                podiumData?.chat_disabled && role !== PODIUM_ROLES.MANAGER
                  ? `Comments disabled by ${
                      isAdmin(
                        adminsList,
                        podiumData?.chat_disabled_by?.toString()
                      )
                        ? t("admin")
                        : t("host")
                    }`
                  : "Enter your Message"
              }
              maxLength={150}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center px-2 py-3 ">
            {(role === PODIUM_ROLES.MANAGER || !chatDisabled) && (
              <button
                disabled={!message}
                className="bg-white flex justify-center  items-center"
                onClick={() => {
                  sendMessage({
                    chatType: PODIUM_LIVE_CHAT_TYPE.NORMAL,
                    message: message,
                  });
                  setMessage("");
                }}
              >
                <Image
                  alt="send"
                  src="/tw/post/send-icon.svg"
                  width={30}
                  height={30}
                />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex w-[75%] justify-center items-center"></div>
      )}

      <div className="flex items-center justify-center ">
        <LikeButton podiumId={podiumId} />
      </div>
    </div>
  );
};

export default CommentInput;
