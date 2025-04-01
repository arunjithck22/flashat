"use client";
import RightDrawer from "@/components/huddle/drawer/RightDrawer";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import React from "react";

const HuddleActivityWrapper = ({ children }: { children: React.ReactNode }) => {
  const { state: huddleState } = useHuddleProvider();
  return (
    <section className="flex flex-col  relative w-full h-screen border pl-1 ">
      {huddleState?.drawerOpen && <RightDrawer />}
      {children}
    </section>
  );
};

export default HuddleActivityWrapper;
