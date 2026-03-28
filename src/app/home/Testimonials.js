"use client";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Student, IIT Delhi",
    text: "TEDxBMU was genuinely one of the most inspiring days of my year. The speakers were phenomenal and the energy in the room was electric.",
  },
  {
    name: "Priya Mehta",
    role: "Product Designer",
    text: "I came in expecting a typical college event. I left with a completely different perspective on how I approach problems. Absolutely worth it.",
  },
  {
    name: "Rohan Verma",
    role: "Entrepreneur",
    text: "The ideas shared at TEDxBMU were bold and thought-provoking. It pushed me to think beyond the conventional and take risks I had been avoiding.",
  },
  {
    name: "Sneha Kapoor",
    role: "MBA Student, BML Munjal University",
    text: "An incredibly well-organized event. Every talk left me with something to think about. Can't wait for the next edition!",
  },
  {
    name: "Karan Bhatia",
    role: "Software Engineer",
    text: "The atmosphere was unlike anything I've experienced at a student-run event. World-class execution and world-class ideas.",
  },
  {
    name: "Ananya Singh",
    role: "Journalist",
    text: "TEDxBMU brought together voices that needed to be heard. Powerful, diverse, and deeply relevant to our generation.",
  },
];

export default function Testimonials() {
  const row1 = testimonials;
  const row2 = [...testimonials].reverse();

  const renderRow = (items, reverse, duration) => {
    const doubled = [...items, ...items];
    return (
      <div
        className={`track ${reverse ? "track-row2" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <div className="t-card" key={`${item.name}-${i}-${reverse ? "r" : "f"}`}>
            <div className="card-quote-icon">"</div>
            <p className="card-text">{item.text}</p>
            <div className="card-divider" />
            <div>
              <div className="card-author-name">{item.name}</div>
              <div className="card-author-role">{item.role}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap');

        .tedx-wrap {
          background: #000000;
          color: white;
          padding: 72px 48px;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .tedx-header {
          margin-bottom: 56px;
        }

        .tedx-eyebrow {
          font-size: 11px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #e62b1e;
          font-weight: 300;
          margin-bottom: 8px;
        }

        .tedx-title {
          font-family: 'Inter', 'Inter Fallback', sans-serif;
          font-size: clamp(42px, 5vw, 78px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: 0.02em;
          margin: 0;
        }

        .tedx-title .r { color: #e62b1e; }
        .tedx-title .d { color: rgba(255, 255, 255, 0.14); }

        .track-outer {
          overflow: hidden;
          position: relative;
          padding: 12px 0;
        }

        .track-outer::before,
        .track-outer::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }

        .track-outer::before { left: 0; background: linear-gradient(90deg, #080808, transparent); }
        .track-outer::after  { right: 0; background: linear-gradient(-90deg, #080808, transparent); }

        .track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: scroll-left 32s linear infinite;
        }

        .track:hover { animation-play-state: paused; }

        .track-row2 {
          animation-direction: reverse;
          animation-duration: 38s;
        }

        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .t-card {
          width: 320px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.35s, background 0.35s;
        }

        .t-card:hover {
          border-color: rgba(230,43,30,0.5);
          background: rgba(230,43,30,0.05);
        }

        .t-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #e62b1e, rgba(230,43,30,0.1), transparent);
          opacity: 0;
          transition: opacity 0.35s;
        }

        .t-card:hover::before { opacity: 1; }

        .card-quote-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 80px;
          line-height: 0.6;
          color: rgba(230,43,30,0.1);
          user-select: none;
          position: absolute;
          top: 18px; right: 22px;
        }

        .card-text {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          font-style: italic;
          font-weight: 300;
          position: relative;
          z-index: 1;
          transition: color 0.3s;
        }

        .t-card:hover .card-text { color: rgba(255,255,255,0.82); }

        .card-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          transition: background 0.3s;
        }

        .t-card:hover .card-divider { background: rgba(230,43,30,0.3); }

        .card-author-name {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s;
        }

        .t-card:hover .card-author-name { color: #e62b1e; }

        .card-author-role {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          margin-top: 2px;
          letter-spacing: 0.02em;
        }

        .rows-gap { height: 20px; }

        @media (max-width: 720px) {
          .tedx-wrap { padding: 64px 24px; }
          .t-card { width: 260px; padding: 24px 24px 20px; }
          .track { gap: 14px; }
          .track-outer::before,
          .track-outer::after { width: 72px; }
        }
      `}</style>

      <section className="tedx-wrap">
        <div className="tedx-header">
          <div className="tedx-eyebrow">Testimonials</div>
          <h2 className="tedx-title">
            <span className="r">WHAT</span> <span className="d">OUR</span>
            <br />
            <span>ATTEND</span>
            <span className="r">EES</span> <span className="d">SAY</span>
          </h2>
        </div>

        <div className="track-outer">
          {renderRow(row1, false, 32)}
        </div>

        <div className="rows-gap" />

        <div className="track-outer">
          {renderRow(row2, true, 38)}
        </div>
      </section>
    </>
  );
}