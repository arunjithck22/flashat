import React from "react";
import SkeletonLoader from "../ui/SkeletonLoader/SkeletonLoader";

const ProfileLoader = () => {
  return (
    <div className="p-normal">
      <div className="flex items-center space-x-4 p-4">
        <SkeletonLoader className="w-32 h-32 rounded-full" />
        <div className="flex flex-col space-y-2">
          <SkeletonLoader className="w-32 h-6 rounded" />
          <SkeletonLoader className="w-48 h-4 rounded" />
          <div className="flex space-x-4 mt-2">
            <SkeletonLoader className="w-16 h-6 rounded" />
            <SkeletonLoader className="w-16 h-6 rounded" />
            <SkeletonLoader className="w-16 h-6 rounded" />
            <SkeletonLoader className="w-16 h-6 rounded" />
          </div>
        </div>
      </div>
      <div className=" h-14 w-full lg:w-4/12 mt-medium">
        <SkeletonLoader className="w-32 h-3 rounded" />
        <SkeletonLoader className="w-full h-3 rounded mt-3" />
        <div className="flex justify-between">
          <SkeletonLoader className="w-20 h-3 rounded mt-3" />
          <SkeletonLoader className="w-10 h-3 rounded mt-3" />
        </div>
      </div>

      <div className="mt-16 w-full lg:w-4/12">
        <div className="flex justify-between">
          <SkeletonLoader className="w-16 h-3 rounded" />
          <SkeletonLoader className="w-16 h-3 rounded" />
        </div>
        <SkeletonLoader className="w-full h-1 rounded mt-medium" />
        <div className="flex justify-between mt-medium">
          <SkeletonLoader className="w-10 h-3 rounded" />
          <SkeletonLoader className="w-16 h-3 rounded" />
        </div>
      </div>
      <div className="lg:flex lg:justify-between lg:w-6/12 gap-5">
        <div className="mt-medium w-full md:w-6/12">
          <SkeletonLoader className="w-32 h-4 rounded" />
          <div className="mt-3 flex justify-between">
            <div>
              <SkeletonLoader className="w-16 h-2 rounded" />
              <SkeletonLoader className="w-24 h-2 rounded mt-3" />
            </div>
            <SkeletonLoader className="w-3 h-5 rounded mt-3" />
          </div>
          <div className="mt-3 flex justify-between">
            <div>
              <SkeletonLoader className="w-16 h-2 rounded" />
              <SkeletonLoader className="w-24 h-2 rounded mt-3" />
            </div>
            <SkeletonLoader className="w-3 h-5 rounded mt-3" />
          </div>
          <div className="mt-3 flex justify-between">
            <div>
              <SkeletonLoader className="w-16 h-2 rounded" />
              <SkeletonLoader className="w-24 h-2 rounded mt-3" />
            </div>
            <SkeletonLoader className="w-3 h-5 rounded mt-3" />
          </div>
        </div>
        <div className="mt-medium w-full md:w-6/12">
          <SkeletonLoader className="w-32 h-4 rounded" />
          <div className="mt-3 flex justify-between">
            <div>
              <SkeletonLoader className="w-16 h-2 rounded" />
              <SkeletonLoader className="w-24 h-2 rounded mt-3" />
            </div>
            <SkeletonLoader className="w-3 h-5 rounded mt-3" />
          </div>
          <div className="mt-3 flex justify-between">
            <div>
              <SkeletonLoader className="w-16 h-2 rounded" />
              <SkeletonLoader className="w-24 h-2 rounded mt-3" />
            </div>
            <SkeletonLoader className="w-3 h-5 rounded mt-3" />
          </div>
          <div className="mt-3 flex justify-between">
            <div>
              <SkeletonLoader className="w-16 h-2 rounded" />
              <SkeletonLoader className="w-24 h-2 rounded mt-3" />
            </div>
            <SkeletonLoader className="w-3 h-5 rounded mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoader;
