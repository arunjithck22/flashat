import React, { useMemo, useRef, useState } from "react";
import { intlTelInput } from "intl-tel-input/react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
// import Checkbox from "../Checkbox/Checkbox";
import { useAuthFilter } from "@/contexts/authetication/AuthFilterContext";

const MultipleCountrySelector = () => {
  const { selectedCountries, setSelectedCountries } = useAuthFilter(); 
  const countryData = useMemo(() => intlTelInput.getCountryData(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedCountriesRef = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(
    () => countryData.filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, countryData]
  );

  const handleCountryToggle = (countryIso2: string) => {
    const updatedSelection = selectedCountries.includes(countryIso2)
      ? selectedCountries.filter((iso2) => iso2 !== countryIso2)
      : [...selectedCountries, countryIso2];

    setSelectedCountries(updatedSelection);
  };
  // const handleSelectAll = () => {
  //   const allCountryIso2s = filteredCountries.map((country) => country.iso2);
  //   setSelectedCountries(selectedCountries.length === filteredCountries.length ? [] : allCountryIso2s);
  // };

  const handleRemoveSelected = (countryIso2: string) => {
    setSelectedCountries(selectedCountries.filter((iso2) => iso2 !== countryIso2));
  };

  const handleHorizontalScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (selectedCountriesRef.current) {
      selectedCountriesRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
    <div className="bg-white mt-5">
      {/* ✅ Selected Countries (Scrollable) */}
      {selectedCountries.length > 0 && (
        <div
          ref={selectedCountriesRef}
          className="my-3 rounded-md overflow-x-scroll scrollbar-hidden whitespace-nowrap flex gap-2 custom-scrollbar-hidden"
          onWheel={handleHorizontalScroll}
        >
          {selectedCountries.map((iso2) => {
            const country = countryData.find((c) => c.iso2 === iso2);
            return (
              country && (
                <div
                  key={iso2}
                  className="flex items-center bg-gray-200 px-2 py-1 rounded-full text-sm min-w-max"
                >
                  <Image
                    src={`https://flagcdn.com/w40/${country.iso2}.png`}
                    alt={`${country.name} flag`}
                    width={20}
                    height={20}
                    className="rounded-full object-cover mr-1"
                  />
                  <span>{country.name}</span>
                  <FaTimes
                    className="ml-2 text-visitorText text-sm cursor-pointer"
                    onClick={() => handleRemoveSelected(iso2)}
                  />
                </div>
              )
            );
          })}
        </div>
      )}

      {/* ✅ Search Input */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="Search country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 bg-gray-100 rounded-md text-sm font-light mb-2 outline-none"
        />

        {/* ✅ Select All Checkbox */}
        {/* <Checkbox
          label="Select All"
          checked={selectedCountries.length === filteredCountries.length && filteredCountries.length > 0}
          onChange={handleSelectAll}
        /> */}
      </div>

      {/* ✅ Country List */}
      <div className="border h-72 overflow-auto custom-scrollbar-hidden">
        {filteredCountries.map((country) => (
          <div
            key={country.iso2}
            className="flex items-center h-12 p-2 border-b cursor-pointer hover:bg-softGray justify-between"
            onClick={() => handleCountryToggle(country.iso2)}
          >
            <div className="flex items-center">
              <Image
                src={`https://flagcdn.com/w40/${country.iso2}.png`}
                alt={`${country.name} flag`}
                width={32}
                height={32}
                className="mr-2 object-contain"
              />
              <span className="text-sm text-visitorText">{country.name}</span>
            </div>
            {selectedCountries.includes(country.iso2) && (
              <FaCheck className="w-4 h-4 text-visitorText font-light" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleCountrySelector;
