import {
  useWaitingList,
  WaitListResponse,
} from "@/app/hooks/podiums/useWaitingList";
import { API_STATUS } from "@/common/constant";
import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/modal/Modal";
import { PODIUM_EVENTS } from "@/constants/events";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import { truncateName } from "@/utils/truncateName";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SpeakRequest from "./SpeakRequest";
import { HttpResponse, Params, TranslationFunction } from "@/types";
import { RemoveWLSocketPayload, SinglePodium, WaitList } from "@/types/podiums";

import { useProfileContext } from "@/contexts/ProfileContext";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import waitingListModal from "./components/view-all/WaitingListModal";
import WaitingListModal from "./components/view-all/WaitingListModal";
import { useTranslations } from "next-intl";

const WaitingList = ({
  podiumData,
}: {
  podiumData: SinglePodium | undefined;
}) => {
  const params: Params = useParams();
  const t: TranslationFunction = useTranslations("podiums");

  const [speakRequestDisabled, setSpeakRequestDisabled] = useState(false);

  const { profileData } = useProfileContext();

  const { speakerList, waitingList, setWaitingList } = usePodiumContext();

  // disabling the button if the user  is already  in speakerlist or waiting list

  useEffect(() => {
    const isSpeaker = speakerList.some(
      (speaker) => speaker.id === profileData?.id
    );
    const inWaitingList = waitingList?.some(
      (speaker) => speaker.id === profileData?.id
    );
    setSpeakRequestDisabled(isSpeaker || inWaitingList);
  }, [speakerList, profileData]);

  const { data, status } = useWaitingList({
    podiumId: params?.id?.toString() || "",
  });

  console.log("wait list data ", data);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWLModal, setIsOpenWLModal] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeWLModal = () => {
    setIsOpenWLModal(false);
  };

  useEffect(() => {
    const flattenedWaitingList = data?.pages.flatMap(
      (page: HttpResponse<WaitListResponse>) => page?.result?.users
    );
    setWaitingList(flattenedWaitingList || []);
  }, [data]);

  const { socket } = usePodiumSocket();

  const handleWaitingList = async (payload: WaitList) => {
    console.log("waiting_list payload", payload);

    setWaitingList((prev: WaitList[]) => {
      if (prev.some((item) => item.id === payload.id)) {
        return prev;
      }
      return [...prev, payload];
    });
  };
  const handleExitWaitingList = async (payload: RemoveWLSocketPayload) => {
    console.log("removee", payload);
    setWaitingList((prev: WaitList[]) =>
      prev.filter((item) => item.id !== payload?.user_id)
    );
  };
  console.log("updated wait list", waitingList);

  useEffect(() => {
    if (socket) {
      socket.on(PODIUM_EVENTS.ENTER_WAITING_LIST, handleWaitingList);
      socket.on(PODIUM_EVENTS.EXIT_WAITING_LIST, handleExitWaitingList);

      // Clean up the socket event listener
      return () => {
        socket.off(PODIUM_EVENTS.ENTER_WAITING_LIST, handleWaitingList);
        socket.off(PODIUM_EVENTS.EXIT_WAITING_LIST, handleExitWaitingList);
      };
    }
  }, [socket]);

  console.log(" wlist", params?.id, data, podiumData);

  return (
    <div className="col-span-1 row-span-1 justify-between overflow-hidden h-full rounded-lg shadow-md  relative  ">
      {/* Button microphone */}
      <div className="flex flex-col items-center justify-center py-2 bg-mediumGray ">
        <Button
          rounded="rounded-full"
          bgColor="bg-primary"
          disabledBgColor="bg-primary"
          width="w-14"
          height="h-14"
          disabled={speakRequestDisabled || podiumData?.mic_disabled}
          onClick={() => {
            setIsOpen(true);
          }}
          disabledOpacity="opacity-100"
        >
          <Image alt="send" src="/podiums/unmuted.svg" width={15} height={15} />
        </Button>
        <Modal isOpen={isOpen} onClose={closeModal} showCloseButton={false}>
          <SpeakRequest
            closeModal={closeModal}
            podiumId={params?.id?.toString() || ""}
          />
        </Modal>
        <h1 className="text-primary">{waitingList?.length}</h1>
      </div>

      {/* Dropdown list */}
      <div className="bg-softGray h-48 lg:h-full pb-12 relative overflow-y-auto custom-scrollbar-hidden">
        <ul className="flex flex-col gap-5 p-4 space-y-2">
          {status === API_STATUS.SUCCESS &&
            waitingList?.length > 0 &&
            waitingList?.map((user: WaitList) => (
              <li
                key={user?.id}
                className="flex flex-col gap-2 items-center justify-center space-x-3 rounded-md"
              >
                <div className="w-14 h-10 flex justify-center rounded-full relative">
                  {/* Profile Image */}
                  <Image
                    src={user.profile_url || "/icons/user-default.svg"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full bg-cover"
                  />
                  {/* Premium Badge positioned at the top left */}
                  {user.membership === "Premium" && (
                    <div className="absolute top-0 left-0 w-6 h-6 rounded-full flex justify-center items-center">
                      <Image
                        src={`/tw/post/premium.svg`}
                        alt="premium"
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                </div>
                <span className="text-visitorText text-xs text-center">
                  {truncateName(user.name, 6)}
                </span>
              </li>
            ))}
          {status === API_STATUS.PENDING && (
            <li className="flex flex-col gap-2 items-center justify-center space-x-3 rounded-md">
              <div className="w-14 h-10 flex justify-center rounded-full relative">
                {/* Profile Image */}
                <Image
                  src="/icons/user-default.svg"
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full bg-cover"
                />
                {/* Premium Badge positioned at the top left */}
              </div>
              <span className="text-visitorText text-xs text-center"></span>
            </li>
          )}
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-gray-300 flex justify-center items-center p-2">
        {waitingList?.length > 0 && (
          <Button
            onClick={() => {
              setIsOpenWLModal(true);
            }}
            className="w-full h-full bg-primary"
          >
            {t("view_all")}
          </Button>
        )}
      </div>
      <Modal
        isOpen={isOpenWLModal}
        onClose={closeWLModal}
        showCloseButton={false}
      >
        <WaitingListModal
          closeModal={closeWLModal}
          podiumId={params?.id?.toString() || ""}
        />
      </Modal>
    </div>
  );
};

export default WaitingList;
