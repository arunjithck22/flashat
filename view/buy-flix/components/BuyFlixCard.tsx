/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import usePaymentRequest from "@/app/hooks/buy-flix-coins/usePaymentRequest";
import { notification } from "@/utils/toastService";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import UserListModal from "./UserListModal";
import { TranslationFunction } from "@/types";
import useStripePaymentIntent from "@/app/hooks/buy-flix-coins/useStripePaymentIntent";
import { useRouter } from "next/navigation";
import { useClientSecret } from "@/contexts/buy-flix-coins/ClientSecretProvider";

interface BuyFlixCardProps {
  coins: number;
  discounted_price: number;
  price: number;
  discount_percentage: number;
  handleModalOpenClose: any;
  isModalOpenClose: boolean;
  flixUsersList: any;
  keyDataIndex: any;
  handleSearchUser: any;
}

const BuyFlixCard: React.FC<BuyFlixCardProps> = ({
  coins,
  discounted_price,
  price,
  discount_percentage,
  flixUsersList,
  keyDataIndex,
  handleSearchUser,
}) => {
  const router = useRouter();
  const common: TranslationFunction = useTranslations("common");
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  const { clientSecret, setClientSecret } = useClientSecret();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [timeZone, setTimeZone] = useState("");
  const getTimeZone = () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(userTimeZone);
  };

  useEffect(() => {
    getTimeZone();
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialTransactionPayload, setInitialTransactionPayload] = useState({
    payment_amount: discounted_price,
    currency: "AED",
    coins: coins,
    timezone: timeZone,
    purchased_for: null,
    purchase_type: "flix",
  });
  const { mutate, isPending } = useStripePaymentIntent();

  const handleByNowAction = (userId?: number) => {
    const initialPayload = initialTransactionPayload;
    const payload =
      userId && userId > 0
        ? { ...initialPayload, timezone: timeZone, purchased_for: userId }
        : {
            payment_amount: discounted_price,
            currency: "AED",
            coins: coins,
            timezone: timeZone,
            purchase_type: "flix",
          };

    setIsSubmitting(true);
    mutate(
      { data: payload },
      {
        onSuccess: (data: any) => {
          const secret = data?.result?.clientSecret || "";
          setClientSecret(secret);
          setIsSubmitting(false);

          if (secret !== "") {
            router.push("/checkout");
          }
        },
        onError: (error: any) => {
          notification?.error({ message: "Something went wrong" });
          setIsSubmitting(false);
          console.log(error);
        },
      }
    );
  };
  return (
    <>
      <div hidden ref={containerRef}></div>
      {(isPending || isSubmitting) && (
        <div className="fixed inset-0 bg-gray-200 w-full h-full flex justify-center items-center z-50">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
            <div className="h-9 w-9 rounded-full bg-gray-200"></div>
          </div>
        </div>
      )}

      <article className="flex flex-col md:flex-row md:p-0 p-4 justify-between w-full  bg-gray-200 shadow-lg rounded-lg">
        <section className="flex p-3 gap-4 w-full md:w-10/12 justify-center items-center">
          <figure className="flex-shrink-0">
            <Image
              className="rounded-full w-16 h-16 md:w-16 md:h-16 object-cover"
              alt="flix"
              src="/buy-flix-coins/flix-icon.png"
              width={200}
              height={200}
            />
          </figure>
          <div className="flex flex-col gap-3 flex-grow">
            <div className="inline-flex flex-grow  px-0  rounded-lg text-lg md:text-base font-semibold  ">
              <div className="bg-yellow-300 p-2 rounded-lg">
                {coins} {""}
                {common("flix")}
              </div>
            </div>
            <div className="flex flex-wrap flex-grow gap-1">
              <span className="text-primary text-sm md:text-xs">
                AED
                {discounted_price}
              </span>
              <span className="text-gray-500 text-sm md:text-xs line-through">
                AED
                {price}
              </span>
              <span className="text-primary text-sm md:text-xs">
                {discount_percentage}%
              </span>
            </div>
          </div>
        </section>
        <section
          onClick={() => {
            // paymentCCAvenue(initialTransactionPayload);
            // handleBuyNow(initialTransactionPayload);
            setIsModalOpen(true);
          }}
          className="flex  flex-wrap flex-grow gap-1 cursor-pointer md:pt-1  w-full md:w-1/3 bg-primary md:rounded-e-lg md:rounded-r-lg justify-center items-center"
        >
          <button className="w-full uppercase bg-primary text-secondary px-3 py-1 text-sm md:text-base rounded-xl">
            {t("buy_now")}
          </button>
        </section>
      </article>
      {isModalOpen && (
        <UserListModal
          handleSearchUser={handleSearchUser}
          keyDataIndex={keyDataIndex}
          userListData={flixUsersList}
          handleByNowAction={handleByNowAction}
          handleModalOpenClose={setIsModalOpen}
        />
      )}
      <form
        hidden
        id="nonseamless"
        method="post"
        name="redirect"
        action="https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction"
      >
        <input type="hidden" id="encRequest" name="encRequest" />
        <input type="hidden" name="access_code" id="access_code" />
        <button type="submit" className="hidden"></button>
      </form>
    </>
  );
};

export default BuyFlixCard;
