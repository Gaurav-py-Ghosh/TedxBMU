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
    <section ref={ref} className="relative bg-black text-white py-24 px-8 mt-[-1px]">
      
      {/* Background Ambience — Reduced Radius & Spread */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[110%] max-w-[1000px] h-[600px] bg-[#e62b1e]/15 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10">

        {/* TOP — Original Heading (No Changes) */}
        <div className={`flex flex-col items-center gap-4 text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none px-4 drop-shadow-[0_0_30px_rgba(230,43,30,0.3)]">
            <span className="text-white">THE </span>
            <span className="text-[#e62b1e] drop-shadow-[0_0_20px_rgba(230,43,30,0.5)]">UNSEEN </span>
            <span className="text-white">STORIES</span>
          </h1>
        </div>

        {/* BOTTOM — Image + Refined Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT — Image Block */}
          <div className={`lg:col-span-5 flex flex-col gap-4 transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#a01218] via-[#4b010a] to-[#050001] aspect-[3/4] shadow-[0_0_50px_rgba(230,43,30,0.22)] group">
              <img
                src="https://i.ibb.co/x8YzxDXn/Chat-GPT-Image-Mar-29-2026-04-14-35-AM-removebg-preview.png"
                alt="Theme"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            </div>
            <p className="text-white/80 text-sm italic leading-relaxed">
              "This image depicts the hidden struggles behind visible success, showing a classical sculpture fractured to reveal inner stories of rejection, isolation, perseverance, and the silent journey that shapes achievement."
            </p>
          </div>

          {/* RIGHT — Refined Text Content */}
          <div className={`lg:col-span-7 flex flex-col gap-8 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>

            <div className="space-y-3">
              <p className="text-lg md:text-xl font-semibold leading-tight text-white/90">
                The Unseen Stories uncovers the layers beneath what we see quiet moments and hidden perspectives that quietly shape people and ideas.
              </p>
              <p className="text-white/45 text-sm md:text-base leading-relaxed">
                Beyond the visible is a world of resilience, struggle, and surprise. This theme shines a light on what usually stays unspoken.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base md:text-lg font-semibold text-white/90">What We Explore</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[ 
                  "Stories behind visible success",
                  "Quiet struggles that change a journey",
                  "Overlooked and unheard voices",
                  "Narratives that challenge what we assume"
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 min-h-[72px] rounded-xl border border-white/10 bg-gradient-to-r from-[#e62b1e]/10 via-white/[0.02] to-transparent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e62b1e] shadow-[0_0_0_4px_rgba(230,43,30,0.15)]" />
                    <span className="text-white/75 text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Look closer, question what’s assumed, and notice what sits beneath the surface because the unseen often carries the most meaning.
            </p>

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