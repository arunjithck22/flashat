import { BLOCK_FROM_HUDDLE_URL } from "@/common/constant";
import { put } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function blockOrUnblockFromHuddle({
  huddleId,
  body,
}: {
  huddleId: string;
  body: Record<string, unknown>;
}) {
  const url = getUrlWithParam(BLOCK_FROM_HUDDLE_URL, { huddleId });
  return put(url, body);
}

const useBlockOrUnblockFromHuddle = () => {
  const mutation = useMutation({
    mutationFn: ({
      data,
      huddleId,
    }: {
      data: Record<string, unknown>;
      huddleId: string;
    }) => blockOrUnblockFromHuddle({ huddleId, body: data }),
  });
  return mutation;
};

export default useBlockOrUnblockFromHuddle;
