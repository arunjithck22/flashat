import React from "react";
import SingleSubTile from "./SingleSubTile";
import { Speaker } from "@/types/podiums";

// Define the props type for SubtileLayout
interface SubtileLayoutProps {
  speakerList: Speaker[]; // Replace `any` with a proper type if possible
  cameraOn?: boolean;
  setCamera?: React.Dispatch<React.SetStateAction<boolean>>;
  micOn?: boolean;
  setMic?: React.Dispatch<React.SetStateAction<boolean>>;
}
const SubtileLayout: React.FC<SubtileLayoutProps> = ({
  speakerList,
  cameraOn,
  setCamera,
  micOn,
  setMic,
}) => {
  const totalTiles = 8;

  console.log("speakerList", speakerList);

  // Fill the remaining tiles to make a total of 8
  const filledTiles =
    speakerList?.length < totalTiles
      ? speakerList.concat(
          new Array(totalTiles - speakerList.length).fill(null)
        )
      : speakerList;
  console.log("filled tiles", filledTiles);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar-hidden ">
      <div className="grid grid-cols-2 bg-gray-200 ">
        {filledTiles.map((speaker: Speaker, index: number) => (
          <div
            key={index}
            className={`relative h-full   ${
              index % 2 === 0 ? "border-r " : ""
            } ${
              Math.floor(index / 2) < Math.ceil(filledTiles.length / 2) - 1
                ? "border-b"
                : ""
            } border-white`}
          >
            <SingleSubTile
              speaker={speaker}
              cameraOn={cameraOn}
              setCamera={setCamera}
              micOn={micOn}
              setMic={setMic}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtileLayout;
