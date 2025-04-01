"use client";

import { HUDDLE_COMMENTS_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useQuery } from "@tanstack/react-query";

export const QKEY_HUDDLE_COMMENTS = "get-comments";

const getCommentsList = ({
  huddleId,
  messageId,
}: {
  huddleId: string;
  messageId: string;
}) => {
  const url = getUrlWithParam(HUDDLE_COMMENTS_URL, {
    huddleId,
    message_id: messageId,
  });
  return get({ url, params: { huddleId, message_id: messageId } });
};

export const useComments = ({
  huddleId,
  messageId,
}: {
  huddleId: string;
  messageId: string;
}) => {
  const response = useQuery({
    queryKey: [QKEY_HUDDLE_COMMENTS, huddleId, messageId],
    queryFn: () => getCommentsList({ huddleId, messageId }),
    enabled: !!huddleId && !!messageId,
  });
  return response;
};
