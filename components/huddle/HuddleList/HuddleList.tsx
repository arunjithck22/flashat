// app/components/HuddleList/HuddleList.tsx
"use client";
import React, { Fragment, useEffect, useState } from "react";
import HuddleItem from "../HuddleItem/HuddleItem";
import HuddleSkelton from "../HuddleSkelton";

import { useInView } from "react-intersection-observer";
import CreateNewButton from "./NewButton";
import { API_STATUS, HUDDLES_TABS } from "@/common/constant";
import {
  HuddleResponse,
  KEY_HUDDLES_QUERY,
  useHuddles,
} from "@/app/hooks/huddles/useHuddles";

import { useSocket } from "@/contexts/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { HUDDLE_EVENTS } from "@/constants/events";

import { useAuth } from "@/contexts/AuthContext";
import { HttpResponse, SocketEvent } from "@/types";
import { HuddlePublicChatData, Huddles, RequestsInvitesHuddles } from "@/types/huddles/index";

interface HuddleListProps {
  type: string;
}

const HuddleList: React.FC<HuddleListProps> = ({ type }) => {
  const [premiumOffset, setPremiumOffset] = useState(50);
  // const [message, setMessage] = useState("");
  const [freeOffset, setFreeOffset] = useState(0);
  const [huddleList, setHuddleList] = useState<
    RequestsInvitesHuddles[] | Huddles[]
  >([]);
  const [dynamicHeight, setDynamicHeight] = useState("calc(100vh - 150px)");
  const { isAuthenticated } = useAuth();

  const {
    status,
    data: huddles,

    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useHuddles(type, premiumOffset, freeOffset);

  useEffect(() => {
    if (huddles?.pages && huddles.pages.length > 0) {
      // Update offsets
      const latestPage = huddles.pages[huddles.pages.length - 1];
      setPremiumOffset(latestPage?.result?.premium_offset || 0);
      setFreeOffset(latestPage?.result?.free_offset || 0);

      // Flatten huddles from all pages and set to huddleList
    }
  }, [huddles]);

  console.log("public huddles", huddles);

  useEffect(() => {
    if (type === HUDDLES_TABS.REQUEST) {
      setDynamicHeight("calc(100vh - 150px)");
    } else if (
      type === HUDDLES_TABS.USER_PARTICIPATED ||
      type === HUDDLES_TABS.SEARCH
    ) {
      setDynamicHeight("calc(100vh - 210px)");
    } else if (type === HUDDLES_TABS.PUBLIC) {
      setDynamicHeight("calc(100vh - 100px)");
    } else {
      setDynamicHeight("calc(100vh - 170px)");
    }
  }, [type]);

  useEffect(() => {
    if (type !== HUDDLES_TABS.REQUEST && huddles?.pages) {
      const flattenedHuddles = huddles.pages.flatMap(
        (page: HttpResponse<HuddleResponse>) => page?.result?.huddles || []
      );
      setHuddleList(flattenedHuddles);
    }
    if (type === HUDDLES_TABS.REQUEST && huddles?.pages) {
      const flattenedHuddles = huddles.pages.flatMap(
        (page: HttpResponse<HuddleResponse>) =>
          page?.result.huddle_participant || []
      );

      console.log("flattened huddles", flattenedHuddles);
      setHuddleList(flattenedHuddles);
    }
  }, [huddles, type]);
  console.log("huddle-list", huddleList);

  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const { socket } = useSocket();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (socket) {
      const handleMessageEvent = async (
        payload: SocketEvent<HuddlePublicChatData>
      ) => {
        console.log("payload in message socket", payload);
        if (payload.eventName === HUDDLE_EVENTS.HUDDLE_PUBIC_CHAT) {
          console.log("payload", payload?.data);
          // Extract huddle details from the payload
          const id = payload?.data?.huddle_id;

          setHuddleList((prevHuddleList) => {
            const existingIndex = prevHuddleList.findIndex(
              (huddle: Huddles | RequestsInvitesHuddles) =>
                huddle?.id?.toString() === id?.toString()
            );

            const updatedList = [...prevHuddleList];

            if (existingIndex !== -1) {
              // If the huddle exists, remove it from its current position
              const [existingHuddle] = updatedList?.splice(existingIndex, 1);
              console.log("existing", existingHuddle);

              const updatedHuddle = {
                ...existingHuddle, // retain other existing properties
                last_message: {
                  ...existingHuddle?.last_message,
                  message: payload?.data.message,
                  sent: payload?.data?.sent, // Update the last message
                },
              };

              updatedList?.splice(0, 0, updatedHuddle);
            }
            // else {
            //   // If no match, create a new huddle and add it to the top
            //   const newHuddle = {
            //     id: payload.data.huddle_id,
            //     lastMessage: payload.data.message,
            //     name: payload.data.name,
            //     time_updated: new Date().toISOString(),
            //     ...payload.data, // Include other relevant fields
            //   };

            //   updatedList = [newHuddle, ...updatedList];
            // }
            console.log("query type", type);

            return updatedList as RequestsInvitesHuddles[] | Huddles[];
          });
          await queryClient.invalidateQueries({
            queryKey: [KEY_HUDDLES_QUERY, type],
          });
        }
      };

      // Listen for the "message" event
      socket.on("message", handleMessageEvent);

      // Clean up the socket event listener
      return () => {
        socket.off("message", handleMessageEvent);
      };
    }
  }, [socket]);

  return (
    <div className="relative">
      <section
        style={{
          height: dynamicHeight,
        }}
        className={`overflow-y-auto custom-scrollbar   w-full flex flex-col 
          
        `}
      >
        {status === API_STATUS.SUCCESS &&
          huddleList?.length > 0 &&
          huddleList
            ?.filter((huddle: Huddles | RequestsInvitesHuddles) => {
              // Exclude 'tribe' huddles if the user is not authenticated
              if (!isAuthenticated && huddle.tribe) {
                return false;
              }
              return true;
            })
            .map((huddle: Huddles | RequestsInvitesHuddles, index: number) => (
              <HuddleItem
                name={huddle?.name}
                total_members={huddle.total_members}
                online_participants={huddle.online_participants}
                key={`${huddle.id}-${type}-${index}`}
                id={huddle?.id}
                userId={huddle?.sender_details?.user_id}
                sender={huddle?.sender_details?.name}
                type={type}
                about={huddle.about}
                message={huddle.last_message?.message || ""}
                user_status={huddle.user_status}
                tribe={huddle.tribe}
              />
            ))}

        {hasNextPage && !isFetching && !isError && (
          <div ref={ref}>
            <HuddleSkelton />
            <HuddleSkelton />
          </div>
        )}

        {isFetching && (
          <>
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
          </>
        )}
      </section>
      {type === HUDDLES_TABS.USER_MANAGED && <CreateNewButton />}
    </div>
  );
};

export default HuddleList;
