import React from "react";

const UserListLoader = () => {
  return (
    <div className={`flex w-full justify-between items-center  animate-pulse`}>
      <div className="flex gap-2 items-center">
        {/* Shimmer effect for the image */}
        <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>
        {/* Shimmer effect for the name */}
        <div className="w-48 h-4 bg-gray-300 animate-pulse rounded-md"></div>
      </div>

      {/* Shimmer effect for the kabab menu icon if applicable */}

      <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-md"></div>
    </div>
  );
};

export default UserListLoader;
