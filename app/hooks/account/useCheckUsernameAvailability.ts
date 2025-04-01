import { CHECK_USERNAME_AVAILABLE_URL } from "@/constants/account";
import { get } from "@/service/http.service";
import { useMutation } from "@tanstack/react-query";

export const QKEY_CHECK_USERNAME = "check-username";

const checkUsernameAvailabilityQueryFn = ({
  username,
}: {
  username: string;
}) => {
  const url = `${CHECK_USERNAME_AVAILABLE_URL}?username=${username}`;
  return get({
    url: url,
  });
};

export const useCheckUsernameAvailability = () => {
  //   const response = useQuery({
  //     queryKey: [QKEY_CHECK_USERNAME, username],
  //     queryFn: () => checkUsernameAvailabilityQueryFn({ username }),
  //   });
  //   return response;
  const mutation = useMutation({
    mutationFn: ({ username }: { username: string }) =>
      checkUsernameAvailabilityQueryFn({ username: username }),
  });
  return mutation;
};
