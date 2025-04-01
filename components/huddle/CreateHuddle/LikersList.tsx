/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLikersList } from "@/app/hooks/huddles/useLikersList";
import { API_STATUS } from "@/common/constant";
import { useTranslations } from "next-intl";

import Image from "next/image";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import HuddleSkelton from "../HuddleSkelton";

const LikersList = ({
  likersList,
  setLikersList,
  selectAllLikersSelected,
  setSelectAllLikersSelected,
}: any) => {
  const { ref } = useInView();
  const t: any = useTranslations("huddles");
  const common: any = useTranslations("common");
  const {
    data: likers,
    status,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useLikersList();

  useEffect(() => {
    const allLikerIds = likers?.pages.flatMap((page) =>
      page?.result?.likers?.map((liker) => liker.id)
    );
    if (allLikerIds?.length && likersList.length === allLikerIds.length) {
      setSelectAllLikersSelected(true);
    } else {
      setSelectAllLikersSelected(false);
    }
  }, [likersList, likers, setSelectAllLikersSelected]);

  const handleSelectAllChange = () => {
    setSelectAllLikersSelected(!selectAllLikersSelected);
    if (!selectAllLikersSelected) {
      const allDearsIds = likers?.pages.flatMap((page) =>
        page?.result?.likers?.map((liker) => liker.id)
      );
      setLikersList(allDearsIds);
    } else {
      setLikersList([]);
    }
  };
  const handleCheckboxChange = (value: any) => {
    if (!likersList.includes(value)) {
      setLikersList((prevLikers: any) => [...prevLikers, value]);
    } else {
      setLikersList((prevLikers: any) =>
        prevLikers.filter((item: any) => item !== value)
      );
    }
  };
  // useEffect(() => {
  //   if (selectAllChecked) setDisabled(false);
  //   else if (likersList?.length !== 0) setDisabled(false);
  //   else setDisabled(true);
  // }, [selectAllChecked, likersList]);
  return (
    <>
      <ul className="flex flex-col gap-5">
        {likers?.pages.every((page: any) => !page?.result?.likers?.length) ? (
          <p className="text-center flex justify-center items-center text-gray-500 mt-4">
            {t("empty_message_2")}
          </p>
        ) : (
          status === API_STATUS?.SUCCESS && (
            <li className="flex items-center gap-5 px-5 max-md:mt-10">
              <input
                onChange={handleSelectAllChange}
                checked={selectAllLikersSelected}
                type="checkbox"
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
          likers?.pages.map((page) =>
            page.result.likers?.map((liker) => (
              <li
                className="flex items-center gap-5 px-5 max-md:mt-10"
                key={liker.id}
              >
                <input
                  type="checkbox"
                  value={liker?.id}
                  onChange={() => handleCheckboxChange(liker?.id)}
                  checked={likersList.includes(liker?.id)}
                />
                <div className=" relative overflow-hidden ">
                  <Image
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full object-cover bg-center"
                    alt="user"
                    src={`${
                      liker?.thumbnail
                        ? liker?.thumbnail
                        : "/tw/placeholder/placeholder-image-icon.jpg"
                    }`}
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
    </>
  );
};

export default LikersList;
