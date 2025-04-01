"use client";
import moment from "moment";
import group from "@/public/tw/group-line.svg";

import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/tw/placeholder/huddle-default-profile.svg";

import { useParams, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import { useEffect, useState } from "react";
import { useSocket } from "@/contexts/SocketContext";

import { HUDDLES_TABS } from "@/common/constant";
import { useTranslations } from "next-intl";
import { SocketEvent, TranslationFunction } from "@/types";
import { HuddleLastMessage, HuddlePublicChatData } from "@/types/huddles/index";

interface HuddleItemProps {
  id: number;
  name: string;
  message?: string;
  thumbnail?: string;
  total_members: number;
  last_message?: HuddleLastMessage | null;
  user_status?: string;
  manager_premium_status?: boolean;
  sender?: string;
  type: string;
  userId: string | undefined;
  about?: string;
  online_participants: number;
  tribe: boolean;
}

const HuddleItem = ({
  message,
  thumbnail,

  total_members,
  last_message,
  name,

  user_status,

  id,
  manager_premium_status,

  tribe,
  sender,
  type,

  userId,
  about,
  online_participants,
}: HuddleItemProps) => {
  const t: TranslationFunction = useTranslations("huddles");
  const { user } = useAuth();

  const pathname = usePathname();
  const isActive = pathname.includes(id?.toString());
  const params = useParams();

  const { socket } = useSocket();
  const [profilePhoto, setProfilePhoto] = useState(thumbnail || placeholder);

  const [senderId, setSenderId] = useState(userId);
  const [senderName, setSenderName] = useState<string | undefined>(sender);
  const [sendTime, setSendTime] = useState(last_message?.sent);
  const [mediaType, setMediaType] = useState(
    last_message?.media_meta?.media_type || null
  );
  const [messageType, setMessageType] = useState(last_message?.message_type);

  // Example usage

  useEffect(() => {
    if (!socket) {
      return;
    }
    if (!socket?.connected) {
      socket.connect();
    }

    // Define the handler for the socket event
    const handleMessageEvent = async (
      payload: SocketEvent<HuddlePublicChatData>
    ) => {
      if (
        payload.eventName === "huddle_public_chat" &&
        payload.data.huddle_id?.toString() == id?.toString()
      ) {
        // setMessage(payload?.data?.message);
        setSenderName(payload?.data?.sender_name);
        setSenderId(payload?.data?.sender?.toString());
        setSendTime(payload?.data?.sent);
        setMessageType(payload.data.message_type);
        if (payload?.data?.media_meta) {
          setMediaType(payload?.data?.media_meta?.media_type);
        } else {
          setMediaType(null);
        }
      }
    };

    // Listen for the "message" event
    socket.on("message", handleMessageEvent);

    return () => {
      socket.off("message", handleMessageEvent);
    };

    // Clean up when component unmounts or socket changes
  }, [socket, socket?.connected, id]);
  const isCurrentUser = user?.toString() == senderId?.toString();

  const handleHuddleClick = () => {
    localStorage.setItem("huddle_profile_image", thumbnail || "");
    localStorage.setItem("huddle_name", name);
    localStorage.setItem("total_members", total_members.toString());
    localStorage.setItem("online_count", online_participants?.toString());
  };

  return (
    <article
      className={` relative w-full ${
        !tribe
          ? `${isActive ? "p-4 bg-blue-100   " : "p-4"}`
          : "bg-yellow-100 hover:bg-yellow-100 order-first "
      } border-b-2 first:border-t-2 border-bgray hover:cursor-pointer hover:bg-huddlegray`}
    >
      <Link
        onClick={handleHuddleClick}
        href={`/huddles/${type}/${id}`}
        prefetch={true}
      >
        {tribe && (
          <div className="relative w-full h-1 mb-2 bg-yellow-300">
            <div
              className={` absolute p-2 border rtl:left-1/2 ltr:left-1/2 transform -translate-x-1/2 bg-yellow-300  h-5 w-1/3 rounded uppercase font-bold text-xs flex justify-center items-center`}
              style={{
                clipPath:
                  "polygon(0 0, 16px 100%, calc(100% - 19px) 100%, 100% 0)",
                top: "-0.9px",
              }}
            >
              <div>
                <p className="text-xs my-5 text-uppercase text-primary">{`${
                  params.type === HUDDLES_TABS.USER_PARTICIPATED
                    ? t("joined_tribe")
                    : t("your_tribe")
                }`}</p>
              </div>
            </div>
          </div>
        )}
        <figure className={`flex gap-3 items-center ${tribe && "p-3  "}`}>
          <div className={`relative `}>
            {manager_premium_status && (
              <Image
                className="absolute -top-2 -right-2 "
                width={20}
                height={20}
                src="/tw/huddle-premium.svg"
                alt="crown"
              />
            )}
            <Image
              src={profilePhoto || placeholder}
              className={` rounded-lg bg-center w-12 h-12 object-cover border-primary border`}
              style={{ backgroundColor: "rgba(116, 125, 135, 0.202484)" }}
              width={56}
              height={56}
              alt=""
              onError={() => setProfilePhoto(placeholder)}
            />
          </div>
          <figcaption className="flex-1 flex  justify-between">
            <div className="flex flex-col gap-1 justify-between">
              <p className="font-bold text-tprimary w-36 lg:w-40 base-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                {name}
              </p>
              <div className="flex items-center gap-2 text-xs lg:text-sm text-tprimary">
                {" "}
                <Image
                  priority={true}
                  src={group}
                  className="w-4 h-4"
                  alt=""
                />{" "}
                {total_members}
                <p className="text-gray-400 text-xs  flex gap-2 w-28 lg:w-32 whitespace-nowrap text-ellipsis overflow-hidden">
                  &nbsp;|&nbsp;{" "}
                  <span className="flex gap-1">
                    {" "}
                    {sender
                      ? isCurrentUser
                        ? "You :"
                        : senderName + ":"
                      : about}
                    <span className=""></span>{" "}
                    {(!mediaType && !messageType && last_message?.message) ||
                      message}
                    {mediaType && messageType === "sticker" && (
                      <Image
                        alt="mini-sticker"
                        width={10}
                        height={10}
                        src="/icons/mini-sticker-icon.svg"
                      />
                    )}
                    {mediaType && mediaType === "IMAGE" && !messageType && (
                      <Image
                        alt="mini-cam"
                        width={10}
                        height={10}
                        src="/icons/mini-camera-icon.svg"
                      />
                    )}
                    {mediaType && mediaType === "VIDEO" && (
                      <Image
                        alt="mini-video"
                        width={10}
                        height={10}
                        src="/icons/mini-video-icon.svg"
                      />
                    )}
                    {mediaType && mediaType === "AUDIO" && (
                      <Image
                        alt="mini-voice"
                        width={8}
                        height={8}
                        src="/icons/mini-mic-icon.svg"
                      />
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between">
              {params.type !== HUDDLES_TABS.REQUEST &&
                params.type !== HUDDLES_TABS.SEARCH && (
                  <p className={`text-xs  text-gray-500 `}>
                    {moment(sendTime).fromNow()}
                  </p>
                )}
              {params.type === HUDDLES_TABS.REQUEST && (
                <button className="bg-primary text-white px-2 py-1 rounded-sm text-xs capitalize">
                  <i>{user_status}</i>
                </button>
              )}
              {/* <span className="inline-block h-2 w-2 rounded-full bg-primary"></span> */}
            </div>
          </figcaption>
        </figure>
      </Link>
    </article>
  );
};

export default HuddleItem;
