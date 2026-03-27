"use client";

import { useState } from "react";
import Navbar from "./home/Navbar";
import Homepage from "./home/Homepage";
import Loader from "./home/Loader";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="bg-black">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Navbar />
      <Homepage isLoaded={loaded} />
    </main>
  );
}