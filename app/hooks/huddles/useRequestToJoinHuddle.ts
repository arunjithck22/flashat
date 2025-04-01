import { REQUEST_URL } from "@/common/constant";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function requestToJoinHuddle({
  huddleId,
  body,
}: {
  huddleId: string;
  body: Record<string, unknown>;
}) {
  const url = getUrlWithParam(REQUEST_URL, { huddleId });
  return post(url, body);
}

const useRequestToJoinHuddle = () => {
  const mutation = useMutation({
    mutationFn: ({
      data,
      huddleId,
    }: {
      data: Record<string, unknown>;
      huddleId: string;
    }) => requestToJoinHuddle({ huddleId: huddleId, body: data }),
  });
  return mutation;
};

export default useRequestToJoinHuddle;
