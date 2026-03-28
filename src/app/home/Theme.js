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
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-64 bg-[#e62b1e]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10">

        {/* TOP — Original Heading (No Changes) */}
        <div className={`flex flex-col items-center gap-4 text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none px-4">
            <span className="text-white">THE </span>
            <span className="text-[#e62b1e]">UNSEEN </span>
            <span className="text-white">STORIES</span>
          </h1>
        </div>

        {/* BOTTOM — Image + Refined Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT — Image Block */}
          <div className={`lg:col-span-5 flex flex-col gap-3 transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[3/4] shadow-[0_0_50px_rgba(230,43,30,0.15)] group">
              <img
                src="https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531099/image_cvmwie.png"
                alt="Theme"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* RIGHT — Refined Text Content */}
          <div className={`lg:col-span-7 flex flex-col gap-8 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-medium leading-tight text-white/90">
                Exploring the narratives that exist <span className="text-[#e62b1e]">beneath the surface</span> of the visible world.
              </p>
              <p className="text-white/40 text-base leading-relaxed">
                In a world focused on immediate success, we rarely pause to understand the layers of quiet resilience and untold struggles that define us. This theme brings forward the hidden defining moments that shape our reality silently.
              </p>
            </div>

            {/* Structured Explore Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Hidden realities of success",
                "Quiet personal struggles",
                "Overlooked perspectives",
                "Assumptions challenged"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-white/5 group hover:border-[#e62b1e]/50 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e62b1e]" />
                  <span className="text-white/60 text-sm font-medium tracking-wide uppercase group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>

            {/* Appealing Callout */}
            <div className="relative p-6 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border-l-4 border-[#e62b1e]">
              <p className="text-white/80 text-sm italic leading-relaxed">
                "Often, what remains unseen holds the deepest meaning. We invite you to look beyond the surface and discover perspectives you didn't realize you were missing."
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}