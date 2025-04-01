"use client";
import { PODIUM_ACCEPT_SPEAK_INVITE_URL } from "@/constants/podiums/apiUrls";
import { QKEY_PODIUM_ACCEPT_INVITE_TO_SPEAK } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function acceptSpeakInviteQueryFn({
  body,
  podiumId,
  action,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
  action: string;
}) {
  const url = getUrlWithParam(PODIUM_ACCEPT_SPEAK_INVITE_URL, {
    podiumId: podiumId,
  });

  return post(`${url}?action=${action}`, body);
}

export const useAcceptSpeakInvite = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_PODIUM_ACCEPT_INVITE_TO_SPEAK],
    onSuccess: () => {},
    mutationFn: ({
      data,
      podiumId,
      action,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
      action: string;
    }) =>
      acceptSpeakInviteQueryFn({
        body: data,
        podiumId: podiumId,
        action: action,
      }),
  });
  return mutation;
};
