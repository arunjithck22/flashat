import { useUpdatePodiumSettings } from "@/app/hooks/podiums/useUpdatePodiumSettings";
import Button from "@/components/ui/Button/Button";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { TranslationFunction } from "@/types";
import { notification } from "@/utils/toastService";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const PauseLikeConfirmationModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const t: TranslationFunction = useTranslations("podiums");
  const params = useParams();
  const { podiumData } = usePodiumContext();

  console.log("podium data333", podiumData);

  const pauseLikesMutation = useUpdatePodiumSettings();

  const pauseLikes = () => {
    closeModal();
    pauseLikesMutation.mutate(
      {
        data: {
          likes_disabled: !podiumData?.likes_disabled,
        },
        podiumId: params?.id?.toString(),
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          console.log("paused live chat", data);

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
          console.error("error unblockin:", error);
        },
      }
    );
  };
  return (
    <div className="flex flex-col w-full min-w-[250px] max-w-[200px] sm:min-w-72 sm:max-w-96 ">
      <div className="flex flex-col gap-2">
        <h3 className="text-md">
          {!podiumData?.likes_disabled
            ? t("pause_like_confirmation")
            : t("resume_like_confirmation")}
        </h3>
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
          loading={pauseLikesMutation.isPending}
          onClick={() => {
            pauseLikes();
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

export default PauseLikeConfirmationModal;
