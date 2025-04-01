import Modal from "@/components/ui/modal/Modal";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";

import Image from "next/image";
import React, { useState } from "react";
import PaidLikeModal from "./PaidLikeModal";

interface LikeButtonProps {
  podiumId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ podiumId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const { podiumData } = usePodiumContext();

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} showCloseButton={false}>
        <PaidLikeModal closeModal={closeModal} podiumId={podiumId} />
      </Modal>
      <button
        disabled={podiumData?.likes_disabled}
        className={`flex w-full justify-center items-center ${
          podiumData?.likes_disabled && "opacity-50"
        }`}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <div className="flex w-full justify-center items-center">
          <Image
            alt="send"
            src="/podiums/paid-likes.svg"
            width={50}
            height={50}
          />
        </div>
      </button>
    </>
  );
};

export default LikeButton;
