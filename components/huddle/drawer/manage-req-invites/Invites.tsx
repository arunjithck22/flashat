"use client";
import React from "react";

import { API_STATUS } from "@/common/constant";
import HuddleSkelton from "../../HuddleSkelton";
import Image from "next/image";
import {
  QKEY_INVITED_MEMBERS,
  useInvitedMembers,
} from "@/app/hooks/huddles/useInvitedMembers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useIncomingInviteActions from "@/app/hooks/huddles/useIncomingInviteActions";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { TranslationFunction } from "@/types";
import { Invitation } from "@/types/huddles";

const Invites = () => {
  const { state } = useHuddleProvider();
  const t: TranslationFunction = useTranslations("huddles");

  const params = useParams();
  const queryClient = useQueryClient();

  const { data, status } = useInvitedMembers({
    huddleId: state.currentHuddle || "",
  });

  console.log("huddle invitations", data);

  const inviteHuddleMutation = useIncomingInviteActions();

  const handleCancelInvite = (memberId: string) => {
    inviteHuddleMutation.mutateAsync(
      {
        huddleId: params?.id?.toString(),
        data: {
          member_ids: [memberId],
          action: "cancel",
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QKEY_INVITED_MEMBERS, params?.id],
          });
        },
      }
    );
  };

  return (
    <>
      <section
        style={{ height: "calc(100vh - 150px)" }}
        className="w-full relative h-auto mt-1  border-bgray border- 2 custom-scrollbar  overflow-y-auto  flex flex-col pb-32 "
      >
        <ul>
          {status === API_STATUS.PENDING && (
            <>
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
            </>
          )}

          {status === API_STATUS.SUCCESS && (
            <>
              {data?.result?.invitations?.map((invitation: Invitation) => (
                <li
                  key={invitation.invitation_id}
                  className="flex items-center border-b-2 gap-2 py-3 px-2  relative justify-between"
                >
                  <div className="flex gap-2 justify-center items-center">
                    <div className="rounded-full overflow-hidden w-12 ">
                      <Image
                        className="w-full h-full rounded-full object-cover bg-center"
                        alt="user"
                        src={`${
                          invitation?.member_thumbnail
                            ? invitation?.member_thumbnail
                            : "/tw/placeholder/placeholder-image-icon.jpg"
                        }`}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex flex-col lg:gap-2 sm:gap-1">
                      <h4 className="text-sm font-semibold">
                        {invitation.member_name}
                      </h4>
                      {/* <div className="flex items-center">
                        <img src={group} className="w-4 h-4" />
                        <span className="ml-2 text-sm ">
                          {invitation.membersCount}
                        </span>
                        <span className="ml-3 border h-3 border-slate-400"></span>
                        <span
                          style={{
                            fontSize: "13px",
                          }}
                          className="ml-3 text-sm text-slate-500 "
                        >
                          {invitation.description}
                        </span>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className=" bg-primary text-white px-3 rounded-lg">
                      <i style={{ fontSize: "12px" }}>
                        {t(invitation?.status && "invited")}
                      </i>
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Image
                          alt="kabab menu"
                          width={20}
                          height={20}
                          src="/tw/post/More-info.svg"
                          className="hover:cursor-pointer"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white text-black py-1 text-md font-medium">
                        <DropdownMenuItem
                          onClick={() => {
                            handleCancelInvite(
                              invitation.member_id?.toString()
                            );
                          }}
                        >
                          {" "}
                          {t("cancel_invite")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </li>
              ))}
              {/* {invitesData?.pages.every(
                (page: any) => !page?.result?.invitations?.length
              ) && (
                <p className="text-center text-gray-500 mt-4">
                  No invitations available.
                </p>
              )} */}
            </>
          )}
          {}

          {/* {invitesIsFetchingNextPage && (
            <>
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
              <HuddleSkelton />
            </>
          )} */}
          {/* {invitesHasNextPage && !invitesIsFetching && (
            <div ref={ref}>
              <HuddleSkelton />
              <HuddleSkelton />
            </div>
          )} */}
        </ul>
        {status === "success" && data?.result?.invitations?.length === 0 && (
          <p className="flex justify-center items-center">
            {t("empty_message_4")}
          </p>
        )}
      </section>
    </>
  );
};

export default Invites;
