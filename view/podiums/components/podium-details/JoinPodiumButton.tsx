"use client";
import { PODIUM_ROLES, PODIUM_TABS } from "@/constants/podiums/constants";
import { Params, TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import React from "react";

const JoinPodiumButton = ({
  params,
  podiumId,
}: {
  params: Params;
  podiumId: string;
}) => {
  console.log("podiumId", podiumId);
  const t: TranslationFunction = useTranslations("podiums");
  const router = useRouter();

  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const kind = searchParams.get("kind");

  console.log("Search params", searchParams);
  const handleJoinPodium = () => {
    router.push(`/podiums/live/${podiumId}?mode=join&kind=${kind}`);
  };

  const handleGoLivePodium = () => {
    router.push(`/podiums/live/${podiumId}?mode=go-live&kind=${kind}`);
  };
  return (
    <>
      <section className="flex justify-center items-center   w-full py-2">
        <div className="w-full max-w-lg">
          {params?.type === PODIUM_TABS.MY_PODIUMS &&
            (role === PODIUM_ROLES.ADMIN || role === PODIUM_ROLES.MANAGER) && (
              <button
                onClick={handleGoLivePodium}
                className="w-full uppercase bg-primary rounded-lg  text-white py-2 text-center text-md base-bold"
              >
                {t("go_live")}
              </button>
            )}
          {(params?.type === PODIUM_TABS.LIVE_FRIENDS ||
            params?.type === PODIUM_TABS.LIVE_PODIUMS) && (
            <button
              onClick={handleJoinPodium}
              className="w-full uppercase bg-primary rounded-lg  text-white py-2 text-center text-md base-bold"
            >
              {t("join_podium")}
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default JoinPodiumButton;
