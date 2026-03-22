"use client";

import { useRef, useEffect, useState } from "react";

export default function ThemeDetail() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-black text-white py-24 px-8 overflow-hidden">

      {/* Red glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#e62b1e]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* TOP — Theme label + title */}
        <div className={`flex flex-col items-center gap-4 text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Big title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none px-4">
            <span className="text-white">THE </span>
            <span className="text-[#e62b1e]">UNSEEN </span>
            <span className="text-white">STORIES </span>
          </h1>
        </div>

        {/* BOTTOM — Image + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Image */}
          <div className={`flex flex-col gap-3 transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-[3/4] flex items-center justify-center
              shadow-[0_0_40px_rgba(230,43,30,0.1)]">
              {/* Replace with actual image */}
              <div className="w-full h-full bg-gradient-to-b from-white/5 to-black/40 flex items-center justify-center">
                <img src="/gallery/image.png" alt="Theme" className="w-full h-full object-cover" />
                {/* Red glow overlay */}
              </div>
              {/* Red left border accent */}
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#e62b1e]/60 via-[#e62b1e]/20 to-transparent" />
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className={`flex flex-col gap-6 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>

            {/* Intro paragraph */}
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-[#e62b1e] font-semibold">Beyond What We Think</span> is an invitation to look deeper — beyond appearances, beyond assumptions, and beyond the limits of what we think we know.
            </p>

            <p className="text-white/50 text-sm leading-relaxed">
              In a world that moves quickly, we often notice only the surface: actions without the intentions behind them, outcomes without the stories that shaped them, and people without the journeys they've lived.
            </p>

            {/* What we explore */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#e62b1e] flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <h3 className="text-white font-black text-sm tracking-widest uppercase">What We Explore</h3>
              </div>

              <ul className="flex flex-col gap-2 ml-1">
                {[
                  "The quiet ideas that spark change",
                  "The emotions that shape human behaviour",
                  "The stories that remain untold",
                  "The discoveries that lie just out of sight",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/50 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e62b1e] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Middle paragraph */}
            <p className="text-white/50 text-sm leading-relaxed">
              This theme encourages us to{" "}
              <span className="text-white font-semibold">slow down, question what we take for granted</span>,
              and recognise the depth within everyday moments. Through diverse voices and compelling narratives,
              we illuminate the unseen forces that connect us, inspire us, and challenge us to think differently.
            </p>

            {/* Callout box */}
            <div className="border-l-2 border-[#e62b1e] bg-white/[0.03] rounded-r-xl px-5 py-4 flex flex-col gap-2">
              <p className="text-white text-sm font-semibold">An Invitation to Expand Your Perspective</p>
              <p className="text-white/40 text-xs leading-relaxed">
                Beyond What We Think is not just a theme — it's an invitation to discover a richer, more meaningful way of understanding the world.
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}