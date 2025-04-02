/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, ReactNode, useState } from "react";
import { useUpdateGlobalPodiumDataState } from "@/app/hooks/podiums/useUpdateGlobalPodiumDataState";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import { PODIUM_EVENTS } from "@/constants/events";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import Modal from "../ui/modal/Modal";
import AcceptSpeakInviteConfirmationModal from "@/view/podiums/live-podium/components/live-comment-wl-section/comments/components/comment/components/options-from-commentlist/components/AcceptSpeakInviteConfirmationModal";
import { useProfileContext } from "@/contexts/ProfileContext";
import {
  PodiumLiveChatPayload,
  RemoveWLSocketPayload,
  Speaker,
  SyncEventData,
  WaitList,
} from "@/types/podiums";

import { useRouter } from "next/navigation";
import { PODIUM_TABS } from "@/constants/podiums/constants";

interface PodiumEventListenerProps {
  children: ReactNode;
}

const PodiumEventListener: React.FC<PodiumEventListenerProps> = ({
  children,
}) => {
  const router = useRouter();
  const { socket } = usePodiumSocket();
  const { profileData } = useProfileContext();
  const updatePodiumDataState = useUpdateGlobalPodiumDataState();
  const {
    setAdminInvitesList,
    setAdminsList,
    setSpeakerList,
    setWaitingList,
    setFrozenUsers,
    setLiveChats,
    speakerList,
   
    setPodiumData
  } = usePodiumContext();

  const [acceptSpeakInviteModal, setAcceptSpeakInviteModal] = useState(false);

  const closeModals = ({
    setState,
  }: {
    setState: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    setState(false);
  };

  const handleAppointAdmin = (payload: any) => {
    console.log("appoint admin invite", payload, profileData?.id.toString());

    if (payload?.user_id) {
      setAdminInvitesList((prevList) => [...prevList, payload.user_id]);
      setAdminsList((prevList) =>
        prevList.filter((id) => id !== payload.user_id)
      );
    }
    if (payload?.user_id?.toString() === profileData?.id.toString()) {
      console.log("admin inivite11");
      updatePodiumDataState("invited_to_be_admin", true);
    }
  };

  const cancelAdminInvite = (payload: any) => {
    console.log("cancel admin invite", payload, profileData?.id.toString());

    if (payload?.user_id) {
      setAdminInvitesList((prevList) =>
        prevList.filter((id) => id !== payload.user_id)
      );
    }
    if (payload?.user_id?.toString() === profileData?.id.toString()) {
      console.log("admin inivite11");
      updatePodiumDataState("invited_to_be_admin", false);
    }
  };
  const handleNewAdmin = (payload: any) => {
    console.log("appoint admin", payload);

    if (payload?.user_id) {
      setAdminsList((prevList) => [...prevList, payload.user_id]);
    }
    setAdminInvitesList((prevList) =>
      prevList.filter((id) => id?.toString() !== payload.user_id?.toString())
    );
    if (payload?.user_id?.toString() === profileData?.id.toString()) {
      console.log("admin inivite11");
      updatePodiumDataState("invited_to_be_admin", false);
    }
  };

  const handleDismissAdmin = (payload: any) => {
    console.log("appoint admin", payload);

    if (payload?.user_id) {
      setAdminsList((prevList) => [...prevList, payload.user_id]);
    }
  };

  const handleSpeakerInvite = (payload: any) => {
    console.log("4444", payload, profileData);
    if (payload.invitee_id?.toString() === profileData?.id.toString()) {
      setAcceptSpeakInviteModal(true);
    }
    // setSpeakerInvites((prevList) => [...prevList, payload.invitee_id]);
  };

  const handleFreeze = (payload: any) => {
    if (payload?.user_id?.toString() === profileData?.id.toString()) {
      updatePodiumDataState("freeze", true);
    }
    setFrozenUsers((prevList) => [...prevList, payload?.user_id]);
  };
  const handleUnFreeze = (payload: any) => {
    if (payload?.user_id?.toString() === profileData?.id.toString()) {
      updatePodiumDataState("freeze", false);
    }
    setFrozenUsers((prevList) =>
      prevList?.filter((id) => id?.toString() !== payload.user_id?.toString())
    );
  };

  const handleLiveChatEvent = async (payload: PodiumLiveChatPayload) => {
    console.log("live chat payload ", payload);
    setLiveChats((prev: PodiumLiveChatPayload[]) => [...prev, payload]);
  };

  const handleBlock = (payload: any) => {
    setLiveChats([]);
    if (payload?.user_id?.toString() === profileData?.id?.toString()) {
      router.push(`/podiums/${PODIUM_TABS.LIVE_PODIUMS}`);
    }
  };

  const handleSyncEvent = async (payload: SyncEventData) => {
    console.log("payload sync", payload);
    setSpeakerList(payload?.speaker_list);
  };

  const handleEnterSpeakerList = async (payload: Speaker) => {
    console.log("speaker list", payload);
    setSpeakerList((prev: Speaker[]) => {
      if (prev.some((item) => item.id === payload.id)) {
        return prev;
      }
      return [...prev, payload];
    });
    setWaitingList((prev: WaitList[]) =>
      prev.filter((item) => item.id !== payload?.id)
    );
  };
  const handleExitSpeakerList = async (payload: RemoveWLSocketPayload) => {
    console.log("removee", payload);
    setSpeakerList((prev: Speaker[]) =>
      prev.filter((item) => item.id !== payload?.user_id)
    );
  };

  // making all other users add_to_main_screen_true except the user_id from socket payload
  const handleAddToMainScreen = async (payload: RemoveWLSocketPayload) => {
    const { user_id } = payload;

    const updatedSpeakerList = speakerList.map((speaker: Speaker) => {
      if (speaker.id === user_id) {
        return {
          ...speaker,
          add_to_main_screen: true,
        };
      } else {
        return {
          ...speaker,
          add_to_main_screen: false,
        };
      }
    });

    // Now, updatedSpeakerList contains the updated speakers list
    console.log(updatedSpeakerList);
  };

  const handleExitAdminsList = (payload: any) => {
    if (payload?.user_id) {
      setAdminsList((prevList) => [...prevList, payload.user_id]);
    }
  };

  const handlePausePodiumGifts = (payload:any)=>{
    updatePodiumDataState("podium_gift_paused",true)
    if (payload.user_id) {
      setPodiumData((prevData) => {
        if (!prevData) return prevData; // Ensure prevData exists
    
        return {
          ...prevData,
          gift_paused_participants: [
            ...(prevData.gift_paused_participants || []), // Preserve existing array or initialize it
            payload.user_id, // Append new user_id
          ],
        };
      });
    }
  }

  const handleResumePodiumGifts = (payload:any)=>{
    updatePodiumDataState("podium_gift_paused",false)
    if(payload.user_id){
      setPodiumData((prevData) => {
        if (!prevData) return prevData;
    
        return {
          ...prevData,
          gift_paused_participants: prevData.gift_paused_participants?.filter(
            (id) => id !== payload.user_id
          ) || [],
        };
      });
    }
  }

  const handleClosePodium = ()=>{
    router.push(`/podiums/${PODIUM_TABS.LIVE_PODIUMS}`)
  }

  useEffect(() => {
    if (!socket) return;

    const eventHandlers: Record<string, (payload: any) => void> = {
      [PODIUM_EVENTS.CHAT_ENABLED]: () =>
        updatePodiumDataState("chat_disabled", false),
      [PODIUM_EVENTS.CHAT_DISABLED]: () =>
        updatePodiumDataState("chat_disabled", true),
      [PODIUM_EVENTS.LIKES_ENABLED]: () =>
        updatePodiumDataState("likes_disabled", false),
      [PODIUM_EVENTS.LIKES_DISABLED]: () =>
        updatePodiumDataState("likes_disabled", true),
      [PODIUM_EVENTS.MIC_ENABLED]: () =>
        updatePodiumDataState("mic_disabled", false),
      [PODIUM_EVENTS.MIC_DISABLED]: () =>
        updatePodiumDataState("mic_disabled", true),
      [PODIUM_EVENTS.APPOINT_ADMIN]: (payload) => {
        handleAppointAdmin(payload);
      },
      [PODIUM_EVENTS.CANCEL_ADMIN_REQUEST]: (payload) => {
        cancelAdminInvite(payload);
      },
      [PODIUM_EVENTS.NEW_ADMIN]: (payload) => {
        handleNewAdmin(payload);
      },

      [PODIUM_EVENTS.DISMISS_ADMIN]: (payload) => {
        handleDismissAdmin(payload);
      },
      [PODIUM_EVENTS.PODIUM_SPEAKER_INVITE]: (payload) => {
        handleSpeakerInvite(payload);
      },

      [PODIUM_EVENTS.FREEZE]: (payload) => {
        handleFreeze(payload);
      },
      [PODIUM_EVENTS.UNFREEZE]: (payload) => {
        handleUnFreeze(payload);
      },

      [PODIUM_EVENTS.LIVE_CHAT]: (payload) => {
        handleLiveChatEvent(payload);
      },

      [PODIUM_EVENTS.BLOCK]: (payload) => {
        handleBlock(payload);
      },
      [PODIUM_EVENTS.SYNC]: (payload) => {
        handleSyncEvent(payload);
      },
      [PODIUM_EVENTS.EXIT_SPEAKER_LIST]: (payload) => {
        handleExitSpeakerList(payload);
      },
      [PODIUM_EVENTS.ENTER_SPEAKER_LIST]: (payload) => {
        handleEnterSpeakerList(payload);
      },
      [PODIUM_EVENTS.ADD_TO_MAIN_SCREEN]: (payload) => {
        handleAddToMainScreen(payload);
      },
      [PODIUM_EVENTS.EXIT_ADMIN_LIST]: (payload) => {
        handleExitAdminsList(payload);
      },
      [PODIUM_EVENTS.PAUSE_PODIUM_GIFTS]: (payload) => {
        handlePausePodiumGifts(payload)
      },
      [PODIUM_EVENTS.RESUME_PODIUM_GIFTS]: (payload) => {
        handleResumePodiumGifts(payload)
        
      },
      [PODIUM_EVENTS.CLOSE]: () => {
        handleClosePodium()
        
      },
    };

    // Attach event listeners
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Cleanup event listeners on unmount
    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket]);

  return (
    <>
      {children}
      <Modal
        backgroundClickClose={false}
        isOpen={acceptSpeakInviteModal}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setAcceptSpeakInviteModal });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <AcceptSpeakInviteConfirmationModal
          closeModal={() => {
            closeModals({ setState: setAcceptSpeakInviteModal });
          }}
        />
      </Modal>
    </>
  ); // Ensure a valid JSX return
};

export default PodiumEventListener;
