import { REQUEST_URL } from "@/common/constant";
import { put } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

async function RequestAction({
  huddleId,
  body,
}: {
  huddleId: string;
  body: Record<string, unknown>;
}) {
  try {
    const url = getUrlWithParam(REQUEST_URL, { huddleId });
    const data = await put(url, body);
    console.log("newwwwww", data);
    return data;
  } catch (error) {
    console.error("Error in RequestAction:", error);
  }
}

const useIncomingHuddleRequestActions = () => {
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

export default useIncomingHuddleRequestActions;
