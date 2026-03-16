"use client";

import { useRef, useEffect, useState } from "react";

function useVisible(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-8 bg-[#e62b1e]" />
      <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light">
        {text}
      </span>
    </div>
  );
}

export default function AboutPage() {
  const [heroRef, heroVisible] = useVisible(0.1);
  const [tedRef, tedVisible] = useVisible(0.15);
  const [tedxRef, tedxVisible] = useVisible(0.15);
  const [historyRef, historyVisible] = useVisible(0.15);
  const [missionRef, missionVisible] = useVisible(0.15);
  const [bmuRef, bmuVisible] = useVisible(0.15);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#e62b1e]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/3 right-0 w-64 h-96 bg-[#e62b1e]/3 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* HERO */}
      <section ref={heroRef} className="relative pt-36 pb-24 px-8">
        <div
          className={`max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col gap-4">
            <SectionLabel text="TEDxBMU 2026" />
            <h1 className="text-7xl lg:text-8xl font-black leading-none tracking-tight uppercase">
              <span className="text-white">ABOUT </span>
              <span className="text-[#e62b1e]">US</span>
            </h1>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm lg:mb-2">
            An independently organized TED event at BML Munjal University —
            where ideas worth spreading find their stage.
          </p>
        </div>
        <div className="max-w-7xl mx-auto mt-10 h-px bg-gradient-to-r from-[#e62b1e]/40 via-white/5 to-transparent" />
      </section>

      {/* WHAT IS TED */}
      <section ref={tedRef} className="relative py-24 px-8">
        <div
          className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${tedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col gap-6">
            <SectionLabel text="The Origin" />
            <h2 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight">
              <span className="text-white">WHAT IS </span>
              <span className="text-[#e62b1e]">TED?</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              TED is a nonprofit organization devoted to the power of ideas.
              Starting as a conference in 1984 focused on Technology,
              Entertainment and Design, TED has grown to cover virtually every
              topic — from science and business to global issues — in more than
              100 languages.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              TED's mission is to discover and spread ideas that spark
              imagination, embrace possibility and catalyze impact. Through
              talks, podcasts, and events, TED has become a global platform for
              the world's most inspired thinkers.
            </p>
            <a
              href="https://www.ted.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#e62b1e] text-xs tracking-wider uppercase font-semibold hover:gap-4 transition-all duration-300 w-fit"
            >
              Learn more at TED.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Right — decorative card */}
          <div className="relative">
            <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-8 flex flex-col gap-6 ...">
              <div className="text-6xl font-black text-[#E62B1E] leading-none">
                TED
              </div>
              <p className="text-white text-xs tracking-widest uppercase">
                Technology · Entertainment · Design
              </p>
              <div className="h-px w-full bg-white/5" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  ["1984", "Founded"],
                  ["3000+", "Talks"],
                  ["100+", "Languages"],
                ].map(([num, label]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-2xl font-black text-white">
                      {num}
                    </span>
                    <span className="text-white/30 text-xs tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e62b1e]/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#e62b1e]/30 rounded-bl-2xl" />
          </div>
        </div>
      </section>

      {/* WHAT IS TEDx */}
      <section ref={tedxRef} className="relative py-24 px-8 bg-white/[0.01]">
        <div
          className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${tedxVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Left — decorative */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-8 flex flex-col gap-6 ...">
              <div className="flex items-baseline gap-0">
                <span className="text-5xl font-black text-[#e62b1e]">TED</span>
                <span className="text-5xl font-black text-white">x</span>
              </div>
              <p className="text-white text-xs tracking-widest uppercase leading-relaxed">
                x = independently organized event
              </p>
              <div className="h-px w-full bg-white/5" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  ["3000+", "Events"],
                  ["100+", "Countries"],
                  ["Since '09", "Global"],
                ].map(([num, label]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-xl font-black text-white">{num}</span>
                    <span className="text-white/30 text-xs tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <SectionLabel text="The Program" />
            <h2 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight">
              <span className="text-white">WHAT IS </span>
              <span className="text-[#e62b1e]">TEDx?</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              TEDx is a program of local, self-organized events that bring
              people together to share a TED-like experience. The "x" in TEDx
              stands for independently organized TED event — communities,
              universities and organizations around the world are licensed to
              run their own events.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              TEDx events are designed to spark deep discussion and connection
              in a small group setting. Each event combines live speakers and
              TEDTalks to strike a balance between local and global
              perspectives.
            </p>
          </div>
        </div>
      </section>

      {/* TEDXBMU HISTORY */}
      <section ref={historyRef} className="relative py-24 px-8">
        <div
          className={`max-w-7xl mx-auto flex flex-col gap-14 transition-all duration-1000 ${historyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <SectionLabel text="Our Story" />
              <h2 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight">
                <span className="text-white">TEDxBMU </span>
                <span className="text-[#e62b1e]">JOURNEY</span>
              </h2>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              From a small gathering of curious minds to one of the most
              anticipated events at BML Munjal University.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#e62b1e]/60 via-[#e62b1e]/20 to-transparent" />

            {[
              {
                year: "2022",
                title: "The Beginning",
                desc: "TEDxBMU was founded with a simple belief — that BML Munjal University deserved a stage for ideas worth spreading. The inaugural edition drew over 200 attendees and set the tone for everything that followed.",
              },

              {
                year: "2023",
                title: "The Beginning",
                desc: "TEDxBMU was founded with a simple belief — that BML Munjal University deserved a stage for ideas worth spreading. The inaugural edition drew over 200 attendees and set the tone for everything that followed.",
              },
              {
                year: "2024",
                title: "The Ripple Effect",
                desc: "Our second edition explored how small actions create massive change. With 6 speakers and a sold-out audience, TEDxBMU 2024 cemented our place as one of the most anticipated events on campus.",
              },
              {
                year: "2025",
                title: "Beyond What We Think",
                desc: "TEDxBMU 2025 challenged attendees to look past assumptions and conventional wisdom. The event featured diverse voices from across India, pushing the boundaries of what a student-run event can achieve.",
              },
              {
                year: "2026",
                title: "The Next Chapter",
                desc: "TEDxBMU 2026 is on the horizon — bigger, bolder, and more ambitious than ever. Stay tuned for an edition that will redefine what it means to think differently.",
              },
            ].map((item, i) => (
              <div key={i} className="relative flex gap-8 pb-12">
                {/* Dot */}
                <div className="relative flex-shrink-0 mt-1.5">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${i === 4 ? "border-[#e62b1e] bg-[#e62b1e]/20" : "border-[#e62b1e]/60 bg-black"}`}
                  >
                    {i === 4 && (
                      <div className="w-2 h-2 rounded-full bg-[#e62b1e] animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[#e62b1e] text-xs font-black tracking-widest">
                      {item.year}
                    </span>
                    {i === 4 && (
                      <span className="px-2 py-0.5 bg-[#e62b1e]/10 border border-[#e62b1e]/30 rounded-full text-[#e62b1e] text-[10px] tracking-wider uppercase">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-black text-xl uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section ref={missionRef} className="relative py-24 px-8 bg-white/[0.01]">
        <div
          className={`max-w-7xl mx-auto flex flex-col gap-14 transition-all duration-1000 ${missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <SectionLabel text="What Drives Us" />
            <h2 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight">
              <span className="text-white">MISSION </span>
              <span className="text-[#e62b1e]">&</span>
              <span className="text-white"> VISION</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div
              className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col gap-5
              hover:border-[#e62b1e]/30 hover:shadow-[0_0_40px_rgba(230,43,30,0.08)] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e62b1e]/10 border border-[#e62b1e]/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="#e62b1e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-white font-black text-2xl uppercase tracking-tight">
                Our Mission
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                To create a platform where ideas that challenge, inspire, and
                spark conversation are given the space they deserve. TEDxBMU
                exists to bring the TED experience to our community —
                celebrating thinkers, doers, and dreamers who dare to see the
                world differently.
              </p>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e62b1e]/40 rounded-bl-2xl" />
                <div className="absolute bottom-0 left-0 w-[2px] h-full bg-[#e62b1e]/40 rounded-bl-2xl" />
              </div>
            </div>

            {/* Vision */}
            <div
              className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col gap-5
              hover:border-[#e62b1e]/30 hover:shadow-[0_0_40px_rgba(230,43,30,0.08)] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e62b1e]/10 border border-[#e62b1e]/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#e62b1e"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
                    stroke="#e62b1e"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-white font-black text-2xl uppercase tracking-tight">
                Our Vision
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                To build a generation of independent thinkers at BML Munjal
                University and beyond — people who question assumptions, embrace
                complexity, and use ideas as tools for change. We envision
                TEDxBMU as a lasting institution that grows with every edition.
              </p>
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-[#e62b1e]/40 rounded-tr-2xl" />
                <div className="absolute top-0 right-0 w-[2px] h-full bg-[#e62b1e]/40 rounded-tr-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT BMU */}
      <section ref={bmuRef} className="relative py-24 px-8">
        <div
          className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${bmuVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col gap-6">
            <SectionLabel text="Our Home" />
            <h2 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight">
              <span className="text-white">BML MUNJAL </span>
              <span className="text-[#e62b1e]">UNIVERSITY</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              BML Munjal University is a private university located in
              Sidhrawali, Gurugram, Haryana. Established by the Hero Group, BMU
              is committed to delivering world-class education that blends
              academic rigor with industry relevance.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              With state-of-the-art facilities, a vibrant campus culture, and a
              strong focus on innovation and entrepreneurship, BMU provides the
              perfect backdrop for an event like TEDxBMU — where curiosity is
              encouraged and ideas are celebrated.
            </p>
            <a
              href="https://www.bmu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#e62b1e] text-xs tracking-wider uppercase font-semibold hover:gap-4 transition-all duration-300 w-fit"
            >
              Visit bmu.edu.in
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Right — BMU stats */}
          <div className="relative">
            <div
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col gap-6
              hover:border-[#e62b1e]/20 hover:shadow-[0_0_60px_rgba(230,43,30,0.08)] transition-all duration-500"
            >
              <p className="text-white text-xs tracking-widest uppercase">
                BML Munjal University
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  ["2014", "Established"],
                  ["Gurugram", "Location"],
                  ["Hero Group", "Founded By"],
                  ["5000+", "Students"],
                ].map(([num, label]) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 border-l-2 border-[#e62b1e]/20 pl-4"
                  >
                    <span className="text-xl font-black text-white">{num}</span>
                    <span className="text-white/30 text-xs tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e62b1e]/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#e62b1e]/30 rounded-bl-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
