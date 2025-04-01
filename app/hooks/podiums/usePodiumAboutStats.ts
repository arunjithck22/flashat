"use client";

import { GET_PODIUM_STATS_URL } from "@/constants/podiums/apiUrls";
import { QKEY_GET_PODIUM_STATS } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";
import { HttpResponse } from "@/types";
import { PodiumStats } from "@/types/podiums";

import { getUrlWithParam } from "@/utils/clientUtils";
import { useQuery } from "@tanstack/react-query";

function podiumStatsQueryFn({ podiumId }: { podiumId: string }) {
  const url = getUrlWithParam(GET_PODIUM_STATS_URL, { podiumId });

  return get({ url });
}

export const usePodiumAboutStats = ({ podiumId }: { podiumId: string }) => {
  const response = useQuery<HttpResponse<PodiumStats>>({
    queryKey: [QKEY_GET_PODIUM_STATS, podiumId],
    queryFn: () => podiumStatsQueryFn({ podiumId }),
    enabled: !!podiumId,
  });
  return response;
};
