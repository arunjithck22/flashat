import React from "react";

const TableRowShimmer = () => {
  return (
    <>
      <tr className="w-full h-1"></tr>
      <tr>
        <td colSpan={3} className="shimmer-row h-24">
          <div className="shimmer-content "></div>
        </td>
      </tr>
    </>
  );
};

export default TableRowShimmer;
