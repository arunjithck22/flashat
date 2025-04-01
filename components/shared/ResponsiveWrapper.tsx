"use client";

import React from "react";

import { usePathname } from "next/navigation";
import { useWindowWidth } from "@/app/hooks/useWindowWidth";

const ResponsiveWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const width = useWindowWidth();
  console.log("pathname", pathname);
  const slashes = pathname.match(/\//g); // Find all slashes

  // Join the slashes into a single string or fallback to an empty string if none found
  const slashesString = slashes ? slashes.join("") : "";

  return (
    <>
      {width && width > 768 ? (
        <section className="flex w-full h-screen   flex-1 pt-24   ">
          {children}
        </section>
      ) : (
        <section
          data-path={slashesString}
          className="flex w-full flex-col h-screen   pt-24  "
        >
          {children}
        </section>
      )}
    </>
  );
};

export default ResponsiveWrapper;
