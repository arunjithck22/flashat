"use client";

import HuddleSkelton from "../huddle/HuddleSkelton";
import { API_STATUS } from "@/common/constant";
import PersonalDetails from "./PersonalDetails";
import AccountDetails from "./AccountDetails";
import Image from "next/image";
import { useProfile } from "@/app/hooks/account/useUserProfile";
import { useLogout } from "@/app/hooks/useLogout";
import EditProfile from "./EditProfile";
import ProfilePhoto from "./ProfilePhoto";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";

// import { profile } from "console";

const items = [
  { id: 1, label: "stars", imageSrc: "/tw/profile/Stars.svg" },
  { id: 2, label: "dears", imageSrc: "/tw/profile/Dears.svg" },
  { id: 3, label: "fans", imageSrc: "/tw/profile/Fans.svg" },
  { id: 4, label: "likers", imageSrc: "/tw/profile/Likers.svg" },
];

const UserProfile = () => {
  const t: TranslationFunction = useTranslations("profile");

  const err: TranslationFunction = useTranslations("error_messages");
  const common: TranslationFunction = useTranslations("common");
  const { isAuthenticated } = useAuth();
  const { data, isLoading, status, isError } = useProfile(isAuthenticated);

  const { logoutUser } = useLogout();

  console.log("data",data);

 
  
  const handleLogoutClick = async () => {
    await logoutUser();
    window.location.href = "/";
  };

  return (
    <>
      <main
        className="overflow-y-auto custom-scrollbar flex flex-col p-8 w-full"
        style={{ height: "calc(100vh - 110px)" }}
      >
        {isLoading && (
          <>
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
            <HuddleSkelton />
          </>
        )}
        {isError && (
          <div className="flex justify-center items-center text-red-500">
            {err("500")}
          </div>
        )}
        {status === API_STATUS.SUCCESS && (
          <>
            <section className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div>
                <ProfilePhoto
                  photo={data?.result?.profile_photo}
                  is_premium={data?.result?.is_premium}
                />
              </div>
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <div className="sm:flex flex  flex-col sm:flex-row justify-between items-center">
                  <div>
                    <h1 className="base-bold text-lg sm:text-xl">
                      {data?.result?.name}
                    </h1>
                    <p className="text-sm sm:text-base">
                      {data?.result?.email}
                    </p>
                  </div>
                  <EditProfile
                    username={data?.result?.name}
                    email={data?.result?.email}
                    dob={data?.result?.dob}
                    gender={data?.result?.gender}
                    about={data?.result?.about}
                  />
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-1 mb-4">
                      <Image
                        src={item.imageSrc}
                        alt={item.label}
                        width={30}
                        height={30}
                        className="rounded"
                      />
                      <div className="flex flex-col sm:flex-row gap-1 items-center">
                        <p className="text-md base-semibold">
                          {item.id === 1 && data.result.stars}
                          {item.id === 2 && data.result.dears}
                          {item.id === 3 && data.result.fans}
                          {item.id === 4 && data.result.likers}
                        </p>
                        <p className="text-xs text-gray-500">
                          {common(item.label)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="p-2 shadow-md max-w-xl border  border-gray-100 py-5 my-5">
              <section className="flex flex-col max-w-xl  border-b-2">
                <label className="text-sm text-tsecond" htmlFor="">
                  {t("profile_completeness")} -{" "}
                  <span className="font-bold text-black">
                    {data?.result?.profile_complete_percentage}%
                  </span>
                </label>

                <div className="flex mt-3 items-center justify-start">
                  <div className="w-full bg-tsecond shadow-lg rounded-full h-2">
                    <div
                      style={{
                        width: `${data?.result?.profile_complete_percentage}%`,
                      }}
                      className="rounded-full bg-primary h-2"
                    ></div>
                  </div>
                </div>
              </section>

              <section className="flex max-w-xl justify-between pt-4 text-sm">
                <label className="text-tsecond" htmlFor="">
                  {common("flix")}({t("flashat_points")})
                </label>
                <span>{data?.result?.active_points}</span>
              </section>
            </div>

            <section className="flex flex-col max-w-xl md:flex-row justify-between mt-20 pb-5 border-b-2 text-sm">
              <label className="text-tsecond" htmlFor="">
                {t("total_broadcasts")}
              </label>
              <span>{data?.result?.total_broadcasts}</span>
            </section>

            <section className="flex flex-col max-w-xl md:flex-row justify-between pt-4 text-sm">
              <label className="text-tsecond" htmlFor="">
                {t("total_likes")}
              </label>
              <span>{data?.result?.total_likes}</span>
            </section>

            <div className="flex flex-col lg:flex-row w-full gap-6 md:gap-12 lg:max-w-4xl lg:justify-between">
              <AccountDetails
                email={data?.result?.email}
                mob={data?.result?.phone}
                username={data?.result?.username}
                country_code={data?.result?.country_code}
                country_code_iso={data?.result?.country_code_iso}
              />

              <PersonalDetails
                gender={data?.result?.gender}
                dob={data?.result?.dob}
                about={data?.result?.about || ""}
              />
            </div>
            <div className="py-5">
              <button
                onClick={handleLogoutClick}
                className="bg-white base-bold text-red-500 rounded-lg border border-red-500 px-3 py-1"
              >
                {t("logout")}
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default UserProfile;
