import { Speaker } from "@/types/podiums";
import React from "react";

const CountryFlagHeader = ({ speaker }: { speaker: Speaker }) => {
  return (
    <div className="flex justify-between p-1">
      <span className="text-xs text-white ">Host</span>
      <span
        className={`fi fi-${speaker?.country_code?.toLowerCase()} text-xs`}
      ></span>
    </div>
  );
};

export default CountryFlagHeader;
