"use client";
import { CANCEL_PODIUM_ADMIN_INVITE_URL } from "@/constants/podiums/apiUrls";
import { QKEY_CANCEL_PODIUM_ADMIN_INVITE } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function cancelAdminInviteQueryFn({
  body,
  podiumId,
  participantId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
  participantId: string;
}) {
  const url = getUrlWithParam(CANCEL_PODIUM_ADMIN_INVITE_URL, {
    podiumId: podiumId,
    participantId: participantId,
  });

  return post(url, body);
}

export const useCancelPodiumAdminInvite = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_CANCEL_PODIUM_ADMIN_INVITE],
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
      cancelAdminInviteQueryFn({
        body: data,
        podiumId: podiumId,
        participantId: participantId,
      }),
  });
  return mutation;
};
