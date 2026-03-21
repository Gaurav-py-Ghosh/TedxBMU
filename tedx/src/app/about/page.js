"use client";

import { useRef, useEffect, useState } from "react";

function useVisible(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    const current = ref.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, [threshold]);
  return [ref, visible];
}

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-8 bg-[#eb0028]" />
      <span className="text-[#eb0028] text-xs tracking-[0.4em] uppercase font-light">{text}</span>
    </div>
  );
}

function CardCorners() {
  return (
    <>
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#eb0028]/30 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#eb0028]/30 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#eb0028]/30 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#eb0028]/30 rounded-br-2xl pointer-events-none" />
    </>
  );
}

export default function AboutPage() {
  const [heroRef, heroVisible] = useVisible(0.1);
  const [tedRef, tedVisible] = useVisible(0.15);
  const [tedxRef, tedxVisible] = useVisible(0.15);
  const [bmuRef, bmuVisible] = useVisible(0.15);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#eb0028]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/3 right-0 w-64 h-96 bg-[#eb0028]/3 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* HERO */}
      <section ref={heroRef} className="relative pt-36 px-8">
        <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col gap-4">
            <h1 className="text-7xl lg:text-7xl font-black leading-none tracking-tight uppercase">
              <span className="text-white">ABOUT </span>
              <span className="text-[#eb0028]">US</span>
            </h1>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm lg:mb-2">
            An independently organized TED event at BML Munjal University — where ideas worth spreading find their stage.
          </p>
        </div>
        <div className="max-w-7xl mx-auto mt-10 h-px bg-gradient-to-r from-[#eb0028]/40 via-white/5 to-transparent" />
      </section>

      {/* WHAT IS TED */}
      <section ref={tedRef} className="relative py-24 px-8">
        <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${tedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col gap-6">
            <SectionLabel text="The Origin" />
            <h2 className="text-5xl font-black uppercase leading-none tracking-tight">
              <span className="text-white">WHAT IS </span>
              <span className="text-[#eb0028]">TED?</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              TED is a nonprofit organization devoted to the power of ideas. Starting as a conference in 1984 focused on Technology, Entertainment and Design, TED has grown to cover virtually every topic — from science and business to global issues — in more than 100 languages.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              TED's mission is to discover and spread ideas that spark imagination, embrace possibility and catalyze impact. Through talks, podcasts, and events, TED has become a global platform for the world's most inspired thinkers.
            </p>
            <a href="https://www.ted.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#eb0028] text-xs tracking-wider uppercase font-semibold hover:gap-4 transition-all duration-300 w-fit">
              Learn more at TED.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* TED Card */}
          <div className="relative">
            <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-8 flex flex-col gap-6 hover:border-[#eb0028]/30 hover:shadow-[0_0_60px_rgba(235,0,40,0.08)] transition-all duration-500">
              <div className="text-6xl font-black text-[#eb0028] leading-none">TED</div>
              <p className="text-white/60 text-xs tracking-widest uppercase">Technology · Entertainment · Design</p>
              <div className="h-px w-full bg-white/10" />
              <div className="grid grid-cols-3 gap-4">
                {[["1984", "Founded"], ["3000+", "Talks"], ["100+", "Languages"]].map(([num, label]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-2xl font-black text-white">{num}</span>
                    <span className="text-white/40 text-xs tracking-wide">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <CardCorners />
          </div>
        </div>
      </section>

      {/* WHAT IS TEDx */}
      <section ref={tedxRef} className="relative py-24 px-8 bg-white/[0.01]">
        <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${tedxVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* TEDx Card */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-8 flex flex-col gap-6 hover:border-[#eb0028]/30 hover:shadow-[0_0_60px_rgba(235,0,40,0.08)] transition-all duration-500">
              <div className="flex items-baseline gap-0">
                <span className="text-5xl font-black text-[#eb0028]">TED</span>
                <span className="text-xl font-black text-white">x</span>
              </div>
              <p className="text-white/60 text-xs tracking-widest uppercase leading-relaxed">x = independently organized event</p>
              <div className="h-px w-full bg-white/10" />
              <div className="grid grid-cols-3 gap-4">
                {[["3000+", "Events"], ["100+", "Countries"], ["Since '09", "Global"]].map(([num, label]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-xl font-black text-white">{num}</span>
                    <span className="text-white/40 text-xs tracking-wide">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <CardCorners />
          </div>

          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <SectionLabel text="The Program" />
            <h2 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight">
              <span className="text-white">WHAT IS </span>
              <span className="text-[#eb0028]">TEDx?</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. The "x" in TEDx stands for independently organized TED event — communities, universities and organizations around the world are licensed to run their own events.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              TEDx events are designed to spark deep discussion and connection in a small group setting. Each event combines live speakers and TEDTalks to strike a balance between local and global perspectives.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT BMU */}
      <section ref={bmuRef} className="relative py-24 px-8">
        <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start transition-all duration-1000 ${bmuVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col gap-6">
            <SectionLabel text="Our Home" />
            <h2 className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight">
              <span className="text-white">BML MUNJAL </span>
              <span className="text-[#eb0028]">UNIVERSITY</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              BML Munjal University is a private university located in Sidhrawali, Gurugram, Haryana. Established by the Hero Group, BMU is committed to delivering world-class education that blends academic rigor with industry relevance.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              With state-of-the-art facilities, a vibrant campus culture, and a strong focus on innovation and entrepreneurship, BMU provides the perfect backdrop for an event like TEDxBMU — where curiosity is encouraged and ideas are celebrated.
            </p>
            <a href="https://www.bmu.edu.in" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#eb0028] text-xs tracking-wider uppercase font-semibold hover:gap-4 transition-all duration-300 w-fit">
              Visit bmu.edu.in
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Card + Map */}
          <div className="flex flex-col gap-4">

            {/* BMU Card */}
            <div className="relative">
              <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-8 flex flex-col gap-6 hover:border-[#eb0028]/30 hover:shadow-[0_0_60px_rgba(235,0,40,0.08)] transition-all duration-500">
                <p className="text-white/60 text-xs tracking-widest uppercase">BML Munjal University</p>
                <div className="grid grid-cols-2 gap-6">
                  {[["2014", "Established"], ["Gurugram", "Location"], ["Hero Group", "Founded By"], ["5000+", "Students"]].map(([num, label]) => (
                    <div key={label} className="flex flex-col gap-1 border-l-2 border-[#eb0028]/20 pl-4">
                      <span className="text-xl font-black text-white">{num}</span>
                      <span className="text-white/30 text-xs tracking-wide">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <CardCorners />
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.6744562543!2d76.63720731455!3d28.356589982536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3dce4de14e0b%3A0xb1787ccb5563c223!2sBML%20Munjal%20University!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(100%) hue-rotate(180deg) saturate(3) brightness(0.7) contrast(1.2)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}