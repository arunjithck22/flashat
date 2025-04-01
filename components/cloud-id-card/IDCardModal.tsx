"use client";
import { useAccount } from "@/app/hooks/account/useAccount";
import { API_STATUS } from "@/common/constant";


import React from "react";
import IdCardShimmer from "../huddle/shimmers/IdCardShimmer";
import About from "./About";
import IdCard from "./IdCard";
import UserStrength from "./UserStrength";

const IDCardModal = ({ user_id }: { user_id?: string }) => {
  

  const { data, status, isLoading } = useAccount({
    userId: user_id || "",
  });
  console.log("cloud id crad", data);
  return (
    <>
      {status === API_STATUS.SUCCESS && (
        <div className="flex flex-col gap-2 w-full lg:w-96">
          {" "}
          <IdCard
            name={data?.result?.name}
            id_code={data?.result?.username}
            nick_name={data?.result?.nickname || null}
            citizenship={data?.result?.citizenship}
            thumbnail={data?.result?.thumbnail}
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
        </div>
      )}
      {isLoading && <IdCardShimmer />}
    </>
  );
};

export default IDCardModal;
