import Button from "@/components/ui/Button/Button";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

const ExitConfirmationModal = ({
  closeModal,
  handleLeavePodium,
}: {
  closeModal: () => void;

  handleLeavePodium: () => void;
}) => {
  const t: TranslationFunction = useTranslations("podiums");
  const { podiumData } = usePodiumContext();
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        <h3 className="base-bold text-lg">Exit Podium?</h3>
        <h3 className="text-md">
          {podiumData?.is_invited
            ? t("exit_live_when_invited-confirmation")
            : t("exit_live_confirmation")}
        </h3>
      </div>
      <div className="flex w-full    gap-3 ">
        {!podiumData?.is_invited ? (
          <>
            <Button
              textColor=" text-red-500"
              bgColor="bg-transparent"
              className="text-red-500 uppercase "
              onClick={closeModal}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleLeavePodium}
              className="text-primary uppercase "
              textColor="text-primary"
              bgColor="bg-transparent"
            >
              {t("exit")}
            </Button>
          </>
        ) : (
          <>
            <Button
              textColor=" text-red-500"
              bgColor="bg-transparent"
              className="text-red-500 uppercase "
              onClick={closeModal}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleLeavePodium}
              className="text-primary uppercase "
              textColor="text-primary"
              bgColor="bg-transparent"
            >
              {t("exit_only")}
            </Button>
            <Button
              onClick={handleLeavePodium}
              className="text-primary uppercase "
              textColor="text-primary"
              bgColor="bg-transparent"
            >
              {t("cancel_invite_and_exit")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitConfirmationModal;
