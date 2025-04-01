import { useFreezeOrUnFreezeParticipant } from "@/app/hooks/podiums/useFreezeOrUnFreezeParticipant";
import { usePodiumFrozenUsers } from "@/app/hooks/podiums/usePodiumFrozenUsers";
import EmptyPage from "@/components/EmptyPages/EmptyPage";
import InfiniteScrollList from "@/components/pagination/InfiniteScrollList";
import UserListLoader from "@/components/SkeltonLoaders/userList/UserListLoader";
import Button from "@/components/ui/Button/Button";
import UserListItem from "@/components/user-list-item/UserListItem";
import { QKEY_GET_PODIUM_FROZEN_USERS } from "@/constants/podiums/queryKeys";
import { FrozenUser } from "@/types/podiums";
import { notification } from "@/utils/toastService";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const FrozenUsers = () => {
  const params = useParams();
  const podiumId = params?.id?.toString();
  const queryClient = useQueryClient();

  const { data, hasNextPage, status, fetchNextPage } = usePodiumFrozenUsers({
    podiumId: podiumId || "",
    enabled: true,
  });

  console.log("frozen users", data);

  const freezeMutation = useFreezeOrUnFreezeParticipant();

  const unFreezeUser = ({
    participantId,
    podiumId,
  }: {
    participantId: string;
    podiumId: string;
  }) => {
    freezeMutation.mutate(
      {
        data: {},
        action: "unfreeze",
        podiumId: podiumId || "",
        participantId: participantId,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          console.log("unfreezed user from podium", data);
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
            queryKey: [QKEY_GET_PODIUM_FROZEN_USERS],
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
        renderItem={(item: FrozenUser) => (
          <UserListItem
            key={item.id}
            name={item?.name}
            profile_pic={item.profile_url}
            is_premium={item.membership === "Premium"}
            button
            buttonItem={
              <Button
                loading={freezeMutation.isPending}
                className="border"
                borderWidth="border-2"
                bgNone={true}
                textColor="text-red-500"
                borderColor="border-red-500"
                border={true}
                loaderColor="border-red-500"
                onClick={() => {
                  unFreezeUser({
                    participantId: item.id?.toString(),
                    podiumId: item?.podium_id?.toString(),
                  });
                }}
              >
                <span className="text-sm ">Unfreeze</span>
              </Button>
            }
            className="min-w-lg gap-20"
          />
        )}
      />
    </div>
  );
};

export default FrozenUsers;
