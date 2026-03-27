"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
items,
className = '',
radius = 300,
columns = 4,
rows = 2,
damping = 0.45,
fadeOut = 0.6,
ease = 'power3.out'
}) => {
const rootRef = useRef(null);
const fadeRef = useRef(null);
const setX = useRef(null);
const setY = useRef(null);
const pos = useRef({ x: 0, y: 0 });

const demo = [
{ image: 'https://i.pravatar.cc/300?img=8',  title: 'Alex Rivera',     subtitle: 'Full Stack Developer', borderColor: '#e62b1e', gradient: 'linear-gradient(145deg, #e62b1e44, #000)', url: 'https://linkedin.com/in/' },
{ image: 'https://i.pravatar.cc/300?img=11', title: 'Jordan Chen',     subtitle: 'DevOps Engineer',      borderColor: '#e62b1e', gradient: 'linear-gradient(210deg, #e62b1e44, #000)', url: 'https://linkedin.com/in/' },
{ image: 'https://i.pravatar.cc/300?img=3',  title: 'Morgan Blake',    subtitle: 'UI/UX Designer',       borderColor: '#e62b1e', gradient: 'linear-gradient(165deg, #e62b1e44, #000)', url: 'https://linkedin.com/in/' },
{ image: 'https://i.pravatar.cc/300?img=16', title: 'Casey Park',      subtitle: 'Data Scientist',       borderColor: '#e62b1e', gradient: 'linear-gradient(195deg, #e62b1e44, #000)', url: 'https://linkedin.com/in/' },
{ image: 'https://i.pravatar.cc/300?img=25', title: 'Sam Kim',         subtitle: 'Mobile Developer',     borderColor: '#e62b1e', gradient: 'linear-gradient(225deg, #e62b1e44, #000)', url: 'https://linkedin.com/in/' },
{ image: 'https://i.pravatar.cc/300?img=60', title: 'Tyler Rodriguez', subtitle: 'Cloud Architect',      borderColor: '#e62b1e', gradient: 'linear-gradient(135deg, #e62b1e44, #000)', url: 'https://linkedin.com/in/' },
];

const data = items?.length ? items : demo;

useEffect(() => {
const el = rootRef.current;
if (!el) return;
setX.current = gsap.quickSetter(el, '--x', 'px');
setY.current = gsap.quickSetter(el, '--y', 'px');
const { width, height } = el.getBoundingClientRect();
pos.current = { x: width / 2, y: height / 2 };
setX.current(pos.current.x);
setY.current(pos.current.y);
}, []);

const moveTo = (x, y) => {
gsap.to(pos.current, {
x, y,
duration: damping,
ease,
onUpdate: () => {
setX.current?.(pos.current.x);
setY.current?.(pos.current.y);
},
overwrite: true
});
};

const handleMove = e => {
const r = rootRef.current.getBoundingClientRect();
moveTo(e.clientX - r.left, e.clientY - r.top);
gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
};

const handleLeave = () => {
gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
};

const handleCardMove = e => {
const card = e.currentTarget;
const rect = card.getBoundingClientRect();
card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

return (
<div
ref={rootRef}
className={`chroma-grid ${className}`}
style={{ '--r': `${radius}px`, '--cols': columns, '--rows': rows, '--gap': '18px' }} // ✅ gap increased
onPointerMove={handleMove}
onPointerLeave={handleLeave}
>
{data.map((c, i) => {
const isLastRow = i >= data.length - 2; // ✅ detect last 2 cards
    return (
      <article
        key={i}
        className={`chroma-card ${isLastRow ? 'last-row-center' : ''}`} // ✅ apply centering class
        onMouseMove={handleCardMove}
        style={{
          '--card-border': c.borderColor || '#e62b1e',
          '--card-gradient': c.gradient,
          '--bg-image': `url(${c.image})`,
          cursor: c.url ? 'pointer' : 'default'
        }}
      >
        <div className="chroma-img-wrapper">
          <img src={c.image} alt={c.title} loading="lazy" />
        </div>

        <footer className="chroma-info">
          <div className="chroma-info-row">
            <h3 className="name">{c.title}</h3>
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="chroma-linkedin-btn"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
          </div>
          <p className="role">{c.subtitle}</p>
        </footer>
      </article>
    );
  })}

  <div className="chroma-overlay" />
  <div ref={fadeRef} className="chroma-fade" />
</div>

);
};

export default ChromaGrid;
