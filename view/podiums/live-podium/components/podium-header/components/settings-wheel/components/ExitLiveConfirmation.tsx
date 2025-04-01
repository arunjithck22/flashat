"use client";
import { useLeavePodium } from "@/app/hooks/podiums/useLeavePodium";
import Button from "@/components/ui/Button/Button";
import { usePodiumContext } from "@/contexts/podium/PodiumContext";
import { usePodiumSocket } from "@/contexts/PodiumSocketContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import { TranslationFunction } from "@/types";
import { notification } from "@/utils/toastService";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ExitLiveConfirmationModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const params = useParams();
  const { profileData } = useProfileContext();
  const t: TranslationFunction = useTranslations("podiums");
  const leavePodiumMutation = useLeavePodium();
  const { socket } = usePodiumSocket();
  const router = useRouter();
  const { podiumData } = usePodiumContext();

  const handleExitPodium = ({ action }: { action: string }) => {
    try {
      leavePodiumMutation.mutate(
        {
          data: {},
          action: action,
          podiumId: params?.id?.toString() || "",
        },
        {
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
            socket.emit("leave", {
              room_type: "detail",
              user_id: profileData?.id,
              podium_id: params?.id,
            });
            router.push("/podiums/live-podiums");
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
        <h3 className="text-md">{t("exit_live_confirmation")}</h3>
      </div>
      <div className="flex w-full  justify-end   gap-3 ">
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
              disabled={leavePodiumMutation.isPending}
              onClick={() => {
                handleExitPodium({ action: "leave" });
              }}
              className="text-primary uppercase "
              textColor="text-primary"
              bgColor="bg-transparent"
            >
              {t("confirm")}
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
              onClick={() => {
                handleExitPodium({ action: "leave" });
              }}
              className="text-primary uppercase "
              textColor="text-primary"
              bgColor="bg-transparent"
            >
              {t("exit_only")}
            </Button>
            <Button
              onClick={() => {
                handleExitPodium({ action: "exit" });
              }}
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

export default ExitLiveConfirmationModal;
