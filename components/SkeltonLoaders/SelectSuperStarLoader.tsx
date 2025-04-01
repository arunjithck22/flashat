import React from 'react'
import SkeletonLoader from '../ui/SkeletonLoader/SkeletonLoader'

const SelectSuperStarLoader = () => {
  return (
    <div className="flex flex-col gap-3 w-full mt-1">
      {Array.from({ length: 1 }).map((_, index) => (
        <div key={index} className="flex gap-3 items-center border py-1 px-3 rounded-lg w-full">
          <div>
            <SkeletonLoader className="w-14 h-14 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <SkeletonLoader className="w-14 h-3" />
            <SkeletonLoader className="w-16 h-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SelectSuperStarLoader;
