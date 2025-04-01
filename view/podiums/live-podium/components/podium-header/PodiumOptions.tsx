import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useLeavePodium } from "@/app/hooks/podiums/useLeavePodium";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Params } from "@/types";

const PodiumOptions = () => {
  const params: Params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const leavePodiumMutation = useLeavePodium();
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
  const handleLeavePodium = async () => {
    try {
      leavePodiumMutation.mutate(
        {
          data: {},
          podiumId: params?.id?.toString() || "",
        },
        {
          onSuccess: (data) => {
            console.log("Joined podium through backend", data);
            router.push("/podiums");
          },
          onError: (error) => {
            console.error("Error joining podium:", error);
            // setCalling(false);
          },
        }
      );
    } catch (error) {
      console.error("Error handling join podium:", error);
    }
  };
  return (
    <div className="flex  ">
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Image
            alt="kabab menu"
            width={30}
            height={30}
            src="/tw/post/More-info.svg"
            className="hover:cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-black py-2">
          <DropdownMenuLabel
            // onClick={() => handleOnclick(item)}
            className="text-md font-medium cursor-pointer hover:bg-gray-100"
          >
            About Podium
          </DropdownMenuLabel>

          <DropdownMenuLabel
            onClick={handleLeavePodium}
            className="text-md font-medium cursor-pointer hover:bg-gray-100"
          >
            Leave Podium
          </DropdownMenuLabel>

          {/* {type === HUDDLES_TABS.USER_PARTICIPATED &&
        joinedHuddleHeaderOptions.map((item, index) => (
          <DropdownMenuLabel
            key={index}
            onClick={() => handleOnclick(item)}
            className="text-md font-medium cursor-pointer hover:bg-gray-100"
          >
            {item}
          </DropdownMenuLabel>
        ))} */}
          {/* {type === HUDDLES_TABS.SEARCH &&
        othersHuddleHeaderOptions.map((item, index) => (
          <DropdownMenuLabel
            key={index}
            onClick={() => handleOnclick(item)}
            className="text-md font-medium cursor-pointer hover:bg-gray-100"
          >
            {item}
          </DropdownMenuLabel>
        ))} */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PodiumOptions;
