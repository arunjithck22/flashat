"use client";
import { PODIUM_DISMISS_FROM_ADMIN_URL } from "@/constants/podiums/apiUrls";
import { QKEY_DISMISS_PODIUM_ADMIN } from "@/constants/podiums/queryKeys";

import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function dismissFromAdminPodiumQueryFn({
  body,
  podiumId,
  participantId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
  participantId: string;
}) {
  const url = getUrlWithParam(PODIUM_DISMISS_FROM_ADMIN_URL, {
    podiumId: podiumId,
    participantId: participantId,
  });

  return post(url, body);
}

export const useDismissFromAdminPodium = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_DISMISS_PODIUM_ADMIN],
    onSuccess: () => {},
    mutationFn: ({
      data,
      podiumId,
      participantId,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
      participantId: string;
    }) =>
      dismissFromAdminPodiumQueryFn({
        body: data,
        podiumId: podiumId,
        participantId,
      }),
  });
  return mutation;
};
