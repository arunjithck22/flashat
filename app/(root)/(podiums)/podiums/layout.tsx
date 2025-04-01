import { PodiumSocketProvider } from "@/contexts/PodiumSocketContext";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PodiumSocketProvider>
        <div className="w-full ">{children}</div>;
      </PodiumSocketProvider>
    </>
  );
};

export default layout;
