import { useHuddlePost } from "@/app/hooks/huddles/useHuddlePost";
import { API_STATUS } from "@/common/constant";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import HuddleSkelton from "../../HuddleSkelton";
import CommentsList from "./CommentsList";
import Post from "./Post";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { TranslationFunction } from "@/types";

const PostDetails = ({ postId }: { postId: string }) => {
  const { state, actions } = useHuddleProvider();
  const common: TranslationFunction = useTranslations("common");
  const { data, status } = useHuddlePost({
    huddleId: state.currentHuddle || "",
    messageId: postId,
  });

  console.log("huddle post", data);

  return (
    <>
      <header className="w-full h-[81px] border-bgray border-b px-3">
        <section className="flex justify-between items-center h-full">
          <h1 className="base-semibold text-lg mt-10  whitespace-nowrap">
            {common("post")}
          </h1>
          <Image
            src="/tw/HuddleInfo/close.svg"
            className="mt-10 cursor-pointer"
            onClick={() => {
              actions.toggleDrawer(false);
              actions.toggleVisibility("commentsListing", false);
            }}
            width={25}
            height={25}
            alt="close-icon"
          />
        </section>
      </header>
      <section
        style={{ height: "calc(100vh - 190px)" }}
        className="w-full relative h-auto mt-1   px-2 pb-20 overflow-y-auto  custom-scrollbar flex flex-col  "
      >
        {status === API_STATUS.SUCCESS && (
          <Post {...data?.result?.messages[0]} />
        )}
        {status === API_STATUS.PENDING && (
          <>
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
          </>
        )}
        <CommentsList messageId={postId} huddleId={state.currentHuddle || ""} />
      </section>
    </>
  );
};

export default PostDetails;
