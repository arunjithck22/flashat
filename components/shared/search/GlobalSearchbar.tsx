import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const GlobalSearchbar = () => {
  const t = useTranslations("Common");
  return (
    <div className="relative bg-gray-100 w-full max-w-[600px] max-lg:hidden rounded-lg">
      <div className="relative flex min-h-[48px] grow items-center gap-1 rounded-lg  px-4">
        <input
          type="text"
          placeholder={t("global search placeholder")}
          className="w-full h-12 bg-transparent rounded-lg border-none shadow-none outline-none"
        />
        <Image
          src="/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default GlobalSearchbar;
