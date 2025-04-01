import Button from "@/components/ui/Button/Button";
import React from "react";

const ExitWhenLiveInOtherModal = ({
  closeModal,
  proceedFunction,
  podiumId,
  exitMessage,
}: {
  closeModal: () => void;
  proceedFunction: ({ podiumId }: { podiumId: string }) => void;
  podiumId: string;
  exitMessage: string;
}) => {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        {/* <h3 className="base-bold text-lg">Request to Speak?</h3> */}
        <h3 className="text-md">{exitMessage}</h3>
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
          onClick={() => proceedFunction({ podiumId: podiumId })}
          className="text-primary "
          textColor="text-primary"
          bgColor="bg-transparent"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default ExitWhenLiveInOtherModal;
