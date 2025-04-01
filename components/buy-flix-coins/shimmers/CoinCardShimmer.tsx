"use client";
import React from "react";

const CoinCardShimmer: React.FC = () => {
  return (
    <article className="flex flex-col md:flex-row justify-between p-4 gap-4 w-full bg-gray-200 shadow-lg rounded-lg">
      <section className="flex gap-4 w-full md:w-2/3">
        <figure className="flex-shrink-0">
          <div className="rounded-full w-16 h-16 md:w-12 md:h-12 bg-gray-300 shimmer"></div>
        </figure>
        <div className="flex flex-col gap-3 flex-grow">
          <div className="inline-flex flex-grow px-2 rounded-lg text-lg md:text-base font-semibold">
            <div className="bg-gray-300 p-1 px-2 rounded-lg shimmer h-6 md:h-4"></div>
          </div>
          <div className="flex flex-wrap flex-grow gap-1">
            <span className="bg-gray-300 rounded-lg shimmer h-4 w-16 md:w-12"></span>
            <span className="bg-gray-300 rounded-lg shimmer h-4 w-16 md:w-12"></span>
            <span className="bg-gray-300 rounded-lg shimmer h-4 w-16 md:w-12"></span>
          </div>
        </div>
      </section>
      <section className="pt-1 md:pt-1 w-full md:w-1/3">
        <div className="w-full bg-gray-300 shimmer rounded-xl h-10 md:h-8"></div>
      </section>
    </article>
  );
};

export default CoinCardShimmer;
