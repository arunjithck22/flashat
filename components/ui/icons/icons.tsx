import React from "react";
import { MdDone, MdClose, MdEdit } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCrown, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineEdit } from "react-icons/md";
import { CgMoreVertical } from "react-icons/cg";


interface IconProps {
  size?: number;
  className?: string;
}

const createIcon = (IconComponent: React.ComponentType<IconProps>, defaultStyles: IconProps) => {
  const WrappedIcon = ({ size = defaultStyles.size, className = defaultStyles.className }: IconProps) => (
    <IconComponent size={size} className={className} />
  );
  WrappedIcon.displayName = `Icon(${IconComponent.displayName || IconComponent.name || "Component"})`;

  return WrappedIcon;
};

export const Icons = {
  Done: createIcon(MdDone, { size: 20, className: "text-green-500" }),
  Close: createIcon(MdClose, { size: 15, className: "text-red-500" }),
  Eye: createIcon(AiOutlineEye, { size: 20, className: "text-gray-500" }),
  EyeOff: createIcon(AiOutlineEyeInvisible, { size: 20, className: "text-gray-500" }),
  Edit: createIcon(MdEdit, { size: 18, className: "text-tsecond" }),
  EditOutLine: createIcon(MdOutlineEdit, { size: 18, className: "" }),
  Premium: createIcon(FaCrown, { size: 12, className: "text-white" }),
  User: createIcon(FaUser, { size: 20, className: "text-tsecond" }),
  Menu: createIcon(IoMenu, { size: 30, className: "text-tsecond" }),
  Settings: createIcon(IoMdSettings, { size: 22, className: "text-Golden" }),
  Camera: createIcon(FaCamera, { size: 22, className: "text-tsecond" }),
  NoImage:createIcon(MdImageNotSupported, { size: 22, className: "text-tsecond" }),
  Users:createIcon(HiUserGroup, { size: 22, className: "text-tsecond" }),
  MoreVertical:createIcon(CgMoreVertical, { size: 22, className: "text-tsecond" })
};
