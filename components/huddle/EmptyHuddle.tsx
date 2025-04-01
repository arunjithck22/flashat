import Image from "next/image";
import React from "react";

const EmptyHuddle = () => {
  return (
    <div className="max-h-screen min-h-96 flex flex-col gap-3 justify-center items-center">
      <Image
        className="text-center"
        src="/empty/empty-huddle.svg"
        alt="create-post"
        width={200}
        height={150}
      />
      <p
        style={{
          color: "#434343",
        }}
        className="base-semibold text-sm text-center"
      >
        No Posts yet! Create the first post to get started.
      </p>
    </div>
  );
};

export default EmptyHuddle;
