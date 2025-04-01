import { KababOptionsInterface } from "@/types";
import Image from "next/image";
import React from "react";
import DropDownMenuBox from "../ui/DropdownBox/DropDownMenu";
import Images from "../ui/Images/Images";

const UserListItem = ({
  name,
  kababOption = false,
  className,
  tag,
  kababOptions,
  button,
  buttonItem,
  profile_pic,
  is_premium,
}: {
  name: string;
  kababOption?: boolean;
  className?: string;
  tag?: React.ReactNode;
  kababOptions?: KababOptionsInterface[];
  button?: boolean;
  buttonItem?: React.ReactNode;
  profile_pic?: string | null;
  is_premium?: boolean;
}) => {
  return (
    <div
      className={`flex w-full justify-between items-center  px-3 ${className} `}
    >
      <div className="flex gap-2 items-center">
        <div className="relative w-10 h-10 w-full rounded-full">
          <Images
            src={profile_pic || "/icons/default-profile.png"}
            alt="default"
            width={40}
            height={40}
            rounded={true}
            className="rounded-full bg-cover"
          />
          {is_premium && (
            <Images
              src={"/tw/post/premium.svg"}
              alt="default"
              width={15}
              height={15}
              rounded={true}
              className="rounded-full bg-cover absolute -top-1 -left-1"
            />
          )}
        </div>
        <span>{name}</span>
        {tag && tag}
      </div>
      {kababOption && (
        <span>
          <DropDownMenuBox
            trigger={
              <Image
                alt="kabab menu"
                width={30}
                height={30}
                src="/tw/post/More-info.svg"
                className="hover:cursor-pointer"
              />
            }
            items={kababOptions}
          />
        </span>
      )}
      {button && (
        <div className="flex  pb-4 px-2 justify-center items-center">
          {buttonItem}
        </div>
      )}
    </div>
  );
};

export default UserListItem;
