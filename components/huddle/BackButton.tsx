"use client";
import { useWindowWidth } from "@/app/hooks/useWindowWidth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BackButton = ({ path }: { path: string }) => {
  const width = useWindowWidth();
  return (
    <>
      {width && width < 768 ? (
        <Link href={path}>
          <Image
            src="/tw/HuddleInfo/back-arrow.svg"
            alt="back-arrow"
            width={25}
            height={25}
          />
        </Link>
      ) : null}
    </>
  );
};

export default BackButton;
