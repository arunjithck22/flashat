import Image from "next/image";
import React, { useState } from "react";

import Modal from "@/components/ui/modal/Modal";
import AdminsAndRequests from "./components/admins-and-requests/AdminsAndRequests";
import DropDownMenuBox from "@/components/ui/DropdownBox/DropDownMenu";
import { KababOptionsInterface, TranslationFunction } from "@/types";

import { PODIUM_ROLES } from "@/constants/podiums/constants";
import { useTranslations } from "use-intl";
import RestrictedUsers from "./components/restricted-users/RestrictedUsers";
import PauseCommentsConfirmationModal from "./components/PauseCommentsConfirmationModal";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import SendInvitations from "./components/send-invitations/SendInvitations";
import PauseLikeConfirmationModal from "./components/PauseLikeConfirmationModal";
import PauseSpeakingRequestConfirmation from "./components/PauseSpeakingRequestConfirmation";
import { useProfileContext } from "@/contexts/ProfileContext";
import { isManagerOnline } from "@/utils/podiums/utils";
import EndLiveConfirmationModal from "./components/EndLiveConfirmationModal";
import ExitLiveConfirmationModal from "./components/ExitLiveConfirmation";
import { USER_CITIZENSHIP } from "@/common/constant";
import PauseGiftConfirmationModal from "./components/PauseGiftConfirmationModal";
const SettingsWheel = ({
  role,
  profile_pic,
}: {
  role: string;
  profile_pic: string;
}) => {
  const { podiumData, adminsList } = usePodiumContext();
  const { profileData } = useProfileContext();
  const t: TranslationFunction = useTranslations("podiums");

  const [AdminsAndRequestsOpen, setAdminsAndRequestsOpen] = useState(false);

  const [restrictedUsersOpen, setRestrictedUsersOpen] = useState(false);

  const [pauseCommentConfirmation, setPauseCommentConfirmation] =
    useState(false);

  const [sendInvitationsOpen, setSendInvitationsOpen] = useState(false);

  const [pauseLikesOpen, setPauseLikesOpen] = useState(false);

  const [pauseSpeakRequestsOpen, setPauseSpeakRequestsOpen] = useState(false);

  const [pauseGiftOpen,setPauseGiftOpen]=useState(false)

  const [endLiveOpen, setEndLiveOpen] = useState(false);
  const [exitLiveOpen, setExitLiveOpen] = useState(false);

  // added for temporary usage

  const wheelItemsForManager: KababOptionsInterface[] = [
    {
      id: 1,
      label: t("admins_and_requests"),
      onClick: () => {
        setAdminsAndRequestsOpen(true);
      },
      condition: role === PODIUM_ROLES.MANAGER,
    },
    {
      id: 2,
      label: t("restricted_users"),
      onClick: () => {
        setRestrictedUsersOpen(true);
      },
      condition: true,
    },
    {
      id: 3,
      label: podiumData?.chat_disabled
        ? t("resume_comments")
        : t("pause_comments"),
      onClick: () => {
        setPauseCommentConfirmation(true);
      },
      condition: true,
    },
    {
      id: 4,
      label: t("send_invitations"),
      onClick: () => {
        setSendInvitationsOpen(true);
      },
      condition: true,
    },
    {
      id: 5,
      label: podiumData?.likes_disabled ? t("resume_likes") : t("pause_likes"),
      onClick: () => {
        setPauseLikesOpen(true);
      },
      condition: true,
    },
    {
      id: 6,
      label: podiumData?.mic_disabled
        ? t("resume_speaking_requests")
        : t("pause_speaking_requests"),
      onClick: () => {
        setPauseSpeakRequestsOpen(true);
      },
      condition: true,
    },
    {
      id: 51,
      label: podiumData?.podium_gift_paused
        ? t("resume_gift")
        : t("pause_gift"),
      onClick: () => {
        setPauseGiftOpen(true);
      },
      condition: true,
    },
    {
      id: 7,
      label: t("exit"),
      onClick: () => {
        setExitLiveOpen(true);
      },
      condition:
        (role === PODIUM_ROLES.MANAGER && adminsList.length > 1) ||
        adminsList?.length > 1,
    },
    {
      id: 8,
      label: t("end_live"),
      onClick: () => {
        setEndLiveOpen(true);
      },
      condition:
        role === PODIUM_ROLES.MANAGER ||
        !isManagerOnline(
          adminsList,
          podiumData?.manager_id?.toString() || ""
        ) ||
        adminsList.length === 1 ||
        profileData?.citizenship === USER_CITIZENSHIP.MINISTER ||
        profileData?.citizenship === USER_CITIZENSHIP.PRESIDENT,
    },
  ];

  const wheelItemsForNormalUsers: KababOptionsInterface[] = [
    {
      id: 1,
      label: "PodiumInfo",
      onClick: () => {
        // setAdminsAndRequestsOpen(true);
      },
      condition: true,
    },
    {
      id: 2,
      label: "Share",
      onClick: () => {},
      condition: true,
    },
    {
      id: 3,
      label: "Exit",
      onClick: () => {
        setExitLiveOpen(true);
      },
      condition: true,
    },
    {
      id: 4,
      label: "End Live",
      onClick: () => {
        setEndLiveOpen(true);
      },
      condition:
        profileData?.empowerments.allow_end_podium ||
        profileData?.citizenship === USER_CITIZENSHIP.MINISTER ||
        profileData?.citizenship === USER_CITIZENSHIP.PRESIDENT,
    },
    {
      id: 5,
      label: "Step Down",
      onClick: () => {},
      condition: false,
    },
  ];

  console.log(
    "isManagerOnline1",
    role,
    adminsList,
    adminsList.length,
    isManagerOnline(adminsList, podiumData?.manager_id?.toString() || "")
  );

  const closeSettingsWheelModals = ({
    setState,
  }: {
    setState: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    setState(false);
  };

  return (
    <>
      <DropDownMenuBox
        trigger={
          <div className="relative outline-none">
            <div className="absolute -top-1 -left-1">
              <div className="relative rounded-full cursor-pointer w-4 h-4 bg-white p-1 flex justify-center items-center">
                <Image
                  alt="profile"
                  src={"/podiums/podium-settings.svg"}
                  width={200}
                  height={200}
                  className="w-full h-full"
                />
              </div>
            </div>
            <Image
              alt="profile"
              src={profile_pic}
              className="h-12 w-12 rounded object-cover position-center mr-4 border border-primary"
              style={{ backgroundColor: "rgba(116, 125, 135, 0.202484)" }}
              width={100}
              height={100}
            />
          </div>
        }
        items={
          role === PODIUM_ROLES.MANAGER || role === PODIUM_ROLES.ADMIN
            ? wheelItemsForManager.filter((item) => item.condition)
            : wheelItemsForNormalUsers.filter((item) => item.condition)
        }
      />

      <Modal
        isOpen={AdminsAndRequestsOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setAdminsAndRequestsOpen });
        }}
        title={t("admins_and_requests")}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <AdminsAndRequests isOpen={AdminsAndRequestsOpen} />
      </Modal>

      <Modal
        isOpen={restrictedUsersOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setRestrictedUsersOpen });
        }}
        title={t("restricted_users")}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <RestrictedUsers isOpen={restrictedUsersOpen} />
      </Modal>
      <Modal
        isOpen={pauseCommentConfirmation}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setPauseCommentConfirmation });
        }}
        title={""}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <PauseCommentsConfirmationModal
          closeModal={() => {
            closeSettingsWheelModals({ setState: setPauseCommentConfirmation });
          }}
        />
      </Modal>
      <Modal
        isOpen={sendInvitationsOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setSendInvitationsOpen });
        }}
        title={"Send invitations"}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <SendInvitations
          closeModal={() => {
            closeSettingsWheelModals({ setState: setSendInvitationsOpen });
          }}
        />
      </Modal>

      <Modal
        isOpen={pauseLikesOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setSendInvitationsOpen });
        }}
        title={""}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <PauseLikeConfirmationModal
          closeModal={() => {
            closeSettingsWheelModals({ setState: setPauseLikesOpen });
          }}
        />
      </Modal>
{/* pause gift  */}
      <Modal
        isOpen={pauseGiftOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setPauseGiftOpen });
        }}
        title={""}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <PauseGiftConfirmationModal
          closeModal={() => {
            closeSettingsWheelModals({ setState: setPauseGiftOpen });
          }}
        />
      </Modal>

      <Modal
        isOpen={pauseSpeakRequestsOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setPauseSpeakRequestsOpen });
        }}
        title={""}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <PauseSpeakingRequestConfirmation
          closeModal={() => {
            closeSettingsWheelModals({ setState: setPauseSpeakRequestsOpen });
          }}
        />
      </Modal>
      <Modal
        isOpen={pauseSpeakRequestsOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setPauseSpeakRequestsOpen });
        }}
        title={""}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <PauseSpeakingRequestConfirmation
          closeModal={() => {
            closeSettingsWheelModals({ setState: setPauseSpeakRequestsOpen });
          }}
        />
      </Modal>
      <Modal
        isOpen={endLiveOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setEndLiveOpen });
        }}
        title={""}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <EndLiveConfirmationModal
          closeModal={() => {
            closeSettingsWheelModals({ setState: setEndLiveOpen });
          }}
        />
      </Modal>
      <Modal
        isOpen={exitLiveOpen}
        showCloseButton={false}
        onClose={() => {
          closeSettingsWheelModals({ setState: setExitLiveOpen });
        }}
        title={""}
        titleClassName="text-center flex justify-center w-full text-md"
      >
        <ExitLiveConfirmationModal
          closeModal={() => {
            closeSettingsWheelModals({ setState: setExitLiveOpen });
          }}
        />
      </Modal>
    </>
  );
};

export default SettingsWheel;
