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
    <section ref={ref} className="relative bg-black text-white py-24 px-8">

      {/* Red glow top center - positioned higher to overlap with previous section, radius reduced */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[220px] bg-[#e62b1e]/15 blur-[100px] rounded-full pointer-events-none z-0" />

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
                <img src="https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531099/image_cvmwie.png" alt="Theme" className="w-full h-full object-cover" />
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
              <span className="text-[#e62b1e] font-semibold">The Unseen Stories</span> is about the narratives that exist beneath what we see. Every person, idea, and moment carries layers that often go unnoticed — stories that aren't told, but deeply felt.
            </p>

            <p className="text-white/50 text-sm leading-relaxed">
              We live in a world that focuses on what's visible, but rarely stops to understand what lies beneath. This theme brings those hidden stories to light — stories of quiet resilience, untold struggles, unexpected perspectives, and moments that shape us without ever being seen.
            </p>

            {/* What we explore */}
<div className="flex flex-col gap-4">

  <h3 className="text-white font-black text-sm tracking-widest uppercase">
    What We Explore
  </h3>

  <div className="flex flex-col gap-3">
    {[
      "The stories behind visible success that no one talks about",
      "The quiet struggles and turning points that shape journeys",
      "Voices that were overlooked, unheard, or left untold",
      "Narratives that challenge what we think we know",
    ].map((item, i) => (
      <p
        key={i}
        className="text-white/50 text-sm leading-relaxed border-l border-[#e62b1e]/30 pl-4 hover:border-[#e62b1e] transition-colors duration-300"
      >
        {item}
      </p>
    ))}
  </div>

</div>

            {/* Closing paragraph */}
            <p className="text-white/50 text-sm leading-relaxed">
              This theme invites you to{" "}
              <span className="text-white font-semibold">question what you assume, notice what you overlook, and understand what lies beneath the surface</span>. Because sometimes, what we don't see holds the most meaning.
            </p>

            {/* Callout box */}
            <div className="border-l-2 border-[#e62b1e] bg-white/[0.03] rounded-r-xl px-5 py-4 flex flex-col gap-2">
              <p className="text-white text-sm font-semibold">An Invitation to See Differently</p>
              <p className="text-white/40 text-xs leading-relaxed">
                This isn't just about listening to ideas — it's about discovering perspectives you didn't know you were missing.
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}