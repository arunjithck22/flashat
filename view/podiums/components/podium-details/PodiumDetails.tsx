"use client";
import { usePodiumAboutStats } from "@/app/hooks/podiums/usePodiumAboutStats";
import { API_STATUS } from "@/common/constant";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

import HistoryList from "./HistoryList";
import JoinPodiumButton from "./JoinPodiumButton";
import ManagerAdmins from "./ManagerAdmins";
import PodiumAbout from "./PodiumAbout";
import TotalCard from "./TotalCard";
import { TranslationFunction } from "@/types";

const PodiumDetails = ({ podiumId }: { podiumId: string }) => {
  const t: TranslationFunction = useTranslations("podiums");
  const params = useParams();

  const { data, status } = usePodiumAboutStats({ podiumId: podiumId });
  console.log("podium stats ", data);

  return (
    <div className="w-full h-screen py-5 flex flex-col justify-between pb-28">
      {status === API_STATUS.SUCCESS && data && (
        <>
          <PodiumAbout
            profile_pic={
              data?.result?.profile_url ||
              data?.result?.manager?.profile_url ||
              ""
            }
            created_on={data?.result?.time_published}
            name={data?.result?.name}
            about={data?.result?.about}
          />

          <section className="flex justify-center items-center w-full flex-1">
            <div className="w-full max-w-lg bg-podiumItemBg  max-h-full about-podium overflow-y-auto custom-scrollbar rounded-lg px-4 py-2">
              <ManagerAdmins
                manager_name={data?.result?.manager?.name}
                manager_profile_thumbnail={data?.result?.manager?.profile_url}
                admins={data?.result?.admins}
              />
              <TotalCard
                total_likes={data?.result?.total_likes}
                total_speakers={data?.result?.total_speakers}
                total_duration={data?.result?.total_duration}
                live_times={data?.result?.total_sessions}
                total_joined={data?.result?.total_users}
              />
              <div className="py-5">
                <p
                  style={{
                    height: "0.2px",
                  }}
                  className="w-full bg-gray-300"
                ></p>
              </div>

              <div className="py-1">
                <header className="flex gap-1">
                  <Image
                    src="/podiums/history.svg"
                    width={15}
                    height={15}
                    alt="history"
                  />
                  <h3 className="text-sm text-primary base-semibold">
                    {t("history")}
                  </h3>
                </header>
                <div className="py-2 ">
                  <HistoryList podiumId={podiumId} />
                </div>
              </div>
            </div>
          </section>

          <JoinPodiumButton params={params} podiumId={data?.result?.id} />
        </>
      )}
      {status === API_STATUS.PENDING && <><p>loading</p></>}
    </div>
  );
};

export default PodiumDetails;
