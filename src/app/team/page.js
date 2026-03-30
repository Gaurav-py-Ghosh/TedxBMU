"use client";

import { useEffect, useRef } from "react";

const TEAM = [
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531097/Akshat_Kabra__Licensee_bbdoeb.jpg", name: "Akshat Kabra", role: "Licensee", linkedin: "https://www.linkedin.com/in/akshatkabra1" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/Rhea_Singh_Sud_Co-Licensee_rpigrd.jpg", name: "Rhea Singh Sud", role: "Co-Licensee", linkedin: "https://www.linkedin.com/in/rhea-singh-sud" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531099/GauravWebsite_lyvk3n.jpg", name: "Gaurav", role: "Website Lead", linkedin: "https://www.linkedin.com/in/gaurav-ghosh-9531132b3/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531099/Radhika_Goel_Design_b8msdh.jpg", name: "Radhika Goel", role: "Design Lead", linkedin: "https://www.linkedin.com/in/goelradhika" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531101/YakshitaYadav_Design_j8xiqy.jpg", name: "Yakshita Yadav", role: "Design Lead", linkedin: "https://www.linkedin.com/in/yakshita-yadav/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774689267/Priyal_Khullar_Content_h1gfnv.jpg", name: "Priyal Khullar", role: "Content Lead", linkedin: "https://www.linkedin.com/in/sanyam-jain-a15034294" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Aryan_Nair_Curation_vph79x.jpg", name: "Aryan Nair", role: "Curation Lead", linkedin: "https://www.linkedin.com/in/aryannair1" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Bhavyanshi_Singh_Curation_yuqulz.jpg", name: "Bhavyanshi Singh", role: "Curation Lead", linkedin: "https://www.linkedin.com/in/bhavyanshi-singh-68288a293" },
  
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/BayyapureddyVibhugnan_Marketing_tzixjg.jpg", name: "Bayyapureddy Vibhugnan", role: "Marketing Lead", linkedin: "https://www.linkedin.com/in/bayyapureddy-vibhu-gnan-82a60128a" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/saanvee_socialmedia_irwhph.jpg", name: "Saanvee", role: "Marketing Lead", linkedin: "https://www.linkedin.com/in/saanveesharma/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Dhiren_Video_Production_nnynjg.jpg", name: "Dhiren", role: "Video Production Lead", linkedin: "https://www.linkedin.com/in/dhiren-421198297" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/Tanuj_Dhakad__event_management__uwfdqy.jpg", name: "Tanuj Dhakad", role: "Event Management Lead", linkedin: "https://www.linkedin.com/in/tanuj-dhakad-b1b238290" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/SanyamJain_eventmanagement_s5qpx0.png", name: "Sanyam Jain", role: "Event Management Lead", linkedin: "https://www.linkedin.com/in/sanyam-jain-a15034294" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Ansh_Gagneja_BBA_MBA_Integrated_2_hbrnsc.png", name: "Ansh Gagneja", role: "Sponsorship Lead", linkedin: "https://www.linkedin.com/in/ansh-gagneja-42730b282/" },
];

function Card({ member, delay, observeRef }) {
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

  return (
    <div className="card" ref={setCardRef} style={{ transitionDelay: `${delay}ms` }}>
      <div className="card-shell" ref={shellRef}>
        <img className="card-img" src={member.image} alt={member.name} loading="lazy" />
        <div className="card-grad" />
        <svg className="card-scan" viewBox="0 0 220 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <line x1="0" y1="300" x2="220" y2="0" stroke="url(#scanGradient)" strokeWidth="72" strokeLinecap="round" className="scan-line-1" />
          <line x1="0" y1="0" x2="220" y2="300" stroke="url(#scanGradient)" strokeWidth="72" strokeLinecap="round" className="scan-line-2" />
        </svg>
        <div className="card-sheen" />
        <div className="corner-accent" />
        <div className="card-info">
          <p className="card-role">{member.role}</p>
          <p className="card-name">{member.name}</p>
        </div>
        <a className="li-btn" href={member.linkedin} target="_blank" rel="noopener noreferrer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const counterRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const cardsRef = useRef([]);

  const organizers = TEAM.slice(0, 2);
  const coreTeam = TEAM.slice(2);

  // DOTS EFFECT (REPLYING TO YOUR "Dotted Lines" REQUEST)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.2 + 0.4, a: Math.random() * 0.35 + 0.08,
    }));
    let anim;
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,43,30,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(230,43,30,${0.055 * (1 - d / 130)})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      anim = requestAnimationFrame(drawFrame);
    };
    anim = requestAnimationFrame(drawFrame);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(anim); };
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, gx = mx, gy = my, raf;
    const move = e => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", move);
    const loop = () => {
      gx += (mx - gx) * 0.07; gy += (my - gy) * 0.07;
      glow.style.background = `radial-gradient(700px circle at ${gx}px ${gy}px, rgba(230,43,30,0.055), transparent 55%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.06 });
    cardsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      const target = TEAM.length;
      let t0 = null;
      const tick = t => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="team-page">
      <style>{`
        .team-page *, .team-page *::before, .team-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .team-page {
          --red: #E62B1E; --red-mid: rgba(230,43,30,0.25); --red-glow: rgba(230,43,30,0.45);
          --black: #080808; --border: rgba(255,255,255,0.07); --text: #F5F5F5; --text-dim: rgba(255,255,255,0.38);
        }
        .team-page { background: var(--black); color: var(--text); font-family: var(--font-inter), sans-serif; position: relative; isolation: isolate; overflow-x: hidden; width: 100%; }
        .team-page .page { position: relative; z-index: 2; max-width: 1440px; margin: 0 auto; padding: 120px 60px 160px; overflow-x: hidden; }
        .team-page .header { position: relative; margin-bottom: 80px; }
        .team-page .header-bg-text { position: absolute; top: -40px; left: -8px; font-family: var(--font-archivo), sans-serif; font-size: clamp(120px, 18vw, 260px); line-height: 1; color: rgba(255,255,255,0.025); letter-spacing: -0.02em; white-space: nowrap; pointer-events: none; }
        .team-page .eyebrow { font-family: var(--font-archivo), sans-serif; font-size: 10px; letter-spacing: 0.42em; color: var(--red); text-transform: uppercase; margin-bottom: 20px; opacity: 0; animation: riseIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards 0.15s; display: flex; align-items: center; gap: 14px; }
        .team-page .eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: var(--red); }
        .team-page .main-title { font-family: var(--font-archivo), sans-serif; font-size: clamp(64px, 10vw, 120px); line-height: 1; letter-spacing: -0.01em; font-weight: 900; text-transform: uppercase; opacity: 0; animation: riseIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards 0.35s; }
        .team-page .title-w { color: var(--text); display: block; }
        .team-page .title-r { color: var(--red); display: block; }
        .team-page .header-foot { display: flex; align-items: center; gap: 28px; margin-top: 32px; opacity: 0; animation: riseIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards 0.55s; }
        .team-page .h-line { height: 1px; width: 160px; background: linear-gradient(to right, var(--red), transparent); flex-shrink: 0; }
        .team-page .team-stat { font-family: var(--font-archivo), sans-serif; font-size: 11px; color: var(--text-dim); letter-spacing: 0.2em; display: flex; align-items: baseline; gap: 6px; }
        .team-page .stat-num { font-size: 22px; color: var(--red); font-weight: 700; font-family: var(--font-archivo), sans-serif; letter-spacing: 0.05em; }
        
        .team-page .organizers-row { 
          display: flex; 
          justify-content: center; 
          gap: 20px; 
          margin-bottom: 28px;
        }

        .team-page .grid { 
          display: grid; 
          grid-template-columns: repeat(4, 220px); 
          justify-content: center; 
          gap: 28px 20px; 
        }

        .team-page .card { opacity: 0; transform: translateY(36px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); width: 220px; }
        .team-page .card.in { opacity: 1; transform: translateY(0); }
        .card-shell { position: relative; border-radius: 14px; overflow: hidden; cursor: pointer; transform-style: preserve-3d; will-change: transform; transition: box-shadow 0.35s ease; width: 100%; aspect-ratio: 3/4; max-width: 220px; margin: 0 auto; }
        .card-shell:hover { box-shadow: 0 0 0 1px var(--red), 0 0 40px var(--red-glow), 0 0 80px rgba(230,43,30,0.12); }
        .card-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(15%) contrast(1.06); transition: filter 0.4s ease, transform 0.5s ease; }
        .card-shell:hover .card-img { filter: grayscale(0%) contrast(1.08) brightness(1.04); transform: scale(1.05); }
        .card-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.25) 55%, transparent 100%); z-index: 1; }
        .card-scan { position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0; transition: opacity 0.3s; width: 100%; height: 100%; }
        .card-shell:hover .card-scan { 
          opacity: 0.6;
          animation: xScanMove 2.5s ease-in-out infinite;
        }
        .card-scan .scan-line-1, .card-scan .scan-line-2 {
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.12));
        }
        .card-sheen { position: absolute; inset: 0; background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 55%, transparent 70%); background-size: 250% 250%; background-position: 200% 200%; z-index: 3; pointer-events: none; opacity: 0; transition: opacity 0.3s; }
        .card-shell:hover .card-sheen { opacity: 1; animation: sheenMove 1.8s ease infinite; }
        .card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 14px; z-index: 4; }
        .card-role { font-family: var(--font-archivo), sans-serif; font-size: 8.5px; letter-spacing: 0.3em; color: var(--red); text-transform: uppercase; margin-bottom: 4px; }
        .card-name { font-family: var(--font-inter), sans-serif; font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.06em; line-height: 1.2; }
        .li-btn { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; background: rgba(8,8,8,0.75); border: 1px solid var(--border); border-radius: 7px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: #fff; opacity: 0; transform: translateY(-4px) scale(0.85); transition: opacity 0.3s, transform 0.3s, border-color 0.3s, box-shadow 0.3s; z-index: 5; }
        .card-shell:hover .li-btn { opacity: 1; transform: translateY(0) scale(1); }
        .li-btn:hover { border-color: #0077B5; box-shadow: 0 0 14px rgba(0,119,181,0.5); background: rgba(0,119,181,0.15); }
        .corner-accent { position: absolute; top: 0; left: 0; width: 0; height: 0; border-style: solid; border-width: 28px 28px 0 0; border-color: var(--red) transparent transparent transparent; opacity: 0; transition: opacity 0.3s; z-index: 5; }
        .card-shell:hover .corner-accent { opacity: 1; }
        @keyframes riseIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes xScanMove { 
          0% { transform: translateX(-100%) translateY(-100%); } 
          50% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(100%) translateY(100%); } 
        }
        @keyframes sheenMove { 0% { background-position: 200% 200%; } 100% { background-position: -50% -50%; } }
        #particle-canvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); background-size: 400px 400px; }
        .cursor-glow { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
        
        @media (max-width: 960px) { 
          .team-page .grid { grid-template-columns: repeat(2, 220px); }
          .team-page .organizers-row { gap: 16px; }
        }
        @media (max-width: 600px) { 
          .page { padding: 80px 20px 100px; }
          .team-page .header-foot { gap: 16px; margin-top: 24px; }
          .team-page .h-line { width: 80px; }
          .team-page .team-stat { font-size: 10px; }
          .team-page .grid { grid-template-columns: 1fr; gap: 28px; }
          .team-page .card { width: 100%; display: flex; justify-content: center; }
          .team-page .organizers-row { flex-direction: column; align-items: center; gap: 28px; }
        }
      `}</style>

      <canvas id="particle-canvas" ref={canvasRef} />
      <div className="noise" />
      <div className="cursor-glow" ref={glowRef} />

      <main className="page">
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
              <span className="stat-num" ref={counterRef}>0</span>
              <span>PEOPLE · ONE MISSION</span>
            </div>
          </div>
        </header>

        <div className="organizers-row">
          {organizers.map((m, i) => (
            <Card key={m.name} member={m} delay={i * 90} observeRef={el => (cardsRef.current[i] = el)} />
          ))}
        </div>

        <div className="grid">
          {coreTeam.map((m, i) => (
            <Card key={m.name} member={m} delay={(i % 4) * 90} observeRef={el => (cardsRef.current[2 + i] = el)} />
          ))}
        </div>
      </main>
    </div>
  );
}