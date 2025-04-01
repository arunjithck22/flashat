"use client";

import { QKEY_GET_PODIUMS_LIST } from "@/constants/podiums/queryKeys";
import {
  GET_PODIUMS_URL,
  GET_LIVE_FRIENDS_URL,
} from "@/constants/podiums/apiUrls";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { LiveFriends, SinglePodium } from "@/types/podiums";

export interface PodiumsResponse extends PaginatedResult {
  podiums: SinglePodium[];
  liveFriends: LiveFriends[];
}

const getPodiumsQueryFn = (tab: string | undefined, page: unknown) => {
  console.log("page111", page);
  const url = GET_PODIUMS_URL;

  return get({ url, params: { tab, page, per_page: 25 } });
};

const getLiveFriendsQueryFn = async (page: unknown) => {
  const url = GET_LIVE_FRIENDS_URL;

  try {
    // Attempt to fetch the data
    return await get({ url, params: { page, per_page: 25 } });
  } catch (error) {
    // Handle and log the error
    console.error("Error fetching live friends:", error);

    // Optionally rethrow the error if it needs to be handled by the caller
    throw error;
  }
};
export const useListPodiums = ({ tab }: { tab: string | undefined }) => {
  const response = useInfiniteQuery<HttpResponse<PodiumsResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("last page", lastPage);
      if (lastPage?.result?.has_next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    queryKey: [QKEY_GET_PODIUMS_LIST, tab],
    queryFn: (param: QueryFunctionContext) => {
      if (tab === "live-friends") {
        return getLiveFriendsQueryFn(param.pageParam);
      } else {
        return getPodiumsQueryFn(tab, param.pageParam);
      }
    },
  });
  return response;
};
