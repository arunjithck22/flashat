import { BLOCK_OR_UNBLOCK_PODIUM_PARTICIPANT_URL} from "@/constants/podiums/apiUrls";
import {
    QKEY_BLOCK_OR_UNBLOCK_FROM_PODIUM,
 
  
} from "@/constants/podiums/queryKeys";
import { put } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function blockOrUnblockQueryFn({
  body,
  podiumId,
  participantId,
  action,
}: {
  body: Record<string, unknown>;
  podiumId: string;
  participantId:string
  action: string;
}) {
  const url = getUrlWithParam(BLOCK_OR_UNBLOCK_PODIUM_PARTICIPANT_URL, {
    podiumId: podiumId,
    participantId:participantId
  });

  return put(`${url}?action=${action}`, body);
}

export const useBlockOrUnBlockFromPodium = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_BLOCK_OR_UNBLOCK_FROM_PODIUM],
    mutationFn: ({
      data,
      podiumId,
      participantId,
      action,
    }: {
      data: Record<string, unknown>;
      podiumId: string;
      action: string;
      participantId:string
    }) => blockOrUnblockQueryFn({ body: data, podiumId: podiumId, action ,participantId}),
  });
  return mutation;
};
