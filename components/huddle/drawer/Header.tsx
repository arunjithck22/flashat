"use client";

import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import Image from "next/image";
import React from "react";

const DrawerHeader = () => {
  const { state, actions } = useHuddleProvider();

  const backToInfo = () => {
    actions.toggleVisibility("huddleInfo", true);
    actions.openFromOutsideOptions(true);
  };
  const closeDrawer = () => {
    actions.resetStates();
  };
  return (
    <div>
      {state.openFromOutsideDrawer ? (
        <Image
          onClick={closeDrawer}
          src="/tw/HuddleInfo/close.svg"
          alt="close-icon"
          width={25}
          height={25}
          className=" top-2 left-0  cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
        />
      ) : (
        <Image
          onClick={backToInfo}
          src="/tw/HuddleInfo/back-arrow.svg"
          alt="close-icon"
          width={25}
          height={25}
          className=" top-2 left-0  cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
        />
        
      )}
    </div>
  );
};

export default DrawerHeader;
