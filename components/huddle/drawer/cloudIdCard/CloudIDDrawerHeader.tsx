"use client";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import Image from "next/image";
import React from "react";

const CloudIDDrawerHeader = () => {
  const { actions } = useHuddleProvider();
  return (
    <header className="w-full h-[81px] border-bgray border-b px-3">
      <section className="flex justify-between items-center h-full">
        <h1 className="base-semibold text-lg mt-10  whitespace-nowrap">
          Cloud Identity Card
        </h1>
        <Image
          src="/tw/HuddleInfo/close.svg"
          className="mt-10 cursor-pointer"
          onClick={() => {
            actions.toggleDrawer(false);
            actions.toggleVisibility("cloudIdcard", false);
          }}
          width={25}
          height={25}
          alt="close-icon"
        />
      </section>
    </header>
  );
};

export default CloudIDDrawerHeader;
