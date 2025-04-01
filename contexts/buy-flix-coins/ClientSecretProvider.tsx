"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for context value
interface ClientSecretContextType {
  clientSecret: string;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const ClientSecretContext =
  createContext<ClientSecretContextType | undefined>(undefined);

// Create a provider component
export const ClientSecretProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [clientSecret, setClientSecret] = useState<string>("");

  return (
    <ClientSecretContext.Provider value={{ clientSecret, setClientSecret }}>
      {children}
    </ClientSecretContext.Provider>
  );
};

// Custom hook to use the context
export const useClientSecret = (): ClientSecretContextType => {
  const context = useContext(ClientSecretContext);
  if (!context) {
    throw new Error(
      "useClientSecret must be used within a ClientSecretProvider"
    );
  }
  return context;
};
