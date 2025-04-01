import { PARTICIPANTS_URL } from "@/common/constant";
import { put } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function removeFromHuddle({
  huddleId,
  body,
}: {
  huddleId: string;
  body: Record<string, unknown>;
}) {
  const url = getUrlWithParam(PARTICIPANTS_URL, { huddleId });
  return put(url, body);
}

const useRemoveFromHuddle = () => {
  const mutation = useMutation({
    mutationFn: ({
      data,
      huddleId,
    }: {
      data: Record<string, unknown>;
      huddleId: string;
    }) => removeFromHuddle({ huddleId, body: data }),
  });
  return mutation;
};

export default useRemoveFromHuddle;
