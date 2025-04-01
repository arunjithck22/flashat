"use client";
import { PODIUM_GO_LIVE_URL } from "@/constants/podiums/apiUrls";
import { QKEY_GO_LIVE_PODIUM } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function goLivePodiumQueryFn({
  body,
  podiumId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
}) {
  const url = getUrlWithParam(PODIUM_GO_LIVE_URL, { podiumId: podiumId });

  return post(url, body);
}

export const useGoLivePodium = ({ podiumId }: { podiumId: string }) => {
  const mutation = useMutation({
    mutationKey: [QKEY_GO_LIVE_PODIUM, podiumId],
    onSuccess: () => {},
    mutationFn: ({ data }: { data: Record<string, unknown> }) =>
      goLivePodiumQueryFn({ body: data, podiumId: podiumId }),
  });
  return mutation;
};
