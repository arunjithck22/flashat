import { PAUSE_OR_RESUME_COMMENTS_PODIUM_URL } from "@/constants/podiums/apiUrls";
import { QKEY_PAUSE_RESUME_LIVE_CHAT } from "@/constants/podiums/queryKeys";
import { put } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function pauseCommentsQueryFn({
  body,
  podiumId,
}: {
  body: Record<string, unknown>;
  podiumId: string;
}) {
  const url = getUrlWithParam(PAUSE_OR_RESUME_COMMENTS_PODIUM_URL, {
    podiumId: podiumId,
  });

  return put(`${url}   `, body);
}

export const useUpdatePodiumSettings = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_PAUSE_RESUME_LIVE_CHAT],
    mutationFn: ({
      data,
      podiumId,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
    }) =>
      pauseCommentsQueryFn({
        body: data,
        podiumId: podiumId,
      }),
  });
  return mutation;
};
