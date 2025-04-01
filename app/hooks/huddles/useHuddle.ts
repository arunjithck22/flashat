import { HUDDLES_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { HttpResponse } from "@/types";
import { Huddles } from "@/types/huddles/index";
import { useQuery } from "@tanstack/react-query";

export const QKEY_HUDDLE = "get-huddle";

const getHuddle = (id: string): Promise<HttpResponse<Huddles>> => {
  return get({ url: `${HUDDLES_URL}/${id}` });
};

export const useHuddle = (id: string) => {
  const response = useQuery({
    queryKey: [QKEY_HUDDLE, id],
    queryFn: () => getHuddle(id),
  });

  return response;
};
