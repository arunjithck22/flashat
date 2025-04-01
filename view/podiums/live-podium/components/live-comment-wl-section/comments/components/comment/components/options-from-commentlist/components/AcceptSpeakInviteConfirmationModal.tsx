/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAcceptSpeakInvite } from "@/app/hooks/podiums/useAcceptSpeakInvite";

import Button from "@/components/ui/Button/Button";
import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

const AcceptSpeakInviteConfirmationModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const params = useParams();
  const t: TranslationFunction = useTranslations("podiums");
  const acceptSpeakInviteSpeakMutation = useAcceptSpeakInvite();

  const handleAcceptInviteSpeak = () => {
    acceptSpeakInviteSpeakMutation.mutate(
      {
        data: {},
        podiumId: params?.id?.toLocaleString() || "",
        action: "accept",
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

  const handleCancelInviteToSpeak = () => {
    closeModal();
  };
  return (
    <div className="flex flex-col w-full min-w-[250px] max-w-[200px] sm:min-w-72 sm:max-w-96 ">
      <div className="flex flex-col gap-2">
        <h3 className="text-md">{t("speak_invite_accept_confirmation")}</h3>
      </div>
      <div className="flex w-full  justify-end   gap-3 ">
        <Button
          textColor=" text-red-500"
          bgColor="bg-transparent"
          className="text-red-500 uppercase "
          onClick={handleCancelInviteToSpeak}
        >
          {t("cancel")}
        </Button>
        <Button
          disabledBgColor="bg-transparent"
          disabledTextColor="text-gray-200"
          disabled={acceptSpeakInviteSpeakMutation.isPending}
          onClick={() => {
            handleAcceptInviteSpeak();
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

export default AcceptSpeakInviteConfirmationModal;
