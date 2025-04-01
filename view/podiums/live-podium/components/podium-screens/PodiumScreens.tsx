"use client";
import { useJoinPodium } from "@/app/hooks/podiums/useJoinPodium";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import {
  IAgoraRTCClient,
  useCurrentUID,
  useJoin,
  
} from "agora-rtc-react";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useGoLivePodium } from "@/app/hooks/podiums/useGoLivePodium";
import {
  AGORA_ROLES,
  PODIUM_JOINING_MODES,
  PODIUM_KINDS,
} from "@/constants/podiums/constants";

import { useSyncEvent } from "@/contexts/podium/SyncEventContext";

import { isCurrentUserInSpeakerList } from "@/utils/podiums/utils";
import { HttpResponse, Params, SocketEventMap } from "@/types";
import { JoinPodiumResponse, SinglePodium } from "@/types/podiums";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import LecturePodiumScreen from "./lecture-podium-screen/LecturePodiumScreen";
import { useLeavePodium } from "@/app/hooks/podiums/useLeavePodium";
import { useSocketEvents } from "@/app/hooks/sockets/useSocketEvents";
import { PODIUM_EVENTS } from "@/constants/events";
import Modal from "@/components/ui/modal/Modal";
import ExitWhenLiveInOtherModal from "./components/ExitWhenLiveInOtherModal";
import { useTrack } from "@/contexts/podium/TrackProvider";

import PodiumEventListener from "@/components/podium/PodiumEventListener";

import AdminInvite from "./components/AdminInvite";

const PodiumScreens = ({
  podiumData,
  client,
}: {
  client: IAgoraRTCClient;
  podiumData: SinglePodium | undefined;
}) => {
  const params: Params = useParams();
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID;

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const kind = searchParams.get("kind");
  const router = useRouter();
  const {
    speakerList,
    setSpeakerList,
    setUserStats,
    setAdminsList,
   
  } = usePodiumContext();
  const { syncEventData } = useSyncEvent();

  const { profileData } = useProfileContext();
  const currentUID = useCurrentUID();
  

  const [calling, setCalling] = useState(false);

  const [channel, setChannel] = useState("");
  const [token, setToken] = useState("");
  // const [micOn, setMic] = useState(false);
  // const [cameraOn, setCamera] = useState(false);
  const { micOn, setMic, cameraOn, setCamera } = useTrack();
  const [exitConfirmationModal, setExitConfirmationModal] = useState(false);
  const [exitMessage, setExitMessage] = useState("");
  const { socket } = usePodiumSocket();

  const { emitEvent } = useSocketEvents<keyof SocketEventMap>(socket);
  const [podiumIdToExit, setPodiumIdToExit] = useState("");

  const closeExitConformationModal = () => {
    setExitConfirmationModal(false);
  };

  console.log("agora role", client.role);

  // send attendance event in each 30 seconds

  useEffect(() => {
    if (!socket) return;

    console.log("33333", profileData);

    const emitAttendance = () => {
      emitEvent(PODIUM_EVENTS.ATTENDANCE, {
        user_id: profileData?.id?.toString() || "",
        podium_id: podiumData?.id?.toString() || "",
        role: podiumData?.role || "",
      });
    };

    // Emit immediately on mount
    emitAttendance();

    // Set interval to emit every 30 seconds
    const interval = setInterval(emitAttendance, 30000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [profileData?.id]);

  const joinPodiumMutation = useJoinPodium({
    podiumId: params?.id?.toString() || "",
  });
  const goLivePodiumMutation = useGoLivePodium({
    podiumId: params?.id?.toString() || "",
  });

  const leavePodiumMutation = useLeavePodium();

  useEffect(() => {
    if (params?.id && profileData) {
      if (mode === PODIUM_JOINING_MODES.JOIN) {
        handleJoinPodium();
      }
      if (mode === PODIUM_JOINING_MODES.GO_LIVE) {
        handleGoLivePodium();
      }
    }
  }, [params?.id, profileData]);

  useEffect(() => {
    if (token && channel && appID) {
      console.log("set calling ");
      setCalling(true);
      return;
    } else {
      setCalling(false);
    }
  }, [token, channel, appID]);

  useEffect(() => {
    if (podiumData?.speakers) {
      setSpeakerList(podiumData?.speakers);
    }
  }, [podiumData?.speakers]);

  useEffect(() => {
    if (syncEventData?.speaker_list?.length) {
      setSpeakerList(syncEventData?.speaker_list);
    }
  }, [syncEventData?.speaker_list]);

  useEffect(() => {
    if (syncEventData?.admin_list?.length) {
      setAdminsList(syncEventData?.admin_list);
    }
  }, [syncEventData?.admin_list]);

  // Update Agora Roles

  useEffect(() => {
    if (currentUID && speakerList?.length > 0) {
      const currentUserMatches = isCurrentUserInSpeakerList(
        speakerList,
        currentUID
      );
      if (currentUserMatches) {
        client?.setClientRole(AGORA_ROLES.HOST);
      } else {
        // client.unpublish()
        client?.setClientRole(AGORA_ROLES.AUDIENCE);
      }
    }
  }, [speakerList]);
  console.log("MIC ON", micOn);

  const handleJoinPodium = async () => {
    try {
      joinPodiumMutation.mutate(
        {
          data: {},
        },
        {
          onSuccess: (data: HttpResponse<JoinPodiumResponse>) => {
            console.log("join podium response", data);
            setUserStats({
              generosity: data?.result?.generosity,
              skills: data?.result?.skills,
              rating: profileData?.flax_rate_percentage || 0,
            });
            socket.emit("join", {
              room_type: "detail",
              user_id: profileData?.id,
              podium_id: params?.id,
            });

            const { agora_channel_id, agora_token } = data?.result || {};

            if (agora_channel_id && agora_token) {
              console.log("token", agora_token);
              setToken(agora_token);
              setChannel(agora_channel_id);
            } else {
              console.error("Invalid token or channel ID received.");
            }
          },
          onError: (error) => {
            try {
              const parsedError = JSON.parse(error.message);

              if (parsedError?.result?.reason === "LIVE_IN_OTHER_PODIUM") {
                setExitConfirmationModal(true);
                setPodiumIdToExit(parsedError?.result?.podium_id);
                setExitMessage(parsedError?.message);
              } else {
                router.push(`/podiums/live-podiums`);
              }
            } catch (e) {
              console.error("Failed to parse error:", e);
            }
            setCalling(false);
            // router.push(`/podiums/live-podiums`);
          },
        }
      );
    } catch (error) {
      console.error("Error handling join podium:", error);
    }
  };

  const handleGoLivePodium = async () => {
    try {
      goLivePodiumMutation.mutate(
        {
          data: {},
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (data: any) => {
            console.log("on success data", data);
            socket.emit("join", {
              room_type: "detail",
              user_id: profileData?.id,
              podium_id: params?.id,
            });

            const { agora_channel_id, agora_token } = data?.result || {};

            if (agora_channel_id && agora_token) {
              console.log("token", agora_token);
              setToken(agora_token);
              setChannel(agora_channel_id);
            } else {
              console.error("Invalid token or channel ID received.");
            }
          },
          onError: (error) => {
            try {
              const parsedError = JSON.parse(error.message);
              console.log("parsed error", parsedError);

              if (parsedError?.result?.reason === "LIVE_IN_OTHER_PODIUM") {
                setExitConfirmationModal(true);
                setPodiumIdToExit(parsedError?.result?.podium_id);
                setExitMessage(parsedError?.message);
              } else {
                router.push(`/podiums/live-podiums`);
              }
            } catch (e) {
              console.error("Failed to parse error:", e);
            }
            setCalling(false);

            // router.push(`/podiums/live-podiums`);
          },
        }
      );
    } catch (error) {
      console.error("Error handling go live podium:", error);
    }
  };

  const handleLeaveOldOrJoinNewPodium = ({
    podiumId,
  }: {
    podiumId: string;
  }) => {
    console.log("podium id to exit ", podiumId);
    try {
      leavePodiumMutation.mutate(
        {
          data: {},
          action: "leave",
          podiumId,
        },
        {
          onSuccess: (data) => {
            console.log("left podium through backend", data);
            emitEvent(PODIUM_EVENTS?.LEAVE, {
              room_type: "detail",
              user_id: profileData?.id?.toString() || "",
              podium_id: podiumId,
            });
            console.log("mode11", mode);
            if (mode === PODIUM_JOINING_MODES.JOIN) handleJoinPodium();
            else handleGoLivePodium();
            closeExitConformationModal();
          },
          onError: (error) => {
            console.error("Error joining podium:", error);
            setCalling(false);
          },
        }
      );
    } catch (error) {
      console.error("Error handling closing podium:", error);
    }
  };

  const data = useJoin(
    {
      appid: appID || "",
      channel: channel,
      token: token,
      uid: profileData?.id,
    },
    calling
  );
  console.log("data join", data);

  if (!appID) {
    console.error(
      "Agora App ID is missing. Ensure it's set in environment variables."
    );
    return null;
  }

  // useEffect(() => {
  //   if (socket) {
  //     socket.on(PODIUM_EVENTS.CHAT_ENABLED, handleChatEnable);
  //     socket.on(PODIUM_EVENTS.CHAT_DISABLED, handleChatDisable);
  //     socket.on(PODIUM_EVENTS.LIKES_ENABLED, handleLikesEnable);
  //     socket.on(PODIUM_EVENTS.LIKES_DISABLED, handleLikesDisable);
  //     socket.on(PODIUM_EVENTS.MIC_ENABLED, handleMicEnable);
  //     socket.on(PODIUM_EVENTS.MIC_DISABLED, handleMicDisable);
  //     socket.on(PODIUM_EVENTS.APPOINT_ADMIN, handleAppointAdmin);

  //     // Clean up the socket event listener
  //     return () => {
  //       socket.off(PODIUM_EVENTS.CHAT_ENABLED, handleChatEnable);
  //       socket.off(PODIUM_EVENTS.CHAT_DISABLED, handleChatEnable);
  //       socket.off(PODIUM_EVENTS.LIKES_DISABLED, handleLikesDisable);
  //       socket.off(PODIUM_EVENTS.LIKES_ENABLED, handleLikesEnable);
  //       socket.off(PODIUM_EVENTS.MIC_ENABLED, handleMicEnable);
  //       socket.off(PODIUM_EVENTS.MIC_DISABLED, handleMicDisable);
  //     };
  //   }
  // }, [socket]);

  // const handleChatEnable = () => {
  //   updatePodiumDataState("chat_disabled", false);
  // };

  // const handleChatDisable = () => {
  //   updatePodiumDataState("chat_disabled", true);
  // };

  // const handleLikesEnable = () => {
  //   updatePodiumDataState("likes_disabled", false);
  // };
  // const handleLikesDisable = () => {
  //   updatePodiumDataState("likes_disabled", true);
  // };

  // const handleMicEnable = () => {
  //   updatePodiumDataState("mic_disabled", false);
  // };
  // const handleMicDisable = () => {
  //   updatePodiumDataState("mic_disabled", true);
  // };
  // const handleAppointAdmin = () => {
  //   invited;
  // };

  return (
    <>
      <PodiumEventListener>
        <Modal
          isOpen={exitConfirmationModal}
          onClose={closeExitConformationModal}
          showCloseButton={false}
        >
          <ExitWhenLiveInOtherModal
            closeModal={closeExitConformationModal}
            proceedFunction={handleLeaveOldOrJoinNewPodium}
            podiumId={podiumIdToExit}
            exitMessage={exitMessage}
          />
        </Modal>
        {podiumData?.invited_to_be_admin && <AdminInvite />}
        {kind === PODIUM_KINDS.LECTURE && (
          <LecturePodiumScreen
            podiumData={podiumData}
            micOn={micOn}
            setMic={setMic}
            cameraOn={cameraOn}
            setCamera={setCamera}
          />
        )}
      </PodiumEventListener>
    </>
  );
};

export default PodiumScreens;
