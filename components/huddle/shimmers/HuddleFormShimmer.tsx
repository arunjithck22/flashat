import React from "react";

const HuddleFormShimmer = () => {
  return (
    <div className="h-screen w-full  flex flex-col justify-between bg-white">
      <section className="flex-grow flex flex-col items-center overflow-y-auto custom-scrollbar   py-6 pb-28">
        <div className="flex justify-center items-center py-10">
          <div className="relative">
            <div className="skeleton w-28 h-28 rounded-full"></div>
            {/* <div className="skeleton w-8 h-8 rounded-full absolute -top-2 -right-2"></div> */}
          </div>
        </div>
        <section className="flex flex-col gap-10 w-1/2">
          {/* Skeleton for Huddle Name */}
          <div className="flex flex-col items-stretch px-5">
            <div className="skeleton w- h-4 mb-2 rounded"></div>
            <div className="skeleton w-full h-10 rounded"></div>
          </div>
          {/* Skeleton for Huddle Language */}
          <div className="flex flex-col items-stretch px-5">
            <div className="skeleton w-40 h-4 mb-2 rounded"></div>
            <div className="skeleton w-full h-10 rounded"></div>
          </div>
          {/* Skeleton for Huddle Category */}
          <div className="flex flex-col items-stretch px-5">
            <div className="skeleton w-36 h-4 mb-2 rounded"></div>
            <div className="skeleton w-full h-10 rounded"></div>
          </div>
          {/* Skeleton for Huddle Bio */}
          <div className="flex flex-col items-stretch px-5">
            <div className="skeleton w-28 h-4 mb-2 rounded"></div>
            <div className="skeleton w-full h-20 rounded"></div>
          </div>
          {/* Skeleton for Request to Join */}
          {/* <div className="flex flex-col items-stretch px-5">
            <div className="flex justify-between items-center">
              <div className="skeleton w-48 h-4 rounded"></div>
              <div className="skeleton w-12 h-6 rounded"></div>
            </div>
            <div className="skeleton w-full h-6 mt-2 rounded"></div>
          </div> */}
          {/* Skeleton for Submit Button */}
          <div className="flex flex-col items-stretch px-5">
            <div className="skeleton w-full h-12 rounded"></div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default HuddleFormShimmer;
