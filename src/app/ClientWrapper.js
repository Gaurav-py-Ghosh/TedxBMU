"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Loader from "./home/Loader";
import { LoadingProvider, useLoading } from "../context/LoadingContext";

function ClientWrapperContent({ children }) {
  const { isLoaded, setIsLoaded } = useLoading();
  const [initialized, setInitialized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setInitialized(true);
  }, []);

  const handleDone = () => {
    sessionStorage.setItem("tedxbmu_loaded", "true");
    setIsLoaded(true);
    document.body.style.overflow = "";
  };

  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  if (!initialized) return null;

  return (
    <>
      {!isLoaded && !isAdminRoute && (
        <Loader onDone={handleDone} />
      )}
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function ClientWrapper({ children }) {
  return (
    <LoadingProvider>
      <ClientWrapperContent>{children}</ClientWrapperContent>
    </LoadingProvider>
  );
}
