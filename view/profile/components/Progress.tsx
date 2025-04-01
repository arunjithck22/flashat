"use client";
import React from "react";
import { ProfileResponse } from "@/types/profile";
import { useTranslations } from "next-intl";

interface ProgressProps {
  profileData: ProfileResponse;
}
const Progress: React.FC<ProgressProps> = ({ profileData }) => {
  const t = useTranslations("profile");
  const common = useTranslations("common");

  return (
    <div className="p-normal">
      <div className="p-normal max-w-xl bg-white shadow-md  border border-gray-100 py-5 mt-medium">
        <section className="flex flex-col max-w-xl border-b-2">
          <label className="text-sm text-tsecond" htmlFor="">
            {t("profile_completeness")} -{" "}
            <span className="font-bold text-visitorText">
              {profileData.profile_complete_percentage}%
            </span>
          </label>
          <div className="flex mt-3 items-center justify-start">
            <div className="w-full bg-tsecond shadow-lg rounded-full h-2">
              <div
                style={{ width: `${profileData.profile_complete_percentage}%` }}
                className="rounded-full bg-primary h-2"
              ></div>
            </div>
          </div>
        </section>
        <section className="flex max-w-xl justify-between pt-4 text-sm">
          <label className="text-tsecond" htmlFor="">
            {common("flix")}({t("flashat_points")})
          </label>
          <span>{profileData.active_points}</span>
        </section>
      </div>
    </div>
  );
};

export default Progress;
