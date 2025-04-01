"use client";
import classnames from "classnames";
import { TextMessage } from "./TextMessage";
import { Message } from "./Message";
import { MediaImage } from "./Image";
// import { Video } from "./Video";
import { MessageFooter } from "./MessageFooter";
import { Sender } from "./Sender";
import { Reply } from "./Reply";

import { Banner } from "./Banner";
import Audio from "./Audio";
import { Video } from "./Video";
import { MEDIA_TYPES } from "@/common/constant";
import { useAuth } from "@/contexts/AuthContext";

import Badge from "./Badge";
import KababOptions from "../huddle-post-options/KababOptions";

import ReplyPostUI from "./reply-post-ui/ReplyPostUI";
import EditPostUI from "./edit-post-ui/EditPostUI";
import { HuddleMessage } from "@/types/huddles";

export const HuddlePost = ({
  replyUI,

  user_status,
  editUI,
  message,
}: {
  replyUI: boolean;
  user_status: string | undefined;
  editUI: boolean;
  message: HuddleMessage;
}) => {
  const { user, profile, type } = useAuth();

  console.log("kabab1", message);

  const isCurrentUser = user?.toString() == message?.sender?.toString();

  const cn = classnames({
    "bg-postYellow": message.sender_details?.is_premium && !isCurrentUser,
    "bg-postPink": message.sender_details?.is_premium && isCurrentUser,
    "bg-postGrey": !message.sender_details?.is_premium,
  });

  return (
    <article className={`m-1 border-bgray border rounded relative  ${cn}`}>
      <Banner
        role={message.sender_details?.role}
        citizenship={message.sender_details?.user_citizenship}
      />

      {!replyUI && !editUI ? (
        <div className="p-4">
          <div className="flex w-full justify-between">
            <Sender
              // {...message.sender_details}
              thumbnail_url={message?.sender_details?.thumbnail_url}
              isCurrentUser={isCurrentUser}
              broadcastType={message.sender_broadcastType}
              sender={message.sender}
              user_status={user_status}
              name={message?.sender_details?.name}
              country_code={message?.sender_details?.country_code}
              is_premium={message?.sender_details?.is_premium}
            />
            <div className="flex justify-between">
              <Badge broadcastType={message.sender_broadcastType} />
              {message?.is_edited && (
                <span className="text-xs font-thin italic flex justify-center items-center px-2">
                  {" "}
                  Edited
                </span>
              )}
              {!message?.sender_details?.huddle_admin_blocked && (
                <KababOptions
                  {...message?.sender_details}
                  pinned={message.pinned}
                  isCurrentUser={isCurrentUser}
                  messageId={message.message_id}
                  user_status={user_status}
                  sender={message?.sender}
                />
              )}
            </div>
          </div>
          <Message>
            <TextMessage message={message.message} />

            {message.media_meta?.media_type === MEDIA_TYPES.IMAGE && (
              <MediaImage
                {...message.media_meta}
                messageId={message.message_id}
                roomId={message.huddle_id}
                type={message.message_type}
                mediaUrl={message.media}
              />
            )}
            {message.media_meta?.media_type === MEDIA_TYPES.VIDEO && (
              <>
                <Video
                  {...message.media_meta}
                  messageId={message.message_id}
                  roomId={message.huddle_id}
                />
              </>
            )}
            {message.media_meta?.media_type === MEDIA_TYPES.AUDIO && (
              <Audio
                {...message.media_meta}
                messageId={message.message_id}
                roomId={message.huddle_id}
              />
            )}

            {message.reply_to && (
              <Reply
                isCurrentUser={isCurrentUser}
                {...message.reply_to}
                roomId={message.huddle_id}
              />
            )}
          </Message>

          <MessageFooter
            totalComments={message?.total_comments}
            sent={message.sent}
            likes={message?.total_likes}
            messageId={message.message_id}
            isPremium={message?.sender_details?.is_premium}
          />
        </div>
      ) : replyUI ? (
        <div className={`p-4 ${cn}`}>
          <ReplyPostUI
            {...message}
            isCurrentUser={isCurrentUser}
            roomId={message.huddle_id}
            profile={profile || ""}
            type={type || ""}
            bg={cn}
            message_id={message?.message_id}
          />
          <MessageFooter
            totalComments={message?.total_comments}
            sent={message.sent}
            likes={message?.total_likes}
            messageId={message.message_id}
            isPremium={message?.sender_details?.is_premium}
          />
        </div>
      ) : (
        <div className={`p-4 ${cn}`}>
          <EditPostUI
            {...message}
            isCurrentUser={isCurrentUser}
            roomId={message.huddle_id}
            profile={profile}
            type={type}
            bg={cn}
          />
          <MessageFooter
            totalComments={message?.total_comments}
            sent={message.sent}
            likes={message?.total_likes}
            messageId={message.message_id}
            isPremium={message?.sender_details?.is_premium}
          />
        </div>
      )}
    </article>
  );
};

export default HuddlePost;
