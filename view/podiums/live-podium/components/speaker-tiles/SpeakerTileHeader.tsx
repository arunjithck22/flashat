import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import React, { useMemo } from "react";

import CountryFlagHeader from "./CountryFlagHeader";
import { Speaker } from "@/types/podiums";
import { getCitizenShipColors } from "@/utils/citizenshipColors";

const SpeakerTileHeader = ({ speaker }: { speaker: Speaker }) => {
  console.log("speaker tile header", speaker);

  const cn = useMemo(
    () => getCitizenShipColors(speaker?.citizenship || ""),
    [speaker?.citizenship]
  );
  console.log("cn", cn);
  return (
    <div className={`absolute   top-0 left-0 w-full    z-50  `}>
      <div className={`flex justify-between    ${cn} p-0.5`}>
        <span className="text-xs ">
          {capitalizeFirstLetter(speaker?.citizenship)}
        </span>
        <span className="text-xs">{speaker?.coins_received}</span>
      </div>
      <CountryFlagHeader speaker={speaker} />
    </div>
  );
};

export default SpeakerTileHeader;
