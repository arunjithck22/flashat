import { useSocketEvents } from "@/app/hooks/sockets/useSocketEvents";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import { Speaker } from "@/types/podiums";
import Image from "next/image";
import React, { useEffect } from "react";

const SpeakerTileFooter = ({ speaker }: { speaker: Speaker }) => {
  const { socket } = usePodiumSocket();
  const { speakerList, setSpeakerList } = usePodiumContext();
  const { eventData } = useSocketEvents(socket, ["mute", "unmute"]);

  console.log("event data", eventData?.mute);
  // const handleSpeakerList = async (payload: Speaker) => {
  //   console.log("speaker list", payload);
  //   setSpeakerList((prev: Speaker[]) => {
  //     if (prev.some((item) => item.id === payload.id)) {
  //       return prev;
  //     }
  //     return [...prev, payload];
  //   });
  //   setWaitingList((prev: WaitList[]) =>
  //     prev.filter((item) => item.id !== payload?.id)
  //   );
  // };

  useEffect(() => {
    if (eventData?.mute) {
      setSpeakerList((prev: Speaker[]) => {
        return prev.some((item) => item.id === eventData.mute!.id)
          ? prev.map((item) =>
              item.id === eventData.mute!.id ? eventData.mute! : item
            ) // Replace the existing object
          : [...prev, eventData.mute!]; // Add new object if not found
      });
    }
  }, [socket, eventData]);
  useEffect(() => {
    if (eventData?.unmute) {
      setSpeakerList((prev: Speaker[]) => {
        return prev.some((item) => item.id === eventData.unmute!.id)
          ? prev.map((item) =>
              item.id === eventData.unmute!.id ? eventData.unmute! : item
            ) // Replace the existing object
          : [...prev, eventData.unmute!]; // Add new object if not found
      });
    }
  }, [socket, eventData]);

  return (
    <div className="absolute flex justify-between bottom-0 left-0 w-full  bg-gradient-to-t from-[#] to-[rgba(255,255,255,0)] z-50 text-white p-2">
      <span className="text-white">{speaker?.name}</span>
      <span className="">
        <Image
          src={speaker?.mute ? "/podiums/muted.svg" : "/podiums/unmuted.svg"}
          alt="empty"
          width={20}
          height={20}
        />
      </span>
    </div>
  );
};

export default SpeakerTileFooter;
