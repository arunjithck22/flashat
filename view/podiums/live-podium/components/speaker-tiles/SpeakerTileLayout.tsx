import { PODIUM_EVENTS } from "@/constants/events";

import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
// import { useClientEvent, useRTCClient } from "agora-rtc-react";
import React, { useEffect } from "react";
import MainTileLayout from "./main-tile/MainTileLayout";
import SubtileLayout from "./sub-tiles/SubtileLayout";
import {
  RemoveWLSocketPayload,
  SinglePodium,
  Speaker,
  SyncEventData,
  WaitList,
} from "@/types/podiums";
import { HttpResponse } from "@/types";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";

const SpeakerTileLayout = ({
  podiumData,
  micOn,
  setMic,
  cameraOn,
  setCamera,
}: {
  podiumData: SinglePodium | undefined;
  micOn: boolean;
  cameraOn: boolean;
  setMic: React.Dispatch<React.SetStateAction<boolean>>;
  setCamera: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const client = useRTCClient();
  const { speakerList } = usePodiumContext();

  return (
    <div className=" w-full h-auto  grid grid-cols-2 lg:grid-cols-3 grid-rows-1 h-full  ">
      <div className="col-span-1 lg:col-span-2 h-auto row-span-1  bg-white">
        <MainTileLayout
          speakerList={speakerList?.filter(
            (speaker) => speaker.add_to_main_screen
          )}
          micOn={micOn}
          setMic={setMic}
          cameraOn={cameraOn}
          setCamera={setCamera}
        />
      </div>
      <div className="col-span-1 h-auto row-span-1 ">
        <SubtileLayout
          speakerList={speakerList?.filter(
            (speaker) => !speaker.add_to_main_screen
          )}
          micOn={micOn}
          setMic={setMic}
          cameraOn={cameraOn}
          setCamera={setCamera}
        />
      </div>
    </div>
  );
};

export default SpeakerTileLayout;
