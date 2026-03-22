"use client";

import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import StarBorder from "@/components/ui/star-border";
import LightRays from "@/components/ui/LightRays";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[#1e1c1c] overflow-hidden">
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysColor="#ffffff"
          raysSpeed={0.5}
          followMouse={true}
          mouseInfluence={0.2}
          raysOrigin="top-center"
          lightSpread={1.2}
          rayLength={4}
          fadeDistance={2}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 h-full mt-10 md:mt-15">
        {/* TEDxBMU text — watermark style */}
        <div className="w-full md:w-[80%] lg:w-[70%] text-center" style={{ marginBottom: "-1.5rem" }}>
          <TextHoverEffect text="TEDxBMU" />
        </div>

        {/* Theme */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-center px-4">
          <span className="text-white">THE </span>
          <span className="text-[#EB0028]">UNSEEN </span>
          <span className="text-white">STORIES </span>
        </h2>

        {/* Edition + Date */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-6 md:mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-[#EB0028] text-sm md:text-base font-black">5</span>
            <span className="text-[#EB0028] text-[9px] md:text-[10px] font-black">th</span>
            <span className="text-white text-sm md:text-base font-black ml-1">
              Edition
            </span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="flex items-baseline gap-1">
            <span className="text-[#EB0028] text-sm md:text-base font-black">11</span>
            <span className="text-[#EB0028] text-[9px] md:text-[10px] font-black">th</span>
            <span className="text-white text-sm md:text-base font-black ml-1">April</span>
            <span className="text-white text-sm md:text-base font-black ml-1">2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
