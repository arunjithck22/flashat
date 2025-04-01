import { INVITED_URL } from "@/common/constant";
import { put } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

export const QKEY_INCOMING_HUDDLE_REQUESTS = "ncoming_huddle_requests";

async function RequestAction({
  huddleId,
  body,
}: {
  huddleId: string;
  body: Record<string, unknown>;
}) {
  try {
    const url = getUrlWithParam(INVITED_URL, { huddleId });
    const data = await put(url, body);
    console.log("newww data", data);
    return data;
  } catch (error) {
    console.error("Error in RequestAction:", error);
    throw error; // Re-throwing to ensure the error is handled upstream
  }
}

const useIncomingInviteActions = () => {
  const mutation = useMutation({
    mutationFn: async ({
      data,
      huddleId,
    }: {
      data: Record<string, unknown>;
      huddleId: string;
    }) => await RequestAction({ huddleId, body: data }),
  });
  return mutation;
};

export default useIncomingInviteActions;
