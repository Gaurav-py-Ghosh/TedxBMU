"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import ChromaGrid from "@/components/ui/ChromaGrid";

const events = {
  2025: {
    theme: "Bubbles",
    description:
      "TEDxBMU 2025 brought together curious minds to challenge assumptions, question the obvious, and explore ideas that push beyond conventional thinking.",
    speakers: [
      { name: "Roji Bala", title: "Development Professional", topic: "Sustainable Community Development", bio: "With over 23 years in the social sector, Roji focuses on uplifting vulnerable populations and driving long-term change.", youtube: "https://www.youtube.com/watch?v=OKqAxqrBiEQ", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533118/roji-bala_tfg4vq.jpg", linkedin: "" },
      { name: "Sahil Sachdeva", title: "PR Strategist & Founder", topic: "Why you should choose visibility over comfort", bio: "Sahil has worked with over 1000 clients to enhance credibility, sharing how to break the bubble of self-doubt.", youtube: "https://www.youtube.com/watch?v=x8yfzsVC5QY", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533118/sahil-sachdeva_zfmwcy.jpg", linkedin: "https://www.linkedin.com/in/sahil-sachdeva-/" },
      { name: "Richa Maheshwari", title: "Fashion Photographer", topic: "Breaking the Societal Bubble of Expectations", bio: "Richa shares deeply personal stories, challenging rigid definitions of success and societal checklists.", youtube: "https://www.youtube.com/watch?v=loADyAZt158", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533117/richa-maheshwari_wha7rp.jpg", linkedin: "https://www.linkedin.com/in/richamaheshwarifilmsandphotography/" },
      { name: "Sreedhar Bevara", title: "CEO & Bestselling Author", topic: "The Paradox of Experience", bio: "Sreedhar explores how both successes and failures can create bubbles that influence decision-making.", youtube: "https://www.youtube.com/watch?v=yuMcxRymoz0", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533117/sreedhar-bevara_ybv9yj.jpg", linkedin: "https://www.linkedin.com/in/sreedhar-bevara-7b51637/" },
      { name: "Kiran Verma", title: "Social Activist", topic: "Beyond the Comfort Bubble", bio: "Kiran walked over 21,000 km across India to raise awareness about blood donation and combat shortages.", youtube: "https://www.youtube.com/watch?v=eXwKBZL7yTI", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533117/kiran-verma_l9cuvf.jpg", linkedin: "https://www.linkedin.com/in/kiranverma/" },
    ],
  },
  2024: {
    theme: "Roots",
    description:
      "TEDxBMU 2024 explored how small actions create massive change — stories of individuals whose ideas sent ripples across communities and industries.",
    speakers: [
      { name: "Veda Hrudya Nadendla", title: "Brand Strategist", topic: "Using First Principles Thinking", bio: "Veda applies Aristotle's concept of first principles to foster innovation and modern problem-solving strategies.", youtube: "https://www.youtube.com/watch?v=Zlmsqd-XFIY", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/veda-hrudya_v8cfke.jpg", linkedin: "https://www.linkedin.com/in/veda-hrudya-nadendla-72aa9890/" },
      { name: "Gaurav Mehta", title: "Chief Marketing Officer, Noise", topic: "Value of Roots: Connecting dots backwards", bio: "Gaurav balances innovation and scalability, discussing how family inheritance and positive focus laid his foundation.", youtube: "https://www.youtube.com/watch?v=aIBTNtXyaI8", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/gaurav-mehta_ippr4q.jpg", linkedin: "https://www.linkedin.com/in/gaurav-mehta-7a85234/" },
      { name: "Shariq Patel", title: "Ex-CBO, Zee Studios", topic: "The Strength of Roots", bio: "Shariq brings 30 years of cross-industry experience to highlight the significance of understanding one's origins.", youtube: "https://www.youtube.com/watch?v=eWsoL1XAFTE", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/shariq-patel_zfugvr.jpg", linkedin: "https://www.linkedin.com/in/shariq-patel-82a3654/" },
      { name: "Sanghamitra Bose", title: "Founder, Shrishti Trust", topic: "Roots: Embracing Heritage and Progress", bio: "Sanghamitra symbolizes India's rich history as an ancient banyan tree, balancing modern technology with cultural legacy.", youtube: "https://www.youtube.com/watch?v=MARv8K_LcFI", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/sanghamitra-bose_yakyey.jpg", linkedin: "https://www.linkedin.com/in/sanghamitra-bose-96b161191/" },
      { name: "Deepak Gupta", title: "Co-Founder & COO, Bombay Shaving Co.", topic: "Tree of Life: Purpose and Flow", bio: "Deepak reflects on his global corporate experiences and discusses scaling an emerging brand.", youtube: "https://www.youtube.com/watch?v=NyTSQC86lmo", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/deepak-gupta_aitdzf.jpg", linkedin: "https://www.linkedin.com/in/deepakgupta84/" },
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
  const activeIndexRef = useRef(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return; // Disable scroll-based navigation on mobile
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;
      
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const index = Math.min(Math.floor(progress * speakers.length), speakers.length - 1);
      
      if (index !== activeIndexRef.current) {
        activeIndexRef.current = index;
        setActiveIndex(index);
        setPlaying(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speakers.length, isMobile]);

  return (
    <>
      {/* Label */}
     {/* Label */}
<div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-4 mb-4 md:mb-6">
  <div className="h-px w-8 bg-[#e62b1e]" />

  <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light">
    Watch the Talks
  </span>

  <div className="flex-1 h-px bg-white/5" />

  {/* ✅ Clickable YouTube Icon */}
  <a
    href="https://www.youtube.com/@TEDx"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform duration-200"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#e62b1e">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  </a>
</div>

      {/* Sticky scroll section */}
      <div ref={sectionRef} style={{ height: isMobile ? `${speakers.length * 85}vh` : `${speakers.length * 100}vh` }}>
        <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center gap-3 md:gap-6 bg-black pb-8 md:pb-10">

          {/* Progress dots & counter */}
          <div className="flex flex-col items-center gap-3">
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
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-medium">
              Speaker <span className="text-[#e62b1e]">{activeIndex + 1}</span> of {speakers.length}
            </p>
          </div>

          {/* Stacked cards */}
          <div className="relative w-full max-w-4xl mx-auto" style={{ height: "auto", minHeight: "500px", padding: isMobile ? "0 1rem" : "0 1.5rem" }}>
            <div className="lg:hidden h-[450px]" /> {/* Spacer for absolute cards on mobile */}
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
                  className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col lg:grid lg:grid-cols-2 cursor-pointer group/card"
                  onClick={() => isActive && !playing && setPlaying(true)}
                  style={{
                    background: "linear-gradient(135deg, #0d0000 0%, #111 100%)",
                    border: isActive ? "1.5px solid rgba(230,43,30,0.5)" : "1.5px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive ? "0 0 50px rgba(230,43,30,0.2)" : "none",
                    zIndex: isActive ? 10 : isPast ? 0 : speakers.length - i,
                    opacity: isPast ? 0 : isActive ? 1 : Math.max(0.3, 1 - offset * 0.2),
                    transform: isActive
                      ? "translateY(0) scale(1)"
                      : isFuture
                        ? `translateY(${offset * 12}px) scale(${1 - offset * 0.03})`
                        : "translateY(-60px) scale(0.9) rotate(-2deg)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    pointerEvents: isActive ? "all" : "none",
                  }}
                >
                  {/* TOP/LEFT — YouTube */}
                  <div 
                    className="relative cursor-pointer group h-48 sm:h-64 lg:h-full overflow-hidden"
                    onMouseEnter={() => !isMobile && setPlaying(true)}
                    onClick={() => {
                      if (isActive && !playing) {
                        setPlaying(true);
                      }
                    }}
                    style={isMobile ? { margin: "0 -1rem", marginBottom: "0.5rem" } : {}}>
                    {/* Mobile navigation buttons */}
                    {isMobile && isActive && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeIndex > 0) {
                              activeIndexRef.current = activeIndex - 1;
                              setActiveIndex(activeIndex - 1);
                              setPlaying(false);
                            }
                          }}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 hover:scale-110 transition-transform"
                          aria-label="Previous video"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#e62b1e]">
                            <path d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeIndex < speakers.length - 1) {
                              activeIndexRef.current = activeIndex + 1;
                              setActiveIndex(activeIndex + 1);
                              setPlaying(false);
                            }
                          }}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 hover:scale-110 transition-transform"
                          aria-label="Next video"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#e62b1e]">
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                    
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
                        <Image src={thumb} alt={s.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#e62b1e] flex items-center justify-center shadow-[0_0_30px_rgba(230,43,30,0.7)] group-hover:scale-110 transition-transform duration-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                        {isActive && activeIndex === 0 && (
                          isMobile ? (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-widest uppercase animate-bounce">
                              use buttons
                            </div>
                          ) : (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-widest uppercase animate-bounce">
                              scroll for next
                            </div>
                          )
                        )}
                      </>
                    )}
                  </div>

                  {/* BOTTOM/RIGHT — Info */}
                  <div className="flex flex-col justify-center gap-2 md:gap-4 p-4 sm:p-5 md:p-6 pb-6 md:pb-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5 md:gap-1">
                        <h3 className="text-white font-black text-base sm:text-lg md:text-xl leading-tight">{s.name}</h3>
                        <p className="text-[#e62b1e] text-[9px] sm:text-[10px] md:text-xs font-medium">{s.title}</p>
                      </div>
                    </div>
                    <div className="h-px w-6 sm:w-8 md:w-10 bg-[#e62b1e]/40" />
                    <p className="text-white/60 text-[11px] sm:text-xs md:text-sm italic">&quot;{s.topic}&quot;</p>
                    <p className="text-white/30 text-[9px] sm:text-[10px] md:text-xs leading-relaxed line-clamp-3 md:line-clamp-4">{s.bio}</p>
                    <div className="mt-auto pt-2 hidden sm:block">
                      <span className="text-white/10 text-4xl md:text-5xl font-black leading-none select-none">
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
    url: speaker.linkedin || null,
  }));

  return (
    <div ref={ref} className="flex flex-col gap-14">
      <div className={`relative transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div
          className="absolute -top-4 md:-top-8 left-0 right-0 text-[6rem] md:text-[10rem] lg:text-[12rem] font-black leading-none select-none pointer-events-none text-center"
          style={{ color: "rgba(230,43,30,0.04)" }}
        >
          {year}
        </div>
        <div className="relative flex flex-col items-center gap-4 md:gap-6 pb-10 border-b border-white/5 text-center px-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 md:w-8 bg-[#e62b1e]" />
            <span className="text-[#e62b1e] text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">TEDxBMU {year}</span>
            <div className="h-px w-6 md:w-8 bg-[#e62b1e]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading uppercase leading-none tracking-tight">
            <span className="text-white">{data.theme.split(" ").slice(0, -1).join(" ")} </span>
            <span className="text-[#e62b1e]">{data.theme.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-white/30 text-xs md:text-sm leading-relaxed max-w-xl">{data.description}</p>
        </div>
      </div>

      {/* ChromaGrid for speakers */}
      <ChromaGrid
        items={chromaItems}
        columns={5}
        rows={1}
        radius={350}
        damping={0.45}
        fadeOut={0.6}
      />
    </div>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 md:pt-28 pb-24 relative">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-64 bg-[#e62b1e]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-48 md:w-64 h-96 bg-[#e62b1e]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-20 md:mb-28">
        <div className="flex flex-col gap-3">
          <span className="text-[#e62b1e] text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">Past Events</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-heading leading-none tracking-tight uppercase">
            <span className="text-white">OUR </span>
            <span className="text-[#e62b1e]">EVENTS</span>
          </h1>
          <p className="text-white/30 text-xs md:text-sm leading-relaxed max-w-lg mt-1 ">
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
      <div className="max-w-7xl mx-auto px-8 my-28">
        <EventSection year={2024} data={events[2024]} />
      </div>

      {/* 2024 Talks sticky scroll */}
      <TalksSection speakers={events[2024].speakers} />

      <div className="pb-24" />

    </main>
  );
}