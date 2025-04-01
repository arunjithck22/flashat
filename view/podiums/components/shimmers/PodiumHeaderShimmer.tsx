import React from "react";

const PodiumHeaderShimmer = () => {
  return (
    <div className="w-full bg-primary">
      <header className="flex justify-between items-center p-4 border-bgray border-b-2">
        <div className="flex gap-3 justify-center items-center">
          {/* Profile Picture Shimmer */}
          <div className="relative">
            <div className="h-12 w-12 rounded bg-gray-700 podium-shimmer"></div>
          </div>
          {/* Text Shimmer */}
          <div className="flex flex-col justify-between">
            <div className="w-32 h-4 bg-gray-700 podium-shimmer mb-2 rounded"></div>
            <div className="flex justify-center items-center gap-1">
              {/* Timer Shimmer */}
              <div className="w-16 h-4 bg-gray-700 podium-shimmer rounded"></div>
              <div className="bg-gray-700 podium-shimmer rounded flex justify-center items-center px-2 py-0.5 gap-1">
                {/* <div className="w-2 h-2 rounded-full bg-green-500"></div> */}
                {/* <div className="w-4 h-4 bg-gray-100 podium-shimmer rounded"></div> */}
              </div>
              <div className="rounded flex justify-center items-center px-2 py-0.5 gap-1">
                <div className="w-4 h-4 bg-gray-700 podium-shimmer rounded"></div>
                <div className="w-4 h-4 bg-gray-700 podium-shimmer rounded"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Exit Icon Shimmer */}
        {/* <div className="w-8 h-8 bg-gray-700 shimmer rounded"></div> */}
      </header>
    </div>
  );
};

export default PodiumHeaderShimmer;
