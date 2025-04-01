import {
  PODIUM_LEAVE_URL,
  PODIUM_CLOSE_URL,
  PODIUM_EXIT_URL,
} from "@/constants/podiums/apiUrls";
import { QKEY_LEAVE_OR_CLOSE_PODIUM } from "@/constants/podiums/queryKeys";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function leavePodiumQueryFn({
  podiumId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
}) {
  const url = getUrlWithParam(PODIUM_LEAVE_URL, { podiumId: podiumId });
  return post(url);
}

function closePodiumQueryFn({
  podiumId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
}) {
  const url = getUrlWithParam(PODIUM_CLOSE_URL, { podiumId: podiumId });
  return post(url);
}

function exitWithCancelInvitePodiumQueryFn({
  podiumId,
}: {
  body?: Record<string, unknown>;
  podiumId: string;
}) {
  const url = getUrlWithParam(PODIUM_EXIT_URL, { podiumId: podiumId });
  return post(url);
}

export const useLeavePodium = () => {
  const mutation = useMutation({
    mutationKey: [QKEY_LEAVE_OR_CLOSE_PODIUM],
    mutationFn: ({
      data,
      podiumId,
      action,
    }: {
      data: Record<string, unknown>;
      action?: string;
      podiumId: string;
    }) => {
      if (action === "leave") {
        return leavePodiumQueryFn({ body: data, podiumId });
      } else if (action === "close") {
        return closePodiumQueryFn({ body: data, podiumId });
      } else if (action === "exit") {
        return exitWithCancelInvitePodiumQueryFn({ body: data, podiumId });
      } else {
        throw new Error(`Invalid action: ${action}`);
      }
    },
  });
  return mutation;
};
