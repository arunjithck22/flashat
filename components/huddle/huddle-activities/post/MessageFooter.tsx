import moment from "moment";

import Comments from "./Comments";

interface FooterProps {
  sent: string;
  likes: number;
  totalComments: number;
  messageId: string;
  isPremium: boolean | undefined;
}

export const MessageFooter = ({
  sent,

  totalComments,
  messageId,
  isPremium,
}: FooterProps) => {
  return (
    <div className=" text-xs text-gray-500 mt-12 flex   justify-between items-center">
      <div className="flex">
        <p className="text-xs ">
          {moment(sent)?.format("DD/MM/YYYY")} |
          {moment(sent)?.format("hh:mm A")}
        </p>
      </div>
      {isPremium && (
        <div className="flex  align-items-center">
          <Comments
            totalComments={totalComments}
            messageId={messageId}
            // setSpecificPostId={setSpecificPostId}
            // getSpecificPostId={getSpecificPostId}
            // replyId={replyId}
            // commentsCount={commentsCount}
          />
        </div>
      )}
      <div className="flex  align-items-center  flex-row-reverse gap-2">
        {/* <Like likes={likes} />
        <Image width={12} height={12} className="" src={replyIcon} alt="" /> */}
      </div>
    </div>
  );
};
