"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  MembersResponse,
  useParticipants,
} from "@/app/hooks/huddles/useParticipants";
import { API_STATUS } from "@/common/constant";
import HuddleSkelton from "../../HuddleSkelton";
import ListItem from "./ListItem";
import DrawerHeader from "../Header";

import { useTranslations } from "next-intl";
import { useHuddleProvider } from "@/contexts/huddles/HuddleProvider";
import { HttpResponse, TranslationFunction } from "@/types";
import { Members } from "@/types/huddles/index";

// import group from "@assets/tw/group-line.svg";

const Particpants = () => {
  const { state } = useHuddleProvider();
  const t: TranslationFunction = useTranslations("huddles");

  const { ref, inView } = useInView();
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const {
    data: participants,
    status,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useParticipants(state.currentHuddle, debouncedKeyword);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value); // Update keyword
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);
  console.log("participants", participants);

  return (
    <>
      <header className="w-full h-[81px] border-bgray border-b px-3 ">
        <section className="flex gap-3  items-center h-full">
          <DrawerHeader />
          <h1 className="base-semibold text-lg">{t("participants")}</h1>
        </section>
      </header>
      <section className=" relative mt-1    flex flex-col   ">
        <div className="flex justify-center items-center fixed z-50 px-4  w-full ">
          <input
            type="text"
            placeholder={t("search_particpants")}
            className="h-10 w-full px-2 border-0 bg-gray-200 outline-none rounded-md"
            onChange={handleSearch} // Trigger search on input change
            value={keyword}
          />
        </div>

        <section
          style={{ height: "calc(100vh - 125px)" }}
          className="px-3 mb-2 pb-28  mt-10 overflow-y-auto h-auto  flex flex-col custom-scrollbar "
        >
          <ul>
            {status === API_STATUS.PENDING && (
              <>
                <HuddleSkelton />
                <HuddleSkelton />
                <HuddleSkelton />
                <HuddleSkelton />
                <HuddleSkelton />
                <HuddleSkelton />
                <HuddleSkelton />
                <HuddleSkelton />
              </>
            )}

            {API_STATUS.SUCCESS === status &&
              (participants?.pages?.some(
                (page: HttpResponse<MembersResponse>) =>
                  page?.result?.members?.length > 0
              ) ? (
                participants?.pages?.map(
                  (page: HttpResponse<MembersResponse>) =>
                    page?.result?.members?.map(
                      (item: Members, index: number) => (
                        <ListItem key={index} item={item} />
                      )
                    )
                )
              ) : (
                <div className="text-center mt-4 text-gray-500">
                  {t("empty_message_2")}
                </div>
              ))}

            {hasNextPage && !isFetching && (
              <div ref={ref}>
                <HuddleSkelton />
                <HuddleSkelton />
              </div>
            )}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Particpants;
