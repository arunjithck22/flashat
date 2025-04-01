import useAddComment from "@/app/hooks/huddles/useAddComment";
import {
  QKEY_HUDDLE_COMMENTS,
  useComments,
} from "@/app/hooks/huddles/useComments";
import { QKEY_HUDDLE_MESSAGES } from "@/app/hooks/huddles/useHuddleMessages";
import { QKEY_HUDDLE_POST } from "@/app/hooks/huddles/useHuddlePost";
import { API_STATUS } from "@/common/constant";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import HuddleSkelton from "../../HuddleSkelton";
import Comment from "./Comment";
import { TranslationFunction } from "@/types";
import { HuddleComment } from "@/types/huddles";

const CommentsList = ({
  messageId,
  huddleId,
}: {
  messageId: string;
  huddleId: string;
}) => {
  const t: TranslationFunction = useTranslations("huddles");
  const {
    data: commentsList,

    status: commentStatus,
  } = useComments({
    huddleId,
    messageId: messageId,
  });

  console.log("comments list", commentsList);
  const { mutate, isPending } = useAddComment();
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (comment) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [comment]);
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment) {
      try {
        mutate(
          {
            huddleId: huddleId,
            messageId: messageId,
            body: {
              message: comment,
            },
          },
          {
            onSuccess: () => {
              setComment("");
              queryClient.invalidateQueries({
                queryKey: [QKEY_HUDDLE_MESSAGES, huddleId],
              });
              queryClient.invalidateQueries({
                queryKey: [QKEY_HUDDLE_COMMENTS, huddleId, messageId],
              });
              queryClient.invalidateQueries({
                queryKey: [QKEY_HUDDLE_POST, huddleId, messageId],
              });
            },
          }
        );
      } catch (error) {
        // Handle any errors during the mutation
        console.error("Error posting comment", error);
        // You might want to display an error message to the user
      }
    }
  };

  return (
    <section className="">
      <header className="py-2 px-2">
        <h1 className="font-bold text-black mb-2">
          {commentStatus === API_STATUS.SUCCESS && (
            <span className="ml-1">
              {" "}
              {t("comments")} ({commentsList?.result?.commentsCount})
            </span>
          )}
        </h1>
      </header>
      {commentStatus === API_STATUS.PENDING && (
        <>
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
        </>
      )}

      {commentStatus === API_STATUS.SUCCESS &&
        commentsList?.result?.comments?.length !== 0 &&
        commentsList?.result?.comments?.map((comment: HuddleComment) => (
          <Comment
            key={comment?.id}
            comment={comment?.message}
            name={comment?.sender_details?.name}
            profile={comment?.sender_details?.profile_url}
            time={comment?.created}
          />
        ))}
      {commentStatus === API_STATUS.SUCCESS &&
        commentsList?.result?.comments?.length === 0 && (
          <p className="flex justify-center items-center">
            {t("empty_message_7")}
          </p>
        )}

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault(); // Prevents the default form submission behavior
          submitComment(e);
        }}
      >
        <footer className=" fixed  bottom-24 left-0  w-full py-2 bg-white flex justify-between  items-center px-3 ">
          <input
            value={comment}
            className="w-full py-3 px-2 rounded-lg bg-bgray outline-none"
            type="text"
            placeholder={t("enter_new_comment")}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <div className="flex justify-center items-center pl-6">
            <button type="submit" disabled={isPending || disabled}>
              <Image
                alt="send"
                src="/tw/post/send-icon.svg"
                width={30}
                height={30}
              />
            </button>
          </div>
        </footer>
      </form>
    </section>
  );
};

export default CommentsList;
