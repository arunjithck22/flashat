import { USER_ACCOUNT_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useQuery } from "@tanstack/react-query";

export const QKEY_USER_ACCOUNT = "user-account";

const getUserAccount = ({ userId }: { userId: string }) => {
  const url = getUrlWithParam(USER_ACCOUNT_URL, { id: userId });
  return get({
    url: url,
  });
};

export const useAccount = ({ userId }: { userId: string }) => {
  console.log("cloud id", userId);
  const response = useQuery({
    queryKey: [QKEY_USER_ACCOUNT, userId],
    queryFn: () => getUserAccount({ userId }),
    enabled: !!userId,
  });
  return response;
};
