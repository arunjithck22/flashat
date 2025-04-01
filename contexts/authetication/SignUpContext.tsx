'use client';
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SignUpContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isModalOpen: boolean; 
  showCloseBtn:boolean
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsModalOpen: (isOpen: boolean) => void; 
  setShowCloseBtn:(value:boolean)=>void
  clearSignUpData: () => void;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpenState] = useState<boolean>(false);
  const [showCloseBtn, setShowCloseBtn] = useState<boolean>(true);
  const setAccessToken = (token: string) => {
    setAccessTokenState(token);
  };
  const setRefreshToken = (token: string) => {
    setRefreshTokenState(token);
  };
  const setIsModalOpen = (isOpen: boolean) => {
    setIsModalOpenState(isOpen);
  };
  const clearSignUpData = () => {
    setAccessTokenState(null);
    setRefreshTokenState(null);
    setIsModalOpen(false); 
  };
  return (
    <SignUpContext.Provider value={{ accessToken, refreshToken, isModalOpen, setAccessToken, setRefreshToken, setIsModalOpen, clearSignUpData,showCloseBtn,setShowCloseBtn }}>
      {children}
    </SignUpContext.Provider>
  );
};
export const useSignUp = (): SignUpContextType => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUp must be used within a SignUpProvider");
  }
  return context;
};
