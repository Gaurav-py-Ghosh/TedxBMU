"use client";
import DepthGlobe from "@/components/DepthGlobe";

export default function AttendeesSay() {
  return (
    <section className="relative w-full bg-black py-16 md:py-24 flex flex-col items-center overflow-hidden">
      <div className="mt-10 w-full max-w-5xl px-6 flex items-center justify-center">
        <div className="w-full h-[22rem] md:h-[32rem] lg:h-[36rem]">
          <DepthGlobe
            glow={0.6}
            depth={0.35}
            scale={1.2}
            speed={0.3}
            orbit={false}
          />
        </div>
      </div>
    </section>
  );
}
