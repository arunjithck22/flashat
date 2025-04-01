"use client";
import React, { useState } from "react";

import Invites from "./Invites";
import Requests from "./Requests";
import DrawerHeader from "../Header";
import { useTranslations } from "next-intl";

import { TranslationFunction } from "@/types";

const ManageReqInv = () => {
  const t: TranslationFunction = useTranslations("huddles");
  const [active, setActive] = useState("requests");

  const handleButtonClick = (activeButton: string) => {
    setActive(activeButton);
  };

  return (
    <>
      <header className="w-full h-[81px] border-bgray border-b px-3 ">
        <section className="flex gap-3  items-center h-full">
          <DrawerHeader />
          <h1 className="base-semibold text-lg">{t("requests_and_invites")}</h1>
        </section>
      </header>

      <section className="w-full h-auto   px-2 py-2 pt-3 flex gap-2">
        <button
          onClick={() => {
            handleButtonClick("requests");
          }}
          className={`px-2 py-2 w-1/2 rounded-lg  ${
            active === "requests" ? "bg-primary text-white" : "bg-bgray"
          }`}
        >
          {t("requests")}
        </button>
        <button
          onClick={() => {
            handleButtonClick("invites");
          }}
          className={`px-2 py-2 w-1/2 rounded-lg  ${
            active === "invites" ? "bg-primary text-white" : "bg-bgray"
          }`}
        >
          {t("invites")}
        </button>
      </section>
      {active === "invites" && <Invites />}
      {active === "requests" && <Requests />}
    </>
  );
};

export default ManageReqInv;
