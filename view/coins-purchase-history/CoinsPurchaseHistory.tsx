"use client";
import React, { useEffect, useState } from "react";

import { purchaseHistoryColumnData } from "@/constants/columns";
import { notification } from "@/utils/toastService";
import { useCoinsPurchaseHistory } from "@/app/hooks/buy-flix-coins/useCoinsPurchaseHistory";
import { Id } from "react-toastify";
import HistoryTable from "@/components/buy-flix-coins/purchase-history/HistoryTable";

const CoinsPurchaseHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isError } =
    useCoinsPurchaseHistory(currentPage);

  useEffect(() => {
    let toastId: Id;
    if (isError) {
      toastId = notification.error({ message: "Something went wrong" });
    }
    return () => {
      if (toastId) notification.dismiss(toastId.toString());
    };
  }, [isError]);

  useEffect(() => {
    if (data?.result) {
      setCurrentPage(data.result.current_page);
    }
  }, [data?.result?.current_page]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  return (
    <div className="flex justify-center w-full px-4 sm:px-6 md:px-16 lg:px-32 pt-10 relative">
      <HistoryTable
        titles={purchaseHistoryColumnData}
        rowData={data?.result?.purchases || []}
        isLoading={isLoading}
        currentPage={currentPage}
        nextPage={data?.result?.next_page}
        onPageChange={handlePageChange}
        tableContainerHeight="65vh"
      />
    </div>
  );
};

export default CoinsPurchaseHistory;
