"use client";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import React from "react";
import Balance from "./Balance";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";

const Profile = () => {
  const { profile, name } = useAuth();
  const pathname = usePathname();
  const t: TranslationFunction = useTranslations("buy_flix_coins");

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-8 sm:px-12 md:px-20 lg:px-32 sm:gap-10">
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center sm:items-start sm:justify-between sm:w-full">
        <div className="flex  gap-5 justify-center items-center ">
          <figure>
            <Image
              className="rounded-full w-16 sm:w-20 h-16 sm:h-20 object-cover bg-center"
              alt="user"
              src={profile || "/icons/user-default.svg"}
              width={100}
              height={100}
            />
          </figure>
          <figcaption className="flex flex-col justify-center gap-2 text-center sm:text-left">
            <span className="flex flex-wrap font-bold text-secGray text-md">
              {/* {user?.user?.profile?.name} */} {name}
            </span>
            <Balance type={pathname === "/buy-FLiX" ? "flix" : "coins"} />
          </figcaption>
        </div>
        <div className="justify-center sm:justify-start sm:mt-0 mt-4"></div>
      </div>

      <Link
        href={
          pathname?.includes("/buy-COiNS")
            ? "/COiNS-purchase-history"
            : "/FLiX-purchase-history"
        }
        prefetch={true}
      >
        <h4 className="text-primary base-semibold text-sm">{t("history")}</h4>
      </Link>
    </nav>
  );
};

export default Profile;
