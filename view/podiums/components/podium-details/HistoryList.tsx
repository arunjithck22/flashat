"use client";
import {
  SessionsResponse,
  usePodiumSessionHistory,
} from "@/app/hooks/podiums/usePodiumSessionHistory";
import { API_STATUS } from "@/common/constant";

import { PODIUM_ROLES } from "@/constants/podiums/constants";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { HistoryCardShimmer } from "../shimmers/PodiumHistoryCardShimmer";
import HistoryCard from "./HistoryCard";
import { PodiumSessions } from "@/types/podiums";
import { HttpResponse } from "@/types";

const HistoryList = ({ podiumId }: { podiumId: string }) => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const { data, status, isFetching, hasNextPage, fetchNextPage } =
    usePodiumSessionHistory({
      podiumId: podiumId,
      enabled: role === PODIUM_ROLES.MANAGER || role === PODIUM_ROLES.ADMIN,
    });
  const { ref, inView } = useInView();

  console.log("pdoium session history", data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  console.log("sessions", data);
  return (
    <div className="flex flex-col gap-1">
      {API_STATUS.SUCCESS === status && data && (
        <>
          {data.pages?.length > 0 &&
            data.pages.some(
              (page: HttpResponse<SessionsResponse>) =>
                page?.result?.records?.length > 0
            ) && (
              <>
                {data.pages.map((page) =>
                  page?.result?.records?.map(
                    (item: PodiumSessions, index: number) => (
                      <HistoryCard key={index} {...item} />
                    )
                  )
                )}
              </>
            )}
        </>
      )}

      {hasNextPage && (
        <div className="w-full flex flex-col gap-1" ref={ref}>
          <HistoryCardShimmer />
          <HistoryCardShimmer />
        </div>
      )}

      {isFetching && status === API_STATUS.PENDING && (
        <div className="w-full flex flex-col gap-1">
          <HistoryCardShimmer />
          <HistoryCardShimmer />
          <HistoryCardShimmer />
        </div>
      )}

      {!data && (
        <div className="text-center h-28  text-sm flex items-center justify-center ">
          No history found...
        </div>
      )}
    </div>
  );
};

export default HistoryList;
