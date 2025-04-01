"use client";

import { REQUEST_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useQuery } from "@tanstack/react-query";

export const QKEY_INCOMING_HUDDLE_REQUESTS = "ncoming_huddle_requests";

const getIncomingHuddleRequests = ({ huddleId }: { huddleId: string }) => {
  const url = getUrlWithParam(REQUEST_URL, { huddleId });
  return get({
    url: url,
  });
};

export const useIncomingHuddleRequests = ({
  huddleId,
}: {
  huddleId: string;
}) => {
  const response = useQuery({
    queryKey: [QKEY_INCOMING_HUDDLE_REQUESTS, huddleId],
    queryFn: () => getIncomingHuddleRequests({ huddleId }),
    enabled: !!huddleId,
  });
  return response;
};
