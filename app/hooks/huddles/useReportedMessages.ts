"use client";

import { HUDDLE_REPORTS_MESSAGE_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { Report } from "@/types/huddles";

import { getUrlWithParam } from "@/utils/clientUtils";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

export const QKEY_HUDDLES_REPORTED_MESSAGES = "get-reported-messages";

export interface ReportedMessagesResponse extends PaginatedResult {
  reports: Report[];
}

const getMessages = (id: string, page: unknown) => {
  const huddleId = id;
  const url = getUrlWithParam(HUDDLE_REPORTS_MESSAGE_URL, {
    huddleId: huddleId,
  });
  return get({ url: url, params: { huddleId: id, page } });
};

export const useReportedMessages = (id: string) => {
  const response = useInfiniteQuery<HttpResponse<ReportedMessagesResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.result.next_page || undefined,
    queryKey: [QKEY_HUDDLES_REPORTED_MESSAGES, id],
    queryFn: (param: QueryFunctionContext) => {
      return getMessages(id, param.pageParam);
    },
  });
  return response;
};
