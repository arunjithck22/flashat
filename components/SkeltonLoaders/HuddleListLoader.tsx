import React from 'react'
import SkeletonLoader from '../ui/SkeletonLoader/SkeletonLoader'

const HuddleListLoader = () => {
  return (
    <div className='  border-b border-lightGray p-1'>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <SkeletonLoader className="w-10 h-10 " />
          <SkeletonLoader className="w-20 h-3  mt-2" />
        </div>
        <SkeletonLoader className="w-14 h-5 " />
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <SkeletonLoader className="w-14 h-1 " />
        <SkeletonLoader className="w-32 h-1 " />
        <SkeletonLoader className="w-44 h-1 " />
        <SkeletonLoader className="w-56 h-1 " />
      </div>
    </div>
  );
}

export default HuddleListLoader
