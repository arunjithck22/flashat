"use client";
import { PODIUM_JOIN_URL } from "@/constants/podiums/apiUrls";
import { QKEY_JOIN_PODIUM } from "@/constants/podiums/queryKeys";
import { get } from "@/service/http.service";

import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function joinPodiumQueryFn({
  podiumId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
}) {
  const url = getUrlWithParam(PODIUM_JOIN_URL, { podiumId: podiumId });
  return get({ url: url });
}

export const useJoinPodium = ({ podiumId }: { podiumId: string }) => {
  const mutation = useMutation({
    mutationKey: [QKEY_JOIN_PODIUM, podiumId],
    mutationFn: ({ data }: { data: Record<string, unknown> }) =>
      joinPodiumQueryFn({ body: data, podiumId: podiumId }),
  });
  return mutation;
};
