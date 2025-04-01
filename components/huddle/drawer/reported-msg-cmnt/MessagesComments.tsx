import { useTranslations } from "next-intl";

import React, { useState } from "react";
import DrawerHeader from "../Header";
import ReportedComments from "./ReportedComments";
import ReportedMessages from "./ReportedMessages";

import { TranslationFunction } from "@/types";

const MessagesComments = () => {
  const t: TranslationFunction = useTranslations("huddles");
  const [active, setActive] = useState("messages");

  const handleButtonClick = (activeButton: string) => {
    setActive(activeButton);
  };

  return (
    <>
      <header className="w-full h-[81px] border-bgray border-b px-3 ">
        <section className="flex gap-3  items-center h-full">
          <DrawerHeader />
          <h1 className="base-semibold text-lg">
            {t("reported_messages_and_comments")}
          </h1>
        </section>
      </header>

      <section className="w-full h-auto   px-2 py-2 pt-3 flex gap-2">
        <button
          onClick={() => {
            handleButtonClick("messages");
          }}
          className={`px-2 py-2 w-1/2 rounded-lg  ${
            active === "messages" ? "bg-primary text-white" : "bg-bgray"
          }`}
        >
          {t("messages")}
        </button>
        <button
          onClick={() => {
            handleButtonClick("comments");
          }}
          className={`px-2 py-2 w-1/2 rounded-lg  ${
            active === "comments" ? "bg-primary text-white" : "bg-bgray"
          }`}
        >
          {t("comments")}
        </button>
      </section>
      {active === "messages" && <ReportedMessages active={active} />}
      {active === "comments" && <ReportedComments active={active} />}
    </>
  );
};

export default MessagesComments;
