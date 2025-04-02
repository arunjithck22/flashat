"use client";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import PodiumDetails from "./components/podium-details/PodiumDetails";
import PodiumFilter from "./components/podium-list/PodiumFilter";
import PodiumList from "./components/podium-list/PodiumList";
import { Params } from "@/types";

const Podiums = () => {
  const params: Params = useParams();
  const searchParams = useSearchParams();
  const podiumId = searchParams?.get("podiumId");
  return (
    <div className="flex w-full  justify-center min-h-screen items-center">
      <div className="md:w-full lg:max-w-md  w-full flex flex-col  border  ">
        <PodiumFilter currentStatus={params.type} />

        <PodiumList type={params.type?.toString() || ""} />
      </div>

      <div className="w-full min-h-screen   flex justify-center items-center">
        {!podiumId ? (
          <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
            {" "}
            <Image
              width={200}
              height={200}
              src="/podiums/live-podiums-empty.svg"
              alt="No Live Podiums Found"
              className="w-80 h-80"
            />
            <p className="base-bold text-sm">
              {" "}
              Only Premium users can go Live in Podiums
            </p>
          </div>
        ) : (
          <div className="w-full pt-24">
            <PodiumDetails podiumId={podiumId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Podiums;
