import { STARS_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

const getStarsList = (page: unknown) => {
  return get({ url: STARS_URL, params: { page, keyword: "" } });
};

export const useStarsList = () => {
  const response = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.result.next_page,
    queryKey: ["dears"],
    queryFn: (param: QueryFunctionContext) => {
      return getStarsList(param.pageParam);
    },
  });
  return response;
};
