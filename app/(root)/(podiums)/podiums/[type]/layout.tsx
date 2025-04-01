import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex w-full h-screen    pt-16   ">{children}</section>
  );
};

export default layout;
