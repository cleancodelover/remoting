"use client";
import React, { createContext, useContext, useState } from "react";

type PopOverProviderProps = {
  children: React.ReactNode;
};

export type PopOverContextType = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters?: boolean;
  setShowFilters?: React.Dispatch<React.SetStateAction<boolean>>;
  view?: "login" | "signup" | "profile";
  setView?: React.Dispatch<
    React.SetStateAction<"login" | "signup" | "profile">
  >;
};

export const PopOverContext = createContext<PopOverContextType>({});
const PopOverProvider = ({ children }: PopOverProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [view, setView] = useState<"login" | "signup" | "profile">("login");

  return (
    <PopOverContext.Provider value={{ isOpen, setIsOpen, view, setView, showFilters, setShowFilters }}>
      {children}
    </PopOverContext.Provider>
  );
};

export default PopOverProvider;
export const usePopOver = () => useContext(PopOverContext);
