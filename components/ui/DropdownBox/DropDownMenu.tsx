import { KababOptionsInterface } from "@/types";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../dropdown-menu";

const DropDownMenuBox = ({
  trigger,
  items,
}: {
  trigger: React.ReactNode;
  items: KababOptionsInterface[] | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute z-max left-0 bg-white text-black py-2 shadow-lg border rounded-md w-48 z-50">
        {/* <DropdownMenuLabel className="text-md font-medium cursor-pointer hover:bg-gray-100 px-4 py-2">
      Admins and Requests
    </DropdownMenuLabel>

    <DropdownMenuLabel className="text-md font-medium cursor-pointer hover:bg-gray-100 px-4 py-2">
      Restricted Users
    </DropdownMenuLabel> */}
        {items?.map((item: KababOptionsInterface) => {
          return (
            <DropdownMenuLabel
              key={item.id}
              onClick={item.onClick}
              className="cursor-pointer"
            >
              {item.label}
            </DropdownMenuLabel>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenuBox;
