/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";
import EditPost from "./EditPost";

const EditPostUI = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  roomId,
  isCurrentUser,
  profile,
  type,
  bg,
  ...message
}: any) => {
  return (
    <>
      <div className="flex w-full justify-between">
        <section className="flex items-center justify-between">
          <figure className="flex items-center gap-4 ">
            <div
              // onClick={() => {
              //   actions.updateCurrentSender(sender);
              //   actions.toggleDrawer(true);
              //   actions.toggleVisibility("cloudIdcard", true);
              // }}
              className="relative"
            >
              {type === "Premium" && (
                <Image
                  src="/tw/post/premium.svg"
                  width={15}
                  height={15}
                  className="absolute -top-1"
                  alt="premium"
                />
              )}
              <Image
                alt="user"
                width={20}
                height={20}
                src={profile || "/icons/user-default.svg"}
                className="w-10 h-10 p-2  rounded-full   bg-gray-300"
              />
            </div>

            <figcaption>
              <p className="base-bold text-lg inline-block ">Edit Post:</p>
              <span
              // className={`fi fi-${country_code?.toLowerCase()} text-xs`}
              ></span>
            </figcaption>
          </figure>
        </section>
      </div>
      <EditPost
        bg={bg}
        {...message}
        isCurrentUser={isCurrentUser}
        roomId={message.huddle_id}
      />
      {/* <ReplyToPost
        bg={bg}
        {...message}
        isCurrentUser={isCurrentUser}
        roomId={message.huddle_id}
      /> */}
      {/* <EditForm /> */}
    </>
  );
};

export default EditPostUI;
