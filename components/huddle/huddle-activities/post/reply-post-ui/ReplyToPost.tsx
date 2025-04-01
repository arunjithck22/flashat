/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MEDIA_TYPES } from "@/common/constant";
import { useAuth } from "@/contexts/AuthContext";
// import classNames from "classnames";
import Audio from "../Audio";
import { MediaImage } from "../Image";
import { Message } from "../Message";
// import { MessageFooter } from "../MessageFooter";
import { Sender } from "../Sender";
import { TextMessage } from "../TextMessage";
import { Video } from "../Video";

export const ReplyToPost = ({ bg, roomId, isCurrentUser, ...message }: any) => {
  // const { user, profile } = useAuth();

  //   console.log(`message${index}`, message);

  // const cn = classNames({
  //   "bg-postYellow": message.sender_details?.is_premium && !isCurrentUser,
  //   "bg-postPink": message.sender_details?.is_premium && isCurrentUser,
  //   "bg-postGrey": !message.sender_details?.is_premium,
  // });
  return (
    <div className={`w-full flex flex-col md:w-3/4 lg:w-1/3   text-xs ${bg}`}>
      {/* <label className="text-secGray">Replied to: </label> */}
      <section className=" mt-4 flex flex-col rounded border border-gray-300 p-4 pr-16  ">
        <Sender
          isCurrentUser={isCurrentUser}
          name={message.sender_name}
          {...message.sender_details}
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
              <Reply
                isCurrentUser={isCurrentUser}
                {...message.reply_to}
                roomId={message.huddle_id}
              />
            )} */}
        </Message>

        {/* <MessageFooter
          totalComments={message?.total_comments}
          sent={message.sent}
          likes={message?.total_likes}
          messageId={message.message_id}
          isPremium={message?.sender_details?.is_premium}
        /> */}
      </section>
    </div>
  );
};

export default ReplyToPost;
