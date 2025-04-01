/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFansList } from "@/app/hooks/huddles/useFansList";
import { API_STATUS } from "@/common/constant";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HuddleSkelton from "../HuddleSkelton";

const FansList = ({
  fansList,
  setFansList,
  selectAllFansSelected,
  setSelectedFansSelected,
}: any) => {
  const { ref } = useInView();
  const {
    data: fans,
    isFetching,
    status,
    isFetchingNextPage,
    hasNextPage,
  } = useFansList();
  const t: any = useTranslations("huddles");
  const common: any = useTranslations("common");

  useEffect(() => {
    const allFanIds = fans?.pages.flatMap((page) =>
      page?.result?.fans?.map((fan) => fan.id)
    );
    if (allFanIds?.length && fansList.length === allFanIds.length) {
      setSelectedFansSelected(true);
    } else {
      setSelectedFansSelected(false);
    }
  }, [fansList, fans, setSelectedFansSelected]);

  const handleSelectAllChange = () => {
    setSelectedFansSelected(!selectAllFansSelected);
    if (!selectAllFansSelected) {
      const allFanIds = fans?.pages.flatMap((page) =>
        page?.result?.fans?.map((fan) => fan.id)
      );
      setFansList(allFanIds);
    } else {
      setFansList([]);
    }
  };

  const handleCheckboxChange = (value: any) => {
    if (!fansList.includes(value)) {
      setFansList((prevDears: any) => [...prevDears, value]);
    } else {
      setFansList((prevDears: any) =>
        prevDears.filter((item: any) => item !== value)
      );
    }
  };

  return (
    <>
      <ul className="flex flex-col gap-5">
        {fans?.pages.every((page: any) => !page?.result?.fans?.length) ? (
          <p className="text-center flex justify-center items-center text-gray-500 mt-4">
            {t("empty_message_4")}
          </p>
        ) : (
          status === API_STATUS?.SUCCESS && (
            <li className="flex items-center gap-5 px-5 max-md:mt-10">
              <input
                onChange={handleSelectAllChange}
                type="checkbox"
                checked={selectAllFansSelected}
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
          fans?.pages.map((page) =>
            page.result.fans?.map((fan) => (
              <li
                className="flex items-center gap-5 px-5 max-md:mt-10"
                key={fan.id}
              >
                <input
                  value={fan?.id}
                  onChange={() => {
                    handleCheckboxChange(fan?.id);
                  }}
                  type="checkbox"
                  checked={fansList.includes(fan.id)}
                />
                <div className=" relative overflow-hidden ">
                  <Image
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full object-cover bg-center"
                    alt="user"
                    src={`${
                      fan?.thumbnail
                        ? fan?.thumbnail
                        : "/tw/placeholder/placeholder-image-icon.jpg"
                    }`}
                  />
                  {fan?.membership === "Premium" && (
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
                  {fan?.name}
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
    </>
  );
};

export default FansList;
