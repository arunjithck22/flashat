import { FLIX_USERS } from "@/constants/buyFlixCoins";
import { get } from "@/service/http.service";
import { useQuery } from "@tanstack/react-query";

export const QKEY_GET_USERS = "get-users";

const getAllUsers = (searchKey: string) => {
  const url = FLIX_USERS;
  return get({
    url: url,
    params: {
      sort: "created_on",
      sort_order: "desc",
      page: 1,
      status_filter: ["Active"],
      page_count: 50,
      keyword: searchKey || "",
      membership_filter: ["Premium"],
    },
  });
};

export const useFlixPurchasedUsers = ({ searchKey }: { searchKey: string }) => {
  const response = useQuery({
    queryKey: [QKEY_GET_USERS, searchKey],
    queryFn: () => getAllUsers(searchKey),
  });
  return response;
};
