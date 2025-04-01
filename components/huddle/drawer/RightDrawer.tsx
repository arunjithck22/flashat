"use client";
import React, { useRef } from "react";

import HuddleInfo from "./HuddleInfo";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import Particpants from "./participants/Partcipants";
import ManageReqInv from "./manage-req-invites/ManageReqInv";
import MessagesComments from "./reported-msg-cmnt/MessagesComments";
import PostDetails from "./CommentSection/PostDetails";
import CloudIDCard from "./cloudIdCard/CloudIDCard";

const RightDrawer: React.FC = () => {
  const { state } = useHuddleProvider();
  const drawerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={drawerRef} // Attach the ref to the drawer element
      className={`absolute bg-white top-0 rtl:left-0 ltr:right-0 h-full max-w-md sm:max-w-md w-full shadow-xl  transform transition-transform duration-300 ${
        state.drawerOpen ? "" : "translate-x-full"
      }`}
      style={{ zIndex: 50 }}
    >
      {/* Close button inside drawer */}
      <div className="w-full relative p-2 flex flex-col gap-2">
        {state.visibility.huddleInfo && <HuddleInfo />}
        {state.visibility.participants && <Particpants />}
        {state.visibility.reqInvites && <ManageReqInv />}
        {state.visibility.reported && <MessagesComments />}
        {state.visibility.commentsListing && state.postId && (
          <PostDetails postId={state.postId} />
        )}
        {state.visibility.cloudIdcard && (
          <CloudIDCard sender={state.currentSender} />
        )}
      </div>
    </div>
  );
};

export default RightDrawer;
