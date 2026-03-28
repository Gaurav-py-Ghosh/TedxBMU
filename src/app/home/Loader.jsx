"use client";

import { useEffect, useRef, useState } from "react";

const LOADER_DURATION_MS = 5500; // matches animation + zoom wipe
const LOADER_SRC = "/loader.html";

export default function Loader({ onDone }) {
  const timerRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onDone?.(), 450); // allow overlay fade before unmount
    }, LOADER_DURATION_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.45s ease",
      }}
    >
      <iframe
        title="TEDxBMU loader"
        src={LOADER_SRC}
        className="w-full h-full"
        style={{ border: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
