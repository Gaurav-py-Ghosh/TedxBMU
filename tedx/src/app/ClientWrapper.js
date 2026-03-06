"use client";

import { useState } from "react";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Loader from "./home/Loader";

export default function ClientWrapper({ children }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}