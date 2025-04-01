"use client";
import React, { useEffect } from "react";
import PodiumScreenLayout from "./components/PodiumScreenLayout";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { PodiumContextProvider } from "@/contexts/podium/PodiumContext";
import { ActiveSpeakerProvider } from "@/contexts/podium/ActiveSpeakerProvider";
import { TrackProvider } from "@/contexts/podium/TrackProvider";
import { SyncEventProvider } from "@/contexts/podium/SyncEventContext";

const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const LivePodium = () => {
  return (
    <AgoraRTCProvider client={client}>
      <ActiveSpeakerProvider client={client}>
        <SyncEventProvider>
          <PodiumContextProvider>
            <TrackProvider>
              <div className="w-full  ">
                <PodiumScreenLayout client={client} />
              </div>
            </TrackProvider>
          </PodiumContextProvider>
        </SyncEventProvider>
      </ActiveSpeakerProvider>
    </AgoraRTCProvider>
  );
};

export default LivePodium;
