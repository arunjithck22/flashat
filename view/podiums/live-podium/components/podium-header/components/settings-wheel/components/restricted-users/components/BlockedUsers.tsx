import { usePodiumBlockedusers } from "@/app/hooks/podiums/useBlockedUsers";

import Button from "@/components/ui/Button/Button";
import UserListItem from "@/components/user-list-item/UserListItem";

import { useParams } from "next/navigation";
import React from "react";

import { PodiumBlockedUsersList } from "@/types/podiums";
import InfiniteScrollList from "@/components/pagination/InfiniteScrollList";
import UserListLoader from "@/components/SkeltonLoaders/userList/UserListLoader";
import EmptyPage from "@/components/EmptyPages/EmptyPage";
import Image from "next/image";
import { useBlockOrUnBlockFromPodium } from "@/app/hooks/podiums/useBlockOrUnBlockFromPodium";
import { useQueryClient } from "@tanstack/react-query";
import { QKEY_GET_PODIUM_BLOCKED_USERS } from "@/constants/podiums/queryKeys";
import { notification } from "@/utils/toastService";

const BlockedUsers = () => {
  const params = useParams();
  const podiumId = params?.id?.toString();
  const queryClient = useQueryClient();

  const { data, hasNextPage, status, fetchNextPage } = usePodiumBlockedusers({
    podiumId: podiumId || "",
    enabled: true,
  });

  const blockMutation = useBlockOrUnBlockFromPodium();

  console.log("dataaaa", data);

  const unblockUser = ({
    participantId,
    podiumId,
  }: {
    participantId: string;
    podiumId: string;
  }) => {
    blockMutation.mutate(
      {
        data: {},
        action: "unblock",
        podiumId: podiumId || "",
        participantId: participantId,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          console.log("unblocked user from podium", data);
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

          queryClient.invalidateQueries({
            queryKey: [QKEY_GET_PODIUM_BLOCKED_USERS],
          });
        },
        onError: (error) => {
          console.error("error unblockin:", error);
        },
      }
    );
  };

  return (
    <div className="w-full">
      <InfiniteScrollList
        emptyMessage={
          <EmptyPage
            message="No Users Found"
            cover={
              <Image
                alt="empty"
                width={200}
                height={200}
                src={"/podiums/live-podiums-empty.svg"}
              />
            }
          />
        }
        loader={
          <>
            <UserListLoader />
            <UserListLoader />
            <UserListLoader />
          </>
        }
        data={data?.pages?.flatMap((page) => page?.result?.users) || []}
        status={status}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={(item: PodiumBlockedUsersList) => (
          <UserListItem
            key={item.id}
            name={item?.name}
            button
            buttonItem={
              <Button
                loading={blockMutation.isPending}
                loaderColor="border-red-500"
                className="border"
                borderWidth="border-2"
                bgNone={true}
                textColor="text-red-500"
                borderColor="border-red-500"
                border={true}
                onClick={() => {
                  unblockUser({
                    participantId: item.id?.toString(),
                    podiumId: item?.podium_id?.toString(),
                  });
                }}
              >
                <span>Unblock</span>
              </Button>
            }
            className="min-w-lg gap-20"
          />
        )}
      />
    </div>
  );
};

export default BlockedUsers;
