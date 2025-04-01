import { useSpeakRequest } from "@/app/hooks/podiums/useSpeakRequest";
import Button from "@/components/ui/Button/Button";
import React from "react";

const SpeakRequest = ({
  closeModal,
  podiumId,
}: {
  closeModal: () => void;
  podiumId: string;
}) => {
  console.log("3333", podiumId);
  const speakRequestMutation = useSpeakRequest();
  const confirmSpeakRequest = () => {
    try {
      speakRequestMutation.mutate(
        {
          data: {},
          podiumId: podiumId,
        },
        {
          onSuccess: (data) => {
            console.log("on success data", data);
            closeModal();
          },
          onError: (error) => {
            console.error("Error entering waitlist:", error);
          },
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error in delete:", error.message);
        throw new Error(error.message); // Re-throw the error for upstream handling
      } else {
        console.error("An unexpected error occurred", error);
        throw new Error("An unknown error occurred");
      }
    }
  };
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        <h3 className="base-bold text-lg">Request to Speak?</h3>
        <h3 className="text-md">Are you sure you want to request to speak?</h3>
      </div>
      <div className="flex w-full justify-end   gap-3 ">
        <Button onClick={closeModal}>cancel</Button>
        <Button onClick={confirmSpeakRequest}>confirm</Button>
      </div>
    </div>
  );
};

export default SpeakRequest;
