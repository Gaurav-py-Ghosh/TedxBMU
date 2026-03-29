"use client";

const testimonials = [
  {
    name: "Aaryaman",
    role: "Attendee",
    text: "There’s something about TEDx at BMU that stays with you even after it’s over.",
  },
  {
    name: "Anu Hooda",
    role: "Attendee",
    text: "I attended it last year without many expectations, but it turned out to be a really meaningful experience.",
  },
  {
    name: "Aryan Nair",
    role: "Attendee",
    text: "It’s one of the few events on campus that I genuinely look forward to.",
  },
  {
    name: "Maulik Gupta",
    role: "Attendee",
    text: "You can tell a lot of thought goes into curating the talks and the theme.",
  },
  {
    name: "Narpender",
    role: "Attendee",
    text: "This year’s theme sounds interesting, I’m curious to see how it comes together.",
  },
  {
    name: "Saanvee Sharma",
    role: "Attendee",
    text: "It’s a calm yet impactful experience—something you don’t often find.",
  },
  {
    name: "Tarushi",
    role: "Attendee",
    text: "There’s always at least one talk that really resonates with you.",
  },
  {
    name: "Tejaswi",
    role: "Attendee",
    text: "I’ll definitely be attending again this year. It’s always worth it.",
  },
  {
    name: "Harsha",
    role: "Attendee",
    text: "It’s a refreshing change from the usual fast-paced campus events.",
  },
  {
    name: "Dhiren",
    role: "Attendee",
    text: "Looking forward to seeing how this year builds on the last one.",
  },
  {
    name: "Gaurav Ghosh",
    role: "Attendee",
    text: "It’s one of those events where you end up paying attention the entire time without realizing it.",
  },
  {
    name: "Harnoor",
    role: "Attendee",
    text: "I liked how it didn’t feel overwhelming, just simple and well put together.",
  },
  {
    name: "Ridhi",
    role: "Attendee",
    text: "What stood out to me was how honest and real the talks felt.",
  },
  {
    name: "Ajanta",
    role: "Attendee",
    text: "It gives you a chance to pause and reflect, which is rare during regular college days.",
  },
  {
    name: "Siddharth Rawat",
    role: "Attendee",
    text: "It’s one of the few events where you don’t feel like checking your phone every few minutes.",
  },
  {
    name: "Vaibhavi",
    role: "Attendee",
    text: "I like how it creates a space where people actually listen, not just sit through it.",
  },
  {
    name: "Vibhu Gnan",
    role: "Attendee",
    text: "The storytelling feels very natural, not overdone or overly polished.",
  },
  {
    name: "Vivek",
    role: "Attendee",
    text: "It’s paced really well you don’t feel drained even after multiple talks.",
  },
  {
    name: "Yakshita",
    role: "Attendee",
    text: "It manages to feel both personal and thought-provoking at the same time.",
  },
  {
    name: "Yash Tulsani",
    role: "Attendee",
    text: "It’s the kind of experience that grows on you the more you think about it later.",
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
            <div className="card-author-wrap">
              <div className="card-divider" />
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
          height: 230px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
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

        .card-author-wrap {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

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
          margin-top: -8px;
          letter-spacing: 0.02em;
        }

        .rows-gap { height: 20px; }

        @media (max-width: 720px) {
          .tedx-wrap { padding: 64px 24px; }
          .t-card { width: 260px; height: 210px; padding: 24px 24px 20px; }
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