/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useHuddleMessage } from "@/app/hooks/huddles/useHuddleMessages";
import { API_STATUS } from "@/common/constant";

import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import EmptyHuddle from "../../EmptyHuddle";
import HuddleSkelton from "../../HuddleSkelton";
import HuddlePost from "./HuddlePost";

import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";

const PublicHuddlePosts = () => {
  const { ref, inView } = useInView();

  const params = useParams();

  const huddleId = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure id is a string

  // const [huddleMessages, setHuddleMessages] = useState(messages);
  // const [lastMessageId, setLastMessageId] = useState(
  //   messages?.[messages?.length - 1]?.message_id || ""
  // );
  const { state } = useHuddleProvider();

  // const [newMessageCount, setNewMessageCount] = useState(0);

  const {
    data: messageData,
    // error: messageError,
    status: messageStatus,

    isFetching: messageDataFetching,
    hasNextPage,
    fetchNextPage,
    // isFetchingNextPage,
    // refetch: messageRefetch,
    isError: isMessageError,
    isLoading: messageDataLoading,
    isSuccess,
    isRefetching,
  } = useHuddleMessage(huddleId, "public");

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div>
      <div
        ref={topRef}
        style={{
          height: "calc(100vh - 190px)",
        }}
        className="flex w-full flex-col relative  overflow-y-auto custom-scrollbar scroll-smooth   "
      >
        {isRefetching && !messageDataLoading && (
          <div className="absolute top-0 left-0 w-full h-1 z-40">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%] animate-moveLoader"></div>
          </div>
        )}

        <div className="flex-grow">
          {API_STATUS.SUCCESS === messageStatus &&
            isSuccess &&
            messageData?.pages?.map((page: any) => {
              return page?.result?.messages?.map((message: any, index: any) => {
                return (
                  <div
                    key={message.message_id || index}
                    // ref={(el: any) => {
                    //   if (el) {
                    //     // Add to Map if element exists
                    //     messageRefs.current.set(message.message_id, el);
                    //   } else {
                    //     // Remove from Map if element is unmounted
                    //     messageRefs.current.delete(message.message_id);
                    //   }
                    // }}
                  >
                    <HuddlePost
                      replyUI={
                        state.postId === message.message_id && state.replyPost
                      }
                      editUI={
                        state.postId === message.message_id && state.editPost
                      }
                      // index={index}
                      message={message}
                      // actions={actions}
                      // state={state}
                      user_status={""}
                    />
                  </div>
                );
              });
            })}
        </div>
        {API_STATUS.SUCCESS === messageStatus &&
          isSuccess &&
          messageData?.pages[0].result?.messages.length === 0 && (
            <EmptyHuddle key={0} />
          )}
        {isMessageError && (
          <div className="flex h-96 justify-center items-center text-red-800">
            Something Went Wrong...{" "}
          </div>
        )}
        {messageDataFetching && messageDataLoading && (
          <>
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
          </>
        )}
        {hasNextPage && (
          <div ref={ref}>
            <HuddleSkelton />
            <HuddleSkelton />
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicHuddlePosts;
