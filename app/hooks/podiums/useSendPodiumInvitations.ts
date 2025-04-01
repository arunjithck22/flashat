"use client";
import { SEND_PODIUM_INVITATIONS_URL } from "@/constants/podiums/apiUrls";
import { QKEY_SEND_PODIUM_INVITATIONS } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function podiumInviteQueryFn({
  body,
  podiumId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
}) {
  const url = getUrlWithParam(SEND_PODIUM_INVITATIONS_URL, {
    podiumId: podiumId,
  });

  return post(url, body);
}

export const useSendPodiumInvitations = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_SEND_PODIUM_INVITATIONS],
    mutationFn: ({
      data,
      podiumId,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
    }) => podiumInviteQueryFn({ body: data, podiumId: podiumId }),
  });
  return mutation;
};
