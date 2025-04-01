import React, { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { intlTelInput } from "intl-tel-input/react";
import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface CountrySelectorProps {
  onCountryChange: (countryCode: string,iso2?: string) => void;
  defaultCountry?: string;
  width?: string; 
  height?: string;
  marginTop?:string
}

interface Country {
  iso2: string;
  name: string;
  dialCode: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  onCountryChange, 
  defaultCountry = "ae" ,
  width = "w-20 md:w-32",
  height = "h-9 md:h-11",
  marginTop="mt-0"
}) => {
  const [countryCode, setCountryCode] = useState("+971");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const countryData = useMemo(() => intlTelInput.getCountryData(), []);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch user's country based on IP when countryData is available
  useEffect(() => {
    const fetchUserCountry = async () => {
      if (!countryData || countryData.length === 0) return;

      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data && data.country_code) {
          const userCountry = countryData.find((c) => c.iso2 === data.country_code.toLowerCase());
          if (userCountry) {
            setSelectedCountry(userCountry);
            setCountryCode("+" + userCountry.dialCode);
            onCountryChange("+" + userCountry.dialCode, userCountry.iso2);
          }
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchUserCountry();
  }, [countryData.length, onCountryChange]); // Depend on countryData.length

  const handleCountryChange = useCallback(
    (countryIso2: string) => {
      const selected = countryData.find((c) => c.iso2 === countryIso2);
      if (selected) {
        const dialCode = "+" + selected.dialCode;
        setCountryCode(dialCode);
        setSelectedCountry(selected);
        onCountryChange(dialCode, selected.iso2);
        setIsDropdownOpen(false);
        setSearchQuery("");

        console.log("Selected country details:", {
          name: selected.name,
          dialCode: dialCode,
          iso2: selected.iso2,
        });
      }
    },
    [countryData, onCountryChange]
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
    setSearchQuery("");
  };

  const filteredCountries = countryData.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ** Close dropdown on outside click **
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`cursor-pointer p-2 flex items-center justify-between mt-4 text-small md:text-sm rounded-md bg-[#F1F1F6] ${width} ${height} ${marginTop}`}
      >
        {selectedCountry ? (
          <Image
            src={`https://flagcdn.com/w40/${selectedCountry.iso2}.png`}
            alt={`${selectedCountry.name} flag`}
            width={20}
            height={20}
            className="mr-3"
          />
        ) : (
          <Image
            src={`https://flagcdn.com/w40/${defaultCountry}.png`}
            alt={`${defaultCountry} flag`}
            width={20}
            height={20}
            className="mr-1"
          />
        )}
        <span>{countryCode}</span>
        {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>

      {isDropdownOpen && (
        <div className="absolute w-52 mt-1 rounded-lg shadow-black shadow-md z-10 bg-white">
          <input
            type="text"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-1 md:p-2 bg-white focus:outline-none border border-gray-300"
          />

          <div className="max-h-60 overflow-y-auto custom-scrollbar-hidden bg-softGray rounded-b-xl">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.iso2}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                  onClick={() => handleCountryChange(country.iso2)}
                >
                  <Image
                    src={`https://flagcdn.com/w40/${country.iso2}.png`}
                    alt={`${country.name} flag`}
                    width={20}
                    height={20}
                  />
                  <span className="mr-2 text-[10px]">+{country.dialCode}</span>
                  <span className="text-[10px]">{country.name}</span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-sm">No country found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
