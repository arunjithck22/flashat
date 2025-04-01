import { PARTICIPANTS_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse, PaginatedResult } from "@/types";
import { Members } from "@/types/huddles/index";
import { getUrlWithParam } from "@/utils/clientUtils";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

export interface MembersResponse extends PaginatedResult {
  members: Members[];
}

const getParticipants = (id: string | null, page: unknown, keyword: string) => {
  const url = getUrlWithParam(PARTICIPANTS_URL, {
    huddleId: id || "",
  });
  return get({ url, params: { page, keyword: keyword } });
};

export const useParticipants = (id: string | null, keyword: string) => {
  const response = useInfiniteQuery<HttpResponse<MembersResponse>>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.result.next_page || undefined,
    queryKey: ["participants", id, keyword],
    queryFn: (param: QueryFunctionContext) => {
      return getParticipants(id, param.pageParam, keyword);
    },
  });
  return response;
};
