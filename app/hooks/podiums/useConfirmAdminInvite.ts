"use client";
import { PODIUM_ACCEPT_OR_DECLINE_ADMIN_INVITE } from "@/constants/podiums/apiUrls";
import { QKEY_ACCEPT_OR_DECLINE_PODIUM_INVITE } from "@/constants/podiums/queryKeys";
import { put } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function confirmAdminInviteQueryFn({
  body,
  podiumId,
  participantId,
  action,
}: {
  body: Record<string, unknown>;
  podiumId: string;
  participantId: string;
  action: string;
}) {
  const url = getUrlWithParam(PODIUM_ACCEPT_OR_DECLINE_ADMIN_INVITE, {
    podiumId: podiumId,
    participantId: participantId,
  });

  return put(`${url}?action=${action}`, body);
}

export const useConfirmAdminInvite = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_ACCEPT_OR_DECLINE_PODIUM_INVITE],
    onSuccess: () => {},
    mutationFn: ({
      data,
      podiumId,
      participantId,
      action,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
      participantId: string;
      action: string;
    }) =>
      confirmAdminInviteQueryFn({
        body: data,
        podiumId: podiumId,
        participantId: participantId,
        action: action,
      }),
  });
  return mutation;
};
