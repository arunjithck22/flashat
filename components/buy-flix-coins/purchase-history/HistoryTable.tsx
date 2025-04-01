import React from "react";
import TableHeader from "./TableHeader";
import TableRowShimmer from "../shimmers/TableRowShimmer";
import TableItems from "./TableItems";
import Pagination from "./Pagination";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";

interface TableProps {
  titles: { name: string; key: string; width: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData: any[];
  isLoading: boolean;
  currentPage: number;
  nextPage: boolean;
  onPageChange: (page: number) => void;
  flixHistoryType?: string;
  tableContainerHeight: string;
}

const HistoryTable: React.FC<TableProps> = ({
  titles,
  rowData,
  isLoading,
  currentPage,
  nextPage,
  onPageChange,
  flixHistoryType,
  tableContainerHeight,
}) => {
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  return (
    <div className="w-full flex flex-col">
      <div
        className="table-container w-full  overlow-y-auto custom-scrollbar "
        style={{ height: tableContainerHeight }}
      >
        <table className="w-full">
          <TableHeader titles={titles} flixHistoryType={flixHistoryType} />
          <tbody>
            {isLoading ? (
              <>
                <TableRowShimmer />
              </>
            ) : rowData?.length > 0 ? (
              rowData.map((item, index) => (
                <TableItems
                  key={index}
                  data={item}
                  flixHistoryType={flixHistoryType}
                />
              ))
            ) : (
              <tr className="h-96">
                <td
                  colSpan={titles.length}
                  className="text-center py-4 text-2xl font-bold"
                >
                  {t("empty_message_1")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center p-4">
        {rowData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            nextPage={nextPage}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default HistoryTable;
