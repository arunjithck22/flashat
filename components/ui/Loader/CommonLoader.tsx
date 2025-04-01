import React from "react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const CommonLoader: React.FC = () => {
  return (
    <div className="flex  flex-col  gap-1 py-4 w-96">
        <SkeletonLoader className="w-2/12 h-1" />
        <SkeletonLoader className="w-4/12 h-1" />
        <SkeletonLoader className="w-6/12 h-1" />
        <SkeletonLoader className="w-5/12 h-1" />
        <SkeletonLoader className="w-8/12 h-1" />
        <SkeletonLoader className="w-9/12 h-1" />
        <SkeletonLoader className="w-10/12 h-1" />
        <SkeletonLoader className="w-full h-1" />
      </div>
  );
};

export default CommonLoader;
