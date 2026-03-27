"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext({
  isLoaded: false,
  setIsLoaded: () => {},
});

export function LoadingProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}


export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
