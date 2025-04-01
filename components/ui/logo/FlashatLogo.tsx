"use client";
import Image from "next/image";
import React from "react";

const FlashatLogo = () => {
  const handleRedirect = () => {
    const externalUrl = "https://flashat.com/en-US"; // Replace with the desired URL
    window.open(externalUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <div>
      {" "}
      <Image
        onClick={handleRedirect}
        src="/icons/official-logo.svg"
        width={90}
        height={90}
        alt="official-logo"
        priority={true}
      />
    </div>
  );
};

export default FlashatLogo;
