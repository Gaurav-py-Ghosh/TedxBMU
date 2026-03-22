"use client";

import { useEffect, useState } from "react";

export default function Loader({ onDone }) {
  const [phase, setPhase] = useState("intro"); // intro → reveal → glow → fade

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 400);
    const t2 = setTimeout(() => setPhase("glow"), 1200);
    const t3 = setTimeout(() => setPhase("fade"), 2200);
    const t4 = setTimeout(() => onDone(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
      style={{
        opacity: phase === "fade" ? 0 : 1,
        transition: phase === "fade" ? "opacity 0.7s ease" : "none",
        pointerEvents: phase === "fade" ? "none" : "all",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute w-[500px] h-[200px] rounded-full transition-all duration-700"
        style={{
          background: "rgba(230,43,30,0.15)",
          filter: "blur(80px)",
          opacity: phase === "glow" ? 1 : 0,
        }}
      />

      {/* Main logo */}
      <div className="relative flex items-baseline gap-0 select-none">

        {/* TED */}
        <span
          className="text-[#e62b1e] font-black tracking-tight"
          style={{
            fontSize: "clamp(4rem, 4vw, 4rem)",
            opacity: phase === "intro" ? 0 : 1,
            transform: phase === "intro" ? "translateX(-40px)" : "translateX(0)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          TED
        </span>

       {/* x */}
<sup
  className="text-[#e62b1e] font-black"
  style={{
    fontSize: "clamp(2rem, 2vw, 2rem)",
    lineHeight: 1,
    verticalAlign: "super",
    opacity: phase === "intro" ? 0 : 1,
    textShadow: phase === "glow" ? "0 0 20px #e62b1e, 0 0 40px rgba(230,43,30,0.5)" : "none",
    transition: "opacity 0.4s ease 0.2s, text-shadow 0.5s ease",
  }}
>
  x
</sup>

        {/* BMU */}
        <span
          className="text-white font-light tracking-wide ml-2"
          style={{
            fontSize: "clamp(4rem, 4vw, 4rem)",
            opacity: phase === "intro" ? 0 : 1,
            transform: phase === "intro" ? "translateX(40px)" : "translateX(0)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          BMU
        </span>

      </div>


      {/* Loading bar */}
      <div className="absolute bottom-12 w-48 h-px bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-[#e62b1e] rounded-full"
          style={{
            boxShadow: "0 0 8px rgba(230,43,30,0.8)",
            animation: "load-bar 2.2s ease forwards",
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