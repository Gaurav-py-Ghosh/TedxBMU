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
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 h-full mt-15  ">
        {/* TEDxBMU text — watermark style */}
        <div className="w-[70%] text-center" style={{ marginBottom: "-2rem" }}>
          <TextHoverEffect text="TEDxBMU" />
        </div>

        {/* Theme */}
        <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none text-center">
          <span className="text-white">THE </span>
          <span className="text-[#EB0028]">UNSEEN </span>
          <span className="text-white">STORIES </span>
        </h2>

        {/* Edition + Date */}
        <div className="flex items-center gap-6 mt-4 ">
          <div className="flex items-baseline gap-1">
            <span className="text-[#EB0028] text-base font-black">5</span>
            <span className="text-[#EB0028] text-[10px] font-black">th</span>
            <span className="text-white text-base font-black ml-1">
              Edition
            </span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-baseline gap-1">
            <span className="text-[#EB0028] text-base font-black">11</span>
            <span className="text-[#EB0028] text-[10px] font-black">th</span>
            <span className="text-white text-base font-black ml-1">April</span>
            <span className="text-white text-base font-black ml-1">2026</span>
          </div>
        </div>

        {/* Divider */}
        {/* <div className="flex items-center gap-3 mt-4">
          <div className="h-px w-16 bg-[#EB0028]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#EB0028]/60" />
          <div className="h-px w-16 bg-[#EB0028]/30" />
        </div> */}

        {/* CTA */}
        {/* <div className="mt-5">
          <StarBorder as="button">
            Register Now
          </StarBorder>
        </div> */}
      </div>
    </section>
  );
}
