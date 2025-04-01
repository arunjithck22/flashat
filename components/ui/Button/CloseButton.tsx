import React from "react";
import { Icons } from "../icons/icons";
interface CloseButtonProps {
  onClick: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-Golden rounded-md w-5 h-5 md:w-5 md:h-5 flex justify-center items-center cursor-pointer"
    >
      <Icons.Close className="text-lg" />
    </div>
  );
};

export default CloseButton;
