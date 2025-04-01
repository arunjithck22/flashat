import { useConfirmAdminInvite } from "@/app/hooks/podiums/useConfirmAdminInvite";
import { useUpdateGlobalPodiumDataState } from "@/app/hooks/podiums/useUpdateGlobalPodiumDataState";
import { useProfileContext } from "@/contexts/ProfileContext";
import { notification } from "@/utils/toastService";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const AdminInvite = () => {
  const mutation = useConfirmAdminInvite();
  const useUpdatePodiumDataState = useUpdateGlobalPodiumDataState();
  const params = useParams();
  const { profileData } = useProfileContext();
  const confirmAdminInvite = ({ action }: { action: string }) => {
    mutation.mutate(
      {
        data: {},
        podiumId: params?.id?.toLocaleString() || "",
        participantId: profileData?.id?.toString() || "",
        action: action,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          if (action === "decline") {
            useUpdatePodiumDataState("invited_to_be_admin", false);
          }
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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full py-2 flex flex-col md:flex-row gap-3 justify-center items-center text-center"
    >
      <span className="whitespace-nowrap text-sm flex justify-center items-center font-medium">
        You have an Admin Invite
      </span>
      <div className="flex justify-center items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-1 fs-1 bg-primary text-white rounded-lg base-semibold"
          onClick={() => confirmAdminInvite({ action: "confirm" })}
        >
          Accept
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-1 fs-1 bg-gray-200 text-black rounded-lg base-semibold"
          onClick={() => confirmAdminInvite({ action: "decline" })}
        >
          Decline
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AdminInvite;
