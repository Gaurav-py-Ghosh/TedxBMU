"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Loader from "./home/Loader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("tedxbmu_loaded");
    if (hasLoaded) {
      setLoading(false);
    } else {
      document.body.style.overflow = "hidden";
    }
    setInitialized(true);
  }, []);

  const handleDone = () => {
    sessionStorage.setItem("tedxbmu_loaded", "true");
    setLoading(false);
    document.body.style.overflow = "";
  };

  const isAdminRoute = pathname.startsWith("/admin");

  if (!initialized) return null;

  return (
    <>
      {loading && !isAdminRoute && <Loader onDone={handleDone} />}
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}