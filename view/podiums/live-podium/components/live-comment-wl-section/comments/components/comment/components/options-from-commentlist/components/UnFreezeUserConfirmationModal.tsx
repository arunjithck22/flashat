"use client";
import { useFreezeOrUnFreezeParticipant } from "@/app/hooks/podiums/useFreezeOrUnFreezeParticipant";

import Button from "@/components/ui/Button/Button";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

const UnFreezeUserConfirmationModal = ({
  closeModal,
  participantId,
}: {
  closeModal: () => void;
  participantId: string | undefined;
}) => {
  const params = useParams();
  const t: TranslationFunction = useTranslations("podiums");
  const freezeMutation = useFreezeOrUnFreezeParticipant();

  const handleFreeze = () => {
    freezeMutation.mutate(
      {
        data: {},
        podiumId: params?.id?.toLocaleString() || "",
        participantId: participantId || "",
        action: "unfreeze",
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: () => {
          closeModal();
          // notification.success({
          //   message: data.message,
          //   position: "bottom-right",
          //   icon: (
          //     <Image
          //       width={40}
          //       height={40}
          //       alt="logo"
          //       src={"/logo/flashat-logo.png"}
          //     />
          //   ),
          // });
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
        <h3 className="text-md">{t("unfreeze_user_confirmation")}</h3>
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
          disabled={freezeMutation.isPending}
          onClick={() => {
            handleFreeze();
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

export default UnFreezeUserConfirmationModal;
