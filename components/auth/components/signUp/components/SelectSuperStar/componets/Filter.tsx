import React from "react";
import CountryFilter from "./CountryFilter";
import GenderFilter from "./GenderFilter";
import CountryFilterTab from "@/components/ui/Tabs/CountryFilterTab";
import Button from "@/components/ui/Button/Button";
import BackButton from "@/components/ui/Button/BackButton";
import { useAuthFilter } from "@/contexts/authetication/AuthFilterContext"; 

interface FilterProps {
  setIsFilterActive: (value:boolean) => void;
  onApplyFilter: () => void; 
  setFilter: (filter: string) => void; 
  handleClearFilter:()=>void
  
}

const Filter: React.FC<FilterProps> = ({ setIsFilterActive, onApplyFilter,setFilter ,handleClearFilter}) => {
  const {
    selectedCountries,
    selectedGenders,
    clearFilters,
    filtersApplied,
    setFiltersApplied,
  } = useAuthFilter(); 
  const isApplyButtonDisabled = selectedCountries.length === 0 && selectedGenders.length === 0;

  
  const handleApplyFilter = () => {
    if (!isApplyButtonDisabled) {
      const countryFilters = selectedCountries.map(country => `country_filter[]=${country}`).join('&');
      const genderFilters = selectedGenders.map(gender => `gender_filter[]=${gender}`).join('&');
      const filterQuery = `${countryFilters}&${genderFilters}`;
      setFilter(filterQuery);
      setFiltersApplied(true);
      onApplyFilter();
    }
  };

  const handleClearFilters = async () => {
    clearFilters();
    setFiltersApplied(false);
    setFilter(""); 
    setIsFilterActive(false);
    handleClearFilter();
  };

  const tabs = [
    { label: "Country", content: <CountryFilter /> },
    { label: "Gender", content: <GenderFilter /> },
  ];

  const handleBackSubmit=()=>{
    setIsFilterActive(false)
  }
  return (
    <div className="w-80 md:w-96 mt-medium">
      <CountryFilterTab tabs={tabs} />

      <div className="flex justify-between mt-4">
        {filtersApplied ? (
          <>
            <Button
              bgColor="bg-gray-200 hover:bg-gray-300" 
              textColor="text-visitorText" 
              width="w-full"
              textSize="text-sm"
              marginTop="mt-0"
            
              onClick={handleClearFilters}
            >
              Clear Filter
            </Button>
          </>
        ) : (
          <Button
            className="w-full"
            disabled={isApplyButtonDisabled}
            onClick={handleApplyFilter}
          >
            APPLY FILTER
          </Button>
        )}
      </div>

      <BackButton onClick={handleBackSubmit} />
    </div>
  );
};

export default Filter;
