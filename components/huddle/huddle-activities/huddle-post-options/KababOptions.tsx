"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ForOutGoingPost from "./ForOutGoingPost";
import ForIncomingPost from "./ForIncomingPost";

import Image from "next/image";
import { useParams } from "next/navigation";
import { HUDDLES_TABS, HUDDLE_USER_STATUS } from "@/common/constant";
import { SenderDetails } from "@/types/huddles";

const KababOptions = ({
  isCurrentUser,
  pinned,
  messageId,
  user_status,
  sender,
  ...message
}: {
  isCurrentUser: boolean;
  pinned: boolean;
  messageId: string;
  user_status: string | undefined;
  sender: number | undefined;
} & Partial<SenderDetails>) => {
  console.log("kabab2", message);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => {
          setIsOpen(true);
        }}
        disabled={
          (user_status !== HUDDLE_USER_STATUS.USER_ACCEPTED &&
            user_status !== HUDDLE_USER_STATUS.ADMIN_ACCEPTED) ||
          params.type === HUDDLES_TABS?.PUBLIC
        }
      >
        <Image
          alt="kabab menu"
          width={20}
          height={20}
          src="/tw/post/More-info.svg"
          className="hover:cursor-pointer"
        />
      </DropdownMenuTrigger>
      {!isCurrentUser && (
        <ForIncomingPost
          {...message}
          messageId={messageId}
          pinned={pinned}
          sender={sender}
          role={message.role || "user"}
          deleted_account={message.deleted_account || false}
          name={message.name || ""}
          user_id={message.user_id || 0}
          is_premium={message.is_premium || false}
          profile_url={message.profile_url || ""}
          thumbnail_url={message.thumbnail_url || ""}
          verified={message.verified || false}
          country_name={message.country_name || ""}
          country_code={message.country_code || ""}
          blocked_by_admin={message.blocked_by_admin || false}
          blocked_by_leader={message.blocked_by_leader || false}
          huddle_admin_blocked={message.huddle_admin_blocked || false}
          is_banned={message.is_banned || false}
          is_blacklisted={message.is_blacklisted || false}
          user_citizenship={message.user_citizenship || ""}
        />
      )}
      {isCurrentUser && (
        <ForOutGoingPost
          {...message}
          is_premium={message.is_premium || false}
          deleted_account={message.deleted_account || false}
          name={message.name || ""}
          user_id={message.user_id || 0}
          role={message.role || "user"}
          profile_url={message.profile_url || ""}
          thumbnail_url={message.thumbnail_url || ""}
          verified={message.verified || false}
          country_name={message.country_name || ""}
          country_code={message.country_code || ""}
          blocked_by_admin={message.blocked_by_admin || false}
          blocked_by_leader={message.blocked_by_leader || false}
          huddle_admin_blocked={message.huddle_admin_blocked || false}
          user_citizenship={message.user_citizenship || ""}
          is_banned={message.is_banned || false}
          is_blacklisted={message.is_blacklisted || false}
          messageId={messageId}
          pinned={pinned}
        />
      )}
    </DropdownMenu>
  );
};

export default KababOptions;
