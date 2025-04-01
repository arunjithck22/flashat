import { PODIUM_PARTICIPANT_PAUSE_GIFT_URL } from "@/constants/podiums/apiUrls";
import { QKEY_PAUSE_OR_RESUME_PODIUM_PARTICIPANT_GIFT } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function pauseGiftQueryFn({
  body,
  podiumId,
  action,
  participantId,
}: {
  body: Record<string, unknown>;
  podiumId: string;
  action: string;
  participantId: string;
}) {
  const url = getUrlWithParam(PODIUM_PARTICIPANT_PAUSE_GIFT_URL, {
    podiumId: podiumId,
    participantId: participantId,
  });

  return post(`${url}?action=${action}`, body);
}

export const usePauseOrResumePodiumParticipantGifts = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_PAUSE_OR_RESUME_PODIUM_PARTICIPANT_GIFT],
    mutationFn: ({
      data,
      podiumId,
      action,
      participantId,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
      action: string;
      participantId: string;
    }) =>
      pauseGiftQueryFn({
        body: data,
        podiumId: podiumId,
        action: action,
        participantId,
      }),
  });
  return mutation;
};
