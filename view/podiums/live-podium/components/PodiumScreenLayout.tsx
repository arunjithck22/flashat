"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const PodiumScreens = dynamic(() => import("./podium-screens/PodiumScreens"), {
  ssr: false,
});

import PodiumHeader from "./podium-header/PodiumHeader";
import { usePodiumDetails } from "@/app/hooks/podiums/usePodiumDetails";
import { useParams } from "next/navigation";
import { API_STATUS } from "@/common/constant";
import PodiumHeaderShimmer from "../../components/shimmers/PodiumHeaderShimmer";

import { Params } from "@/types";
import { IAgoraRTCClient } from "agora-rtc-react";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { useAdminsAndRequests } from "@/app/hooks/podiums/useAdminsAndRequests";
import { useFreezeOrUnFreezeParticipant } from "@/app/hooks/podiums/useFreezeOrUnFreezeParticipant";
import { usePodiumFrozenUsers } from "@/app/hooks/podiums/usePodiumFrozenUsers";

const PodiumScreenLayout = ({ client }: { client: IAgoraRTCClient }) => {
  const params: Params = useParams();
  console.log("params");
  const {
    data: podiumDataResponse,
    isLoading,
    status,
  } = usePodiumDetails({ podiumId: params?.id?.toString() || "" });

  const {
    podiumData,
    setPodiumData,
    setAdminInvitesList,
    adminInvitesList,
    setFrozenUsers,
  } = usePodiumContext();
  const { data: adminInvitesListResponse, status: AdminAPIStatus } =
    useAdminsAndRequests({
      podiumId: params?.id?.toString() || "",
      enabled: true,
    });
  const { data: frozenUserResponse, status: frozenApiStatus } =
    usePodiumFrozenUsers({
      podiumId: params?.id?.toString() || "",
      enabled: true,
    });

  useEffect(() => {
    if (podiumDataResponse?.result && status === API_STATUS?.SUCCESS) {
      setPodiumData(podiumDataResponse.result);
    }
  }, [podiumDataResponse, status]);
  useEffect(() => {
    if (
      adminInvitesListResponse?.pages &&
      AdminAPIStatus === API_STATUS.SUCCESS
    ) {
      // Extract user IDs where invited_to_be_admin is true
      const invitedUserIds = adminInvitesListResponse.pages.flatMap((page) =>
        page.result.users
          .filter((user) => user.invited_to_be_admin === true)
          .map((user) => user.id)
      );

      setAdminInvitesList(invitedUserIds);
    }
  }, [adminInvitesListResponse, AdminAPIStatus]);

  useEffect(() => {
    if (frozenUserResponse?.pages && AdminAPIStatus === API_STATUS.SUCCESS) {
      // Extract user IDs where invited_to_be_admin is true
      const frozenUserIds = frozenUserResponse.pages.flatMap((page) =>
        page.result.users.map((user) => user.id)
      );

      setFrozenUsers(frozenUserIds);
    }
  }, [frozenUserResponse, frozenApiStatus]);

  return (
    <section className="w-full ">
      {status === API_STATUS?.SUCCESS && podiumDataResponse && podiumData && (
        <PodiumHeader podiumData={podiumData} />
      )}
      {isLoading && <PodiumHeaderShimmer />}
      {status === API_STATUS?.SUCCESS && podiumData && (
        <div className="w-full h-[90vh]  lg:h-[110vh] xl:[h-120vh] sticky overflow-y-auto pb-28 custom-scrollbar">
          <PodiumScreens podiumData={podiumData} client={client} />
        </div>
      )}
    </section>
  );
};

export default PodiumScreenLayout;
