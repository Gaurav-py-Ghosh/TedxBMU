"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Loader from "./home/Loader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("tedxbmu_loaded");
    if (!hasLoaded) {
      setLoading(true);
    }
  }, []); // ← empty array — only runs ONCE on first mount ever

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