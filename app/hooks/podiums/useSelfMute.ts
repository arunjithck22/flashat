import { SELF_MUTE_URL } from "@/constants/podiums/apiUrls";
import {
  QKEY_SELF_MUTE,
  
} from "@/constants/podiums/queryKeys";
import { put } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function selfMuteQueryFn({
  body,
  podiumId,
  action,
}: {
  body: Record<string, unknown>;
  podiumId: string;
  action: string;
}) {
  const url = getUrlWithParam(SELF_MUTE_URL, {
    podiumId: podiumId,
  });

  return put(`${url}?action=${action}`, body);
}

export const useSelfMute = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_SELF_MUTE],
    mutationFn: ({
      data,
      podiumId,
      action,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
      action: string;
    }) => selfMuteQueryFn({ body: data, podiumId: podiumId, action }),
  });
  return mutation;
};
