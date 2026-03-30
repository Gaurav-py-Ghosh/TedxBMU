"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import ChromaGrid from "@/components/ui/ChromaGrid";

const events = {
  2025: {
    theme: "Bubbles",
    description:
      "TEDxBMU 2025 brought together curious minds to challenge assumptions, question the obvious, and explore ideas that push beyond conventional thinking.",
    speakers: [
      { name: "Roji Bala", title: "Development Professional", topic: "Sustainable Community Development", bio: "With over 23 years in the social sector, Roji focuses on uplifting vulnerable populations and driving long-term change.", youtube: "https://www.youtube.com/watch?v=OKqAxqrBiEQ", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531097/15_tvwqqj.jpg", linkedin: "" },
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
      { name: "Veda Hrudya Nadendla", title: "Brand Strategist", topic: "Using First Principles Thinking", bio: "Veda applies Aristotle's concept of first principles to foster innovation and modern problem-solving strategies.", youtube: "https://www.youtube.com/watch?v=Zlmsqd-XFIY", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774875110/veda_kanf7c.jpg", linkedin: "https://www.linkedin.com/in/veda-hrudya-nadendla-72aa9890/" },
      { name: "Gaurav Mehta", title: "Chief Marketing Officer, Noise", topic: "Value of Roots: Connecting dots backwards", bio: "Gaurav balances innovation and scalability, discussing how family inheritance and positive focus laid his foundation.", youtube: "https://www.youtube.com/watch?v=aIBTNtXyaI8", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/gaurav-mehta_ippr4q.jpg", linkedin: "https://www.linkedin.com/in/gaurav-mehta-7a85234/" },
      { name: "Shariq Patel", title: "Ex-CBO, Zee Studios", topic: "The Strength of Roots", bio: "Shariq brings 30 years of cross-industry experience to highlight the significance of understanding one's origins.", youtube: "https://www.youtube.com/watch?v=eWsoL1XAFTE", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/shariq-patel_zfugvr.jpg", linkedin: "https://www.linkedin.com/in/shariq-patel-82a3654/" },
      { name: "Sanghamitra Bose", title: "Founder, Shrishti Trust", topic: "Roots: Embracing Heritage and Progress", bio: "Sanghamitra symbolizes India's rich history as an ancient banyan tree, balancing modern technology with cultural legacy.", youtube: "https://www.youtube.com/watch?v=MARv8K_LcFI", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/sanghamitra-bose_yakyey.jpg", linkedin: "https://www.linkedin.com/in/sanghamitra-bose-96b161191/" },
      { name: "Deepak Gupta", title: "Co-Founder & COO, Bombay Shaving Co.", topic: "Tree of Life: Purpose and Flow", bio: "Deepak reflects on his global corporate experiences and discusses scaling an emerging brand.", youtube: "https://www.youtube.com/watch?v=NyTSQC86lmo", image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774533107/deepak-gupta_aitdzf.jpg", linkedin: "https://www.linkedin.com/in/deepakgupta84/" },
    ],
  },
};

function getYouTubeId(url) {
  const match = url?.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
}

function VideoShowcase({ speakers }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef(null);
  const timerRef = useRef(null);
  const isMounted = useRef(false);

  const videos = useMemo(() => {
    return speakers
      .map((s, idx) => {
        const id = getYouTubeId(s.youtube);
        return {
          key: `${s.name}-${idx}`,
          id,
          title: s.topic || s.title || "Talk",
          speaker: s.name,
          category: s.title || "Talk",
          duration: s.duration || "",
          description: s.bio || "",
          thumb: id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : undefined,
        };
      })
      .filter((v) => v.id);
  }, [speakers]);

  const total = videos.length;

  const goTo = useCallback(
    (next) => {
      if (total === 0) return;
      setActiveIndex((prev) => ((next % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    isMounted.current = true;
    const handleReze = () => setIsMobile(window.innerWidth < 900);
    handleReze();
    window.addEventListener("resize", handleReze);
    return () => {
      isMounted.current = false;
      clearInterval(timerRef.current);
      window.removeEventListener("resize", handleReze);
    };
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (paused || total === 0) return;
    timerRef.current = setInterval(() => {
      if (!isMounted.current) return;
      setActiveIndex((prev) => ((prev + 1) % total + total) % total);
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Scroll hijacking removed as per user request
  useEffect(() => {
    // Scroll change feature is disabled
  }, []);

  const stateFor = useCallback(
    (cardIndex) => {
      if (total === 0) return "hidden";
      const diff = (cardIndex - activeIndex + total) % total;
      
      // ✅ YAHAN CHANGE KIYA HAI: Ab sirf 'active' aur ek 'next' card dikhega
      if (diff === 0) return "active";
      if (diff === 1) return "next";
      
      return "hidden";
    },
    [activeIndex, total]
  );

  if (total === 0) return null;

  const current = videos[activeIndex];

  return (
    <div className="showcase" id="showcase">
      <div className="ambient-bg">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>
      <div className="grain" />

      <div className="info-panel">
        <div className="section-label">Now Showing</div>
        <div className="talk-counter">{String(activeIndex + 1).padStart(2, "0")}</div>
        <h2 className="talk-title">{current.title}</h2>
        <p className="talk-speaker">Speaker — <strong>{current.speaker}</strong></p>
        <div className="talk-category">{current.category}</div>
        <p className="talk-description">{current.description}</p>

        <div className="nav-controls desktop-only">
          <button className="nav-btn" onClick={prev}>
            <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>
          </button>
          <div className="progress-dots">
            {videos.map((_, i) => (
              <button key={i} className={`dot ${i === activeIndex ? "active" : ""}`} onClick={() => goTo(i)}>
                {i === activeIndex && <span className="dot-fill" style={{ animationDuration: "2s" }} />}
              </button>
            ))}
          </div>
          <button className="nav-btn" onClick={next}>
            <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>
      </div>

      <div className="card-stage">
        {!isMobile ? (
          <div className="card-stack" ref={stageRef}>
            {videos.map((video, i) => {
              const state = stateFor(i);
              const isActive = state === "active";
              return (
                <article key={video.key} className="video-card" data-state={state}>
                  <div className="card-inner">
                    <div className="card-thumb" 
                      style={{ 
                        backgroundImage: `url(${video.thumb})`,
                        opacity: isActive && isHovering ? 0 : 1,
                        transition: 'opacity 0.5s ease',
                        zIndex: 5,
                        pointerEvents: isActive && isHovering ? 'none' : 'auto'
                      }} 
                    />
                    <div className="card-iframe-wrap" style={{ zIndex: isActive ? 10 : 1 }}>
                      {isActive && (
                        <iframe
                          key={video.id}
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=0&controls=1&rel=0`}
                          title={video.title}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          style={{ opacity: isHovering ? 1 : 0 }}
                        />
                      )}
                    </div>
                    <div className="card-info">
                      <div>
                        <div className="card-label">{video.category}</div>
                        <div className="card-title-sm">{video.title}</div>
                      </div>
                      <div className="card-duration">{video.duration}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mobile-showcase-wrap">
            <div
              className="mobile-video-box"
            >
              <iframe
                key={current.id}
                src={`https://www.youtube.com/embed/${current.id}?autoplay=0&controls=1&rel=0`}
                title={current.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="mobile-nav-info">
              <div className="mob-counter text-[#e62b1e] font-bold tracking-widest text-sm">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; }
        .showcase {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ambient-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .ambient-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.12; animation: drift 18s ease-in-out infinite alternate; }
        .orb-1 { width: 600px; height: 600px; background: #e62b1e; top: -200px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; background: #ff6b35; bottom: -150px; right: -80px; animation-delay: -9s; }
        .orb-3 { width: 300px; height: 300px; background: #a0a0a0; top: 40%; left: 60%; opacity: 0.05; animation-delay: -4s; }
        @keyframes drift { from { transform: translate(0,0) scale(1);} to { transform: translate(40px,30px) scale(1.1);} }
        .grain { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); background-size: 180px 180px; }
        .info-panel { grid-column: 1; display: flex; flex-direction: column; justify-content: center; padding-right: 60px; }
        .section-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #e62b1e; font-weight: 600; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
        .section-label::after { content: ""; height: 1px; width: 40px; background: #e62b1e; opacity: 0.5; }
        .talk-counter { font-size: 90px; color: rgba(245,245,245,0.2); letter-spacing: -0.02em; margin-bottom: -10px; }
        .talk-title { font-size: clamp(32px, 4vw, 52px); line-height: 1.05; color: #fff; margin-bottom: 16px; }
        .talk-speaker { font-size: 14px; color: rgba(245,245,245,0.65); margin-bottom: 8px; }
        .talk-category { display: inline-flex; font-size: 11px; color: #e62b1e; border: 1px solid rgba(230,43,30,0.18); padding: 4px 10px; border-radius: 3px; background: rgba(230,43,30,0.05); margin-bottom: 32px; text-transform: uppercase; }
        .talk-description { font-size: 14px; line-height: 1.75; color: rgba(245,245,245,0.55); max-width: 360px; margin-bottom: 32px; }
        .nav-controls { display: flex; align-items: center; gap: 16px; }
        .nav-btn { 
          width: 44px; 
          height: 44px; 
          background: rgba(230, 43, 30, 0.1); 
          border: 1px solid rgba(230, 43, 30, 0.3); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          color: #e62b1e; 
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          background: #e62b1e;
          color: #fff;
          border-color: #e62b1e;
          box-shadow: 0 0 15px rgba(230, 43, 30, 0.5);
          transform: scale(1.1);
        }
        .nav-btn svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          stroke-width: 3px;
        }
        .progress-dots { display: flex; align-items: center; gap: 8px; flex: 1; }
        .dot { position: relative; height: 2px; background: rgba(255,255,255,0.08); border-radius: 1px; cursor: pointer; flex: 1; border: none; padding: 0; overflow: hidden; }
        .dot-fill { position: absolute; inset: 0; background: #e62b1e; transform-origin: left; transform: scaleX(0); animation: fill-progress 2s linear forwards; }
        @keyframes fill-progress { from { transform: scaleX(0);} to { transform: scaleX(1);} }
        .card-stage { grid-column: 2; display: flex; align-items: center; justify-content: center; perspective: 1200px; min-height: 600px; position: relative; }
        .card-stack { position: relative; width: min(520px, 90vw); height: min(310px, 54vw); }
        .video-card { position: absolute; inset: 0; border-radius: 16px; overflow: hidden; transition: transform 0.85s cubic-bezier(0.16,1,0.3,1), opacity 0.85s; }
        
        .mobile-controls { display: none; }

        /* ✅ UPDATED STACK CSS */
        .video-card[data-state="active"] { 
          transform: translateY(0) scale(1) rotateX(0deg); 
          z-index: 10; 
          opacity: 1;
          box-shadow: 0 30px 80px rgba(0,0,0,0.7); 
        }
        .video-card[data-state="next"] { 
          transform: translateY(68%) scale(0.9) rotateX(4deg); 
          z-index: 9; 
          opacity: 0.65; 
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }
        .video-card[data-state="hidden"] { 
          transform: translateY(110%) scale(0.8) rotateX(7deg);
          opacity: 0; 
          z-index: 8;
          pointer-events: none;
        }

        .card-inner { position: relative; width: 100%; height: 100%; background: #111; }
        .card-thumb { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .card-iframe-wrap { position: absolute; inset: 0; z-index: 1; }
        .card-iframe-wrap iframe { width: 100%; height: 100%; border: none; transition: opacity 0.5s ease; }
        .card-info { position: absolute; bottom: 0; left: 0; right: 0; z-index: 6; padding: 20px 24px; background: linear-gradient(transparent, rgba(0,0,0,0.88)); display: flex; align-items: flex-end; justify-content: space-between; pointer-events: none; }
        .card-label { font-size: 11px; color: #e62b1e; text-transform: uppercase; margin-bottom: 4px; }
        .card-title-sm { font-size: 18px; color: #fff; line-height: 1.1; max-width: 260px; }
        .card-duration { font-size: 11px; color: rgba(255,255,255,0.55); }

        @media (max-width: 900px) {
          .orb-1, .orb-2 { display: none !important; }
          .showcase { 
            display: flex;
            flex-direction: column;
            width: 100%; 
            max-width: 100%;
            padding: 0; 
            margin: 0;
            min-height: auto; 
            padding-bottom: 40px; 
            align-items: center;
          }
          .info-panel { 
            order: 2; 
            width: 100%;
            padding: 0 20px; 
            padding-top: 20px; 
            text-align: center;
            align-items: center;
            grid-column: auto;
          }
          .section-label { justify-content: center; width: 100%; margin-bottom: 12px; }
          .section-label::after { width: 30px; }
          
          .talk-title { font-size: 28px; margin-bottom: 12px; width: 100%; text-align: center; }
          .talk-description { margin: 0 auto 20px; font-size: 13px; opacity: 0.7; max-width: 100%; text-align: center; }
          .talk-speaker { width: 100%; text-align: center; }
          
          .card-stage { 
            order: 1; 
            padding: 0; 
            min-height: auto; 
            width: 100%; 
            grid-column: auto;
            display: flex;
            justify-content: center;
          }
          .desktop-only { display: none; }
          
          .mobile-showcase-wrap { 
            width: 100%; 
            display: flex; 
            flex-direction: column; 
            align-items: center;
            gap: 10px; 
            position: relative; 
          }
          .mobile-video-box { 
            width: 92%; 
            margin: 0 auto;
            aspect-ratio: 16/9; 
            border-radius: 12px; 
            overflow: hidden; 
            background: #000; 
            box-shadow: 0 10px 40px rgba(0,0,0,0.6); 
            position: relative;
          }
          .mobile-video-box iframe { width: 100%; height: 100%; border: none; border-radius: 12px; }
          
          .mobile-nav-overlay {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            pointer-events: none;
            z-index: 10;
            width: 100%;
          }
          
          .mob-nav-btn {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: rgba(230, 43, 30, 0.95);
            color: white;
            border: 1px solid rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            cursor: pointer;
            pointer-events: auto;
            transition: all 0.2s ease;
          }
          .mob-nav-btn:active { transform: scale(0.9); }
          .mob-nav-btn svg { width: 22px; height: 22px; }
          
          .mobile-nav-info { display: flex; justify-content: center; align-items: center; padding-top: 15px; }
          .mob-counter { font-family: var(--font-archivo), sans-serif; font-size: 13px; font-weight: 600; opacity: 1; }
          .mobile-swipe-hint { display: block; }
          
          .talk-counter { display: none; }
        }
      `}</style>
    </div>
  );
}

function EventSection({ year, data }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
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
        <div className="absolute -top-4 md:-top-8 left-0 right-0 text-[6rem] md:text-[10rem] lg:text-[12rem] font-black leading-none text-center" style={{ color: "rgba(230,43,30,0.04)" }}>{year}</div>
        <div className="relative flex flex-col items-center gap-4 md:gap-6 pb-10 border-b border-white/5 text-center px-4">
          <span className="text-[#e62b1e] text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">TEDxBMU {year}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase">
            <span className="text-white">{data.theme.split(" ").slice(0, -1).join(" ")} </span>
            <span className="text-[#e62b1e]">{data.theme.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-white/30 text-xs md:text-sm max-w-xl">{data.description}</p>
        </div>
      </div>
      <ChromaGrid items={chromaItems} columns={3} rows={2} radius={350} damping={0.45} fadeOut={0.6} />
    </div>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 md:pt-28 pb-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-20 md:mb-28">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight uppercase">
          <span className="text-white">OUR </span>
          <span className="text-[#e62b1e]">EVENTS</span>
        </h1>
        <p className="text-white/30 text-xs md:text-sm leading-relaxed max-w-lg mt-1 ">Every year, TEDxBMU brings together voices that challenge, inspire and ignite conversations that matter.</p>
      </div>

      <div className="max-w-7xl mx-auto px-8 mb-28">
        <EventSection year={2025} data={events[2025]} />
      </div>
      <VideoShowcase speakers={events[2025].speakers} />

      <div className="max-w-7xl mx-auto px-8 my-28">
        <EventSection year={2024} data={events[2024]} />
      </div>
      <VideoShowcase speakers={events[2024].speakers} />
      <div className="pb-24" />
    </main>
  );
}