"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the context value type
interface LanguageContextType {
  locale: string;
  direction: "ltr" | "rtl"; // Added direction state
  setLocale: (locale: string) => void;
  loading: boolean;
}

const LanguageContext =
  createContext<LanguageContextType | undefined>(undefined);

// Custom hook to use the LanguageContext
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Define the props for the LanguageProvider component
interface LanguageProviderProps {
  children: ReactNode;
}

// LanguageProvider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string>("");
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr"); // Direction state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch the current locale from the cookie or API when the component mounts
  useEffect(() => {
    const fetchLocale = async () => {
      setLoading(true);
      const response = await fetch("/api/get-locale");
      const data = await response.json();
      if (data.locale) {
        setLocale(data.locale);
        // Set direction state based on locale
        // const newDirection = data.locale === "ar" ? "rtl" : "ltr";
        // setDirection(newDirection);
        // document.documentElement.classList.toggle(
        //   "rtl",
        //   newDirection === "rtl"
        // );
      }
      setLoading(false);
    };

    fetchLocale();
  }, []);

  // Handle language change

  const handleLanguageChange = async (selectedLocale: string) => {
    setLocale(selectedLocale);
    // Set direction based on the selected locale
    // const newDirection = selectedLocale === "ar" ? "rtl" : "ltr";
    // setDirection(newDirection);
    // document.documentElement.classList.toggle("rtl", newDirection === "rtl");

    const response = await fetch(`/api/set-locale?locale=${selectedLocale}`); //setting locale language in cookies while changing language
    if (response) {
      window.location.reload();
    }
    // router.refresh();
    // Optionally, handle the response or errors if necessary
  };

  return (
    <LanguageContext.Provider
      value={{ locale, direction, setLocale: handleLanguageChange, loading }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
