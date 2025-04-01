import React from "react";

const IdCardShimmer = () => {
  return (
    <div className="w-full flex py-3 rounded-lg bg-gray-200 animate-pulse">
      {/* Left Section */}
      <div className="w-1/2">
        <header className="bg-gray-300 rounded-r-lg w-[120px] h-8"></header>
        <ul className="flex flex-col w-full px-3 mt-5 gap-2">
          {Array(4)
            ?.fill(null)
            .map((_, index) => (
              <li key={index} className="grid grid-cols-[80px_auto] gap-2">
                <span className="bg-gray-300 rounded h-5 w-[60px]"></span>
                <span className="flex items-center gap-2">
                  <span className="bg-gray-300 h-5 w-4 rounded"></span>
                  <span className="bg-gray-300 h-5 w-[100px] rounded"></span>
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-1/2">
        <header className="bg-gray-300 h-6 w-[80px] mx-auto mb-4 rounded"></header>
        <section className="py-3 flex justify-center items-center mt-7">
          <div className="rounded-full relative bg-gray-300 h-24 w-24"></div>
        </section>
        <footer className="flex justify-between px-4 text-sm mt-4">
          <div>
            <p className="bg-gray-300 h-4 w-[80px] rounded mb-1"></p>
            <p className="bg-gray-300 h-4 w-[60px] rounded"></p>
          </div>
          <div>
            <p className="bg-gray-300 h-4 w-[80px] rounded mb-1"></p>
            <p className="bg-gray-300 h-4 w-[60px] rounded"></p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IdCardShimmer;
