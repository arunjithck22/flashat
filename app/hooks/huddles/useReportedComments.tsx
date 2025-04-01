"use client";

import { HUDDLE_REPORTS_COMMENTS_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { CommentReport } from "@/types/huddles";
import { getUrlWithParam } from "@/utils/clientUtils";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

// };
export const QKEY_HUDDLES_REPORTED_COMMENTS = "get-reported-comments";

export interface ReportedCommentsResponse extends PaginatedResult {
  reports: CommentReport[];
}

const getComments = (id: string, page: unknown) => {
  const url = getUrlWithParam(HUDDLE_REPORTS_COMMENTS_URL, { huddleId: id });
  return get({ url: url, params: { huddleId: id, page } });
};

export const useReportedComments = (id: string) => {
  const response = useInfiniteQuery<HttpResponse<ReportedCommentsResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.result.next_page || undefined,
    queryKey: [QKEY_HUDDLES_REPORTED_COMMENTS, id],
    queryFn: (param: QueryFunctionContext) => {
      return getComments(id, param.pageParam);
    },
  });
  return response;
};
