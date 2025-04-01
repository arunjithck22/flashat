"use client";
import { GET_WAITING_LIST_URL } from "@/constants/podiums/apiUrls";
import { QKEY_GET_WAITING_LIST } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { WaitList } from "@/types/podiums";
import { getUrlWithParam } from "@/utils/clientUtils";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

function waitingListQueryFn({
  podiumId,
  page,
}: {
  podiumId: string;
  page: unknown;
}) {
  const url = getUrlWithParam(GET_WAITING_LIST_URL, { podiumId: podiumId });

  return get({ url: url, params: { page: page } });
}

export interface WaitListResponse extends PaginatedResult {
  users: WaitList[];
}

export const useWaitingList = ({ podiumId }: { podiumId: string }) => {
  const response = useInfiniteQuery<HttpResponse<WaitListResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("last page", lastPage);
      if (lastPage?.result?.has_next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    queryKey: [QKEY_GET_WAITING_LIST, podiumId],
    queryFn: (param: QueryFunctionContext) => {
      return waitingListQueryFn({ podiumId: podiumId, page: param.pageParam });
    },
    enabled: !!podiumId,
  });
  return response;
};
