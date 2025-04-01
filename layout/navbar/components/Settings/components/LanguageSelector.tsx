"use client";

import React from "react";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { languageOptions } from "@/constants/common";

const LanguageSelector: React.FC = () => {
  const { locale, setLocale, loading } = useLanguage(); 

  if (loading || !locale) return null; 

  return (
    <div className="p-2">
      {languageOptions.map((option) => (
        <div
          key={option.code}
          className="flex items-center gap-2 cursor-pointer p-2  hover:bg-gray-100"
          onClick={() => setLocale(option.code)}
        >
          <Checkbox
            label={option.name}
            checked={locale === option.code}
            onChange={() => setLocale(option.code)}
          />
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
