import { usePauseOrResumePodiumGifts } from "@/app/hooks/podiums/usePauseOrResumePodiumGift";
import Button from "@/components/ui/Button/Button";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { TranslationFunction } from "@/types";
import { notification } from "@/utils/toastService";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const PauseGiftConfirmationModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const t: TranslationFunction = useTranslations("podiums");
  const params = useParams();
  const { podiumData } = usePodiumContext();

  console.log("podium data333", podiumData);

  const pauseGiftMutation = usePauseOrResumePodiumGifts();

  const pauseOrResumeComments = (action: string) => {
    pauseGiftMutation.mutate(
      {
        data: {},
        podiumId: params?.id?.toString(),
        action: action,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          console.log("paused gift", data);

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
          closeModal();
        },
        onError: (error) => {
          console.error("error unblockin:", error);
          notification.success({
            message: error.message,
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
      }
    );
  };
  return (
    <div className="flex flex-col w-full min-w-[250px] max-w-[200px] sm:min-w-72 sm:max-w-96 ">
      <div className="flex flex-col gap-2">
        <h3 className="text-md">
          {podiumData?.podium_gift_paused
            ? t("resume_gift_confirmation")
            : t("pause_gift_confirmation")}
        </h3>
      </div>
      <div className="flex w-full  justify-end   gap-3 ">
        <Button
          textColor=" text-primary"
          bgColor="bg-transparent"
          className="text-primary uppercase "
          onClick={closeModal}
        >
          {t("cancel")}
        </Button>
        <Button
          loading={pauseGiftMutation.isPending}
          onClick={() => {
            pauseOrResumeComments(
              podiumData?.podium_gift_paused
                ? "resume_podium_gifts"
                : "pause_podium_gifts"
            );
          }}
          className="text-primary uppercase "
          textColor="text-primary"
          bgColor="bg-transparent"
          disabledBgColor="bg-transparent"
          disabledTextColor="text-primary"
        >
          {podiumData?.podium_gift_paused ? t("resume") : t("pause")}
        </Button>
      </div>
    </div>
  );
};

export default PauseGiftConfirmationModal;
