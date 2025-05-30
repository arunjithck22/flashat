import React from "react";

const Loader = () => {
  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
