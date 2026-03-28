"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const TEAM = [
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531097/Akshat_Kabra__Licensee_bbdoeb.jpg", name: "Akshat Kabra", role: "Licensee", category: "organizers", linkedin: "https://www.linkedin.com/in/akshatkabra1" , featured: true },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/Rhea_Singh_Sud_Co-Licensee_rpigrd.jpg", name: "Rhea Singh Sud", role: "Co-Licensee", category: "organizers", linkedin: "https://www.linkedin.com/in/rhea-singh-sud", featured: true },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531099/GauravWebsite_lyvk3n.jpg", name: "Gaurav", role: "Website", category: "Website", linkedin: "https://www.linkedin.com/in/gaurav-ghosh-9531132b3/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531099/Radhika_Goel_Design_b8msdh.jpg", name: "Radhika Goel", role: "Design", category: "design", linkedin: "https://www.linkedin.com/in/goelradhika" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531101/YakshitaYadav_Design_j8xiqy.jpg", name: "Yakshita Yadav", role: "Design", category: "design", linkedin: "https://www.linkedin.com/in/yakshita-yadav/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Aryan_Nair_Curation_vph79x.jpg", name: "Aryan Nair", role: "Curation", category: "curation", linkedin: "https://www.linkedin.com/in/aryannair1" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Bhavyanshi_Singh_Curation_yuqulz.jpg", name: "Bhavyanshi Singh", role: "Curation", category: "curation", linkedin: "https://linkedin.com/in/bhavyanshi-singh-68288a293" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Dhiren_Video_Production_nnynjg.jpg", name: "Dhiren", role: "Video Production", category: "production", linkedin: "https://www.linkedin.com/in/dhiren-421198297" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/BayyapureddyVibhugnan_Marketing_tzixjg.jpg", name: "Bayyapureddy Vibhugnan", role: "Marketing", category: "marketing", linkedin: "https://www.linkedin.com/in/bayyapureddy-vibhu-gnan-82a60128a" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/saanvee_socialmedia_irwhph.jpg", name: "Saanvee", role: "Social Media", category: "marketing", linkedin: "https://www.linkedin.com/in/saanveesharma/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/Tanuj_Dhakad__event_management__uwfdqy.jpg", name: "Tanuj Dhakad", role: "Event Management", category: "events", linkedin: "https://www.linkedin.com/in/tanuj-dhakad-b1b238290" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/SanyamJain_eventmanagement_s5qpx0.png", name: "Sanyam Jain", role: "Event Management", category: "events", linkedin: "https://www.linkedin.com/in/sanyam-jain-a15034294" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Ansh_Gagneja_BBA_MBA_Integrated_2_hbrnsc.png", name: "Ansh Gagneja", role: "Sponsorship", category: "production", linkedin: "https://www.linkedin.com/in/ansh-gagneja-42730b282/" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "organizers", label: "Organizers" },
  { key: "design", label: "Design" },
  { key: "curation", label: "Curation" },
  { key: "marketing", label: "Marketing" },
  { key: "events", label: "Events" },
  { key: "production", label: "Production" },
  { key: "Website", label: "Website" },
];

function Card({ member, featured, delay, observeRef, extraClass = "", defaultIn = false }) {
  const shellRef = useRef(null);
  const cardRef = useRef(null);

  const setCardRef = node => {
    cardRef.current = node;
    if (observeRef) observeRef(node);
  };

  useEffect(() => {
    const shell = shellRef.current;
    const card = cardRef.current;
    if (!shell || !card) return;

    let raf;
    const handleMove = e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = shell.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
        shell.style.transition = "box-shadow 0.35s ease, transform 0.08s linear";
        shell.style.transform = `perspective(900px) rotateY(${dx * 11}deg) rotateX(${-dy * 11}deg) scale(1.025)`;
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(raf);
      shell.style.transition = "box-shadow 0.35s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1)";
      shell.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transitionDelay = `${delay}ms`;
  }, [delay]);

  return (
    <div
      className={`card${featured ? " featured" : ""}${extraClass ? ` ${extraClass}` : ""}${defaultIn ? " in" : ""}`}
      ref={setCardRef}
    >
      <div className="card-shell" ref={shellRef}>
        <img className="card-img" src={member.image} alt={member.name} loading="lazy" />
        <div className="card-grad" />
        <div className="card-scan" />
        <div className="card-sheen" />
        <div className="corner-accent" />
        <div className="card-info">
          <p className="card-role">{member.role}</p>
          <p className="card-name">{member.name}</p>
        </div>
        <a className="li-btn" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [filter, setFilter] = useState("all");
  const counterRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const cardsRef = useRef([]);

  // Reset the card refs each render so we only observe currently rendered cards
  cardsRef.current = [];

  const featured = useMemo(() => TEAM.filter(m => m.featured), []);
  const nonFeatured = useMemo(() => TEAM.filter(m => !m.featured), []);

  const filtered = useMemo(() => {
    if (filter === "all") return nonFeatured;
    return nonFeatured.filter(m => m.category === filter);
  }, [filter, nonFeatured]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
        }
      });
    }, { threshold: 0.06 });

    cardsRef.current.forEach(el => el && observer.observe(el));

    // Fallback: force visibility if the observer doesn't fire immediately (e.g., hydration/offscreen cases)
    requestAnimationFrame(() => {
      cardsRef.current.forEach(el => el && el.classList.add("in"));
    });

    return () => observer.disconnect();
  }, [filtered]);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const target = TEAM.length;
      const dur = 1400;
      let t0 = null;
      const tick = t => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (target - start) * eased).toString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PCOUNT = 70;
    const pts = Array.from({ length: PCOUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.35 + 0.08,
    }));

    let anim;
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,43,30,${p.a})`;
        ctx.fill();
      });

      const DIST = 130;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(230,43,30,${0.055 * (1 - d / DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      anim = requestAnimationFrame(drawFrame);
    };
    anim = requestAnimationFrame(drawFrame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(anim);
    };
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    const move = e => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      gx += (mx - gx) * 0.07;
      gy += (my - gy) * 0.07;
      glow.style.background = `radial-gradient(700px circle at ${gx}px ${gy}px, rgba(230,43,30,0.055), transparent 55%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="team-page">
      <style>{`
        .team-page *, .team-page *::before, .team-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .team-page {
          --red: #E62B1E;
          --red-mid: rgba(230,43,30,0.25);
          --red-dim: rgba(230,43,30,0.08);
          --red-glow: rgba(230,43,30,0.45);
          --black: #080808;
          --surface: rgba(255,255,255,0.025);
          --border: rgba(255,255,255,0.07);
          --text: #F5F5F5;
          --text-dim: rgba(255,255,255,0.38);
        }
        .team-page { background: var(--black); color: var(--text); font-family: var(--font-inter), sans-serif; position: relative; isolation: isolate; }
        .page { position: relative; z-index: 2; max-width: 1440px; margin: 0 auto; padding: 120px 60px 160px; }
        .header { position: relative; margin-bottom: 72px; }
        .header-bg-text { position: absolute; top: -40px; left: -8px; font-family: var(--font-archivo), sans-serif; font-size: clamp(120px, 18vw, 260px); line-height: 1; color: rgba(255,255,255,0.025); letter-spacing: -0.02em; white-space: nowrap; pointer-events: none; }
        .eyebrow { font-family: var(--font-archivo), sans-serif; font-size: 10px; letter-spacing: 0.42em; color: var(--red); text-transform: uppercase; margin-bottom: 20px; opacity: 0; animation: riseIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards 0.15s; display: flex; align-items: center; gap: 14px; }
        .eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: var(--red); }
        .main-title { font-family: var(--font-archivo), sans-serif; font-size: clamp(64px, 10vw, 120px); line-height: 1; letter-spacing: -0.01em; font-weight: 900; text-transform: uppercase; opacity: 0; animation: riseIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards 0.35s; }
        .title-w { color: var(--text); display: block; }
        .title-r { color: var(--red); display: block; }
        .header-foot { display: flex; align-items: center; gap: 28px; margin-top: 32px; opacity: 0; animation: riseIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards 0.55s; }
        .h-line { height: 1px; width: 160px; background: linear-gradient(to right, var(--red), transparent); flex-shrink: 0; }
        .team-stat { font-family: var(--font-archivo), sans-serif; font-size: 11px; color: var(--text-dim); letter-spacing: 0.2em; display: flex; align-items: baseline; gap: 6px; }
        .stat-num { font-size: 22px; color: var(--red); font-weight: 700; font-family: var(--font-archivo), sans-serif; letter-spacing: 0.05em; }
        .tabs-wrap { margin-bottom: 68px; opacity: 0; animation: riseIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards 0.7s; }
        .tabs { display: inline-flex; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 100px; padding: 4px; gap: 2px; flex-wrap: wrap; }
        .tab { font-family: var(--font-archivo), sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; padding: 10px 22px; border: none; background: transparent; color: var(--text-dim); cursor: pointer; border-radius: 100px; transition: color 0.25s, background 0.25s; }
        .tab.active { background: var(--red); color: #fff; }
        .tab:not(.active):hover { color: #fff; }
        .featured-block { margin-bottom: 72px; }
        .section-label { font-family: var(--font-archivo), sans-serif; font-size: 9px; letter-spacing: 0.45em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 36px; display: flex; align-items: center; gap: 14px; }
        .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); max-width: 300px; }
        .featured-row { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
        .big-divider { height: 1px; background: linear-gradient(to right, transparent, var(--red-mid), transparent); margin: 64px 0; position: relative; }
        .big-divider::before { content: '✦'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--red); font-size: 10px; background: var(--black); padding: 0 16px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(188px, 1fr)); gap: 28px 20px; }
        .card { opacity: 0; transform: translateY(36px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .card.in { opacity: 1; transform: translateY(0); }
        .card.gone { opacity: 0; pointer-events: none; transform: scale(0.94); transition: opacity 0.3s, transform 0.3s; position: absolute; visibility: hidden; }
        .card-shell { position: relative; border-radius: 14px; overflow: hidden; cursor: pointer; transform-style: preserve-3d; will-change: transform; transition: box-shadow 0.35s ease; width: 100%; aspect-ratio: 3/4; max-width: 220px; margin: 0 auto; }
        .featured .card-shell { width: 220px; height: 300px; aspect-ratio: auto; }
        .card-shell:hover { box-shadow: 0 0 0 1px var(--red), 0 0 40px var(--red-glow), 0 0 80px rgba(230,43,30,0.12); }
        .card-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(15%) contrast(1.06); transition: filter 0.4s ease, transform 0.5s ease; }
        .card-shell:hover .card-img { filter: grayscale(0%) contrast(1.08) brightness(1.04); transform: scale(1.05); }
        .card-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.25) 55%, transparent 100%); z-index: 1; }
        .card-scan { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px); z-index: 2; pointer-events: none; opacity: 0.6; }
        .card-sheen { position: absolute; inset: 0; background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 55%, transparent 70%); background-size: 250% 250%; background-position: 200% 200%; z-index: 3; pointer-events: none; opacity: 0; transition: opacity 0.3s; }
        .card-shell:hover .card-sheen { opacity: 1; animation: sheenMove 1.8s ease infinite; }
        .card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 14px; z-index: 4; }
        .card-role { font-family: var(--font-archivo), sans-serif; font-size: 8.5px; letter-spacing: 0.3em; color: var(--red); text-transform: uppercase; margin-bottom: 4px; }
        .card-name { font-family: var(--font-inter), sans-serif; font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.06em; line-height: 1.2; }
        .featured .card-role { font-size: 10px; margin-bottom: 5px; }
        .featured .card-name { font-size: 15px; }
        .li-btn { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; background: rgba(8,8,8,0.75); border: 1px solid var(--border); border-radius: 7px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: #fff; opacity: 0; transform: translateY(-4px) scale(0.85); transition: opacity 0.3s, transform 0.3s, border-color 0.3s, box-shadow 0.3s; z-index: 5; }
        .card-shell:hover .li-btn { opacity: 1; transform: translateY(0) scale(1); }
        .li-btn:hover { border-color: #0077B5; box-shadow: 0 0 14px rgba(0,119,181,0.5); background: rgba(0,119,181,0.15); }
        .corner-accent { position: absolute; top: 0; left: 0; width: 0; height: 0; border-style: solid; border-width: 28px 28px 0 0; border-color: var(--red) transparent transparent transparent; opacity: 0; transition: opacity 0.3s; z-index: 5; }
        .card-shell:hover .corner-accent { opacity: 1; }
        @keyframes riseIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sheenMove { 0% { background-position: 200% 200%; } 100% { background-position: -50% -50%; } }
        @media (max-width: 900px) { .page { padding: 100px 28px 120px; } .header-bg-text { display: none; } }
        @media (max-width: 600px) { .page { padding: 80px 20px 100px; } .tabs { border-radius: 14px; } .tab { padding: 8px 14px; font-size: 9px; } .grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } .featured-row { gap: 20px; } .featured .card-shell { width: 160px; height: 220px; } }
        #particle-canvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); background-size: 400px 400px; }
        .cursor-glow { position: fixed; inset: 0; pointer-events: none; z-index: 1; transition: none; }
        .team-page footer { position: relative; z-index: 2; background: #000; }
      `}</style>

      <canvas id="particle-canvas" ref={canvasRef} />
      <div className="noise" />
      <div className="cursor-glow" id="cursor-glow" ref={glowRef} />

      <main className="page" style={{ minHeight: "100vh" }}>
        <header className="header">
          <div className="header-bg-text" aria-hidden="true">TEAM</div>
          <p className="eyebrow">TEDxBMU 2026 · THE UNSEEN STORIES</p>
          <h1 className="main-title">
            <span className="title-w">THE</span>
            <span className="title-r">MINDS</span>
          </h1>
          <div className="header-foot">
            <div className="h-line" />
            <div className="team-stat">
              <span className="stat-num" id="counter" ref={counterRef}>0</span>
              <span>PEOPLE · ONE MISSION</span>
            </div>
          </div>
        </header>

        <div className="tabs-wrap">
          <div className="tabs" id="tabs">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`tab ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
                type="button"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {(filter === "all" || filter === "organizers") && (
          <div className="featured-block" id="featured-block">
            <p className="section-label">// Core Organizers</p>
            <div className="featured-row" id="featured-row">
              {featured.map((m, i) => (
                <Card key={m.name} member={m} featured delay={(i % 5) * 90} defaultIn />
              ))}
            </div>
          </div>
        )}

        <div className="big-divider" id="main-divider" style={{ display: filter === "organizers" ? "none" : "" }} />

        <div className="grid" id="team-grid">
          {filtered.map((m, i) => {
            const idx = i % 5;
            const hidden = filter !== "all" && m.category !== filter;
            return (
              <Card
                key={m.name}
                member={m}
                delay={idx * 90}
                extraClass={hidden ? "gone" : ""}
                observeRef={el => (cardsRef.current[i] = el)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
