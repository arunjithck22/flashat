import React from "react";
import SuccessIcon from "@assets/Success.png";
import { useRouter } from "next/navigation";

const Cancel = ({ message }: { message: any }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 overflow-y-hidden">
      <div className="w-full max-w-xl lg:w-2/3 xl:w-1/2 py-12 bg-white shadow-lg flex flex-col gap-10 items-center rounded-3xl p-5  relative">
        <div className="flex flex-col justify-center items-center gap-3">
          <div>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-cancel-close-delete-exit-discard-dismiss-remove-2496.png"
              width={40}
              alt=""
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-xl text-primary font-semibold">
              Payment Cancelled!
            </h1>
          </div>
        </div>

        <p className="text-md text-center  bg-gray-200 rounded-xl p-5 shadow-md">
          You have cancelled your Payment
        </p>

        <div>
          <button
            onClick={() => {
              router.push("/buy-FLiX");
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

export default Cancel;
