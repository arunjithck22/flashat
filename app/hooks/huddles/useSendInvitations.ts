import { INVITED_URL } from "@/common/constant";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function sendInvite({
  huddleId,
  body,
}: {
  huddleId: string;
  body: Record<string, unknown>;
}) {
  const url = getUrlWithParam(INVITED_URL, { huddleId });
  return post(url, body);
}

const useSendInvitations = () => {
  const mutation = useMutation({
    mutationFn: ({
      data,
      huddleId,
    }: {
      data: Record<string, unknown>;
      huddleId: string;
    }) => sendInvite({ huddleId, body: data }),
  });
  return mutation;
};

export default useSendInvitations;
