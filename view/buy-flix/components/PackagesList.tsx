"use client";
import React, { useEffect, useState } from "react";
import BuyFlixCard from "./BuyFlixCard";
import { useFlixOrCoinPackages } from "@/app/hooks/buy-flix-coins/useFlixOrCoinPackages";

import { FlixPackageModal } from "@/types/buy-flix-coins";
import { API_STATUS } from "@/common/constant";
import { Id } from "react-toastify";
import { notification } from "@/utils/toastService";
import { useFlixPurchasedUsers } from "@/app/hooks/buy-flix-coins/useFlixUsers";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import CoinCardShimmer from "@/components/buy-flix-coins/shimmers/CoinCardShimmer";

const PackagesList = () => {
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  const { data, isLoading, status, isError } = useFlixOrCoinPackages("flix");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flixUsersList, setFlixUsersList] = useState([]);
  const [searchUserKey, setSearchUserKey] = useState("");
  // const [isLoader, setIsLoader] = useState(false);
  const {
    data: usersList,
    // isLoading: usersListLoading,
    // refetch: userListRefetch,
    // isError: userError,
  } = useFlixPurchasedUsers({ searchKey: searchUserKey });

  console.log("users list", usersList);

  useEffect(() => {
    console.log("UESRSSSS USEEFFECT");
    // setIsLoader(usersListLoading);
  }, []);

  useEffect(() => {
    let toastId: Id;
    if (isError) {
      toastId = notification.error({ message: "Something went wrong" });
    }
    return () => {
      if (toastId) notification.dismiss(toastId.toString());
    };
  }, [isError]);

  useEffect(() => {
    console.log("UESRSSSS", usersList);
    if (usersList && usersList?.result) {
      setFlixUsersList(usersList?.result?.users);
    }
  }, [usersList]);

  //   useEffect(() => {
  //     if (searchUserKey) {
  //       userListRefetch();
  //     }
  //   }, [searchUserKey]);

  const handleSearchUser = (keyVal: string) => {
    setSearchUserKey(keyVal);
  };

  const handleModalOpenClose = (isOpenClose: boolean) => {
    setIsModalOpen(isOpenClose);
  };
  return (
    <div className="" key="flix-section">
      <div className="flix">
        <h2 className="px-4 md:px-32 font-bold text-lg text-secGray pt-12">
          {t("flix_packages")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 px-4 md:px-32 py-10 ">
          {isLoading && (
            <>
              <CoinCardShimmer />
              <CoinCardShimmer />
              <CoinCardShimmer />
              <CoinCardShimmer />
              <CoinCardShimmer />
              <CoinCardShimmer />
            </>
          )}
          {status === API_STATUS.SUCCESS &&
            data?.result &&
            data?.result?.length > 0 &&
            data?.result?.map((item: FlixPackageModal) => {
              return (
                <BuyFlixCard
                  key={item?.id}
                  coins={item?.flax}
                  price={item?.price}
                  discounted_price={item?.discounted_price}
                  discount_percentage={item?.discount_percentage}
                  handleModalOpenClose={handleModalOpenClose}
                  isModalOpenClose={isModalOpen}
                  flixUsersList={flixUsersList}
                  keyDataIndex={item?.id}
                  handleSearchUser={handleSearchUser}
                />
              );
            })}
          {/* {isModalOpen && <UserListModal handleByNowAction={handleByNowAction} />} */}
        </div>
      </div>
    </div>
  );
};

export default PackagesList;
