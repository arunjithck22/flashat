import { useSendMessage } from "@/app/hooks/podiums/useSendLiveChat";
import { useSocketEvents } from "@/app/hooks/sockets/useSocketEvents";
import Button from "@/components/ui/Button/Button";
import { PODIUM_EVENTS } from "@/constants/events";

import { PODIUM_LIVE_CHAT_TYPE } from "@/constants/podiums/constants";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import React from "react";

const PaidLikeModal = ({
  closeModal,
  podiumId,
}: {
  closeModal: () => void;
  podiumId: string;
}) => {
  const { sendMessage } = useSendMessage(podiumId);
  const { socket } = usePodiumSocket();
  const { emitEvent } = useSocketEvents(socket);
  const { profileData } = useProfileContext();

  console.log("socket123", socket);
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        {/* <h3 className="base-bold text-lg">Request to Speak?</h3> */}
        <h3 className="text-md">
          Giving Likes will deduct 1 COiN from your COiN Balance.
        </h3>
      </div>
      <div className="flex w-full    gap-3 ">
        <Button
          textColor=" text-red-500"
          bgColor="bg-transparent"
          className="text-red-500 "
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            sendMessage({ chatType: PODIUM_LIVE_CHAT_TYPE?.PAID_LIKE });
            emitEvent(PODIUM_EVENTS.LIKE, {
              user_id: profileData?.id || "",
              podium_id: podiumId,
            });

            closeModal();
          }}
          className="text-primary "
          textColor="text-primary"
          bgColor="bg-transparent"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default PaidLikeModal;
