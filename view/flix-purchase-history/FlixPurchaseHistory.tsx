"use client";
import React, { useEffect, useState } from "react";

import { purchaseFlixHistoryColumnData } from "@/constants/columns";
import {
  useFlixPurchaseHistory,
  useFlixUsersPurchaseHistory,
} from "@/app/hooks/buy-flix-coins/useFlixPurchaseHistory";
import { notification } from "@/utils/toastService";
import { Id } from "react-toastify";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import HistoryTable from "@/components/buy-flix-coins/purchase-history/HistoryTable";

interface Tab {
  label: string;
  content: React.ReactNode;
  value: string;
}

const FlixPurchaseHistory: React.FC = () => {
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  const [activeTab, setActiveTab] = useState<string>("Own");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isError } =
    useFlixPurchaseHistory(currentPage);

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
    if (data?.result && data.result.current_page) {
      setCurrentPage(data.result.current_page);
    }
  }, [data?.result, data?.result?.current_page]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const OwnFlixHistory = () => {
    return (
      <div className="w-full">
        <HistoryTable
          titles={purchaseFlixHistoryColumnData}
          rowData={data?.result?.purchases || []}
          isLoading={isLoading}
          currentPage={currentPage}
          nextPage={data?.result?.next_page}
          onPageChange={handlePageChange}
          tableContainerHeight="55vh"
        />
      </div>
    );
  };

  const tabs: Tab[] = [
    {
      label: t("own"),
      value: "Own",
      content: (
        <div className="bg-purple-100 rounded-lg p-4">
          <OwnFlixHistory />
        </div>
      ),
    },
    {
      label: t("others"),
      value: "Others",
      content: (
        <div className="p-4">
          <OtherUsersFlixHistoty />
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 w-full">
      {/* Tab Buttons */}
      <div className="flex mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.value)}
            className={`w-1/2 py-2 text-center text-lg font-semibold ${
              activeTab === tab.value
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-600"
            } rounded-t-lg`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="border-t border-gray-200 p-4 w-full">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
};

const OtherUsersFlixHistoty: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isError } =
    useFlixUsersPurchaseHistory(currentPage);
  console.log("other users", data);
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
    if (data?.result && data.result.current_page) {
      setCurrentPage(data.result.current_page);
    }
  }, [data?.result, data?.result?.current_page]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const OthersFlixHistory = () => {
    return (
      <HistoryTable
        titles={purchaseFlixHistoryColumnData}
        rowData={data?.result?.purchases || []}
        isLoading={isLoading}
        currentPage={currentPage}
        nextPage={data?.result?.next_page}
        onPageChange={handlePageChange}
        flixHistoryType="others"
        tableContainerHeight="55vh"
      />
    );
  };

  return (
    <div>
      <OthersFlixHistory />
    </div>
  );
};

export default FlixPurchaseHistory;
