"use client";
import { LIKERS_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { LikersDearsFans } from "@/types/huddles/index";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

interface DearsResponse extends PaginatedResult {
  likers: LikersDearsFans[];
}

const getLikersList = (page: unknown) => {
  return get({
    url: LIKERS_URL,
    params: { page, limit: 50, keyword: "" },
  });
};

export const useLikersList = () => {
  const response = useInfiniteQuery<HttpResponse<DearsResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.result.next_page,
    queryKey: ["likers"],
    queryFn: (param: QueryFunctionContext) => {
      return getLikersList(param.pageParam);
    },
  });
  return response;
};
