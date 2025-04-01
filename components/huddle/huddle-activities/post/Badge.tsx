import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Badge = ({ broadcastType }: { broadcastType: any }) => {
  return (
    <div className="flex justify-center items-center">
      {broadcastType && (
        <div
          className="bg-primary flex text-leaderYellow uppercase py-1 px-4 text-xs font-semibold rounded"
          style={{
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 10% 50%)`, // Adjust the cut to the left
          }}
        >
          {broadcastType}
        </div>
      )}
      {/* {!reply && (
          <img
            className="cursor-pointer"
            width={24}
            height={16}
            src={postMenuIcon}
            alt=""
          />
        )} */}
    </div>
  );
};

export default Badge;
