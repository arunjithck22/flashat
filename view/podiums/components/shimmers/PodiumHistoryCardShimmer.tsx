"use client";
export const HistoryCardShimmer: React.FC = () => {
  return (
    <div className="animate-pulse p-2 bg-gray-200 border border-gray-300 rounded-lg w-full flex flex-col">
      <div className="p-2 flex justify-between">
        <div className="flex flex-col gap-1 w-1/2">
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="flex gap-5 w-full justify-center items-center">
          <div className="flex gap-1 px-2 sm:px-5 py-1 bg-gray-300 rounded w-12 h-6"></div>
          <div className="flex gap-1 px-2 sm:px-5 py-1 bg-gray-300 rounded w-12 h-6"></div>
          <div className="flex gap-1 px-2 sm:px-5 py-1 bg-gray-300 rounded w-12 h-6"></div>
        </div>
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};
