import { useDismissFromAdminPodium } from "@/app/hooks/podiums/useDismissFromPodiumAdmin";
import Button from "@/components/ui/Button/Button";
import { GET_ADMINS_AND_REQUESTS_URL } from "@/constants/podiums/apiUrls";
import { TranslationFunction } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React from "react";

const DismissConfirmationModal = ({
  participantId,
  closeModal,
  podiumId,
}: {
  closeModal: () => void;
  participantId: string;
  podiumId: string;
}) => {
  const t: TranslationFunction = useTranslations("podiums");

  const dismissMutation = useDismissFromAdminPodium();
  const queryClient = useQueryClient();

  const confirmDismissAdmin = () => {
    try {
      dismissMutation.mutate(
        {
          data: {},
          participantId: participantId,
          podiumId: podiumId,
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (data: any) => {
            console.log("dataa", data);
            queryClient.invalidateQueries({
              queryKey: [GET_ADMINS_AND_REQUESTS_URL],
            });
            closeModal();
          },
          onError: (error) => {
            console.log("error", error);
            closeModal();
          },
        }
      );
    } catch (error) {
      console.error("Error handling go live podium:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        {/* <h3 className="base-bold text-lg">Exit Podium?</h3> */}
        <h3 className="text-md">Dismiss as Admin ?</h3>
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
          textColor="text-primary font-bold"
          bgColor="bg-transparent"
        >
          {t("confirm")}
        </Button>
      </div>
    </div>
  );
};

export default DismissConfirmationModal;
