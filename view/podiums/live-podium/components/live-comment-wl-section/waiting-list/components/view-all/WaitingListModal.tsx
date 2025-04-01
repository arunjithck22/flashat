"use client";
import {
  useWaitingList,
  WaitListResponse,
} from "@/app/hooks/podiums/useWaitingList";
import { API_STATUS } from "@/common/constant";

import UserListLoader from "@/components/SkeltonLoaders/userList/UserListLoader";
import UserListItem from "@/components/user-list-item/UserListItem";
import { HttpResponse, TranslationFunction } from "@/types";
import { WaitList } from "@/types/podiums";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const WaitingListModal = ({
  closeModal,
  podiumId,
}: {
  closeModal: () => void;
  podiumId: string;
}) => {
  const t: TranslationFunction = useTranslations("podiums");
  const {
    data: waitingParticipants,
    isLoading,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useWaitingList({ podiumId: podiumId });

  console.log("data", waitingParticipants);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <div className="w-60 md:w-96 lg:w-96 max-w-lg">
      <h3 className="base-semibold text-md py-3 text-center">
        Waiting Participants
      </h3>
      <div className=" flex flex-col gap-2 py-3">
        {status === API_STATUS.PENDING && (
          <>
            <UserListLoader />
            <UserListLoader />
            <UserListLoader />
            <UserListLoader />
            <UserListLoader />
            <UserListLoader />
          </>
        )}

        {API_STATUS.SUCCESS === status &&
          (waitingParticipants?.pages?.some(
            (page: HttpResponse<WaitListResponse>) =>
              page?.result?.users?.length > 0
          ) ? (
            waitingParticipants?.pages?.map(
              (page: HttpResponse<WaitListResponse>) =>
                page?.result?.users?.map((item: WaitList, index: number) => (
                  <UserListItem
                    name={item.name}
                    kababOption={true}
                    className="max-w-lg gap-10  p-2"
                  />
                ))
            )
          ) : (
            <div className="text-center mt-4 text-gray-500">
              {t("empty_message_4")}
            </div>
          ))}

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

export default WaitingListModal;
