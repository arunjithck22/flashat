import { useTranslations } from "next-intl";
import React from "react";

interface PersonalDetailsProps {
  gender: string;
  dob: string;
  about: string;
}

const PersonalDetails = ({ gender, dob, about }: PersonalDetailsProps) => {
  const t = useTranslations("profile");
  const idCard = useTranslations("id_card");

  const fallback = "Not available"; // Use translation or fallback string

  const renderValue = (value: string | null | undefined) => {
    return value && value.trim() !== "" ? value : fallback;
  };

  return (
    <>
      <article className="mt-medium flex flex-col bg-white shadow-md border border-gray-100 p-normal w-full lg:w-6/12">
        <h2 className="text-primary text-md font-bold">Personal Details</h2>
        <div className="flex gap-20">
          <div className="flex">
            <div className="flex flex-col">
              <label className="text-sm mt-4 text-tsecond">
                {t("gender")}
              </label>
              <b className="text-sm text-visitorText">{renderValue(gender)}</b>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label className="text-sm mt-4 text-tsecond">
                {t("date_of_birth")}
              </label>
              <b className="text-sm text-visitorText">{renderValue(dob)}</b>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm mt-4 text-tsecond">
            {idCard("about")}
          </label>
          <b className="text-sm text-visitorText">{renderValue(about)}</b>
        </div>
      </article>
    </>
  );
};

export default PersonalDetails;
