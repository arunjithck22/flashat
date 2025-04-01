// import useHuddleInviations from "@hooks/huddles/useHuddleInvitations";
import Image from "next/image";
import React from "react";
// import tick from "@assets/tw/tick.svg";
// import decline from "@assets/tw/decline.svg";
// import block from "@assets/tw/block.svg";
// import { toast } from "react-toastify";

interface ManageInvitesButtonProps {
  handleActions: (
    event: React.MouseEvent<HTMLButtonElement>,
    userId: string
  ) => void;
  userId: string;
}

const ManageInvitesButton = ({
  handleActions,
  userId,
}: ManageInvitesButtonProps) => {
  return (
    <div className="px-3">
      <p className="text-xs w-full  mt-3">
        You have been invited to join this huddle
      </p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={(e) => {
            handleActions(e, userId);
          }}
          value="accept"
          className={`flex gap-2 py-1 justify-center items-center ${
            1 !== 1
              ? " px-4 rounded-lg text-white bg-primaryLight pointer-events-none text-sm font-bold"
              : " px-4 rounded-lg text-white bg-primary text-sm font-bold"
          } `}
        >
          {" "}
          <Image width={18} height={18} src="/tw/tick.svg" alt="" />
          <span>Accept</span>
        </button>
        <button
          onClick={(e) => {
            handleActions(e, userId);
          }}
          value="decline"
          className=" flex gap-2 py-1 justify-center items-center  px-4 rounded-lg   bg-white  text-sm font-bold"
        >
          <Image width={18} height={18} src="/tw/decline.svg" alt="" />
          <span>Decline</span>
        </button>
        <button
          onClick={(e) => {
            handleActions(e, userId);
          }}
          value="block"
          className="flex py-1 gap-2 justify-center items-center   px-4 rounded-lg   bg-white text-sm font-bold"
        >
          <Image width={18} height={18} src="/tw/block.svg" alt="" />
          <span>Later</span>
        </button>
      </div>
    </div>
  );
};

export default ManageInvitesButton;
