import React from "react";
// import SuccessIcon from "@assets/Success.png";

import moment from "moment";
import { useRouter } from "next/navigation";

interface TransactionData {
  coins: string;
  amount: any;
  currency: string;
  tracking_id: string | undefined;
  purchase_type: any;
  user: string | undefined;
}

const Success = ({
  coins,
  amount,
  currency,
  tracking_id,
  purchase_type,
  user,
}: TransactionData) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-xl lg:w-2/3 xl:w-1/2 py-16 bg-white shadow-lg flex flex-col gap-4 items-center rounded-3xl p-5 pt-12 relative">
        {/* <img src={SuccessIcon} alt="success" width={120} /> */}
        <h1 className="text-3xl font-semibold text-primary">
          Payment Successful
        </h1>
        <div className="bg-white rounded-lg p-6 ">
          <p className="text-lg font-semibold text-center mb-4">
            Thank You for Your Purchase!
          </p>
          <p className="text-md text-center text-white bg-primary rounded-xl p-5 shadow-md">
            Your payment of{" "}
            <span className="font-semibold uppercase">
              {currency} {amount / 100}
            </span>{" "}
            has been successfully processed, and account
            <span className="font-semibold px-1">{user}</span> should receive{" "}
            <span className="font-semibold px-1">
              {" "}
              {coins} {purchase_type === "coins" ? "COiNS" : "FLiX"}
            </span>
            shortly.
          </p>
        </div>
        <div className="bg-white  mb-6">
          <div className="grid grid-cols-2 gap-3 ">
            <div className=" border-gray-200 border-r pr-4">
              <p className="text-gray-600 font-medium">Amount Paid</p>
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
                {purchase_type === "coins" ? "COiNS" : "FLiX"} Purchased
              </p>
              <p className="text-md font-semibold ">
                {coins} {purchase_type === "coins" ? "COiNS" : "FLiX"}
              </p>
            </div>
            <div className="pl-4">
              <p className="text-gray-600 font-medium">Date</p>
              <p className="text-md font-semibold ">
                {moment?.utc(Date.now()).local().format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              {
                purchase_type === "coins"
                  ? router.push("/buy-COiNS")
                  : router.push("/buy-FLiX");
              }
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

export default Success;
