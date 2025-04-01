"use client";

import { DEARS_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { LikersDearsFans } from "@/types/huddles";

import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

interface DearsResponse extends PaginatedResult {
  dears: LikersDearsFans[];
}

const getDearsList = (page: unknown) => {
  return get({ url: DEARS_URL, params: { page, limit: 50, keyword: "" } });
};

export const useDearsList = () => {
  const response = useInfiniteQuery<HttpResponse<DearsResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.result.next_page,
    queryKey: ["dears"],
    queryFn: (param: QueryFunctionContext) => {
      return getDearsList(param.pageParam);
    },
  });
  return response;
};
