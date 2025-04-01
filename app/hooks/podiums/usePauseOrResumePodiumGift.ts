import { PODIUM_PAUSE_GIFT_URL } from "@/constants/podiums/apiUrls";
import { QKEY_PAUSE_OR_RESUME_PODIUM_GIFT } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function pauseGiftQueryFn({
  body,
  podiumId,
  action,
}: {
  body: Record<string, unknown>;
  podiumId: string;
  action: string;
}) {
  const url = getUrlWithParam(PODIUM_PAUSE_GIFT_URL, {
    podiumId: podiumId,
  });

  return post(`${url}?action=${action}`, body);
}

export const usePauseOrResumePodiumGifts = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_PAUSE_OR_RESUME_PODIUM_GIFT],
    mutationFn: ({
      data,
      podiumId,
      action,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
      action: string;
    }) =>
      pauseGiftQueryFn({
        body: data,
        podiumId: podiumId,
        action: action,
      }),
  });
  return mutation;
};
