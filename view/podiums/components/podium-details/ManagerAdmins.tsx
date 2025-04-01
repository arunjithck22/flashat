"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import AdminsList from "./AdminsList";
import { Admin } from "@/types/podiums";
import { TranslationFunction } from "@/types";

interface ManagerAdminProps {
  manager_profile_thumbnail: string;
  manager_name: string;
  admins: Admin[];
}

const ManagerAdmins = ({
  manager_name,
  manager_profile_thumbnail,
  admins,
}: ManagerAdminProps) => {
  const t: TranslationFunction = useTranslations("podiums");
  console.log("Admins list", admins);
  const [accordion, setAccordion] = useState(false);
  return (
    <section className="flex flex-col items-center bg-white p-2 rounded-lg gap-2">
      <div className="flex w-full justify-between px-2">
        <h3 className="text-sm base-semibold text-primary py-2">
          {t("manager_and_admins")}
        </h3>
        {admins?.length > 0 && (
          <Image
            onClick={() => {
              setAccordion(!accordion);
            }}
            src={
              !accordion
                ? "/podiums/chevron-down.svg"
                : "/podiums/chevron-up.svg"
            }
            alt="chevron"
            width={15}
            height={15}
          />
        )}
      </div>
      <div className=" w-full flex gap-2">
        <Image
          src={manager_profile_thumbnail || "/podiums/default.svg"}
          alt="profile"
          className="rounded-full w-10 h-10 object-cover bg-cover"
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-center ">
          <span className="base-semibold text-xs">{manager_name}</span>
          <span className="text-xs text-gray-500">{t("manager")}</span>
        </div>
      </div>
      {admins?.length > 0 &&
        accordion &&
        admins?.map((item: Admin) => {
          return (
            <>
              <AdminsList
                key={item?.id}
                name={item?.name}
                profile={item?.profile_url}
              />
            </>
          );
        })}
    </section>
  );
};

export default ManagerAdmins;
