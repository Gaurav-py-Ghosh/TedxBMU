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


      {/* All content grouped and centered */}
<div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full px-4 h-full mt-16">

        {/* TEDxBMU text */}
        <div className="w-[80%] mt-12 text-center mb-2">
          <TextHoverEffect text="TEDxBMU" />
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-[#e62b1e]/60" />
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">
            x = independently organized TED event
          </p>
          <div className="h-px w-12 bg-[#e62b1e]/60" />
        </div>

        {/* CTA Button */}
        <StarBorder as="button" className="mt-2">
          Register Now
        </StarBorder>

      </div>

    </section>
  );
}