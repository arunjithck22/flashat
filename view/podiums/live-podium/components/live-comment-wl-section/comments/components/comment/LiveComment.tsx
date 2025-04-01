import ActionBar from "@/components/ui/sidebar/ActionBar";

import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import { PodiumLiveChatPayload } from "@/types/podiums";
import Image from "next/image";
import React, { useState } from "react";
import CommentHeader from "./components/CommentHeader";
import CommentMessage from "./components/CommentMessage";
import LiveChatActions from "./components/options-from-commentlist/LiveChatActions";

const LiveComment = ({ chat }: { chat: PodiumLiveChatPayload }) => {
  const { profileData } = useProfileContext();

  const { podiumData } = usePodiumContext();
  console.log("podiumData", podiumData);
  const [isOpenActionsBar, setIsOpenActionsBar] = useState(false);

  const closeActionBar = () => {
    setIsOpenActionsBar(false);
  };

  console.log("chat details", chat);
  return (
    <>
      <li
        onClick={() => {
          setIsOpenActionsBar(true);
          // openDrawer(
          //   <LiveChatActions
          //     isPremium={chat.sender_detail.is_premium}
          //     sender_id={chat.user_id?.toString()}
          //   />
          // );
        }}
        className="flex items-start gap-3"
      >
        {/* Profile Image Wrapper (Relative for Badge Positioning) */}
        <div className="relative w-10 h-10">
          <Image
            src={
              chat.sender_detail?.thumbnail_url || "/profile/user-default.svg"
            }
            alt={chat.sender_detail?.name || ""}
            width={40}
            height={40}
            className="rounded-full"
          />
          {/* Show Premium Badge at Top-Left if supporter is true */}
          {chat.sender_detail?.is_premium && (
            <div className="absolute -top-1 -left-1 w-5 h-5">
              <Image
                src="/tw/post/premium.svg" // Your premium icon
                alt="Premium"
                width={15}
                height={15}
              />
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          {/* User Info */}

          <CommentHeader
            chat_user_id={chat.user_id?.toString()}
            country_code={chat?.country_code}
            sender={chat?.sender_detail?.name}
            current_user_id={profileData?.id?.toString()}
            chat_type={chat?.chat_type}
          />
          {/* Comment Message */}

          <CommentMessage
            chat_user_id={chat.user_id?.toString()}
            current_user_id={profileData?.id?.toString()}
            message={chat.message}
            chat_type={chat?.chat_type}
            generosity={chat?.user_stats?.generosity || ""}
            skills={chat?.user_stats?.skills || ""}
            rating={chat?.user_stats?.rating || 0}
          />
        </div>
      </li>
      <ActionBar
        width="w-80"
        isVisible={isOpenActionsBar}
        onClose={closeActionBar}
      >
        <LiveChatActions
          closeActionsBar={closeActionBar}
          isPremium={chat.sender_detail.is_premium}
          sender_id={chat.user_id?.toString()}
        />
      </ActionBar>
    </>
  );
};

export default LiveComment;
