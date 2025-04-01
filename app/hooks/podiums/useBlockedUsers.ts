"use client";
import { GET_PODIUM_BLOCKED_USERS } from "@/constants/podiums/apiUrls";
import {  QKEY_GET_PODIUM_BLOCKED_USERS } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import {     PodiumBlockedUsersList } from "@/types/podiums";
import { getUrlWithParam } from "@/utils/clientUtils";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

function getBlockedUsersQueryFn({
  podiumId,
  page,
}: {
  podiumId: string;
  page: unknown;
}) {
  const url = getUrlWithParam(GET_PODIUM_BLOCKED_USERS, {
    podiumId: podiumId,
  });

  return get({ url: url, params: { page: page, perPage: 20 } });
}

export interface BlockedUsersResponse extends PaginatedResult {
  users: PodiumBlockedUsersList[];
}

export const usePodiumBlockedusers = ({
  podiumId,
  enabled,
}: {
  podiumId: string;
  enabled: boolean;
}) => {
  const response = useInfiniteQuery<HttpResponse<BlockedUsersResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("last page", lastPage);
      if (lastPage?.result && lastPage.result.has_next) {
        return allPages?.length + 1;
      }
      return undefined;
    },
    queryKey: [QKEY_GET_PODIUM_BLOCKED_USERS, podiumId],
    queryFn: (param: QueryFunctionContext) => {
      return getBlockedUsersQueryFn({
        podiumId: podiumId,
        page: param.pageParam,
      });
    },
    enabled: enabled,
  });
  return response;
};
