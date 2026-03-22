"use client";

import { useRef, useEffect, useState } from "react";

const speakers = [
  {
    id: 1,
    name: "Arjun Mehta",
    title: "Entrepreneur & Innovator",
    topic: "The Art of Unlearning",
    bio: "Arjun built three startups before the age of 30, each failure teaching him more than any classroom could. He believes the future belongs to those willing to discard what they think they know.",
    number: "01",
  },
  {
    id: 2,
    name: "Priya Nair",
    title: "Neuroscientist, AIIMS Delhi",
    topic: "Your Brain is Lying to You",
    bio: "Priya's groundbreaking research on cognitive bias has changed how we understand decision-making. She argues that the first step to thinking clearly is admitting we never do.",
    number: "02",
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    title: "Climate Activist",
    topic: "Beyond Carbon: The Real Crisis",
    bio: "Rohan has spent a decade on the frontlines of environmental policy. His work bridges science and storytelling to move people from awareness to action.",
    number: "03",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    title: "AI Researcher, IIT Bombay",
    topic: "When Machines Dream",
    bio: "Sneha works at the intersection of artificial intelligence and human creativity. She challenges us to ask not what AI can do for us, but what it reveals about us.",
    number: "04",
  },
  {
    id: 5,
    name: "Vikram Das",
    title: "Poet & Spoken Word Artist",
    topic: "Language as Liberation",
    bio: "Vikram uses words as weapons against silence. His performances have reached millions online, proving that poetry is not dead — it just moved to where the people are.",
    number: "05",
  },
  {
    id: 6,
    name: "Ananya Sharma",
    title: "Social Entrepreneur",
    topic: "Building From the Margins",
    bio: "Ananya's organization has impacted over 50,000 lives in rural India. She believes the most powerful ideas don't come from boardrooms — they come from the ground up.",
    number: "06",
  },
];

export default function SpeakerSection() {
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollableDistance = sectionHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const index = Math.min(Math.floor(progress * speakers.length), speakers.length - 1);
      setActiveSpeaker(index);
      setVisible(rect.top < windowHeight && rect.bottom > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const speaker = speakers[activeSpeaker];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${speakers.length * 100}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex flex-col overflow-hidden"
      >

        {/* Background number */}
        <div className="absolute inset-0 flex items-center justify-end pr-16 pointer-events-none select-none z-0">
          <span
            key={speaker.number}
            className="text-[25vw] font-black text-white/[0.03] leading-none"
            style={{ animation: "fadeIn 0.6s ease" }}
          >
            {speaker.number}
          </span>
        </div>

        {/* Red glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#e62b1e]/10 blur-[120px] rounded-full" />
        </div>

        {/* Red decorative elements */}
        <div className="absolute top-8 left-8 pointer-events-none z-0">
          <div className="w-12 h-12 border-t-2 border-l-2 border-[#e62b1e]/30" />
        </div>
        <div className="absolute bottom-8 right-8 pointer-events-none z-0">
          <div className="w-12 h-12 border-b-2 border-r-2 border-[#e62b1e]/30" />
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-gradient-to-b from-transparent via-[#e62b1e]/40 to-transparent pointer-events-none z-0" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-gradient-to-b from-transparent via-[#e62b1e]/40 to-transparent pointer-events-none z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#e62b1e]/40 to-transparent pointer-events-none z-0" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#e62b1e]/40 to-transparent pointer-events-none z-0" />
        <div className="absolute top-16 right-32 w-64 h-64 bg-[#e62b1e]/5 blur-[80px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-16 left-32 w-48 h-48 bg-[#e62b1e]/5 blur-[60px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-0 right-32 w-[1px] h-32 bg-gradient-to-b from-[#e62b1e]/40 to-transparent pointer-events-none z-0" style={{ transform: "rotate(30deg)", transformOrigin: "top" }} />
        <div className="absolute bottom-0 left-32 w-[1px] h-32 bg-gradient-to-t from-[#e62b1e]/40 to-transparent pointer-events-none z-0" style={{ transform: "rotate(30deg)", transformOrigin: "bottom" }} />

       {/* HEADER */}
<div className={`relative z-10 max-w-7xl px-16 pt-16 w-full flex flex-row items-end justify-between transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
  <h2 className="text-6xl lg:text-7xl font-black leading-none tracking-tight uppercase">
    <span className="text-white">OUR</span>{" "}
    <span className="text-[#e62b1e]">SPEAK</span>
    <span className="text-white">ERS</span>
  </h2>
  <p className="text-white/30 text-xs leading-relaxed max-w-xs mb-1">
    Scroll to meet the voices that will challenge, inspire and push you beyond what you think.
  </p>
</div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1 py-4 ">

          {/* LEFT — Speaker info */}
          <div
            key={speaker.id}
            style={{ animation: "fadeSlideIn 0.7s ease forwards" }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#e62b1e]" />
              <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light">
                Speakers · {speaker.number} of 0{speakers.length}
              </span>
            </div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white">
              "{speaker.topic}"
            </h2>
            <div className="flex flex-col gap-0.5">
              <p className="text-xl font-semibold text-white">{speaker.name}</p>
              <p className="text-white/40 text-sm tracking-wide">{speaker.title}</p>
            </div>
            <div className="h-px w-16 bg-[#e62b1e]/40" />
            <p className="text-white/50 text-sm leading-relaxed max-w-md font-light">
              {speaker.bio}
            </p>
            <div className="flex items-center gap-2">
              {speakers.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === activeSpeaker ? "24px" : "6px",
                    height: "6px",
                    background: i === activeSpeaker ? "#e62b1e" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Speaker image */}
          <div
            key={`img-${speaker.id}`}
            style={{ animation: "fadeSlideInRight 0.7s ease forwards" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-[#e62b1e]/20 shadow-[0_0_60px_rgba(230,43,30,0.15)]">
              <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#e62b1e]/20 border border-[#e62b1e]/30 flex items-center justify-center">
                  <span className="text-[#e62b1e] text-lg font-black">
                    {speaker.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <span className="text-white/20 text-xs tracking-widest uppercase">Photo Coming Soon</span>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e62b1e]" />
                <div className="absolute bottom-0 left-0 w-[2px] h-full bg-[#e62b1e]" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#e62b1e] px-6 py-2 rounded-full whitespace-nowrap">
              <span className="text-white text-xs font-semibold tracking-wider">{speaker.name}</span>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        {activeSpeaker === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-xs tracking-widest uppercase animate-bounce z-10">
            <span>Scroll to explore</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}