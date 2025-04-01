"use client";
import { HUDDLE_COMMENTS_URL } from "@/common/constant";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function addComment({
  huddleId,
  messageId,
  body,
}: {
  huddleId: string;
  messageId: string;
  body: Record<string, unknown>;
}) {
  const url = getUrlWithParam(HUDDLE_COMMENTS_URL, {
    huddleId,
    message_id: messageId,
  });
  return post(url, body);
}

const useAddComment = () => {
  return useMutation({
    mutationKey: ["add-comment"],
    mutationFn: ({
      huddleId,
      messageId,
      body,
    }: {
      huddleId: string;
      messageId: string;
      body: Record<string, unknown>;
    }) => addComment({ huddleId, messageId, body }),
  });
};

export default useAddComment;
