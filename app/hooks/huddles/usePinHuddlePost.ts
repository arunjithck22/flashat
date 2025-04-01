import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";
import { PIN_HUDDLE_POST } from "@/common/constant";

function pinPost({
  huddleId,
  body,
}: {
  huddleId: string;
  body: Record<string, unknown>;
}) {
  console.log("body payload", body);
  const url = getUrlWithParam(PIN_HUDDLE_POST, { huddleId });
  return post(url, body);
}

const usePinHuddlePost = () => {
  const mutation = useMutation({
    mutationFn: ({
      data,
      huddleId,
    }: {
      data: Record<string, unknown>;
      huddleId: string;
    }) => pinPost({ huddleId, body: data }),
  });
  return mutation;
};

export default usePinHuddlePost;
