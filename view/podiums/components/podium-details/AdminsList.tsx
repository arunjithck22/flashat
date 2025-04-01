import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const AdminsList = ({ name, profile }: { name: string; profile: string }) => {
  const t: TranslationFunction = useTranslations("podiums");
  return (
    <div className=" w-full flex gap-2 p-2">
      <Image
        src={profile || ""}
        alt="chevron"
        className="rounded-full w-8 h-8 object-cover bg-cover"
        width={100}
        height={100}
      />
      <div className="flex flex-col justify-center ">
        <span className="base-semibold text-xs">{name}</span>
        <span className="text-xs text-gray-500">{t("admin")}</span>
      </div>
    </div>
  );
};

export default AdminsList;
