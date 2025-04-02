import React from "react";
import Image from "next/image";
import HuddleSkelton from "../../HuddleSkelton";
import { API_STATUS } from "@/common/constant";
import useIncomingHuddleRequestActions from "@/app/hooks/huddles/useIncomingHuddleRequestActions";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  QKEY_INCOMING_HUDDLE_REQUESTS,
  useIncomingHuddleRequests,
} from "@/app/hooks/huddles/useIncomingHuddleRequests.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useBlockOrUnblockFromHuddle from "@/app/hooks/huddles/useBlockOrUnblockFromHuddle";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import { MemberRequest } from "@/types/huddles/index";


const Requests = () => {
  const t: TranslationFunction = useTranslations("huddles");
  // const { ref, inView } = useInView();
  const params = useParams();
  const queryClient = useQueryClient();

  const { data, status } = useIncomingHuddleRequests({
    huddleId: params.id?.toString(),
  });
  console.log("huddle requests", data);

  const requestActions = useIncomingHuddleRequestActions();
  const blockActions = useBlockOrUnblockFromHuddle();

  const handleActions = (
    e: React.MouseEvent<HTMLButtonElement>,
    member_id: string
  ) => {
    e.preventDefault();
    requestActions.mutateAsync(
      {
        huddleId: params.id?.toString(),
        data: {
          action: e.currentTarget.value,
          member_id: member_id,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QKEY_INCOMING_HUDDLE_REQUESTS, params.id],
          });
        },
      }
    );
  };

  const handleUnblock = (member_id: string) => {
    // e.preventDefault();
    blockActions.mutateAsync(
      {
        huddleId: params.id?.toString(),
        data: {
          action: "unblock",
          block_user_ids: [member_id],
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QKEY_INCOMING_HUDDLE_REQUESTS, params.id],
          });
        },
      }
    );
  };

  return (
    <div>
      <section
        style={{ height: "calc(100vh - 150px)" }}
        className="w-full relative h-auto mt-1 custom-scrollbar  border-bgray border- 2  overflow-y-auto  flex flex-col pb-32"
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
          {status === API_STATUS.SUCCESS &&
            data?.result?.requests?.length > 0 && (
              <ul>
                {data.result.requests.map((request: MemberRequest) => (
                  <li
                    key={request?.request_id} // Assuming `id` or a unique identifier exists for each request
                    className="flex flex-col border-b-2 py-2 px-2 relative"
                  >
                    <div className="flex items-center gap-4">
                      <div className=" overflow-hidden w-16 h-16 p-3 bg-gray-300 rounded-full">
                        <Image
                          className="w-full h-full object-cover bg-center  rounded-full  "
                          alt="user"
                          src={`${
                            request?.member_thumbnail ||
                            "/icons/user-default.svg"
                          }`}
                          width={40}
                          height={40}
                        />
                      </div>
                      <h4 className="text-sm font-semibold">
                        {request?.member_name || "Unknown User"}{" "}
                        {/* Fallback text */}
                      </h4>
                      {request?.status === "Blocked" && (
                        <div
                          className={`flex justify-between  items-center italic gap-1 ${
                            blockActions?.isPending && "disabled"
                          }`}
                        >
                          <span className="uppercase text-xs ">
                            {request?.status}
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
                                  handleUnblock(request.member_id?.toString());
                                }}
                              >
                                {" "}
                                {t("unblock")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </div>

                    {request?.status !== "Blocked" && (
                      <div
                        className={`flex gap-2 justify-end ${
                          requestActions?.isPending && "disabled"
                        } `}
                      >
                        <button
                          disabled={requestActions.isPending}
                          value={"admin_blocked"}
                          className="px-4 text-xs font-bold py-1 rounded-full text-center hover:bg-pink-100"
                          onClick={(e) => {
                            handleActions(e, request.member_id?.toString());
                          }}
                        >
                          {t("block")}
                        </button>
                        <button
                          disabled={requestActions.isPending}
                          value={"admin_declined"}
                          className="px-4 text-xs font-bold py-1 rounded-full text-center text-red-500 hover:bg-pink-100"
                          onClick={(e) => {
                            handleActions(e, request.member_id?.toString());
                          }}
                        >
                          {t("decline")}
                        </button>
                        <button
                          disabled={requestActions.isPending}
                          value={"admin_accepted"}
                          className="px-4 text-xs font-bold py-1 rounded-full text-center text-primary hover:bg-pink-100"
                          onClick={(e) => {
                            handleActions(e, request.member_id?.toString());
                          }}
                        >
                          {t("accept")}
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
        </ul>
        {status === "success" && data?.result?.requests?.length === 0 && (
          <p className="flex justify-center items-center">
            {t("empty_message_3")}
          </p>
        )}
      </section>
    </div>
  );
};

export default Requests;
