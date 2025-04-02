"use client";

import Modal from "@/components/ui/modal/Modal";
import Image from "next/image";
import React, { useState } from "react";

import DismissAdminConfirmationModal from "./components/DismissAdminConfirmationModal";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { PODIUM_ROLES } from "@/constants/podiums/constants";
import {
  isAdmin,
  isAdminInvited,
  isUserFrozen,
  isUserInSpeakerList,
  isUsersGiftPaused,
} from "@/utils/podiums/utils";

import CancelAdminInviteConfirmationModal from "./components/CancelAdminInviteConfirmationModal";
import MakeAdminConfirmationModal from "./components/MakeAdminConfimationModal";
import InviteToSpeakConfirmationModal from "./components/InviteTospeakConfirmationModal";
import { useProfileContext } from "@/contexts/ProfileContext";
import FreezeUserConfirmationModal from "./components/FreezeUserConfirmationModal";
import UnFreezeUserConfirmationModal from "./components/UnFreezeUserConfirmationModal";

import IDCardModal from "@/components/cloud-id-card/IDCardModal";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import PodiumBlockConfirmationModal from "./components/PodiumBlockConfirmationModal";
import PauseGiftConfirmationModal from "./components/PauseGiftConfirmationModal";
import ResumeGiftConfirmationModal from "./components/ResumeGiftConfirmationModal";
import { usePodiumUserDetails } from "@/app/hooks/podiums/usePodiumUsersDetails";
import { useFollowUser } from "@/app/hooks/common/useFollowUser";
import { useUnFollowUser } from "@/app/hooks/common/useUnFollowUser";
import { notification } from "@/utils/toastService";
import { API_STATUS } from "@/common/constant";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_FOLLOW_USER, QKEY_UNFOLLOW_USER } from "@/constants/queryKeys";


interface LiveChatActionProps {
  sender_id: string | undefined;
  isPremium: boolean | undefined;
  closeActionsBar?: () => void;
  loading?:boolean
}

const LiveChatActions = ({ isPremium, sender_id,closeActionsBar }: LiveChatActionProps) => {
  const t: TranslationFunction = useTranslations("podiums");
  const { podiumData, adminsList, adminInvitesList, speakerList, frozenUsers } =
    usePodiumContext();

  const {data:participantData,status:participantDataStatus} = usePodiumUserDetails({
    podiumId: podiumData?.id?.toString() || "",
    participantId: sender_id || "",
  });

  const queryClient = useQueryClient()

  console.log("participantData",participantData)
  const { profileData } = useProfileContext();
  const [makeAdminsConfirmationOpen, setMakeAdminConfirmationOpen] =
    useState(false);
  const [dismissConfirmationModalOpen, setDismissConfirmationModalOpen] =
    useState(false);
  const [
    cancelAdminInviteConfirmationOpen,
    setCancelAdminInviteConfirmationOpen,
  ] = useState(false);

  const [inviteToSpeakConfirmationOpen, setInviteToSpeakConfirmationOpen] =
    useState(false);
  const [freezeConfirmationModalOpen, setFreezeConfirmationModalOpen] =
    useState(false);

  const [unFreezeConfirmationModalOpen, setUnFreezeConfirmationModalOpen] =
    useState(false);

  const [IDcardModalOpen, setIdCardModalOpen] = useState(false);
  const [podiumBlockConfirmationModal, setPodiumBlockConfirmationModal] =
    useState(false);

  const [pauseGiftOpen, setPauseGiftOpen] = useState(false);
  const [resumeGiftOpen, setResumeGiftOpen] = useState(false);

  console.log("8888", podiumData);

  const followMutation = useFollowUser()

  const unFollowMutation = useUnFollowUser()

  const handlUnfollow = ()=>{
    unFollowMutation.mutate(
      {
        data: {
          star_id:sender_id?.toString() || ""
        },
      
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          
          queryClient.invalidateQueries({queryKey:[QKEY_UNFOLLOW_USER]})
          notification.success({
            message: data.message,
            position: "bottom-right",
            icon: (
              <Image
                width={40}
                height={40}
                alt="logo"
                src={"/logo/flashat-logo.png"}
              />
            ),
          });
        closeActionsBar?.()
          
        },
        onError: (error) => {
          console.error("error dismiss:", error);
        },
      }
    );
  };

  const handleFollow = ()=>{  
    followMutation.mutate(
      {
        data: {
          star_id:sender_id?.toString() || ""
        },
      
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({queryKey:[QKEY_FOLLOW_USER]})
          notification.success({
            message: data.message,
            position: "bottom-right",
            icon: (
              <Image
                width={40}
                height={40}
                alt="logo"
                src={"/logo/flashat-logo.png"}
              />
            ),
          });
          closeActionsBar?.()
        },
        onError: (error) => {
          console.error("error dismiss:", error);
        },
      }
    );
  };

  const ActionsForOthers = [
    {
      id: 1,
      label: t("make_admin"),
      onClick: () => setMakeAdminConfirmationOpen(true),
      condition:
        podiumData?.role === PODIUM_ROLES.MANAGER &&
        !isAdmin(adminsList, sender_id?.toString()) &&
        !isAdminInvited(adminInvitesList, sender_id?.toString()) &&
        isPremium &&
        sender_id?.toString() !== profileData?.id?.toString(),
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 10,
      label: t("dismiss_as_admin"),
      onClick: () => setDismissConfirmationModalOpen(true),
      condition:
        podiumData?.role === PODIUM_ROLES.MANAGER &&
        isPremium &&
        isAdmin(adminsList, sender_id?.toString()) &&
        sender_id?.toString() !== profileData?.id?.toString(),
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 10,
      label: t("cancel_admin_invite"),
      onClick: () => setCancelAdminInviteConfirmationOpen(true),
      condition:
        podiumData?.role === PODIUM_ROLES.MANAGER &&
        isPremium &&
        isAdminInvited(adminInvitesList, sender_id?.toString()) &&
        sender_id?.toString() !== profileData?.id?.toString(),
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 2,
      label: t("send_gift"),
      onClick: () => alert("User muted!"),
      condition: false,
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 3,
      label: t("pause_gift"),
      onClick: () => setPauseGiftOpen(true),
      condition:
        !podiumData?.podium_gift_paused &&
        (podiumData?.role === PODIUM_ROLES.MANAGER ||
          podiumData?.role === PODIUM_ROLES.ADMIN) &&
        !isUsersGiftPaused(
          podiumData?.gift_paused_participants || [],
          sender_id
        ),
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 31,
      label: t("resume_gift"),
      loading:true,
      onClick: () => setResumeGiftOpen(true),
      condition:
        podiumData?.podium_gift_paused &&
        (podiumData?.role === PODIUM_ROLES.MANAGER ||
          podiumData?.role === PODIUM_ROLES.ADMIN) &&
        isUsersGiftPaused(
          podiumData?.gift_paused_participants || [],
          sender_id
        ),
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 4,
      label: t("invite_to_speak"),
      onClick: () => {
        setInviteToSpeakConfirmationOpen(true);
      },
      condition:
        (podiumData?.role === PODIUM_ROLES.MANAGER ||
          podiumData?.role === PODIUM_ROLES.ADMIN) &&
        sender_id?.toString() !== podiumData?.manager_id?.toString() &&
        !isUserInSpeakerList(speakerList, sender_id) &&
        sender_id?.toString() !== profileData?.id?.toString(),

      icon: "/podiums/make-admins.svg",
    },
    {
      id: 5,
      label: t("unfollow"),
      onClick: () => {
        handlUnfollow()
      },
      loading:unFollowMutation.isPending,
      condition: sender_id?.toString() !== profileData?.id?.toString() && participantData?.result.is_followed && participantDataStatus === API_STATUS.SUCCESS ,
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 51,
      label: t("follow"),
      loading:followMutation.isPending,
      onClick: () => {
        handleFollow()
      },
      condition: sender_id?.toString() !== profileData?.id?.toString() && !participantData?.result.is_followed && participantDataStatus === API_STATUS.SUCCESS ,
      icon: "/podiums/make-admins.svg",
    },
    // {
    //   id: 6,
    //   label: "Send Private Message",
    //   onClick: () => alert("Send Private Message"),
    //   condition: true,
    //   icon: "/podiums/make-admins.svg",
    // },
    {
      id: 7,
      label: t("id_card"),
      onClick: () => {
        setIdCardModalOpen(true);
      },
      condition: true,
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 8,
      label: t("freeze"),
      onClick: () => {
        setFreezeConfirmationModalOpen(true);
      },
      condition:
        (podiumData?.role === PODIUM_ROLES.MANAGER ||
          (podiumData?.role === PODIUM_ROLES.ADMIN &&
            profileData?.is_premium)) &&
        !isUserFrozen(frozenUsers, sender_id) &&sender_id?.toString() !== profileData?.id?.toString(),
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 9,
      label: t("unfreeze"),
      onClick: () => {
        setUnFreezeConfirmationModalOpen(true);
      },
      condition:
        (podiumData?.role === PODIUM_ROLES.MANAGER ||
          (podiumData?.role === PODIUM_ROLES.ADMIN &&
            profileData?.is_premium)) &&
        isUserFrozen(frozenUsers, sender_id),
      icon: "/podiums/make-admins.svg",
    },
    {
      id: 10,
      label: t("block"),
      onClick: () => {
        setPodiumBlockConfirmationModal(true);
      },
      condition:
        (podiumData?.role === PODIUM_ROLES.MANAGER ||
        (podiumData?.role === PODIUM_ROLES.ADMIN && profileData?.is_premium)) && sender_id?.toString() !== profileData?.id?.toString(),
      icon: "/podiums/make-admins.svg",
      textColor: "bg-red-500",
    },
    // {
    //   id: 11,
    //   label: t("unblock"),
    //   onClick: () => alert("freeze"),
    //   condition: true,
    //   icon: "/podiums/make-admins.svg",
    //   textColor: "bg-red-500",
    // },
  ];

  console.log("frozen users", profileData);

  const closeModals = ({
    setState,
  }: {
    setState: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    setState(false);
  };
  return (
    <>
      <div className="flex flex-col bg-white gap-2">
        {ActionsForOthers.filter((option) => option.condition).map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between w-full border rounded-lg gap-2 p-2 py-4 hover:bg-gray-100 cursor-pointer"
            onClick={option.onClick}
          >
            <div className="flex items-center w-full gap-2">
            <Image
              src={option.icon}
              alt={option.label}
              width={10}
              height={10}
              className="w-5 h-5"
            />
            <span>{option.label}</span>
            
            </div>
            {
              option?.loading && <div className="px-2">
                <div
              className={`w-5 h-5  border-2 border-primary border-t-transparent rounded-full animate-spin`}
            ></div>
              </div>
            }
          </div>
        ))}
      </div>

      <Modal
        isOpen={makeAdminsConfirmationOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setMakeAdminConfirmationOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <MakeAdminConfirmationModal
          participantId={sender_id || ""}
          closeModal={() => {
            closeModals({ setState: setMakeAdminConfirmationOpen });
          }}
        />
      </Modal>

      <Modal
        isOpen={dismissConfirmationModalOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setDismissConfirmationModalOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <DismissAdminConfirmationModal
          participantId={sender_id || ""}
          closeModal={() => {
            closeModals({ setState: setDismissConfirmationModalOpen });
          }}
        />
      </Modal>
      <Modal
        isOpen={cancelAdminInviteConfirmationOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setCancelAdminInviteConfirmationOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <CancelAdminInviteConfirmationModal
          participantId={sender_id || ""}
          closeModal={() => {
            closeModals({ setState: setCancelAdminInviteConfirmationOpen });
          }}
        />
      </Modal>

      {/* invite to speak */}

      <Modal
        isOpen={inviteToSpeakConfirmationOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setInviteToSpeakConfirmationOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <InviteToSpeakConfirmationModal
          participantId={sender_id || ""}
          closeModal={() => {
            closeModals({ setState: setInviteToSpeakConfirmationOpen });
          }}
        />
      </Modal>

      <Modal
        isOpen={freezeConfirmationModalOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setFreezeConfirmationModalOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <FreezeUserConfirmationModal
          participantId={sender_id || ""}
          closeModal={() => {
            closeModals({ setState: setFreezeConfirmationModalOpen });
          }}
        />
      </Modal>

      <Modal
        isOpen={unFreezeConfirmationModalOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setUnFreezeConfirmationModalOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <UnFreezeUserConfirmationModal
          participantId={sender_id || ""}
          closeModal={() => {
            closeModals({ setState: setUnFreezeConfirmationModalOpen });
          }}
        />
      </Modal>

      <Modal
        isOpen={IDcardModalOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setIdCardModalOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <IDCardModal user_id={sender_id || ""} />
      </Modal>

      <Modal
        isOpen={podiumBlockConfirmationModal}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setPodiumBlockConfirmationModal });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <PodiumBlockConfirmationModal
          closeModal={() => {
            closeModals({ setState: setPodiumBlockConfirmationModal });
          }}
          participantId={sender_id}
        />
      </Modal>

      <Modal
        isOpen={pauseGiftOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setPauseGiftOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <PauseGiftConfirmationModal
          closeModal={() => {
            closeModals({ setState: setPauseGiftOpen });
          }}
          participantId={sender_id?.toString() || ""}
        />
      </Modal>

      <Modal
        isOpen={resumeGiftOpen}
        showCloseButton={false}
        onClose={() => {
          closeModals({ setState: setResumeGiftOpen });
        }}
        title=""
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <ResumeGiftConfirmationModal
          closeModal={() => {
            closeModals({ setState: setResumeGiftOpen });
          }}
          participantId={sender_id?.toString() || ""}
        />
      </Modal>
    </>
  );
};

export default LiveChatActions;
