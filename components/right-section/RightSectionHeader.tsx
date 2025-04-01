import React from "react";

const RightSectionHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full  bg-white">
      <header className="flex  justify-between items-center p-4  border-bgray border-b-2">
        {children}
      </header>
    </div>
  );
};

export default RightSectionHeader;
