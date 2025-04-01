/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDearsList } from "@/app/hooks/huddles/useDearsList";
import { API_STATUS } from "@/common/constant";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HuddleSkelton from "../HuddleSkelton";

const DearsList = ({
  dearsList,
  setDearsList,
  selectAllDearsSelected,
  setSelectAllDearsSelected,
}: any) => {
  const { ref } = useInView();
  const t: any = useTranslations("huddles");
  const common: any = useTranslations("common");
  const {
    data: dears,
    status,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useDearsList();

  useEffect(() => {
    const allDearsIds = dears?.pages.flatMap((page) =>
      page?.result?.dears?.map((liker) => liker.id)
    );
    if (allDearsIds?.length && dearsList.length === allDearsIds.length) {
      setSelectAllDearsSelected(true);
    } else {
      setSelectAllDearsSelected(false);
    }
  }, [dearsList, dears, setSelectAllDearsSelected]);

  const handleSelectAllChange = () => {
    const allDearsIds = dears?.pages.flatMap((page) =>
      page?.result?.dears?.map((liker) => liker.id)
    );
    if (!selectAllDearsSelected) {
      setDearsList(allDearsIds || []);
    } else {
      setDearsList([]);
    }
  };

  const handleCheckboxChange = (value: any) => {
    if (!dearsList.includes(value)) {
      setDearsList((prevDears: any) => [...prevDears, value]);
    } else {
      setDearsList((prevDears: any) =>
        prevDears.filter((item: any) => item !== value)
      );
    }
  };

  return (
    <ul className="flex flex-col gap-5">
      {dears?.pages.every((page: any) => !page?.result?.dears?.length) ? (
        <p className="text-center flex justify-center items-center text-gray-500 mt-4">
          {t("empty_message_1")}
        </p>
      ) : (
        status === API_STATUS?.SUCCESS && (
          <li className="flex items-center gap-5 px-5 max-md:mt-10">
            <input
              onChange={handleSelectAllChange}
              type="checkbox"
              checked={selectAllDearsSelected}
            />
            <div className="text-gray-700 text-base font-bold tracking-wide my-auto">
              {common("select_all")}
            </div>
          </li>
        )
      )}

      {status === API_STATUS.PENDING && (
        <>
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
        </>
      )}

      {API_STATUS.SUCCESS === status &&
        dears?.pages.map((page) =>
          page?.result?.dears?.map((liker) => (
            <li
              className="flex items-center gap-5 px-5 max-md:mt-10"
              key={liker.id}
            >
              <input
                value={liker?.id}
                onChange={() => handleCheckboxChange(liker?.id)}
                type="checkbox"
                checked={dearsList.includes(liker.id)}
              />
              <div className="relative overflow-hidden">
                <Image
                  width={40}
                  height={40}
                  className="w-full h-full rounded-full object-cover bg-center"
                  alt="user"
                  src={
                    liker?.thumbnail
                      ? liker?.thumbnail
                      : "/tw/placeholder/placeholder-image-icon.jpg"
                  }
                />
                {liker?.membership === "Premium" && (
                  <Image
                    className="absolute top-0 right-0"
                    width={20}
                    height={20}
                    src="/tw/post/premium.svg"
                    alt="crown"
                  />
                )}
              </div>
              <div className="text-gray-700 text-base font-bold tracking-wide my-auto">
                {liker.name}
              </div>
            </li>
          ))
        )}
      {isFetchingNextPage && (
        <>
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
          <HuddleSkelton />
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
      {hasNextPage && !isFetching && (
        <div ref={ref}>
          <HuddleSkelton />
          <HuddleSkelton />
        </div>
      )}
    </ul>
  );
};

export default DearsList;
