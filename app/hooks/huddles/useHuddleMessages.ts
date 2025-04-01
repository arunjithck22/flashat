"use client";
import {
  HUDDLE_MESSAGE_URL,
  PUBLIC_HUDDLE_MESSAGE_URL,
} from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { HuddleMessage, PinnedPost } from "@/types/huddles";

import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

export const QKEY_HUDDLE_MESSAGES = "huddlemessages";

export interface MessageResponse extends PaginatedResult {
  messages: HuddleMessage[];
  // pages: [];
  pinned_post:PinnedPost
}

export const getHuddleMessage = (huddleId: string, prevMessageId?: unknown) => {
  const url = getUrlWithParam(HUDDLE_MESSAGE_URL, { id: huddleId });

  let params;
  if (prevMessageId) {
    params = { previous: prevMessageId };
  }
  return get({ url, params });
};
export const getPublicHuddleMessage = (
  huddleId: string,
  prevMessageId?: unknown
) => {
  const url = getUrlWithParam(PUBLIC_HUDDLE_MESSAGE_URL, { id: huddleId });

  let params;
  if (prevMessageId) {
    params = { previous: prevMessageId };
  }
  return get({ url, params });
};

export const useHuddleMessage = (huddleId: string, type: string) => {
  const response = useInfiniteQuery<
    HttpResponse<MessageResponse>
    
  >({
    queryKey: [QKEY_HUDDLE_MESSAGES, huddleId],
    queryFn: ( param : QueryFunctionContext) => {
      if (type === "private") return getHuddleMessage(huddleId, param.pageParam);
      else return getPublicHuddleMessage(huddleId, param.pageParam);
    },
    initialPageParam: null,

    getNextPageParam: (lastPage) => {
      const messages = lastPage?.result?.messages || [];

      const prevId =
        messages.length > 0
          ? messages[messages.length - 1]?.message_id
          : undefined;
      return prevId;
    },
  });

  return response;
};

function getUrlWithParam(url: string, params: Record<string,string>) {
  let newUrl = url;
  Object.keys(params).forEach((key: string) => {
    newUrl = `${newUrl.split(`:${key}`).join(params[key])}`;
  });
  return newUrl;
}
