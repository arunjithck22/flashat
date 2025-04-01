import Button from "@/components/ui/Button/Button";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

const CancelInviteConfirmationModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const t: TranslationFunction = useTranslations("podiums");

  const confirmDismissAdmin = () => {
    console.log("this api needs to be integarted");
  };
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        {/* <h3 className="base-bold text-lg">Exit Podium?</h3> */}
        <h3 className="text-md">Cancel Invite ?</h3>
      </div>
      <div className="flex w-full    gap-3 ">
        <Button
          textColor=" text-red-500"
          bgColor="bg-transparent"
          className="text-red-500 uppercase "
          onClick={closeModal}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={confirmDismissAdmin}
          className="text-primary uppercase "
          textColor="text-primary"
          bgColor="bg-transparent"
        >
          {t("confirm")}
        </Button>
      </div>
    </div>
  );
};

export default CancelInviteConfirmationModal;
