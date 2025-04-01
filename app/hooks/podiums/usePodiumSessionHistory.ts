"use client";

import { GET_PODIUM_RECORDS_URL } from "@/constants/podiums/apiUrls";
import { QKEY_GET_PODIUMS_SESSIONS_LIST } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { PodiumSessions } from "@/types/podiums";
import { getUrlWithParam } from "@/utils/clientUtils";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

export interface SessionsResponse extends PaginatedResult {
  records: PodiumSessions[];
}

const getSessionsQueryFn = (podiumId: string, page: unknown) => {
  const url = getUrlWithParam(GET_PODIUM_RECORDS_URL, { podiumId });

  return get({ url, params: { page, per_page: 20 } });
};

export const usePodiumSessionHistory = ({
  podiumId,
  enabled,
}: {
  podiumId: string;
  enabled: boolean;
}) => {
  const response = useInfiniteQuery<HttpResponse<SessionsResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("last page", lastPage);
      if (lastPage?.result?.has_next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    queryKey: [QKEY_GET_PODIUMS_SESSIONS_LIST, podiumId],
    queryFn: (param: QueryFunctionContext) => {
      return getSessionsQueryFn(podiumId, param.pageParam);
    },
    enabled: enabled,
  });
  return response;
};
