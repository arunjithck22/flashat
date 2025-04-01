import Image from "next/image";
import React from "react";

const ProfilePic = () => {
  return (
    <>
      <Image
        src="/tw/huddle-premium.svg"
        width={20}
        height={20}
        alt="crown"
        className="absolute -top-2 right-3 "
      />
    </>
  );
};

export default ProfilePic;
