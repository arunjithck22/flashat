import { TranslationFunction } from "@/types";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface IdCardProps {
  name: string; // User's name
  id_code: string; // ID code (can be empty)
  nick_name?: string | null; // Nickname, optional or null
  citizenship: string; // Citizenship or country
  thumbnail?: string; // Thumbnail URL, optional
  age?: number; // Age, optional
  is_premium: boolean; // Whether the user is a premium member
  issue_date: string; // Issue date of the ID
  subscription_expiry_date: string; // Expiry date of the subscription
  country_code?: string; // Country code, optional
}

const IdCard: React.FC<IdCardProps> = ({
  name,
  id_code,

  citizenship,
  thumbnail,
  age,
  is_premium,
  issue_date,
  subscription_expiry_date,
  country_code,
}) => {
  const t: TranslationFunction = useTranslations("id_card");
  const cn = classNames({
    "bg-[url('/bg/min-id.svg')] text-[#FFFFFF]": citizenship === "minister",
    "bg-[url('/bg/cit-id.svg')] text-[#771082]": citizenship === "citizen",
    "bg-[url('/bg/res-id.svg')] text-[#FFFFFF]": citizenship === "resident",
    "bg-[url('/bg/off-id.svg')] text-[#771082]": citizenship === "officer",
    "bg-[url('/bg/pre-id.svg')] text-[#FFFFFF]": citizenship === "president",
    "bg-[url('/bg/amb-id.svg')] text-[#771082]": citizenship === "ambassador",
    "bg-[#E0E0E0]": citizenship === "visitor",
  });
  const headerCn = classNames({
    "bg-[url('/bg/min-header.svg')] text-[#771082]": citizenship === "minister",
    "bg-[url('/bg/coa-header.svg')] text-[#FFED90]":
      citizenship === "citizen" ||
      citizenship === "ambassador" ||
      citizenship === "officer",
    "bg-[url('/bg/pre-header.svg')] text-[#771082]":
      citizenship === "president",
    "bg-[#FFFFFF] text-[#3F464E] ":
      citizenship === "visitor" || citizenship === "resident",
  });
  return (
    <div className={`w-full flex  py-3 rounded-lg  ${cn} bg-cover bg-center `}>
      <div className="w-1/2">
        <header
          className={`${headerCn} bg-cover bg-center w-[120px] h-8 flex justify-center items-center text-lg base-bold  ltr:rounded-r-lg rtl:rounded-l-lg`}
        >
          {t("identity_card")}
        </header>
        <ul className="flex flex-col w-full px-3 mt-5  gap-2 text-md">
          <li className="grid grid-cols-[80px_auto] text-md">
            <span>{t("name")}</span>
            <span className="flex">
              <span className="inline-block w-4">:</span>{" "}
              <span className="base-semibold text-md truncate md:max-w-28 max-w-16 sm:max-w-16">
                {name}
              </span>
            </span>
          </li>
          <li className="grid grid-cols-[80px_auto] text-md">
            <span>{t("id_code")}</span>
            <span className="flex">
              <span className="inline-block w-4">:</span>{" "}
              <span className="base-semibold text-md">{id_code}</span>
            </span>
          </li>

          <li className="grid grid-cols-[80px_auto] text-md">
            <span>{t("flashat_age")}</span>
            <span className="flex">
              <span className="inline-block w-4">:</span>{" "}
              <span className="base-semibold text-md">{age}</span>
            </span>
          </li>
          <li className="grid grid-cols-[80px_auto] text-md">
            <span>{t("flag")}</span>
            <span className="flex">
              <span className="inline-block w-4">:</span>{" "}
              <span
                className={`fi fi-${country_code?.toLowerCase()} text-xs`}
                // className="base-semibold text-md"
              ></span>
            </span>
          </li>
        </ul>
      </div>
      <div className="w-1/2">
        <header className=" flex justify-center items-center text-xl base-bold capitalize">
          {citizenship}
        </header>
        <section className="py-3 flex justify-center items-center mt-7   ">
          <figure className="rounded-full relative ">
            {is_premium && (
              <Image
                src="/tw/post/premium.svg"
                width={25}
                height={25}
                className="absolute left-0"
                alt="premium"
              />
            )}

            <Image
              src={thumbnail ? thumbnail : "/icons/user-default.svg"}
              alt="profile"
              width={80}
              height={80}
              className={`rounded-full w-24 h-24 bg-gray-300 object-cover bg-cover ${
                !thumbnail && "p-4"
              } `}
            />
          </figure>
        </section>
        <footer
          className={`flex ${
            is_premium ? "justify-between" : " justify-center"
          } px-4  text-xs`}
        >
          <div>
            <p>{t("issue_date")}</p>
            <p className="base-semibold text-xs">{issue_date}</p>
          </div>
          {is_premium && (
            <div>
              <p>{t("expiry_date")}</p>
              <p className="base-semibold text-xs">
                {subscription_expiry_date}
              </p>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default IdCard;
