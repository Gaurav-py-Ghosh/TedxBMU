"use client";

import { useEffect, useState } from "react";

export default function Loader({ onDone }) {
  const [phase, setPhase] = useState("slam"); // slam → hold → fade

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 800);
    const t2 = setTimeout(() => setPhase("fade"), 2000);
    const t3 = setTimeout(() => onDone(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-700
        ${phase === "fade" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >

      {/* Red glow behind text */}
      <div className="absolute w-96 h-32 bg-[#e62b1e]/20 blur-[80px] rounded-full" />

      {/* TEDxBMU text */}
      <div
        className={`relative flex items-baseline gap-0 transition-all
          ${phase === "slam"
            ? "opacity-0 scale-[3] blur-sm"
            : "opacity-100 scale-100 blur-0"
          }`}
        style={{ transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <span className="text-[#e62b1e] text-7xl font-black tracking-tight">TED</span>
        <sup className="text-[#e62b1e] text-2xl font-black">x</sup>
        <span className="text-white text-7xl font-light tracking-wide ml-2">BMU</span>
      </div>

      {/* Subtitle */}
      <div
        className={`mt-4 transition-all duration-500 delay-300
          ${phase === "slam" ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
      >
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-12 w-48 h-px bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-[#e62b1e] rounded-full"
          style={{
            animation: "load-bar 2s ease forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes load-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

    </div>
  );
}