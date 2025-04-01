import { HUDDLES_URL } from "@/common/constant";
import { post } from "@/service/http.service";
import { useMutation } from "@tanstack/react-query";

function createHuddle(data: FormData) {
  return post(HUDDLES_URL, data);
}

// React Query Mutation Hook
const useCreateHuddle = () => {
  return useMutation({
    mutationFn: (data: FormData) => createHuddle(data),
  });
};

export default useCreateHuddle;
