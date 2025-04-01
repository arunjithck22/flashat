"use client";
import {  GET_PODIUM_FROZEN_USERS } from "@/constants/podiums/apiUrls";
import {   QKEY_GET_PODIUM_FROZEN_USERS } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import {     FrozenUser, } from "@/types/podiums";
import { getUrlWithParam } from "@/utils/clientUtils";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

function getFrozenUsersQueryFn({
  podiumId,
  page,
}: {
  podiumId: string;
  page: unknown;
}) {
  const url = getUrlWithParam(GET_PODIUM_FROZEN_USERS, {
    podiumId: podiumId,
  });

  return get({ url: url, params: { page: page, perPage: 20 } });
}

export interface FrozenUsersResponse extends PaginatedResult {
  users: FrozenUser[];
}

export const usePodiumFrozenUsers = ({
  podiumId,
  enabled,
}: {
  podiumId: string;
  enabled: boolean;
}) => {
  const response = useInfiniteQuery<HttpResponse<FrozenUsersResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("last page", lastPage);
      if (lastPage?.result && lastPage.result.has_next) {
        return allPages?.length + 1;
      }
      return undefined;
    },
    queryKey: [QKEY_GET_PODIUM_FROZEN_USERS, podiumId],
    queryFn: (param: QueryFunctionContext) => {
      return getFrozenUsersQueryFn({
        podiumId: podiumId,
        page: param.pageParam,
      });
    },
    enabled: enabled,
  });
  return response;
};
