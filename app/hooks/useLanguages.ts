import { USER_LANGUAGES_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { useQuery } from "@tanstack/react-query";

const getLanguages = () => {
  return get({ url: `${USER_LANGUAGES_URL}` });
};
export const QKEY_LANGUAGES = "languages";

export const useLanguages = () => {
  const response = useQuery({
    queryKey: [QKEY_LANGUAGES],
    queryFn: () => getLanguages(),
  });

  return response;
};
