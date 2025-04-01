"use client";
import {
  PodiumsResponse,
  useListPodiums,
} from "@/app/hooks/podiums/useListPodiums";
import { API_STATUS } from "@/common/constant";
import HuddleSkelton from "@/components/huddle/HuddleSkelton";
import { PODIUM_TABS } from "@/constants/podiums/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FriendsListItem from "./FriendsListItem";
import PodiumListItem from "./PodiumListItem";
import { HttpResponse, TranslationFunction } from "@/types";
import { LiveFriends, SinglePodium } from "@/types/podiums";

const PodiumList = ({ type }: { type: string }) => {
  const t: TranslationFunction = useTranslations("podiums");
  const params = useParams();
  const {
    data,

    isFetching,
    hasNextPage,
    fetchNextPage,

    status,
  } = useListPodiums({ tab: type });

  console.log("podium list", data);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <div className="relative">
      <section
        style={{
          height: "calc(100vh - 160px)",
        }}
        className={`overflow-y-auto custom-scrollbar px-1  w-full flex flex-col gap-1 
          
        `}
      >
        {API_STATUS.SUCCESS === status &&
          data &&
          (params?.type === PODIUM_TABS.LIVE_PODIUMS ||
            params?.type === PODIUM_TABS.MY_PODIUMS) && (
            <>
              {data?.pages?.length > 0 &&
              data.pages.some((page) => page?.result?.podiums?.length > 0) ? (
                data.pages.map((page) =>
                  page?.result?.podiums?.map((item: SinglePodium) => (
                    <PodiumListItem
                      key={item?.id}
                      manager_profile={item?.manager_profile_thumbnail}
                      podium_profile={item?.profile_pic || ""}
                      name={item?.name}
                      about={item?.about}
                      kind={item?.kind}
                      live={item?.live}
                      live_users={item?.live_users}
                      is_private={item?.is_private}
                      role={item?.role}
                      id={item?.id}
                    />
                  ))
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <Image
                    width={100}
                    height={100}
                    src="/podiums/live-podiums-empty.svg"
                    alt="No Live Podiums Found"
                    className="w-48 h-48"
                  />
                  <p className="text-center text-gray-500 mt-4">
                    {params?.type === "live-podiums" && t("empty_message_1")}
                    {params?.type === "my-podiums" && t("empty_message_2")}
                  </p>
                </div>
              )}
            </>
          )}

        {API_STATUS.SUCCESS === status &&
          data &&
          params?.type === PODIUM_TABS.LIVE_FRIENDS && (
            <>
              {data?.pages?.length > 0 &&
              data.pages.some(
                (page: HttpResponse<PodiumsResponse>) =>
                  page?.result?.liveFriends?.length > 0
              ) ? (
                data.pages.map((page) =>
                  page?.result?.liveFriends?.map((item: LiveFriends) => (
                    <FriendsListItem
                      key={item?.podium_id}
                      name={item?.name}
                      podium_name={item?.podium_name}
                      podium_kind={item?.podium_kind}
                      podium_id={item?.podium_id}
                      podium_live_users_count={item?.podium_live_users_count}
                      user_id={item?.user_id?.toString()}
                      profile_url={item?.profile_url}
                      role={item?.role}
                    />
                  ))
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <Image
                    width={100}
                    height={100}
                    src="/podiums/live-podiums-empty.svg"
                    alt="No Live Podiums Found"
                    className="w-48 h-48"
                  />
                  <p className="text-center text-gray-500 mt-4">
                    {t("empty_message_3")}
                  </p>
                </div>
              )}
            </>
          )}

        {hasNextPage && (
          <div ref={ref}>
            <HuddleSkelton />
            <HuddleSkelton />
          </div>
        )}

        {isFetching && status === API_STATUS.PENDING && (
          <>
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
          </>
        )}
      </section>
      {/* {type === HUDDLES_TABS.USER_MANAGED && <CreateNewButton />} */}
    </div>
  );
};

export default PodiumList;
