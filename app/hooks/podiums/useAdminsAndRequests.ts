"use client";
import { GET_ADMINS_AND_REQUESTS_URL } from "@/constants/podiums/apiUrls";
import { QKEY_GET_ADMINS_AND_REQUESTS } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { AdminRequestUser } from "@/types/podiums";
import { getUrlWithParam } from "@/utils/clientUtils";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

function adminAndRequestsQueryFn({
  podiumId,
  page,
}: {
  podiumId: string;
  page: unknown;
}) {
  const url = getUrlWithParam(GET_ADMINS_AND_REQUESTS_URL, {
    podiumId: podiumId,
  });

  return get({ url: url, params: { page: page, perPage: 20 } });
}

export interface AdminAndRequestsResponse extends PaginatedResult {
  users: AdminRequestUser[];
}

export const useAdminsAndRequests = ({
  podiumId,
  enabled,
}: {
  podiumId: string;
  enabled: boolean;
}) => {
  const response = useInfiniteQuery<HttpResponse<AdminAndRequestsResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("last page", lastPage);
      if (lastPage?.result && lastPage.result.has_next) {
        return allPages?.length + 1;
      }
      return undefined;
    },
    queryKey: [QKEY_GET_ADMINS_AND_REQUESTS, podiumId],
    queryFn: (param: QueryFunctionContext) => {
      return adminAndRequestsQueryFn({
        podiumId: podiumId,
        page: param.pageParam,
      });
    },
    enabled: enabled,
  });
  return response;
};
