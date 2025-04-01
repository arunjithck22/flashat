"use client";

import { FANS_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { LikersDearsFans } from "@/types/huddles/index";


import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

interface DearsResponse extends PaginatedResult {
  fans: LikersDearsFans[];
}

const getFansList = (page: unknown) => {
  return get({
    url: FANS_URL,
    params: { page, limit: 50, keyword: "" },
  });
};

export const useFansList = () => {
  const response = useInfiniteQuery<HttpResponse<DearsResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.result.next_page,
    queryKey: ["fans"],
    queryFn: (param: QueryFunctionContext) => {
      return getFansList(param.pageParam);
    },
  });
  return response;
};
