import React from "react";
// import SuccessIcon from "@assets/FAILED.png";

import moment from "moment";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface TransactionData {
  coins: string;
  amount: any;
  currency: string;
  message: string;
  tracking_id: string | undefined;
  purchase_type: any;
}

const Failure = ({
  coins,
  amount,
  currency,
  message,
  tracking_id,
  purchase_type,
}: TransactionData) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-xl lg:w-2/3 xl:w-1/2 py-16 bg-white shadow-lg flex flex-col gap-10 items-center rounded-3xl p-5 pt-12 relative">
        <div className="flex flex-col justify-center items-center gap-3 ">
          {/* <img src={SuccessIcon} width={40} alt="" /> */}
          <h1 className="text-xl text-red-500 font-semibold">
            Your Payment Failed!
          </h1>
        </div>
        <div className="px-5">
          <p className="text-md text-center text-white bg-red-500 rounded-xl p-5 shadow-md">
            {message}.
          </p>
        </div>
        <div className="bg-white  mb-6">
          <div className="grid grid-cols-2 gap-3 ">
            <div className=" border-gray-200 border-r pr-4">
              <p className="text-gray-600 font-medium">Requested Amount</p>
              <p className="text-md font-semibold text-blue-600 uppercase">
                {currency} {amount / 100}
              </p>
            </div>
            <div className="pl-4">
              <p className="text-gray-600 font-medium">Payment Reference ID</p>
              <p className="text-md font-semibold">{tracking_id}</p>
            </div>
            <div className=" border-gray-200 border-r pr-4">
              <p className="text-gray-600 font-medium">
                Requested {purchase_type === "coins" ? "COiNS" : "FLiX"}
              </p>
              <p className="text-md font-semibold ">
                {coins} {purchase_type === "coins" ? "COiNS" : "FLiX"}
              </p>
            </div>
            <div className="pl-4">
              <p className="text-gray-600 font-medium">Date</p>
              <p className="text-md font-semibold ">
                {" "}
                {moment?.utc(Date.now()).local().format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              purchase_type === "coins"
                ? router.push("/buy-COiNS")
                : router.push("/buy-FLiX");
            }}
            className="flex justify-center items-center py-2 px-5 bg-primary text-white rounded"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Failure;
