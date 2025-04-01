import {
  AdminAndRequestsResponse,
  useAdminsAndRequests,
} from "@/app/hooks/podiums/useAdminsAndRequests";
import { API_STATUS } from "@/common/constant";
import UserListLoader from "@/components/SkeltonLoaders/userList/UserListLoader";
import Modal from "@/components/ui/modal/Modal";
import Tag from "@/components/ui/Tag/Tag";
import UserListItem from "@/components/user-list-item/UserListItem";
import { PODIUM_ROLES } from "@/constants/podiums/constants";
import { HttpResponse, TranslationFunction } from "@/types";
import { AdminRequestUser } from "@/types/podiums";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CancelInviteConfirmationModal from "./components/CancelInviteConfirmationModal";
import DismissConfirmationModal from "./components/DismissConfirmationModal";

const AdminsAndRequests = ({ isOpen }: { isOpen: boolean }) => {
  const t: TranslationFunction = useTranslations("podiums");
  const params = useParams();

  const podiumId = params?.id?.toString();

  const { data, hasNextPage, isFetching, status, fetchNextPage } =
    useAdminsAndRequests({
      podiumId: podiumId || "",
      enabled: isOpen,
    });
  const [dismissConfirmationOpen, setDismissConfirmationOpen] = useState(false);
  const [cancelInviteConfiramtionOpen, setCancelInviteConfirmationOpen] =
    useState(false);
  const [partcipantId, setParticipantId] = useState<string>("");

  console.log("admins and requests", podiumId, data);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const openModal = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState(true);
  };

  const closeModal = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState(false);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-2 py-3">
        {status === API_STATUS.PENDING && (
          <>
            <UserListLoader />
            <UserListLoader />
          </>
        )}

        {status === API_STATUS.SUCCESS &&
          (data?.pages?.some(
            (page: HttpResponse<AdminAndRequestsResponse>) =>
              page?.result?.users?.length > 0
          ) ? (
            data?.pages?.map((page: HttpResponse<AdminAndRequestsResponse>) =>
              page?.result?.users?.map((item: AdminRequestUser) => {
                const kababOptions = [
                  {
                    id: 1,
                    label:
                      item?.role === PODIUM_ROLES.ADMIN
                        ? t("dismiss_as_admin")
                        : t("cancel_admin_invite"),
                    onClick: () => {
                      setParticipantId(item.id?.toString());
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      item?.role === PODIUM_ROLES.ADMIN
                        ? openModal(setDismissConfirmationOpen)
                        : openModal(setCancelInviteConfirmationOpen);
                    },
                    condition: true,
                  },
                ].filter((option) => option.condition);

                return (
                  <UserListItem
                    key={item.id}
                    name={item?.name}
                    kababOption={kababOptions.length > 0}
                    kababOptions={kababOptions}
                    className="min-w-lg gap-20"
                    tag={
                      <Tag
                        className="px-2 py-0.5 flex justify-center items-center text-[10px] font-semibold bg-primary rounded-md text-white"
                        text={
                          item?.invited_to_be_admin
                            ? t("admin_requested")
                            : t("admin")
                        }
                      />
                    }
                  />
                );
              })
            )
          ) : (
            <div className="text-center mt-4 text-gray-500">
              <Image
                width={200}
                height={200}
                src="/podiums/live-podiums-empty.svg"
                alt="No Live Podiums Found"
                className="w-80 h-80"
              />
            </div>
          ))}
        <Modal
          isOpen={dismissConfirmationOpen || cancelInviteConfiramtionOpen}
          showCloseButton={false}
          onClose={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            dismissConfirmationOpen && closeModal(setDismissConfirmationOpen);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            cancelInviteConfiramtionOpen &&
              closeModal(setCancelInviteConfirmationOpen);
          }}
        >
          {dismissConfirmationOpen && (
            <DismissConfirmationModal
              participantId={partcipantId}
              podiumId={podiumId}
              closeModal={() => closeModal(setDismissConfirmationOpen)}
            />
          )}

          {cancelInviteConfiramtionOpen && (
            <CancelInviteConfirmationModal
              closeModal={() => closeModal(setCancelInviteConfirmationOpen)}
            />
          )}
        </Modal>

        {/* Infinite Scroll Loader */}
        {hasNextPage && !isFetching && (
          <div ref={ref}>
            <UserListLoader />
            <UserListLoader />
            <UserListLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminsAndRequests;
