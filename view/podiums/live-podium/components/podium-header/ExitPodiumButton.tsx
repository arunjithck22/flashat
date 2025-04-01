"use client";
import { useLeavePodium } from "@/app/hooks/podiums/useLeavePodium";
import Modal from "@/components/ui/modal/Modal";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import { Params } from "@/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExitConfirmationModal from "./ExitConfirmationModal";

interface ExitPodiumButtonProps {
  canEndPodium: boolean;
  podiumId: string;
}

const ExitPodiumButton: React.FC<ExitPodiumButtonProps> = ({
  canEndPodium,
  podiumId,
}) => {
  const router = useRouter();
  console.log("can end podium", canEndPodium);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const closePodiumExitModal = () => {
    setIsExitModalOpen(false);
  };
  const params: Params = useParams();
  const { profileData } = useProfileContext();

  const { socket } = usePodiumSocket();
  const leavePodiumMutation = useLeavePodium();

  const handleLeavePodium = () => {
    try {
      leavePodiumMutation.mutate(
        {
          data: {},
          action: "leave",
          podiumId: params?.id?.toString() || "",
        },
        {
          onSuccess: (data) => {
            console.log("left podium through backend", data);
            socket.emit("leave", {
              room_type: "detail",
              user_id: profileData?.id,
              podium_id: params?.id,
            });
            router.push("/podiums/live-podiums");
          },
          onError: (error) => {
            console.error("Error joining podium:", error);
            // setCalling(false);
          },
        }
      );
    } catch (error) {
      console.error("Error handling closing podium:", error);
    }
  };
  const handleClosePodium = () => {
    try {
      leavePodiumMutation.mutate(
        {
          data: {},
          action: "close",
          podiumId: params?.id?.toString() || "",
        },
        {
          onSuccess: (data) => {
            console.log("left podium through backend", data);
          },
          onError: (error) => {
            console.error("Error closing podium:", error);
            // setCalling(false);
          },
        }
      );
    } catch (error) {
      console.error("Error handling closing podium:", error);
    }
  };

  return (
    <div>
      <Image
        alt="exit podium"
        width={30}
        height={30}
        src="/podiums/exit-podium.svg"
        className="hover:cursor-pointer w-12 h-12"
        onClick={() => {
          setIsExitModalOpen(true);
        }} // Attach the handler
      />
      <Modal
        isOpen={isExitModalOpen}
        showCloseButton={false}
        onClose={closePodiumExitModal}
      >
        <ExitConfirmationModal
          closeModal={closePodiumExitModal}
          handleLeavePodium={handleLeavePodium}
          // handleClosePodium={handleClosePodium}
          // canEndPodium={canEndPodium}
        />
      </Modal>
    </div>
  );
};

export default ExitPodiumButton;
