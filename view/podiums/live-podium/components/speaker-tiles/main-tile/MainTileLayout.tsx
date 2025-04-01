import React from "react";
import MainTile from "./MainTile";
import { Speaker } from "@/types/podiums";

interface MaintileLayoutProps {
  speakerList: Speaker[]; // Replace `any` with a proper type if possible
  cameraOn: boolean;
  setCamera: React.Dispatch<React.SetStateAction<boolean>>;
  micOn: boolean;
  setMic: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainTileLayout: React.FC<MaintileLayoutProps> = ({
  speakerList,
  cameraOn,
  setCamera,
  micOn,
  setMic,
}) => {
  console.log("main speaker list", speakerList);
  return (
    <div className="w-full h-full flex flex-col items-center justify-between bg-gray-100">
      {speakerList?.map((speaker: Speaker) => (
        <MainTile
          key={speaker.id}
          speaker={speaker}
          cameraOn={cameraOn}
          setCamera={setCamera}
          micOn={micOn}
          setMic={setMic}
        />
      ))}
    </div>
  );
};

export default MainTileLayout;
