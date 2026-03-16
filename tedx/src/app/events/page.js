"use client";

import { useRef, useEffect, useState } from "react";

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

function SpeakerCard({ speaker, index }) {
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
    <div
      ref={ref}
      className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 80}ms, transform 0.7s ease ${index * 80}ms`,
      }}
    >
      {/* Name + Title on top */}
      <div className="px-5 pt-5 pb-4 flex flex-col gap-1">
        <h3 className="text-white font-bold text-lg leading-tight">{speaker.name}</h3>
        <p className="text-[#e62b1e] text-sm font-medium">{speaker.title}</p>
      </div>

      {/* Image */}
      <div className="relative mx-3 rounded-xl overflow-hidden" style={{ height: "320px" }}>
        {speaker.image ? (
          <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#1a0000] to-[#000] flex flex-col items-center justify-center gap-3">
              <span className="text-[#e62b1e] text-m font-black">
                image
              </span>
            </div>
        )}
      </div>

      {/* Watch Talk button */}
      <div className="px-5 py-5">
        <a
          href={speaker.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#e62b1e] hover:bg-[#c0150f] text-white px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(230,43,30,0.3)] hover:shadow-[0_0_35px_rgba(230,43,30,0.5)]"
        >
          Watch Talk
        </a>
      </div>
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

  return (
    <div ref={ref} className="flex flex-col gap-14">

      {/* Theme banner */}
      <div className={`relative transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

        {/* Big year watermark */}
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

          <h2 className="text-6xl lg:text-8xl font-black uppercase leading-none tracking-tight">
            <span className="text-white">{data.theme.split(" ").slice(0, -1).join(" ")} </span>
            <span className="text-[#e62b1e]">{data.theme.split(" ").slice(-1)}</span>
          </h2>



          <p className="text-white/30 text-sm leading-relaxed max-w-xl">{data.description}</p>
        </div>
      </div>

      {/* Speakers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.speakers.map((speaker, i) => (
          <SpeakerCard key={i} speaker={speaker} index={i} />
        ))}
      </div>

    </div>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#e62b1e]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-96 bg-[#e62b1e]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-28">


        {/* 2025 */}
        <EventSection year={2025} data={events[2025]} />

        {/* Separator */}
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full">
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* 2024 */}
        <EventSection year={2024} data={events[2024]} />

      </div>

    </main>
  );
}