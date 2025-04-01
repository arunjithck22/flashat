import moment from "moment";
import React from "react";
import FlixCards from "./FlixCards";

interface TableItemsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // You can be more specific if you know the exact structure
  flixHistoryType?: string;
}

const TableItems: React.FC<TableItemsProps> = ({ data, flixHistoryType }) => {
  return (
    <>
      <tr className="w-full h-1"></tr>
      <tr>
        <td className=" rounded-tl-xl pl-12 rounded-bl-xl py-6 bg-bgLightPink ">
          <FlixCards
            flax={data?.flax}
            userName={data?.purchased_for}
            price={data?.price}
            flixHistoryType={flixHistoryType}
            purchasedBy={data?.purchased_by_user}
          />
        </td>
        <td className="p-4 py-6  bg-bgLightPink ">
          {moment?.utc(data?.time_created).local().format("DD/MM/YYYY")}
        </td>
        <td className="p-4 py-6 rounded-tr-xl rounded-br-xl bg-bgLightPink ">
          {/* {formatTime(data?.time_created)} */}
          {moment?.utc(data?.time_created).local().format("LT")}
        </td>
      </tr>
    </>
  );
};

export default TableItems;
