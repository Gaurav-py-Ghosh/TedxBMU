"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Loader from "./home/Loader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem("tedxbmu_loaded");
    return !hasLoaded;
  });
  const pathname = usePathname();

  const handleDone = () => {
    sessionStorage.setItem("tedxbmu_loaded", "true");
    setLoading(false);
  };

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {loading && !isAdminRoute && <Loader onDone={handleDone} />}
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}