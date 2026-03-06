"use client";

import { useRef, useEffect, useState } from "react";
import BlurText from "@/components/ui/BlurText";
import CountUp from "@/components/ui/CountUp";

function StatBox({ number, suffix, label, start }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl font-black text-white flex items-center">
        <CountUp
          from={0}
          to={number}
          duration={2}
          startWhen={start}
          className="text-3xl font-black text-white"
        />
        {suffix}
      </span>
      <span className="text-white/40 text-xs tracking-widest uppercase">{label}</span>
    </div>
  );
}

export default function Theme() {
  const [visible, setVisible] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (visible) setTimeout(() => setStatsStarted(true), 600);
  }, [visible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-black text-white py-24 px-8 overflow-hidden min-h-screen flex items-center">

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text */}
          <div className={`flex flex-col gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#e62b1e]" />
            </div>
            <div className="flex flex-col gap-1">
              <BlurText text="Beyond" delay={150} animateBy="words" direction="top"
                className="text-6xl font-black leading-tight tracking-tight text-white" />
              <BlurText text="What We Think." delay={300} animateBy="words" direction="top"
                className="text-6xl font-black leading-tight tracking-tight text-[#e62b1e]" />
            </div>
            <p className="text-white/50 text-base leading-relaxed max-w-md font-light">
              TEDxBMU 2026 invites you to shatter the boundaries of conventional thinking.
              This is a space where curiosity meets courage, where ideas that once seemed
              impossible become the blueprints of tomorrow.
            </p>
            <div className="flex gap-12 mt-4">
              <StatBox number={6} suffix="+" label="Speakers" start={statsStarted} />
              <StatBox number={100} suffix="+" label="Attendees" start={statsStarted} />
              <StatBox number={1} suffix="" label="Day of Ideas" start={statsStarted} />
            </div>
          </div>

          {/* RIGHT — Images */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="col-span-1 row-span-2 bg-white/5 rounded-lg overflow-hidden h-80 border border-[#e62b1e]/20 flex items-center justify-center shadow-[0_0_30px_rgba(230,43,30,0.15)] hover:shadow-[0_0_50px_rgba(230,43,30,0.3)] hover:border-[#e62b1e]/40 transition-all duration-500">
              <div className="text-white/20 text-xs tracking-widest uppercase">Photo 1</div>
            </div>
            <div className="bg-white/5 rounded-lg overflow-hidden h-[152px] border border-[#e62b1e]/20 flex items-center justify-center shadow-[0_0_20px_rgba(230,43,30,0.1)] hover:shadow-[0_0_40px_rgba(230,43,30,0.25)] hover:border-[#e62b1e]/40 transition-all duration-500">
              <div className="text-white/20 text-xs tracking-widest uppercase">Photo 2</div>
            </div>
            <div className="bg-white/5 rounded-lg overflow-hidden h-[152px] border border-[#e62b1e]/20 flex items-center justify-center shadow-[0_0_20px_rgba(230,43,30,0.1)] hover:shadow-[0_0_40px_rgba(230,43,30,0.25)] hover:border-[#e62b1e]/40 transition-all duration-500">
              <div className="text-white/20 text-xs tracking-widest uppercase">Photo 3</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}