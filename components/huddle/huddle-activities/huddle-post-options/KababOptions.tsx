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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  pinned: boolean;
  messageId: string;
  user_status: string | undefined;
  sender: number | undefined;
} & SenderDetails) => {
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
          role={message.role || ""}
        />
      )}
      {isCurrentUser && (
        <ForOutGoingPost
          {...message}
          is_premium={message.is_premium}
          messageId={messageId}
          pinned={pinned}
        />
      )}
    </DropdownMenu>
  );
};

export default KababOptions;
