import React, { createContext, useContext, useState, ReactNode } from "react";
import { Gender } from "@/constants/enums";

interface FilterContextProps {
  selectedCountries: string[];
  selectedGenders: Gender[];
  filtersApplied: boolean;
  setFiltersApplied: (applied: boolean) => void;
  setSelectedCountries: (countries: string[]) => void;
  setSelectedGenders: (genders: Gender[]) => void;
  clearFilters: () => void;
}

const AuthFilterContext = createContext<FilterContextProps | undefined>(undefined);

export const AuthFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false); 

  const clearFilters = () => {
    setSelectedCountries([]);
    setSelectedGenders([]);
    setFiltersApplied(false); 
  };

  return (
    <AuthFilterContext.Provider value={{ 
      selectedCountries, 
      selectedGenders, 
      filtersApplied, 
      setFiltersApplied, 
      setSelectedCountries, 
      setSelectedGenders, 
      clearFilters 
    }}>
      {children}
    </AuthFilterContext.Provider>
  );
};


export const useAuthFilter = (): FilterContextProps => {
  const context = useContext(AuthFilterContext);
  if (!context) {
    throw new Error("useAuthFilter must be used within an AuthFilterProvider");
  }
  return context;
};
