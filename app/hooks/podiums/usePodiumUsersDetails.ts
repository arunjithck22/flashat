"use client";

import { PODIUM_USERS_DETAILS_URL } from "@/constants/podiums/apiUrls";
import { QKEY_GET_PODIUM_USER_DETAILS } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";
import { HttpResponse } from "@/types";
import { SinglePodium } from "@/types/podiums";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useQuery } from "@tanstack/react-query";

function podiumUserDetailsQueryFn({
  podiumId,
  participantId,
}: {
  podiumId: string;
  participantId: string;
}) {
  const url = getUrlWithParam(PODIUM_USERS_DETAILS_URL, {
    podiumId: podiumId,
    participantId: participantId,
  });
  console.log("podium param", url);
  console.log("calling podiums");
  return get({ url: url });
}

export const usePodiumUserDetails = ({
  podiumId,
  participantId,
}: {
  podiumId: string;
  participantId: string;
}) => {
  const response = useQuery<HttpResponse<SinglePodium>>({
    queryKey: [QKEY_GET_PODIUM_USER_DETAILS, podiumId],
    queryFn: () => podiumUserDetailsQueryFn({ podiumId, participantId }),
    enabled: !!podiumId,
  });
  return response;
};
