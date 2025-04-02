import { useLeavePodium } from "@/app/hooks/podiums/useLeavePodium";
import Button from "@/components/ui/Button/Button";
import { TranslationFunction } from "@/types";
import { notification } from "@/utils/toastService";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const EndLiveConfirmationModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const params = useParams();
  const t: TranslationFunction = useTranslations("podiums");
  const leavePodiumMutation = useLeavePodium();

  const handleClosePodium = () => {
    try {
      leavePodiumMutation.mutate(
        {
          data: {},
          action: "close",
          podiumId: params?.id?.toString() || "",
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (data: any) => {
            
            console.log("left podium through backend", data);
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
            closeModal()
          },
          onError: (error) => {
            const parsedError = JSON.parse(error.message);
            notification.success({
              message: parsedError.message,
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
            console.error("Error closing podium:", error);
            // setCalling(false);
          },
        }
      );
    } catch (error) {
      console.error("Error handling closing podium:", error);
    }
  };
  return (
    <div className="flex flex-col w-full min-w-[250px] max-w-[200px] sm:min-w-72 sm:max-w-96 ">
      <div className="flex flex-col gap-2">
        <h3 className="text-md">{t("end_live_confirmation")}</h3>
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
          disabled={leavePodiumMutation.isPending}
          onClick={() => {
            handleClosePodium();
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

export default EndLiveConfirmationModal;
