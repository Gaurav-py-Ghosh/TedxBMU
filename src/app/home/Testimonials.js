"use client";

import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Student, IIT Delhi",
    text: "TEDxBMU was genuinely one of the most inspiring days of my year. The speakers were phenomenal and the energy in the room was electric.",
    avatar: "AS",
  },
  {
    name: "Priya Mehta",
    role: "Product Designer",
    text: "I came in expecting a typical college event. I left with a completely different perspective on how I approach problems. Absolutely worth it.",
    avatar: "PM",
  },
  {
    name: "Rohan Verma",
    role: "Entrepreneur",
    text: "The ideas shared at TEDxBMU were bold and thought-provoking. It pushed me to think beyond the conventional and take risks I had been avoiding.",
    avatar: "RV",
  },
  {
    name: "Sneha Kapoor",
    role: "MBA Student, BML Munjal University",
    text: "An incredibly well-organized event. Every talk left me with something to think about. Can't wait for the next edition!",
    avatar: "SK",
  },
  {
    name: "Karan Bhatia",
    role: "Software Engineer",
    text: "The atmosphere was unlike anything I've experienced at a student-run event. World-class execution and world-class ideas.",
    avatar: "KB",
  },
  {
    name: "Ananya Singh",
    role: "Journalist",
    text: "TEDxBMU brought together voices that needed to be heard. Powerful, diverse, and deeply relevant to our generation.",
    avatar: "AN",
  },
  {
    name: "Ananya Singh",
    role: "Journalist",
    text: "TEDxBMU brought together voices that needed to be heard. Powerful, diverse, and deeply relevant to our generation.",
    avatar: "AN",
  },
  {
    name: "Ananya Singh",
    role: "Journalist",
    text: "TEDxBMU brought together voices that needed to be heard. Powerful, diverse, and deeply relevant to our generation.",
    avatar: "AN",
  }

];

function TestimonialCard({ testimonial, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Random float duration and delay for each card
  const floatDuration = 3 + (index % 3);
  const floatDelay = index * 0.4;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(60px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        animation: visible ? `float-card ${floatDuration}s ease-in-out ${floatDelay}s infinite alternate` : "none",
      }}
      className="group bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 min-h-[320px]
  hover:border-[#e62b1e] hover:bg-[#e62b1e]/10
  hover:shadow-[0_0_40px_rgba(230,43,30,0.3),inset_0_0_30px_rgba(230,43,30,0.05)]
  transition-all duration-500 cursor-default"
    >
      {/* Quote icon */}
      <div className="text-[#e62b1e]/40 group-hover:text-[#e62b1e] text-4xl font-black leading-none transition-colors duration-300">"</div>

      {/* Text */}
      <p className="text-white/50 group-hover:text-white/80 text-sm leading-relaxed flex-1 transition-colors duration-300">
        {testimonial.text}
      </p>

      {/* Divider */}
      <div className="h-px w-full bg-white/10 group-hover:bg-[#e62b1e]/40 transition-colors duration-300" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#e62b1e]/20 border border-[#e62b1e]/30
          group-hover:bg-[#e62b1e]/40 group-hover:border-[#e62b1e] group-hover:shadow-[0_0_15px_rgba(230,43,30,0.4)]
          flex items-center justify-center transition-all duration-300">
          <span className="text-[#e62b1e] text-xs font-bold">{testimonial.avatar}</span>
        </div>
        <div>
          <p className="text-white text-sm font-semibold group-hover:text-[#e62b1e] transition-colors duration-300">{testimonial.name}</p>
          <p className="text-white/30 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-black text-white py-24 px-8 overflow-hidden">

      {/* Subtle red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#e62b1e]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
<div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
  
  {/* Left — Big bold title */}
  <div className="flex flex-col gap-2">
    <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light mb-2">Testimonials</span>
    <h2 className="text-6xl lg:text-7xl font-black leading-none tracking-tight uppercase">
      <span className="text-[#e62b1e]">WHAT</span>{" "}
      <span className="text-white">OUR</span>
      <br />
      <span className="text-white">ATTEND</span>
      <span className="text-[#e62b1e]">EES</span>{" "}
      <span className="text-white">SAY</span>
    </h2>
  </div>

  {/* Right — subtitle */}
  <p className="text-white/40 text-sm leading-relaxed max-w-xs lg:mb-3">
    Take a moment to read what our previous attendees have to say about our event. Their feedback is invaluable in helping us improve and grow.
  </p>

</div>

        {/* Cards grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">          
  {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}