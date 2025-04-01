import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";

import { PodiumLiveChatPayload } from "@/types/podiums";
// import { useProfileContext } from "@/contexts/ProfileContext";
import LiveComment from "./components/comment/LiveComment";
import { useProfileContext } from "@/contexts/ProfileContext";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";

const LiveComments = ({ welcome_message }: { welcome_message: string }) => {
  const { profileData } = useProfileContext();
  const { LiveChats } = usePodiumContext();
  const chatRef = useRef<HTMLDivElement | null>(null);

  console.log("live chats", LiveChats);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight, // Scroll to bottom
        behavior: "smooth", // Smooth scrolling
      });
    }
  }, [LiveChats?.length]);

  return (
    <div
      ref={chatRef}
      className="w-full h-full p-4 bg-white overflow-y-auto custom-scrollbar-hidden"
    >
      <ul className="space-y-4">
        <li className="flex flex-col items-center gap-1 w-full bg-secondary py-2 shadow-md rounded-lg">
          <div className="base-semibold text-sm text-primary">
            {profileData?.name || profileData?.username}
          </div>
          <div className=" text-xs">{welcome_message}</div>
        </li>
        {LiveChats.map((chat: PodiumLiveChatPayload) => (
          <LiveComment key={chat?.chat_id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};

export default LiveComments;
