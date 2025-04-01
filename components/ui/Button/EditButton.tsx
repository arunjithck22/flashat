import React from "react";
import { Icons } from "@/components/ui/icons/icons";

interface EditButtonProps {
  onClick?: () => void;
  className?: string;
  title?: string;
}

const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  className = "",
  title = "Edit",
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-[1px] border-2 border-darkGray rounded-md  transition ${className}`}
      title={title}
    >
      <Icons.EditOutLine className="w-7 h-7 text-darkGray" />
    </button>
  );
};

export default EditButton;
