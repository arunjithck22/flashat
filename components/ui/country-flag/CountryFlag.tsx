import React from "react";

const CountryFlag = ({ country_code }: { country_code: string }) => {
  return (
    <span className={`fi fi-${country_code?.toLowerCase()} text-xs`}></span>
  );
};

export default CountryFlag;
