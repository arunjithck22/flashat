import React from "react";

import classnames from "classnames";
import { MediaImage } from "../../huddle-activities/post/Image";

import { useAuth } from "@/contexts/AuthContext";
import { MEDIA_TYPES } from "@/common/constant";
import { Video } from "../../huddle-activities/post/Video";
import Audio from "../../huddle-activities/post/Audio";
import { Message } from "../../huddle-activities/post/Message";
import { TextMessage } from "../../huddle-activities/post/TextMessage";
import { Sender } from "../../huddle-activities/post/Sender";
import { MessageFooter } from "../../huddle-activities/post/MessageFooter";
import { HuddleMessage } from "@/types/huddles";

export const Post = ({ ...messageProps }: HuddleMessage) => {
  const message: HuddleMessage = messageProps;
  console.log("huddle post1", message);
  const { user } = useAuth();
  const isCurrentUser = user?.toString() === message?.sender?.toString();

  const cn = classnames({
    "bg-postYellow": message.sender_details?.is_premium && !isCurrentUser,
    "bg-postPink": message.sender_details?.is_premium && isCurrentUser,
    "bg-postGrey": !message.sender_details?.is_premium,
  });
  return (
    <article className={`m-1 border-bgray border rounded relative ${cn}`}>
      {/* <Banner citizenship={message.sender_details?.user_citizenship} /> */}

      <div className="p-4">
        <Sender
          {...message.sender_details}
          isCurrentUser={isCurrentUser}
          name={message?.sender_details?.name}
          // broadcastType={message.sender_broadcastType}
        />
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

          {/* {message.reply_to && (
            <Reply {...message.reply_to} roomId={message.huddle_id} />
          )} */}
        </Message>

        <MessageFooter
          totalComments={message?.total_comments}
          sent={message.sent}
          likes={message?.total_likes}
          messageId={message.message_id}
          isPremium={message?.sender_details?.is_premium}
        />
      </div>
    </article>
  );
};

export default Post;
