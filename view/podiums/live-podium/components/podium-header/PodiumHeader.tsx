"use client";

import { PODIUM_EVENTS } from "@/constants/events";
import { PODIUM_ROLES } from "@/constants/podiums/constants";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExitPodiumButton from "./ExitPodiumButton";

import PodiumTimer from "./PodiumTimer";

import { Admin, SinglePodium, SyncEventData } from "@/types/podiums";
import { HttpResponse } from "@/types";
import SettingsWheel from "./components/settings-wheel/SettingsWheel";

const PodiumHeader = ({
  podiumData,
}: {
  podiumData: SinglePodium | undefined;
}) => {
  const [likes, setLikes] = useState(podiumData?.likes || 0);
  const [onlineCount, setOnlineCount] = useState(0);
  const [managerAdminsList, setManagerAdminsList] = useState<Admin[]>([]);

  const router = useRouter();
  const params = useParams();

  const { socket } = usePodiumSocket();

  const handleSyncEvent = async (payload: SyncEventData) => {
    setLikes(payload?.likes);
    setOnlineCount(payload?.live_users);
    setManagerAdminsList(payload?.admin_list);
  };

  console.log("rolesss", managerAdminsList);
  const handleCloseEvent = async () => {
    console.log("12121212121");
    router.push("/podiums/live-podiums");
  };

  const handleLikeEvent = () => {
    setLikes((prev: number) => prev + 1);
  };

  useEffect(() => {
    if (socket) {
      socket.on(PODIUM_EVENTS.SYNC, handleSyncEvent);
      socket.on(PODIUM_EVENTS.CLOSE, handleCloseEvent);
      socket.on(PODIUM_EVENTS.LIKE, handleLikeEvent);

      // Clean up the socket event listener
      return () => {
        socket.off(PODIUM_EVENTS.SYNC, handleSyncEvent);
        socket.off(PODIUM_EVENTS.CLOSE, handleCloseEvent);
        socket.off(PODIUM_EVENTS.LIKE, handleLikeEvent);
      };
    }
  }, [socket]);
  console.log("podium data2121", podiumData);

  return (
    <div className=" w-full  bg-primary">
      <header className="flex  justify-between items-center p-4  border-bgray border-b-2">
        <div className="flex gap-3 justify-center items-center">
          <figure className="flex">
            <SettingsWheel
              profile_pic={
                podiumData?.profile_pic ||
                podiumData?.manager_profile_thumbnail ||
                "/podiums/default.svg"
              }
              role={podiumData?.role || ""}
            />

            <figcaption className="flex flex-col justify-between">
              <div className="font-bold text-white">{podiumData?.name}</div>
              <div className="flex justify-center items-center gap-1">
                {/* <PodiumTimer startTime={podiumData?.updated} /> */}
                <span
                  style={{
                    backgroundColor: "rgba(243, 244, 246, 0.5)", // Transparent background (gray-100 with opacity)
                  }}
                  className="bg-gray-100  rounded flex justify-center items-center px-2 py-0.5  gap-1"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span
                    className=" flex justify-center items-center text-white font-semibold  "
                    style={{
                      fontSize: "11px",
                    }}
                  >
                    {onlineCount}
                  </span>
                </span>
                <span
                  className="rounded flex justify-center items-center px-2 py-0.5 gap-1"
                  style={{
                    backgroundColor: "rgba(243, 244, 246, 0.5)",
                  }}
                >
                  <Image
                    alt="kabab menu"
                    width={10}
                    height={10}
                    src="/podiums/white-like.svg"
                    className="hover:cursor-pointer bg-center"
                  />
                  <span
                    className="flex text-white font-semibold justify-center items-center"
                    style={{
                      fontSize: "11px",
                      opacity: 1,
                    }}
                  >
                    {likes}
                  </span>
                </span>
              </div>
            </figcaption>
          </figure>
        </div>
        {/* <ExitPodiumButton
          podiumId={params?.id?.toString() || ""}
          canEndPodium={
            (podiumData?.role === PODIUM_ROLES?.MANAGER ||
              podiumData?.role === PODIUM_ROLES?.ADMIN) &&
            managerAdminsList?.length <= 1
          }
        /> */}
      </header>
    </div>
  );
};

export default PodiumHeader;
