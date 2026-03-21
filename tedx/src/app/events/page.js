"use client";

import { useRef, useEffect, useState } from "react";
import ChromaGrid from "@/components/ui/ChromaGrid";

const events = {
  2025: {
    theme: "Beyond What We Think",
    description:
      "TEDxBMU 2025 brought together curious minds to challenge assumptions, question the obvious, and explore ideas that push beyond conventional thinking.",
    speakers: [
      { name: "Arjun Mehta", title: "Entrepreneur & Innovator", topic: "The Art of Unlearning", bio: "Arjun built three startups before the age of 30, each failure teaching him more than any classroom could.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Priya Nair", title: "Neuroscientist, AIIMS Delhi", topic: "Your Brain is Lying to You", bio: "Priya's groundbreaking research on cognitive bias has changed how we understand decision-making.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Rohan Kapoor", title: "Climate Activist", topic: "Beyond Carbon: The Real Crisis", bio: "Rohan has spent a decade on the frontlines of environmental policy bridging science and storytelling.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Sneha Iyer", title: "AI Researcher, IIT Bombay", topic: "When Machines Dream", bio: "Sneha works at the intersection of artificial intelligence and human creativity.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Vikram Das", title: "Poet & Spoken Word Artist", topic: "Language as Liberation", bio: "Vikram uses words as weapons against silence. His performances have reached millions online.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Ananya Sharma", title: "Social Entrepreneur", topic: "Building From the Margins", bio: "Ananya's organization has impacted over 50,000 lives in rural India.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
    ],
  },
  2024: {
    theme: "The Ripple Effect",
    description:
      "TEDxBMU 2024 explored how small actions create massive change — stories of individuals whose ideas sent ripples across communities and industries.",
    speakers: [
      { name: "Rahul Verma", title: "Astrophysicist", topic: "We Are All Stardust", bio: "Rahul makes the cosmos accessible, reminding us that the universe lives inside each of us.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Meera Pillai", title: "Human Rights Lawyer", topic: "Justice Has No Deadline", bio: "Meera has fought over 200 pro-bono cases, proving that the law can be a tool for the powerless.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Dev Sharma", title: "Behavioral Economist", topic: "The Price of Choice", bio: "Dev's research unpacks why we make irrational decisions and how design can nudge us toward better ones.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Kavya Reddy", title: "Urban Designer", topic: "Cities Are Feelings", bio: "Kavya designs cities that put human emotion at the center of every square foot of public space.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Nikhil Bose", title: "Biologist & Author", topic: "Life at the Margins", bio: "Nikhil studies extremophiles — organisms that thrive where nothing should — and what they teach us about resilience.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
      { name: "Tara Singh", title: "Documentary Filmmaker", topic: "Whose Story Gets Told", bio: "Tara's films have screened at Sundance and Cannes, always centering voices that mainstream media ignores.", youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", image: null },
    ],
  },
};

function getYouTubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
}


function TalksSection({ speakers }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const index = Math.min(Math.floor(progress * speakers.length), speakers.length - 1);
      if (index !== activeIndex) {
        setActiveIndex(index);
        setPlaying(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex, speakers.length]);

  return (
    <>
      {/* Label */}
      <div className="max-w-7xl mx-auto px-8 flex items-center gap-4 mb-4">
        <div className="h-px w-8 bg-[#e62b1e]" />
        <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light">Watch the Talks</span>
        <div className="flex-1 h-px bg-white/5" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#e62b1e">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>

      {/* Sticky scroll section */}
      <div ref={sectionRef} style={{ height: `${speakers.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-6 bg-black">

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {speakers.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "20px" : "6px",
                  height: "6px",
                  background: i === activeIndex ? "#e62b1e" : i < activeIndex ? "rgba(230,43,30,0.4)" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Stacked cards */}
          <div className="relative w-full max-w-4xl mx-auto px-8" style={{ height: "360px" }}>
            {speakers.map((s, i) => {
              const vid = getYouTubeId(s.youtube);
              const thumb = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              const isFuture = i > activeIndex;
              const offset = i - activeIndex;

              return (
                <div
                  key={i}
                  className="absolute inset-0 rounded-2xl overflow-hidden grid grid-cols-2"
                  style={{
                    background: "linear-gradient(135deg, #0d0000 0%, #111 100%)",
                    border: isActive ? "1.5px solid rgba(230,43,30,0.5)" : "1.5px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive ? "0 0 50px rgba(230,43,30,0.2)" : "none",
                    zIndex: isActive ? 10 : isPast ? 0 : speakers.length - i,
                    opacity: isPast ? 0 : isActive ? 1 : Math.max(0.3, 1 - offset * 0.2),
                    transform: isActive
                      ? "translateY(0) scale(1)"
                      : isFuture
                      ? `translateY(${offset * 16}px) scale(${1 - offset * 0.04})`
                      : "translateY(-30px) scale(0.95)",
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    pointerEvents: isActive ? "all" : "none",
                  }}
                >
                  {/* LEFT — YouTube */}
                  <div className="relative cursor-pointer group h-full" onClick={() => setPlaying(true)}>
                    {isActive && playing ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`}
                        title={s.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <>
                        <img src={thumb} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={e => { e.target.style.display = "none"; }} />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#e62b1e] flex items-center justify-center shadow-[0_0_30px_rgba(230,43,30,0.7)] group-hover:scale-110 transition-transform duration-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                        {isActive && activeIndex === 0 && (
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-widest uppercase animate-bounce">
                            scroll for next
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* RIGHT — Info */}
                  <div className="flex flex-col justify-center gap-4 p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-white font-black text-xl leading-tight">{s.name}</h3>
                        <p className="text-[#e62b1e] text-xs font-medium">{s.title}</p>
                      </div>
                      <a href={s.youtube} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex-shrink-0 w-9 h-9 bg-white/5 border border-white/10 hover:bg-[#e62b1e] hover:border-[#e62b1e] rounded-xl flex items-center justify-center transition-all duration-300">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    </div>
                    <div className="h-px w-10 bg-[#e62b1e]/40" />
                    <p className="text-white/60 text-sm italic">"{s.topic}"</p>
                    <p className="text-white/30 text-xs leading-relaxed line-clamp-4">{s.bio}</p>
                    <div className="mt-auto pt-2">
                      <span className="text-white/10 text-5xl font-black leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}

function EventSection({ year, data }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const chromaItems = data.speakers.map((speaker) => ({
    image: speaker.image || null,
    title: speaker.name,
    subtitle: speaker.title,
    borderColor: "#e62b1e",
    gradient: "linear-gradient(145deg, #e62b1e22, #000)",
    url: speaker.youtube,
  }));

  return (
    <div ref={ref} className="flex flex-col gap-14">
      <div className={`relative transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-[12rem] font-black leading-none select-none pointer-events-none w-full text-center"
          style={{ color: "rgba(230,43,30,0.04)" }}
        >
          {year}
        </div>
        <div className="relative flex flex-col items-center gap-6 pb-10 border-b border-white/5 text-center">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#e62b1e]" />
            <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light">TEDxBMU {year}</span>
            <div className="h-px w-8 bg-[#e62b1e]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight">
            <span className="text-white">{data.theme.split(" ").slice(0, -1).join(" ")} </span>
            <span className="text-[#e62b1e]">{data.theme.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-white/30 text-sm leading-relaxed max-w-xl">{data.description}</p>
        </div>
      </div>

      {/* ChromaGrid for speakers */}
      <ChromaGrid
        items={chromaItems}
        columns={3}
        rows={2}
        radius={350}
        damping={0.45}
        fadeOut={0.6}
      />
    </div>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 relative">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#e62b1e]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-96 bg-[#e62b1e]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-8 mb-28">
        <div className="flex flex-col gap-3">
          <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light">Past Events</span>
          <h1 className="text-7xl lg:text-7xl font-black leading-none tracking-tight uppercase">
            <span className="text-white">OUR </span>
            <span className="text-[#e62b1e]">EVENTS</span>
          </h1>
          <p className="text-white/30 text-sm leading-relaxed max-w-lg mt-1 ">
            Every year, TEDxBMU brings together voices that challenge, inspire and ignite conversations that matter.
          </p>
        </div>
      </div>

      {/* 2025 speakers */}
      <div className="max-w-7xl mx-auto px-8 mb-28">
        <EventSection year={2025} data={events[2025]} />
      </div>

      {/* 2025 Talks sticky scroll */}
      <TalksSection speakers={events[2025].speakers} />

    

      {/* 2024 speakers */}
      <div className="max-w-7xl mx-auto px-8 mb-28">
        <EventSection year={2024} data={events[2024]} />
      </div>

      {/* 2024 Talks sticky scroll */}
      <TalksSection speakers={events[2024].speakers} />

      <div className="pb-24" />

    </main>
  );
}