"use client";
import { INVITED_URL } from "@/common/constant";
import { get } from "@/service/http.service";
import { getUrlWithParam } from "@/utils/clientUtils";
import { useQuery } from "@tanstack/react-query";

export const QKEY_INVITED_MEMBERS = "invited-members";

const getInvitedMembers = ({ huddleId }: { huddleId: string }) => {
  const url = getUrlWithParam(INVITED_URL, { huddleId });
  return get({
    url: url,
  });
};

export const useInvitedMembers = ({ huddleId }: { huddleId: string }) => {
  const response = useQuery({
    queryKey: [QKEY_INVITED_MEMBERS, huddleId],
    queryFn: () => getInvitedMembers({ huddleId }),
    enabled: !!huddleId,
  });
  return response;
};
