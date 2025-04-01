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
  return (
    <>
      <article className="mt-20 flex flex-col shadow-md  p-4 w-full md:w-3/4 lg:w-1/2 border  border-gray-100 ">
        <h2 className="text-primary  text-md font-bold">Personal Details</h2>
        <div className="flex gap-20  ">
          <div className="flex ">
            <div className="flex flex-col ">
              <label className="text-sm mt-4 text-tsecond" htmlFor="">
                {t("gender")}
              </label>
              <b className="text-sm">{gender}</b>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <label className="text-sm mt-4 text-tsecond" htmlFor="">
                {t("date_of_birth")}
              </label>
              <b className="text-sm">{dob}</b>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <label className="text-sm mt-4 text-tsecond" htmlFor="">
            {idCard("about")}
          </label>
          <b className="text-sm">{about}</b>
        </div>
      </article>
    </>
  );
};

export default PersonalDetails;
