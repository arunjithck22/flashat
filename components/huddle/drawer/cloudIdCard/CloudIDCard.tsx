"use client";
import { useAccount } from "@/app/hooks/account/useAccount";
import { API_STATUS } from "@/common/constant";
import About from "@/components/cloud-id-card/About";
import IdCard from "@/components/cloud-id-card/IdCard";
import UserStrength from "@/components/cloud-id-card/UserStrength";

import React from "react";
import IdCardShimmer from "../../shimmers/IdCardShimmer";
import CloudIDDrawerHeader from "./CloudIDDrawerHeader";

const CloudIDCard = ({ sender }: { sender: string | null }) => {
  const { data, isFetching, status } = useAccount({
    userId: sender?.toString() || "",
  });
  console.log("cloud id", data);
  return (
    <>
      <CloudIDDrawerHeader />
      {status === API_STATUS.SUCCESS && (
        <>
          {" "}
          <section
            style={{ height: "calc(100vh - 200px)" }}
            className="w-full relative h-auto mt-1 pb-12  px-2  overflow-y-auto  gap-3  custom-scrollbar flex flex-col  "
          >
            <IdCard
              name={data?.result?.name}
              id_code={data?.result?.username}
              nick_name={data?.result?.nickname || null}
              citizenship={data?.result?.citizenship}
              thumbnail={data.result?.thumbnail}
              age={data?.result?.dage}
              is_premium={data?.result?.membership === "Premium"}
              issue_date={data?.result?.issue_date}
              subscription_expiry_date={data?.result?.subscription_expiry_date}
              country_code={data?.result?.country_code}
            />
            <UserStrength
              dears={data.result?.dears}
              fans={data.result?.fans}
              likers={data?.result?.likers}
              stars={data?.result?.stars}
              rating={data?.result?.flax_rate_percentage}
              gnr={data?.result?.contributor_level}
              skl={data?.result?.player_level}
              is_premium={data?.result?.membership === "Premium"}
              {...data.result}
            />
            <About
              about={data.result?.about}
              is_premium={data?.result?.membership === "Premium"}
              citizenship={data?.result.citizenship}
            />
          </section>
        </>
      )}
      {isFetching && <IdCardShimmer />}
    </>
  );
};

export default CloudIDCard;
