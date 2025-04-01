"use client";
import { PODIUM_INVITE_TO_SPEAK_URL } from "@/constants/podiums/apiUrls";
import { QKEY_PODIUM_INVITE_TO_SPEAK } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function inviteToSpeakQueryFn({
  body,
  podiumId,
  participantId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
  participantId: string;
}) {
  const url = getUrlWithParam(PODIUM_INVITE_TO_SPEAK_URL, {
    podiumId: podiumId,
    participantId: participantId,
  });

  return post(url, body);
}

export const useInviteToSpeak = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_PODIUM_INVITE_TO_SPEAK],
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
      inviteToSpeakQueryFn({
        body: data,
        podiumId: podiumId,
        participantId: participantId,
      }),
  });
  return mutation;
};
