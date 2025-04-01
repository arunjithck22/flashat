"use client";

import { GET_PODIUM_DETAILS_URL } from "@/constants/podiums/apiUrls";
import { QKEY_GET_PODIUM_DETAILS } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";
import { HttpResponse } from "@/types";
import { SinglePodium } from "@/types/podiums";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useQuery } from "@tanstack/react-query";

function podiumDetailsQueryFn({ podiumId }: { podiumId: string }) {
  const url = getUrlWithParam(GET_PODIUM_DETAILS_URL, { podiumId: podiumId });
  console.log("podium param", url);
  console.log("calling podiums");
  return get({ url: url });
}

export const usePodiumDetails = ({ podiumId }: { podiumId: string }) => {
  const response = useQuery<HttpResponse<SinglePodium>>({
    queryKey: [QKEY_GET_PODIUM_DETAILS, podiumId],
    queryFn: () => podiumDetailsQueryFn({ podiumId }),
    enabled: !!podiumId,
  });
  return response;
};
