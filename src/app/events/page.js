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
  const match = url?.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
}

function VideoShowcase({ speakers }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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
    (next, animate = true) => {
      if (total === 0) return;
      setActiveIndex((prev) => {
        const idx = ((typeof next === "number" ? next : prev) % total + total) % total;
        return idx;
      });
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (paused || total === 0) return;
    timerRef.current = setInterval(() => {
      if (!isMounted.current) return;
      setActiveIndex((prev) => ((prev + 1) % total + total) % total);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let wheelAccum = 0;
    const onWheel = (e) => {
      e.preventDefault();
      wheelAccum += e.deltaY;
      if (Math.abs(wheelAccum) > 60) {
        wheelAccum > 0 ? next() : prev();
        wheelAccum = 0;
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) {
        dy > 0 ? next() : prev();
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  const stateFor = useCallback(
    (cardIndex) => {
      if (total === 0) return "hidden";
      const diff = (cardIndex - activeIndex + total) % total;
      if (diff === 0) return "active";
      if (diff === 1) return "next-1";
      if (diff === 2) return "next-2";
      if (diff === total - 1) return "prev";
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

      <header className="showcase-header">
        <div className="logo-group">
          <div className="ted-badge">TED</div>
          <div className="logo-x">x</div>
          <div className="logo-event">BMU · Ideas Worth Spreading</div>
        </div>
        <div className="header-eyebrow">
          <div className="live-dot">Featured Talks</div>
        </div>
      </header>

      <div className="info-panel">
        <div className="section-label">Now Showing</div>
        <div className="talk-counter">{String(activeIndex + 1).padStart(2, "0")}</div>
        <h2 className="talk-title">{current.title}</h2>
        <p className="talk-speaker">
          Speaker — <strong>{current.speaker}</strong>
        </p>
        <div className="talk-category">{current.category}</div>
        <p className="talk-description">{current.description}</p>

        <div className="nav-controls">
          <button className="nav-btn" aria-label="Previous talk" onClick={prev}>
            <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>
          </button>

          <div className="progress-dots">
            {videos.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === activeIndex ? "active" : i < activeIndex ? "done" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to talk ${i + 1}`}
              >
                <span className="dot-fill" style={{ animationDuration: "5.5s" }} />
              </button>
            ))}
          </div>

          <button className="nav-btn" aria-label="Next talk" onClick={next}>
            <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>
      </div>

      <div
        className="card-stage"
        ref={stageRef}
        onMouseEnter={() => {
          setIsHovering(true);
          setPaused(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setPaused(false);
        }}
      >
        <div className="pause-indicator" style={{ opacity: isHovering ? 1 : 0 }}>
          <div className="p-bars"><div className="p-bar" /><div className="p-bar" /></div>
          Paused
        </div>

        <div className="stack-indicator">
          <div className="stack-line" />
        </div>

        <div className="card-stack">
          {videos.map((video, i) => {
            const state = stateFor(i);
            const isActive = state === "active";
            return (
              <article key={video.key} className="video-card" data-state={state}>
                <div className="card-inner">
                  <div className="card-thumb" style={{ backgroundImage: `url(${video.thumb})` }} />
                  <div className="card-iframe-wrap">
                    {isActive && (
                      <iframe
                        key={`${video.id}-${activeIndex}`}
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                  <div className="play-overlay" onClick={() => goTo(i)}>
                    <div className="play-btn-circle">
                      <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    </div>
                  </div>
                  <div className="card-info">
                    <div>
                      <div className="card-label">{video.category}</div>
                      <div className="card-title-sm">{video.title}</div>
                    </div>
                    <div className="card-duration">{video.duration || ""}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="stage-label">TEDxBMU — Video Archive</div>
      </div>

      <footer className="showcase-footer">
        <div className="footer-stat">
          <span className="footer-stat-num">{String(total).padStart(2, "0")}</span>
          <span className="footer-stat-label">Talks</span>
        </div>
        <div className="footer-divider" />
        <div className="footer-stat">
          <span className="footer-stat-num">06</span>
          <span className="footer-stat-label">Editions</span>
        </div>
        <div className="footer-divider" />
        <div className="footer-stat">
          <span className="footer-stat-num">Archive</span>
          <span className="footer-stat-label">TEDxBMU</span>
        </div>
        <a className="watch-all-btn" href="https://www.youtube.com/@TEDxBMU" target="_blank" rel="noopener noreferrer">
          Watch All Talks
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
      </footer>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; }
        .showcase {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          gap: 0;
        }
        .ambient-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .ambient-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.12; animation: drift 18s ease-in-out infinite alternate; }
        .orb-1 { width: 600px; height: 600px; background: #e62b1e; top: -200px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; background: #ff6b35; bottom: -150px; right: -80px; animation-delay: -9s; }
        .orb-3 { width: 300px; height: 300px; background: #a0a0a0; top: 40%; left: 60%; opacity: 0.05; animation-delay: -4s; }
        @keyframes drift { from { transform: translate(0,0) scale(1);} to { transform: translate(40px,30px) scale(1.1);} }
        .grain { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); background-size: 180px 180px; animation: grain-shift 0.4s steps(1) infinite; }
        @keyframes grain-shift { 0%{background-position:0 0;} 20%{background-position:-30px 15px;} 40%{background-position:15px -10px;} 60%{background-position:-20px 25px;} 80%{background-position:25px -5px;} 100%{background-position:0 0;} }
        .showcase-header { grid-column: 1 / -1; padding: 52px 0 40px; display: flex; align-items: flex-end; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 60px; }
        .logo-group { display: flex; align-items: center; gap: 18px; }
        .ted-badge { display: inline-flex; align-items: center; justify-content: center; background: #e62b1e; color: #fff; font-weight: 800; font-size: 22px; letter-spacing: 0.04em; padding: 6px 14px 4px; border-radius: 3px; line-height: 1; font-family: var(--font-heading, "Archivo", sans-serif); }
        .logo-x { font-weight: 800; font-size: 22px; color: #fff; letter-spacing: 0.04em; font-family: var(--font-heading, "Archivo", sans-serif); }
        .logo-event { font-size: 12px; letter-spacing: 0.18em; color: rgba(245,245,245,0.45); text-transform: uppercase; font-weight: 500; padding-left: 18px; border-left: 1px solid rgba(255,255,255,0.08); }
        .header-eyebrow { text-align: right; }
        .live-dot { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(245,245,245,0.6); font-weight: 500; }
        .live-dot::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #e62b1e; box-shadow: 0 0 0 0 rgba(230,43,30,0.6); animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 0 rgba(230,43,30,0.6);} 50%{box-shadow:0 0 0 5px rgba(230,43,30,0);} }
        .info-panel { grid-column: 1; display: flex; flex-direction: column; justify-content: center; padding-right: 60px; }
        .section-label { display: flex; align-items: center; gap: 10px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #e62b1e; font-weight: 600; margin-bottom: 24px; }
        .section-label::after { content: ""; height: 1px; width: 40px; background: #e62b1e; opacity: 0.5; }
        .talk-counter { font-family: var(--font-heading, "Archivo", sans-serif); font-size: 90px; line-height: 0.9; color: rgba(245,245,245,0.2); letter-spacing: -0.02em; margin-bottom: -10px; user-select: none; }
        .talk-title { font-family: var(--font-heading, "Archivo", sans-serif); font-size: clamp(32px, 4vw, 52px); line-height: 1.05; color: #fff; margin-bottom: 16px; }
        .talk-speaker { font-size: 14px; font-weight: 400; color: rgba(245,245,245,0.65); letter-spacing: 0.05em; margin-bottom: 8px; }
        .talk-speaker strong { color: #fff; font-weight: 600; }
        .talk-category { display: inline-flex; align-items: center; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #e62b1e; border: 1px solid rgba(230,43,30,0.25); padding: 4px 10px; border-radius: 3px; background: rgba(230,43,30,0.08); margin-bottom: 32px; }
        .talk-description { font-size: 14px; line-height: 1.75; color: rgba(245,245,245,0.55); font-weight: 300; max-width: 360px; margin-bottom: 32px; }
        .nav-controls { display: flex; align-items: center; gap: 16px; }
        .nav-btn { width: 44px; height: 44px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s ease; color: #fff; }
        .nav-btn:hover { background: rgba(230,43,30,0.12); border-color: rgba(230,43,30,0.4); color: #e62b1e; transform: scale(1.05); }
        .nav-btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .progress-dots { display: flex; align-items: center; gap: 8px; flex: 1; }
        .dot { position: relative; height: 2px; background: rgba(255,255,255,0.08); border-radius: 1px; cursor: pointer; flex: 1; overflow: hidden; transition: background 0.3s ease; border: none; padding: 0; }
        .dot:hover { background: rgba(255,255,255,0.15); }
        .dot-fill { position: absolute; inset: 0; background: #e62b1e; transform-origin: left; transform: scaleX(0); animation: fill-progress 5.5s linear forwards; }
        .dot.active .dot-fill { animation-play-state: running; }
        .dot.done .dot-fill { transform: scaleX(1); animation: none; background: rgba(230,43,30,0.4); }
        @keyframes fill-progress { from { transform: scaleX(0);} to { transform: scaleX(1);} }
        .card-stage { grid-column: 2; display: flex; align-items: center; justify-content: center; position: relative; min-height: 600px; perspective: 1200px; }
        .card-stack { position: relative; width: min(520px, 90vw); height: min(310px, 54vw); transform-style: preserve-3d; }
        .video-card { position: absolute; inset: 0; border-radius: 16px; overflow: hidden; cursor: pointer; transform-origin: bottom center; transition: transform 0.85s cubic-bezier(0.16,1,0.3,1), opacity 0.85s cubic-bezier(0.16,1,0.3,1), filter 0.85s cubic-bezier(0.16,1,0.3,1), box-shadow 0.85s cubic-bezier(0.16,1,0.3,1); }
        .video-card[data-state="active"] { transform: translateY(0) scale(1) rotateX(0deg); opacity: 1; filter: blur(0px) brightness(1); z-index: 10; box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.7), 0 0 120px rgba(230,43,30,0.12); }
        .video-card[data-state="next-1"] { transform: translateY(68%) scale(0.9) rotateX(4deg); opacity: 0.65; filter: blur(1.5px) brightness(0.75); z-index: 9; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 20px 50px rgba(0,0,0,0.5); }
        .video-card[data-state="next-2"] { transform: translateY(110%) scale(0.8) rotateX(7deg); opacity: 0.3; filter: blur(3px) brightness(0.55); z-index: 8; box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.4); }
        .video-card[data-state="prev"] { transform: translateY(-115%) scale(0.9) rotateX(-6deg); opacity: 0; filter: blur(6px) brightness(0.4); z-index: 7; pointer-events: none; }
        .video-card[data-state="hidden"] { transform: translateY(140%) scale(0.78) rotateX(10deg); opacity: 0; filter: blur(8px); z-index: 6; pointer-events: none; }
        .card-inner { position: relative; width: 100%; height: 100%; background: #111; }
        .card-thumb { position: absolute; inset: 0; z-index: 2; background-size: cover; background-position: center; }
        .card-thumb::after { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%); }
        .card-iframe-wrap { position: absolute; inset: 0; z-index: 1; }
        .card-iframe-wrap iframe { width: 100%; height: 100%; border: none; display: block; }
        .play-overlay { position: absolute; inset: 0; z-index: 3; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); transition: opacity 0.4s ease; }
        .video-card[data-state="active"] .play-overlay { opacity: 0; pointer-events: none; }
        .video-card[data-state="active"] .card-thumb { opacity: 0; }
        .play-btn-circle { width: 56px; height: 56px; background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        .play-btn-circle svg { width: 20px; height: 20px; fill: white; margin-left: 3px; }
        .video-card:hover .play-btn-circle { transform: scale(1.05); border-color: rgba(230,43,30,0.4); }
        .card-info { position: absolute; bottom: 0; left: 0; right: 0; z-index: 4; padding: 20px 24px 20px; background: linear-gradient(transparent, rgba(0,0,0,0.88) 40%); display: flex; align-items: flex-end; justify-content: space-between; }
        .card-label { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #e62b1e; font-weight: 600; margin-bottom: 4px; }
        .card-title-sm { font-family: var(--font-heading, "Archivo", sans-serif); font-size: 18px; line-height: 1.1; color: #fff; max-width: 260px; }
        .card-duration { font-size: 11px; color: rgba(255,255,255,0.55); font-weight: 400; letter-spacing: 0.06em; margin-top: 4px; }
        .video-card[data-state="active"]::before { content: ""; position: absolute; inset: 0; z-index: 5; border-radius: 16px; border: 1px solid rgba(230,43,30,0.35); pointer-events: none; }
        .video-card[data-state="active"]::after { content: ""; position: absolute; top: 0; left: 0; right: 0; z-index: 5; height: 2px; background: linear-gradient(90deg, transparent, #e62b1e, transparent); animation: shimmer 3s ease-in-out infinite; pointer-events: none; }
        @keyframes shimmer { 0%,100%{opacity:0; transform: scaleX(0.2);} 50%{opacity:1; transform: scaleX(1);} }
        .stage-label { position: absolute; right: -50px; top: 50%; transform: translateY(-50%) rotate(90deg); font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,245,245,0.25); white-space: nowrap; font-weight: 500; }
        .stack-indicator { position: absolute; left: -40px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 6px; align-items: center; }
        .stack-line { width: 1px; height: 60px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent); }
        .showcase-footer { grid-column: 1 / -1; padding: 40px 0 52px; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 60px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .footer-stat { display: flex; align-items: baseline; gap: 8px; }
        .footer-stat-num { font-family: var(--font-heading, "Archivo", sans-serif); font-size: 28px; color: #fff; }
        .footer-stat-label { font-size: 12px; color: rgba(245,245,245,0.55); text-transform: uppercase; letter-spacing: 0.12em; font-weight: 500; }
        .footer-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.08); }
        .watch-all-btn { display: inline-flex; align-items: center; gap: 10px; padding: 12px 28px; background: #e62b1e; color: #fff; border-radius: 3px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600; cursor: pointer; border: none; transition: all 0.25s ease; text-decoration: none; }
        .watch-all-btn:hover { background: #ff3a2d; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(230,43,30,0.35); }
        .watch-all-btn svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.25s ease; }
        .watch-all-btn:hover svg { transform: translateX(3px); }
        .pause-indicator { position: absolute; top: 16px; right: 16px; z-index: 20; display: flex; align-items: center; gap: 6px; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.6); transition: opacity 0.3s ease; pointer-events: none; }
        .p-bars { display: flex; gap: 2px; align-items: center; }
        .p-bar { width: 2px; height: 10px; background: rgba(255,255,255,0.6); border-radius: 1px; }
        @media (max-width: 900px) {
          .showcase { grid-template-columns: 1fr; padding: 0 24px; }
          .showcase-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .info-panel { grid-column: 1; order: 2; padding-right: 0; padding-top: 40px; }
          .card-stage { grid-column: 1; order: 1; min-height: 420px; }
          .talk-counter { font-size: 70px; }
          .stage-label, .stack-indicator { display: none; }
          .showcase-footer { margin-top: 32px; }
        }
        @media (max-width: 500px) {
          .showcase { padding: 0 18px; }
          .card-stack { width: 92vw; height: 55vw; }
          .talk-counter { font-size: 56px; }
          .talk-title { font-size: 28px; }
        }
      `}</style>
    </div>
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

      {/* 2025 Talks showcase */}
      <VideoShowcase speakers={events[2025].speakers} />



      {/* 2024 speakers */}
      <div className="max-w-7xl mx-auto px-8 my-28">
        <EventSection year={2024} data={events[2024]} />
      </div>

      {/* 2024 Talks showcase */}
      <VideoShowcase speakers={events[2024].speakers} />

      <div className="pb-24" />

    </main>
  );
}