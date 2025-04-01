import { useMutation } from "@tanstack/react-query";
import { del } from "@/service/http.service";
import { DELETE_REPORTED_COMMENT_URL } from "@/common/constant";
import { getUrlWithParam } from "@/utils/clientUtils";

function deleteReportedComment({
  huddleId,
  messageId,
  commentId,
  userId,
  sender_blocked,
}: {
  huddleId: string | null;
  messageId: string | null;
  commentId: string | undefined;
  userId: string | null;
  sender_blocked: boolean;
}) {
  const url = getUrlWithParam(DELETE_REPORTED_COMMENT_URL, {
    huddleId: huddleId?.toString() || "",
    messageId: messageId?.toString() || "",
  });
  //   ?commentId=:commentId&sender_blocked=false&action_by=:userId

  return del({
    url,
    params: {
      commentId: commentId,
      sender_blocked: sender_blocked,
      action_by: userId,
    },
  });
}

const useDeleteReportedComment = () => {
  const mutation = useMutation({
    mutationFn: ({
      huddleId,
      messageId,
      commentId,
      userId,
      sender_blocked,
    }: {
      huddleId: string | null;
      messageId: string | null;
      commentId: string | undefined;
      userId: string | null;
      sender_blocked: boolean;
    }) =>
      deleteReportedComment({
        huddleId,
        messageId,
        commentId,
        userId,
        sender_blocked,
      }),
  });
  return mutation;
};

export default useDeleteReportedComment;
