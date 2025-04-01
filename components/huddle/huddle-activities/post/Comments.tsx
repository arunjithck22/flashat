import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import Image from "next/image";
import React from "react";

import { useParams } from "next/navigation";
import { HUDDLES_TABS } from "@/common/constant";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";

interface CommentsProps {
  totalComments: number;
  messageId: string;
  // getSpecificPostId: any;
  // replyId: any;
  // setSpecificPostId: any;
}

const Comments = ({ totalComments, messageId }: CommentsProps) => {
  const t: TranslationFunction = useTranslations("huddles");
  const { actions } = useHuddleProvider();
  const params = useParams();
  return (
    <div
      onClick={() => {
        if (params?.type !== HUDDLES_TABS.PUBLIC) {
          actions.updatePostId(messageId);
          actions.toggleDrawer(true);
          actions.toggleVisibility("commentsListing", true);
        }
      }}
      className="flex gap-2 p-2 px-3 rounded-lg  justify-center items-center h-8 bg-yellow-500 text-primary"
    >
      <p className="base-semibold text-xs">{t("comments")}</p>
      <Image
        src="/tw/post/CommentsIcon.svg"
        width={10}
        height={10}
        alt="comments"
      />
      <p className="base-semibold text-xs">{totalComments}</p>
    </div>
  );
};

export default Comments;
