"use client";

import { useLanguage } from "@/contexts/LanguageContext";
// import React, { useEffect, useState } from "react"; // Adjust the import path
const LanguageSelector: React.FC = () => {
  const { locale, setLocale, loading } = useLanguage();

  if (loading || !locale) return null;

  return (
    <select
      onChange={(e) => {
        setLocale(e.target.value);
      }}
      value={locale} // Controlled component with state
    >
      <option value="en">English</option>
      <option value="ar">Arabic</option>
      <option value="fr">French</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSelector;
