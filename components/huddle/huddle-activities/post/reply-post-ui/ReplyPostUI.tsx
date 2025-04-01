/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import ReplyForm from "./ReplyForm";
import ReplyToPost from "./ReplyToPost";

const ReplyPostUI = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  roomId,
  isCurrentUser,
  profile,
  type,
  bg,
  message_id,
  ...message
}: {
  roomId: string;
  isCurrentUser: boolean;
  profile: string;
  type: string;
  bg: string;
  message_id: string;
}) => {
  console.log("reply_to_id1", message_id);
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
              <p className="base-bold text-md inline-block ">Reply to:</p>
              <span
              // className={`fi fi-${country_code?.toLowerCase()} text-xs`}
              ></span>
            </figcaption>
          </figure>
        </section>
      </div>
      <ReplyToPost
        bg={bg}
        {...message}
        isCurrentUser={isCurrentUser}
        // roomId={message?.huddle_id}
      />
      <ReplyForm bg={bg} messageId={message_id} {...message} />
    </>
  );
};

export default ReplyPostUI;
