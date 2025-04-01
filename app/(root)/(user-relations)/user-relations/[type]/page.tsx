import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Image
        width={80}
        height={80}
        alt="official logo"
        src="/logo/flashat-logo.png"
      />
    </div>
  );
};

export default page;
