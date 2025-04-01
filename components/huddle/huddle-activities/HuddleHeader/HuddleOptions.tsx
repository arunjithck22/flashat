"use client";
import { HUDDLES_TABS } from "@/common/constant";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  adminHuddleHeaderOptions,
  
  myHuddleHeaderOptions,
  HUDDLE_HEADER_OPTIONS,
  
} from "@/constants";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";

const HuddleOptions = ({ huddleId, type }: { huddleId: string; type: string }) => {
  const t: TranslationFunction = useTranslations("huddles");
  const pathname = usePathname();
  const { actions } = useHuddleProvider();
  const [isOpen, setIsOpen] = useState(false);
  const showCreatePostIcon =
    pathname.includes(HUDDLES_TABS.USER_MANAGED) ||
    pathname.includes(HUDDLES_TABS.ADMIN) ||
    pathname.includes(HUDDLES_TABS.USER_PARTICIPATED);

  useEffect(() => {
    actions.updateCurrentHuddle(huddleId);
  }, [huddleId]);
  const handleOnclick = (item: string) => {
    if (item === HUDDLE_HEADER_OPTIONS.REQUESTS_AND_INVITES) {
      actions.toggleDrawer(true);
      actions.toggleVisibility("reqInvites", true);
      actions.openFromOutsideOptions(true);
    }
    setIsOpen(false);
  };

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
    <div className="flex  ">
      {showCreatePostIcon && <CreatePost id={huddleId} type={type} />}
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger
          disabled={
            type === HUDDLES_TABS.USER_PARTICIPATED ||
            type === HUDDLES_TABS.SEARCH
          }
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
          {type === HUDDLES_TABS.USER_MANAGED &&
            myHuddleHeaderOptions.map((item, index) => (
              <DropdownMenuLabel
                key={index}
                onClick={() => handleOnclick(item)}
                className="text-md font-medium cursor-pointer hover:bg-gray-100"
              >
                {t(item)}
              </DropdownMenuLabel>
            ))}
          {type === HUDDLES_TABS.ADMIN &&
            adminHuddleHeaderOptions.map((item, index) => (
              <DropdownMenuLabel
                key={index}
                onClick={() => handleOnclick(item)}
                className="text-md font-medium cursor-pointer hover:bg-gray-100"
              >
                {t(item)}
              </DropdownMenuLabel>
            ))}
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

export default HuddleOptions;
