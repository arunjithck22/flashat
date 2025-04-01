import { JOIN_HUDDLE_URL } from "@/common/constant";
import { post } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useMutation } from "@tanstack/react-query";

function joinHuddle({ huddleId }: { huddleId: string }) {
  const url = getUrlWithParam(JOIN_HUDDLE_URL, { huddleId });
  return post(url);
}

const useJoinHuddle = () => {
  const mutation = useMutation({
    mutationFn: ({ huddleId }: { huddleId: string }) =>
      joinHuddle({ huddleId }),
  });

  return mutation;
};

export default useJoinHuddle;
