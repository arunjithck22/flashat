import { useSendPodiumInvitations } from "@/app/hooks/podiums/useSendPodiumInvitations";
import Button from "@/components/ui/Button/Button";
import { TranslationFunction } from "@/types";
import { notification } from "@/utils/toastService";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const SendInvitations = ({ closeModal }: { closeModal: () => void }) => {
  const t: TranslationFunction = useTranslations("podiums");
  const params = useParams();

  const sendInviteMutation = useSendPodiumInvitations();
  const [selectedOptions, setSelectedOptions] = useState({
    invite_dears: false,
    invite_fans: false,
    invite_likers: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const sendInvitationFn = () => {
    sendInviteMutation.mutate(
      {
        data: {
          ...selectedOptions,
        },
        podiumId: params?.id?.toString(),
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          console.log("paused live chat", data);
          closeModal();
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
  const isDisabled = !Object.values(selectedOptions).some(Boolean);

  return (
    <div className="flex flex-col w-full min-w-[250px] max-w-[200px] sm:min-w-72 sm:max-w-96 ">
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="invite_dears"
            checked={selectedOptions.invite_dears}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>Dears</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="invite_fans"
            checked={selectedOptions.invite_fans}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>Fans</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="invite_likers"
            checked={selectedOptions.invite_likers}
            onChange={handleChange}
            className="w-4 h-4 bg-primary"
          />
          <span>Likers</span>
        </label>
      </div>
      <div className="flex w-full  justify-end   gap-3 ">
        <Button
          onClick={closeModal}
          className="border uppercase"
          borderWidth="border-2"
          bgNone={true}
          textColor="text-red-500"
          borderColor="border-red-500"
          border={true}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={() => {
            sendInvitationFn();
            // pauseOrResumeComments();
          }}
          disabled={isDisabled}
          className="text-primary uppercase "
          textColor="text-white"
          bgColor="bg-primary"
        >
          {t("send")}
        </Button>
      </div>
    </div>
  );
};

export default SendInvitations;
