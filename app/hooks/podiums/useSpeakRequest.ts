import { SEND_SPEAK_REQUEST_URL } from "@/constants/podiums/apiUrls";
import { QKEY_SPEAK_REQUEST } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function speakRequestQueryFn({
  body,
  podiumId,
}: {
  body: Record<string, unknown>;
  podiumId: string;
}) {
  console.log("33333", podiumId);
  const url = getUrlWithParam(SEND_SPEAK_REQUEST_URL, { podiumId: podiumId });
  return post(url, body);
}

export const useSpeakRequest = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_SPEAK_REQUEST],
    mutationFn: ({
      data,
      podiumId,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
    }) => speakRequestQueryFn({ body: data, podiumId: podiumId }),
  });
  return mutation;
};
