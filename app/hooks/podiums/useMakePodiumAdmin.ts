"use client";
import { MAKE_PODIUM_ADMIN_URL } from "@/constants/podiums/apiUrls";
import { QKEY_MAKE_PODIUM_ADMIN } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function makeAdminQueryFn({
  body,
  podiumId,
  participantId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
  participantId: string;
}) {
  const url = getUrlWithParam(MAKE_PODIUM_ADMIN_URL, {
    podiumId: podiumId,
    participantId: participantId,
  });

  return post(url, body);
}

export const useMakePodiumAdmin = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_MAKE_PODIUM_ADMIN],
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
      makeAdminQueryFn({
        body: data,
        podiumId: podiumId,
        participantId: participantId,
      }),
  });
  return mutation;
};
