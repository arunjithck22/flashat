"use client";

import { HUDDLE_MESSAGE_URL } from "@/common/constant";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useQuery } from "@tanstack/react-query";

import { get } from "@/service/http.service";

export const QKEY_HUDDLE_POST = "get-huddle-post";

const getHuddlePosts = ({
  huddleId,
  messageId,
}: {
  huddleId: string;
  messageId: string;
}) => {
  const url = getUrlWithParam(HUDDLE_MESSAGE_URL, { id: huddleId });
  console.log("urrl", url);
  return get({ url, params: { messageId } });
};

export const useHuddlePost = ({
  huddleId,
  messageId,
}: {
  huddleId: string;
  messageId: string;
}) => {
  const response = useQuery({
    queryKey: [QKEY_HUDDLE_POST, huddleId, messageId],
    queryFn: () => getHuddlePosts({ huddleId, messageId }),
    enabled: !!huddleId && !!messageId,
  });
  return response;
};
