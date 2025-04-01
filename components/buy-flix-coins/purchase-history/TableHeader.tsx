import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

interface TableHeaderProps {
  titles: { name: string; key: string; width: string }[];
  flixHistoryType?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ titles }) => {
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  return (
    <thead className="text-xs font-medium w-full rounded-lg text-left uppercase sticky bg-white  z-10 ">
      <tr className="py-4 px-10 w-full">
        {titles.map((title, index) => (
          <th
            key={index}
            scope="col"
            className={`text-base p-4 ${
              index === 0
                ? "ltr:rounded-l-full rtl:rounded-r-full ltr:pl-12 rtl:text-right"
                : ""
            }
            ${index === 1 && "ltr:text-left rtl:text-right"}
            
            ${
              index === titles.length - 1
                ? "ltr:rounded-r-full rtl:rounded-l-full ltr:text-left rtl:text-right"
                : ""
            } w-${index === 0 ? "1/3" : "1/4"} bg-bgPinkSecondary`}
          >
            {t(title.name)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
