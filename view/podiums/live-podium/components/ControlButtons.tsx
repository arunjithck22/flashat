import Image from "next/image";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ControlButtons = ({ image, onClick, hidden, disabled }: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rouned-full p-2 w-12 h-12 flex justify-center items-center bg-yellow-500 rounded-full ${
        hidden && "hidden"
      }`}
    >
      <Image src={image} width={20} height={20} alt="controls" />
    </button>
  );
};

export default ControlButtons;
