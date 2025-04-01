"use client";

import {
  MessageResponse,
  useHuddleMessage,
} from "@/app/hooks/huddles/useHuddleMessages";
import { API_STATUS, HUDDLES_TABS } from "@/common/constant";
import { HUDDLE_EVENTS } from "@/constants/events";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/SocketContext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import EmptyHuddle from "../../EmptyHuddle";
import HuddleSkelton from "../../HuddleSkelton";
import HuddlePost from "./HuddlePost";
import { useQueryClient } from "@tanstack/react-query";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { QKEY_HUDDLE, useHuddle } from "@/app/hooks/huddles/useHuddle";
import ManageInvitesButton from "../footerButtons/ManageInvitesButton";
import useJoinHuddle from "@/app/hooks/huddles/useJoinHuddle";
import { KEY_HUDDLES_QUERY } from "@/app/hooks/huddles/useHuddles";
import useRequestToJoinHuddle from "@/app/hooks/huddles/useRequestToJoinHuddle";
import useIncomingHuddleRequestActions from "@/app/hooks/huddles/useIncomingHuddleRequestActions";
import useIncomingInviteActions from "@/app/hooks/huddles/useIncomingInviteActions";
import { toast } from "react-toastify";
import PinnedPost from "./PinnedPost";
import { HuddleMessage, HuddlePublicChatData } from "@/types/huddles";
import { HttpResponse, SocketEvent } from "@/types";

const HuddlePosts = () => {
  const { ref, inView } = useInView();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const params = useParams();
  const { socket } = useSocket();
  const [clicked, setClicked] = useState(false);
  const huddleId = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure id is a string

  // const [huddleMessages, setHuddleMessages] = useState(messages);
  // const [lastMessageId, setLastMessageId] = useState(
  //   messages?.[messages?.length - 1]?.message_id || ""
  // );
  const { state } = useHuddleProvider();

  const [newMessageCount, setNewMessageCount] = useState(0);
  const { data: huddleDetails } = useHuddle(params?.id?.toString());

  const {
    data: messageData,
    status: messageStatus,

    isFetching: messageDataFetching,
    hasNextPage,
    fetchNextPage,

    refetch: messageRefetch,
    isError,
    isLoading: messageDataLoading,
    isSuccess,
    isRefetching,
  } = useHuddleMessage(huddleId, "private");

  const topRef = useRef<HTMLDivElement>(null);

  // const messageRefs = useRef(new Map());

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  console.log("message data of huddle", messageData);

  // Scroll to a message when pinned post is clicked
  const handlePinnedPostClick = (messageId: string) => {
    console.log(messageId);
    // const targetElement = messageRefs?.current?.get(messageId); // Corrected
    // if (targetElement) {
    //   targetElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    // }
  };

  useEffect(() => {
    if (socket) {
      const handleMessageEvent = async (
        payload: SocketEvent<HuddlePublicChatData>
      ) => {
        if (
          payload.eventName === HUDDLE_EVENTS.HUDDLE_PUBIC_CHAT &&
          payload.data.huddle_id == huddleId &&
          payload.data.sender?.toString() !== user
        ) {
          setNewMessageCount((prevCount) => prevCount + 1);
        } else {
          if (payload.data.sender?.toString() === user) messageRefetch();
          setNewMessageCount(0);
        }
      };

      // Listen for the "message" event
      socket?.on("message", handleMessageEvent);
      // if (socket.connected) {
      //   handleReadMessage();
      // }
      return () => {
        socket.off("message", handleMessageEvent);
      };
    }

    // Clean up when component unmounts or socket changes
  }, [socket, socket?.connected]);

  useEffect(() => {
    setNewMessageCount(0);
    if (isRefetching && clicked) {
      topRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      setClicked(false);
    }
  }, [isRefetching, clicked]);

  const { mutate: joinMutate, isPending: joinPending } = useJoinHuddle();

  const { mutate: requestToJoinMutate, isPending: requestToJoinPendiing } =
    useRequestToJoinHuddle();

  const joinHuddleFn = () => {
    joinMutate(
      {
        huddleId: huddleId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QKEY_HUDDLE, huddleId] });
          queryClient.invalidateQueries({
            queryKey: [KEY_HUDDLES_QUERY, params?.type],
          });
        },
      }
    );
  };

  const requestToJoinFn = () => {
    requestToJoinMutate(
      {
        huddleId: huddleId,
        data: {},
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QKEY_HUDDLE, huddleId] });
          queryClient.invalidateQueries({
            queryKey: [KEY_HUDDLES_QUERY, params?.type],
          });
        },
      }
    );
  };
  const inviteActions = useIncomingInviteActions();

  const handleActions = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
    member_id: string
  ) => {
    e.preventDefault();

    inviteActions.mutateAsync(
      {
        huddleId: params.id?.toString(),
        data: {
          action: e.currentTarget.value,
          member_id: member_id,
        },
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          console.log("new data12", data);

          if (data?.result?.status_code === 20012) {
            toast.error(data?.message);
          }
          queryClient.invalidateQueries({
            queryKey: [KEY_HUDDLES_QUERY, params?.type],
          });
          queryClient.invalidateQueries({ queryKey: [QKEY_HUDDLE, huddleId] });

          if (
            e?.currentTarget?.value === "block" ||
            e?.currentTarget?.value === "decline"
          ) {
            router.push(`/huddles/${params?.type}`);
          }
        },

        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.error("Error in request accept or decline:", error.message);
            toast.error(error?.message);
          } else {
            console.error("An unexpected error occurred", error);
            throw new Error("An unknown error occurred");
          }
        },
      }
    );
  };
  const requestActions = useIncomingHuddleRequestActions();
  const handleRequestActions = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
    member_id: string | null
  ) => {
    e.preventDefault();
    requestActions.mutateAsync(
      {
        huddleId: params.id?.toString(),
        data: {
          action: e.currentTarget.value,
          member_id: member_id,
        },
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          console.log("newwwwww", data);
          queryClient.invalidateQueries({
            queryKey: [KEY_HUDDLES_QUERY, params?.type],
          });
          router.push(`/huddles/${params.type}`);
        },
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.error("Error in request accept or decline:", error.message);
            toast.error(error?.message);
          } else {
            console.error("An unexpected error occurred", error);
            throw new Error("An unknown error occurred");
          }
        },
      }
    );
  };
  useEffect(() => {
    if (huddleDetails && huddleDetails.result.user_status === "admin_blocked") {
      const toastId = toast("You are temporarily restricted from this huddle", {
        autoClose: false,
        hideProgressBar: false,
        closeButton: false,
        closeOnClick: false,
        style: {
          backgroundColor: "#d5d2d2", // Background color
          color: "black",
          fontSize: "14px",
          display: "flex",
        },
        position: "bottom-right",
      });

      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [huddleDetails]);

  return (
    <div>
      {API_STATUS.SUCCESS === messageStatus &&
        huddleDetails?.result?.status !== "admin_blocked" &&
        isSuccess &&
        messageData?.pages?.map((page: HttpResponse<MessageResponse>) =>
          page?.result?.pinned_post ? (
            <div
              key={page?.result?.pinned_post.message_id}
              className=" w-full border bg-white border-yellow-400  pinned-post "
              style={{
                width: "inherit",
              }}
              onClick={() =>
                handlePinnedPostClick(page?.result?.pinned_post.message_id)
              }
            >
              <PinnedPost message={page?.result?.pinned_post} />
            </div>
          ) : null
        )}
      <div className="w-full relative ">
        <div
          ref={topRef}
          style={{
            height: "calc(100vh - 190px)",
          }}
          className="flex w-full flex-col  overflow-y-auto custom-scrollbar scroll-smooth   "
        >
          {isRefetching && !messageDataLoading && (
            <div className="absolute top-0 left-0 w-full h-1 z-40">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%] animate-moveLoader"></div>
            </div>
          )}

          {newMessageCount > 0 && (
            <div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 border border-primary text-primary text-xs base-semibold px-4 py-2 rounded-full shadow-lg cursor-pointer z-50"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                messageRefetch();
                setClicked(true);
              }}
            >
              NEW POST{newMessageCount > 1 ? "S" : ""} ({newMessageCount})
            </div>
          )}

          <div className="flex-grow">
            {API_STATUS.SUCCESS === messageStatus &&
              huddleDetails?.result?.status !== "admin_blocked" &&
              isSuccess &&
              messageData?.pages?.map((page: HttpResponse<MessageResponse>) => {
                return page?.result?.messages?.map(
                  (message: HuddleMessage, index: number) => {
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
                            state.postId === message.message_id &&
                            state.replyPost
                          }
                          editUI={
                            state.postId === message.message_id &&
                            state.editPost
                          }
                          // index={index}
                          message={message}
                          // state={state}
                          user_status={huddleDetails?.result?.user_status}
                        />
                      </div>
                    );
                  }
                );
              })}
          </div>
          {API_STATUS.SUCCESS === messageStatus &&
            isSuccess &&
            messageData?.pages[0]?.result?.messages.length === 0 && (
              <EmptyHuddle key={0} />
            )}
          {isError && (
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
          {params?.type === HUDDLES_TABS.SEARCH &&
            huddleDetails?.result?.status !== "admin_blocked" &&
            (huddleDetails?.result?.request_to_join ? (
              <div className="sticky bottom-0 z-50 w-full bg-gray-100 border-t border-gray-300 text-center py-2">
                {(huddleDetails?.result?.user_status === "not_joined" ||
                  huddleDetails?.result?.user_status === "user_declined") && (
                  <div className="flex flex-col gap-1 px-4 ">
                    <p className="text-xs">
                      You can request to join this Huddle
                    </p>
                    <button
                      disabled={requestToJoinPendiing}
                      className="bg-primary text-white px-4 py-2 rounded"
                      onClick={requestToJoinFn}
                    >
                      <span className="uppercase text-sm base-semibold">
                        Request To Join
                      </span>
                    </button>
                  </div>
                )}
                {huddleDetails?.result?.user_status === "requested" && (
                  <div className="flex flex-col gap-1 px-4 ">
                    <p className="text-xs">Your Request has been sent </p>
                    <button
                      value="cancelled"
                      className="bg-primary text-white px-4 py-2 text-sm rounded"
                      onClick={(e) => {
                        handleRequestActions(e, user);
                      }}
                    >
                      <span className="uppercase text-sm base-semibold">
                        Cancel Request
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : huddleDetails?.result?.user_status !== "user_accepted" ? (
              <div className="sticky z-50 bottom-0 w-full bg-gray-100 border-t border-gray-300 text-center py-2">
                <div className="flex flex-col gap-1 px-4 ">
                  <p className="text-xs">You can join this Huddle instantly</p>
                  <button
                    disabled={joinPending}
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={joinHuddleFn}
                  >
                    <span className="uppercase text-sm base-semibold">
                      Join
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            ))}

          {params?.type === HUDDLES_TABS.REQUEST &&
            huddleDetails?.result?.status !== "admin_blocked" && (
              <>
                {huddleDetails?.result?.user_status === "invited" && (
                  <div className="sticky bottom-0 z-50  w-full bg-gray-100 border-t border-gray-300 text-center py-2">
                    <ManageInvitesButton
                      handleActions={handleActions}
                      userId={user || ""}
                    />
                  </div>
                )}

                {huddleDetails?.result?.user_status === "requested" && (
                  <div className="sticky  z-50 bottom-0 w-full bg-gray-100 border-t border-gray-300 text-center py-2">
                    <div className="flex flex-col gap-1 px-4 ">
                      <p className="text-xs">Your Request has been sent </p>
                      <button
                        value="cancelled"
                        className="bg-primary text-white px-4 py-2 text-sm rounded"
                        onClick={(e) => {
                          handleRequestActions(e, user);
                        }}
                      >
                        <span className="uppercase text-sm base-semibold">
                          Cancel Request
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default HuddlePosts;
