"use client"
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { API_STATUS } from "@/common/constant";

interface InfiniteScrollListProps<T> {
  data: T[] | undefined;
  status: string;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: (item: T) => JSX.Element;
  loader:React.ReactNode
  emptyMessage:React.ReactNode
}

const InfiniteScrollList = <T,>({
  data,
  status,
  hasNextPage,
  fetchNextPage,
  renderItem,
  loader,
  emptyMessage
}: InfiniteScrollListProps<T>) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full flex flex-col gap-2 py-3">
      {status === API_STATUS.PENDING && (
        <>
         
          {loader}
        </>
      )}

{status === API_STATUS.SUCCESS && (data?.length ? (
    data.map(renderItem)
  ) : (
    <div className="text-center mt-4 text-gray-500">
      {emptyMessage}
    </div>
  )
)}

      {/* Infinite Scroll Loader */}
      {hasNextPage && (
        <div ref={ref}>
          {loader}
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollList;
