import {
  HUDDLES_TABS,
  HUDDLES_URL,
  
  PUBLIC_HUDDLES_URL,
} from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse,  PaginatedResult} from "@/types";
import { Huddles, RequestsInvitesHuddles } from "@/types/huddles/index";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

export const KEY_HUDDLES_QUERY = "huddles";
const HUDDLES_TYPES = {
  public: "public",
} as const;

export interface HuddleResponse extends PaginatedResult {
  huddles: Huddles[];
  huddle_participant: RequestsInvitesHuddles[];    

}

const getHuddles = (
  tab: string,
  page:number | unknown
): Promise<HttpResponse<HuddleResponse>> => {
  console.log("huddles list tab", tab);
  return get({
    url: HUDDLES_URL,
    params: { type: HUDDLES_TYPES.public, tab, page },
  });
};

const getUnAuthHuddles = (
  tab: string,
  page: number | unknown
): Promise<HttpResponse<HuddleResponse>> => {
  return get({
    url: PUBLIC_HUDDLES_URL,
    params: { page },
  });
};

const getPublicHuddles = (
  premium_offset?: number,
  free_offset?: number
): Promise<HttpResponse<HuddleResponse>> => {
  return get({
    url: `${HUDDLES_URL}/search`,
    params: {
      keyword: "",
      premium_offset: premium_offset || 50,
      free_offset: free_offset || 0,
    },
  });
};

const getRequestsAndInvites = (
  page: unknown
): Promise<HttpResponse<HuddleResponse>> => {
  return get({
    url: `${HUDDLES_URL}/requests_and_invites`,
    params: { count: page ? false : true },
  });
};

export const useHuddles = (
  tab: string,
  premium_offset?: number,
  free_offset?: number,

) => {
  console.log("huddles list inf ", tab);
  const response = useInfiniteQuery<HttpResponse<HuddleResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (tab === HUDDLES_TABS.SEARCH) {
        console.log("premium offset", lastPage?.result?.premium_offset);
        return lastPage?.result?.premium_offset;
      }
      // if (tab === HUDDLES_TABS.REQUEST) {
      //   return lastPage?.result?.premium_offset;
      // }
      console.log("last page", lastPage);
      return lastPage?.result?.next_page;
    },
    queryKey: [KEY_HUDDLES_QUERY, tab] as const,
    queryFn: (param: QueryFunctionContext) => {
      console.log("tabbb",param);
      if (tab === HUDDLES_TABS.USER_MANAGED) {
        return getHuddles(tab, param.pageParam);
      } else if (tab === HUDDLES_TABS.SEARCH) {
        return getPublicHuddles(premium_offset, free_offset);
      } else if (tab === HUDDLES_TABS.PUBLIC) {
        return getUnAuthHuddles(tab, param.pageParam);
      } else if (tab === HUDDLES_TABS.REQUEST) {
        return getRequestsAndInvites(param.pageParam);
      } else {
        return getHuddles(tab, param.pageParam);
      }
    },
  });

  return response;
};
