
import { SinglePodium } from "@/types/podiums";
import React from "react";
import CommentWLLayout from "../../live-comment-wl-section/CommentWLLayout";
import SpeakerTileLayout from "../../speaker-tiles/SpeakerTileLayout";
import PodiumScreenFooter from "./PodiumScreenFooter";

const LecturePodiumScreen = ({
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
  return (
    <>
      <div className="w-full h-auto lg:h-[60%] xl:h-[60%] 2xl:h-[65%]  relative grid lg:grid-cols-6 grid-rows-2 lg:grid-rows-1 grid-rows-6 ">
        {/* Left Section (SpeakerTileLayout) */}
        <div className=" h-auto col-span-3 lg:col-span-4 lg:row-span-1 row-span-3">
          <SpeakerTileLayout
            podiumData={podiumData}
            micOn={micOn}
            setMic={setMic}
            cameraOn={cameraOn}
            setCamera={setCamera}
          />
        </div>

        {/* Right Section (CommentWLLayout) */}
        <div className=" h-auto  col-span-3 lg:col-span-2 lg:row-span-1 row-span-3 bg-gray-100">
          <CommentWLLayout podiumData={podiumData} />
        </div>
      </div>
      <div className="w-full py-8 ">
        <PodiumScreenFooter
          podiumData={podiumData}
          micOn={micOn}
          cameraOn={cameraOn}
          setMic={setMic}
          setCamera={setCamera}
        />
      </div>
    </>
  );
};

export default LecturePodiumScreen;
