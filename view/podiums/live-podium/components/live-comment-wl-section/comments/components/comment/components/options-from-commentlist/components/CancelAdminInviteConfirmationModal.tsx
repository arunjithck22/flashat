import { useCancelPodiumAdminInvite } from "@/app/hooks/podiums/useCancelPodiumAdminInvite";
import { useDismissFromAdminPodium } from "@/app/hooks/podiums/useDismissFromPodiumAdmin";

import Button from "@/components/ui/Button/Button";
import { TranslationFunction } from "@/types";
import { notification } from "@/utils/toastService";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const CancelAdminInviteConfirmationModal = ({
  closeModal,
  participantId,
}: {
  closeModal: () => void;
  participantId: string;
}) => {
  const params = useParams();
  const t: TranslationFunction = useTranslations("podiums");
  const cancelAdminInviteMutation = useCancelPodiumAdminInvite();

  const handleCancelAdminInvite = () => {
    cancelAdminInviteMutation.mutate(
      {
        data: {},
        podiumId: params?.id?.toLocaleString() || "",
        participantId: participantId,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          closeModal();
          console.log("dismissAdmin", data);
          notification.success({
            message: data.message,
            position: "bottom-right",
            icon: (
              <Image
                width={40}
                height={40}
                alt="logo"
                src={"/logo/flashat-logo.png"}
              />
            ),
          });
        },
        onError: (error) => {
          console.error("error dismiss:", error);
        },
      }
    );
  };
  return (
    <div className="flex flex-col w-full min-w-[250px] max-w-[200px] sm:min-w-72 sm:max-w-96 ">
      <div className="flex flex-col gap-2">
        <h3 className="text-md">{t("cancel_admin_invite_confirmation")}</h3>
      </div>
      <div className="flex w-full  justify-end   gap-3 ">
        <Button
          textColor=" text-red-500"
          bgColor="bg-transparent"
          className="text-red-500 uppercase "
          onClick={closeModal}
        >
          {t("cancel")}
        </Button>
        <Button
          disabledBgColor="bg-transparent"
          disabledTextColor="text-gray-200"
          disabled={cancelAdminInviteMutation.isPending}
          onClick={() => {
            handleCancelAdminInvite();
          }}
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

export default CancelAdminInviteConfirmationModal;
