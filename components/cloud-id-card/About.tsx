import { TranslationFunction } from "@/types";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import React from "react";

const About = ({
  about,
  // is_premium,
  citizenship,
}: {
  about: string;
  is_premium?: boolean;
  citizenship?: string;
}) => {
  const t: TranslationFunction = useTranslations("id_card");
  const headerCn = classNames({
    "bg-[url('/bg/min-header.svg')] text-[#771082]": citizenship === "minister",
    "bg-[url('/bg/coa-header.svg')] text-[#FFFCEC]":
      citizenship === "citizen" ||
      citizenship === "ambassador" ||
      citizenship === "officer",
    "bg-[url('/bg/pre-header.svg')] text-[#771082]":
      citizenship === "president",
    "bg-[#E0E0E0] text-[#3F464E] ": citizenship === "visitor",
    "bg-[url('/bg/res-header.svg')] text-[#FFFFFF] ":
      citizenship === "resident",
  });
  return (
    <>
      <div
        className={`w-full flex px-3  text-lg base-bold py-1 relative rounded-lg ${headerCn} bg-cover bg-center`}
      >
        {t("about")}
      </div>
      <div className="max-w-full w-full px-3 text-sm py-1 relative rounded-lg text-black break-words overflow-visible">
        {about}
        {/* hsdjfsdhgfiwbfjuwjciwebiweuveieaivneinvienrvineivnieanvienivneuivnuenvefvnnfvnenvnvuuvnvnnnvfiennru */}
      </div>
    </>
  );
};

export default About;
