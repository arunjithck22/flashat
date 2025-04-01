"use client";

import React from "react";
import { Sender } from "./Sender";

import { useAuth } from "@/contexts/AuthContext";
import { Banner } from "./Banner";
import Image from "next/image";
import { TextMessage } from "./TextMessage";
import { HUDDLES_TABS, MEDIA_TYPES } from "@/common/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import usePinHuddlePost from "@/app/hooks/huddles/usePinHuddlePost";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_HUDDLE_MESSAGES } from "@/app/hooks/huddles/useHuddleMessages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PinnedPost = (message: any) => {
  const params = useParams();
  const huddleType = params?.type;
  const { user } = useAuth();
  // const { actions, state } = useHuddleProvider();
  const pinPostMutation = usePinHuddlePost();
  const queryClient = useQueryClient();
  console.log("pinned post is", message.message);
  const isCurrentUser = user == message?.message?.sender;

  const handlePinPost = () => {
    pinPostMutation.mutateAsync(
      {
        huddleId: params?.id?.toString() || "",
        data: {
          message_id: message?.message?.message_id,
          pin: !message?.message?.pinned,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QKEY_HUDDLE_MESSAGES, params?.id],
          });
        },
      }
    );
  };
  return (
    <div>
      <Banner
        role={message.message?.sender_details?.role}
        citizenship={message.message?.sender_details?.user_citizenship}
      />
      <div className="  border-yellow-400 p-4 ">
        <div className="flex w-full justify-between">
          <Sender
            {...message.message?.sender_details}
            isCurrentUser={isCurrentUser}
            broadcastType={message.message?.sender_broadcastType}
            sender={message.message?.sender}
          />
          <div className="flex justify-between gap-2">
            <Image src="/icons/pin.svg" alt="pin" width={8} height={8} />
            {/* <KababOptions
            {...message.sender_details}
            pinned={message.pinned}
            isCurrentUser={isCurrentUser}
            actions={actions}
            messageId={message.message_id}
            user_status={user_status}
            sender={message?.sender}
          /> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  alt="kabab menu"
                  width={20}
                  height={20}
                  src="/tw/post/More-info.svg"
                  className="hover:cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" bg-white text-black py-2 text-md font-medium ">
                <DropdownMenuItem
                  disabled={huddleType !== HUDDLES_TABS.USER_MANAGED}
                  onClick={handlePinPost}
                >
                  Unpin{" "}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex px-16 gap-2 ">
          {(message?.message?.media_meta?.media_type === MEDIA_TYPES.IMAGE ||
            message?.message?.media_meta?.media_type === MEDIA_TYPES.VIDEO) && (
            <div className=" overflow-hidden relative">
              <Image
                className="object-cover w-full h-full rounded"
                src={message?.message?.media_meta?.thumbnail}
                width={30} // Adjust based on your need for clarity
                height={60}
                alt="image"
              />
            </div>
          )}
          <div className="flex justify-center items-center text-xs">
            <TextMessage message={message.message?.message} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinnedPost;
