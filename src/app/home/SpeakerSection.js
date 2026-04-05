"use client";

import { useRef, useEffect, useState } from "react";

const speakers = [
  {
    id: 1,
    name: "Shweta Kothari",
    title: "Journalist & Media Educator",
    topic: "Topic to be Announced",
    bio: "Shweta Kothari is a journalist and media educator with over a decade of experience across broadcast and digital platforms. Currently an anchor and senior editor at News9 (TV9 Network), she has worked with leading organizations including CNBC-TV18, NDTV, and NewsX. A University of Sussex graduate, she also teaches journalism at Jamia Millia Islamia. Her work has been recognised with awards including the NT Award and the INMA Elevate Scholarship.",
    number: "01",
    photo: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1775395406/Shweta_Kothari_tedx1-Photoroom_yhumos.png",
  },
  {
    id: 2,
    name: "Shams Aalam",
    title: "Para-swimmer & Accessibility Advocate",
    topic: "Topic to be Announced",
    bio: "Shams Aalam is a para-swimmer, engineer, and accessibility advocate who redefined his path after a life-altering spinal condition. A former karate champion turned world-record-holding swimmer, he is known for his open-sea swimming achievements. Beyond sports, he works on inclusive infrastructure and mobility solutions. A National Award winner and TEDx speaker, he continues to inspire resilience and innovation.",
    number: "02",
    photo: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1775395406/Shams_Alam_Tedx-Photoroom_emsglr.png",
  },
  {
    id: 3,
    name: "Dr. Saarthak Bakshi",
    title: "Healthcare Entrepreneur & CEO, Risaa IVF",
    topic: "Topic to be Announced",
    bio: "Dr. Saarthak Bakshi is a healthcare entrepreneur and CEO of Risaa IVF, recognized in the Forbes 30 Under 30 Asia list. With 14+ years of experience across fertility clinics in India, Nepal, and Bangladesh, he has helped build families for thousands. A Commonwealth Fellow and 40 Under 40 awardee, he brings together clinical expertise with a deeply human approach to care.",
    number: "03",
    photo: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1775395406/saarthak_bakshi_tedx-Photoroom_xbcbrx.png",
  },
  {
    id: 4,
    name: "Bhanu Pathak",
    title: "Finance Creator & Entrepreneur",
    topic: "Topic to be Announced",
    bio: "Bhanu Pathak is a finance creator and entrepreneur who has built a community of 2M+ by making wealth and personal finance simple. As the founder of Growshow Media, he translates complex finance into relatable, everyday advice. Through his podcast, Batlaiye, he uncovers the human side of success via candid conversations with top leaders. A TEDx speaker with 100+ sessions, he continues to bridge the gap between financial literacy and real-world impact.",
    number: "04",
    photo: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1775395406/Bhanu_Pathak_Tedx_Photo-Photoroom_hwmigh.png",
  },
];

export default function SpeakerSection() {
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpeaker((prev) => (prev + 1) % speakers.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const speaker = speakers[activeSpeaker];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black w-full"
    >
      <div
        className="relative w-full min-h-[100svh] py-16 flex flex-col overflow-hidden"
      >

        {/* Background number */}
        <div className="absolute inset-0 flex flex-col items-center lg:items-end justify-center lg:pr-16 pointer-events-none select-none z-0 pt-32 lg:pt-0">
          <span
            key={speaker.number}
            className="text-[45vw] lg:text-[25vw] font-black text-white/[0.03] leading-none"
            style={{ animation: "fadeIn 0.6s ease" }}
          >
            {speaker.number}
          </span>
        </div>

        {/* Red glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#e62b1e]/10 blur-[120px] rounded-full" />
        </div>

        {/* Red decorative elements */}
        <div className="absolute top-8 left-8 pointer-events-none z-0">
          <div className="w-12 h-12 border-t-2 border-l-2 border-[#e62b1e]/30" />
        </div>
        <div className="absolute bottom-8 right-8 pointer-events-none z-0">
          <div className="w-12 h-12 border-b-2 border-r-2 border-[#e62b1e]/30" />
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-gradient-to-b from-transparent via-[#e62b1e]/40 to-transparent pointer-events-none z-0 hidden lg:block" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-gradient-to-b from-transparent via-[#e62b1e]/40 to-transparent pointer-events-none z-0 hidden lg:block" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#e62b1e]/40 to-transparent pointer-events-none z-0 hidden lg:block" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#e62b1e]/40 to-transparent pointer-events-none z-0 hidden lg:block" />
        <div className="absolute top-16 right-4 lg:right-32 w-48 lg:w-64 h-48 lg:h-64 bg-[#e62b1e]/5 blur-[60px] lg:blur-[80px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-16 left-4 lg:left-32 w-32 lg:w-48 h-32 lg:h-48 bg-[#e62b1e]/5 blur-[40px] lg:blur-[60px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-0 right-16 lg:right-32 w-[1px] h-24 lg:h-32 bg-gradient-to-b from-[#e62b1e]/40 to-transparent pointer-events-none z-0" style={{ transform: "rotate(30deg)", transformOrigin: "top" }} />
        <div className="absolute bottom-0 left-16 lg:left-32 w-[1px] h-24 lg:h-32 bg-gradient-to-t from-[#e62b1e]/40 to-transparent pointer-events-none z-0" style={{ transform: "rotate(30deg)", transformOrigin: "bottom" }} />

        {/* HEADER */}
        <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 lg:gap-0 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-5xl lg:text-7xl font-black leading-none tracking-tight uppercase">
            <span className="text-white">OUR</span>{" "}
            <span className="text-[#e62b1e]">SPEAK</span>
            <span className="text-white">ERS</span>
          </h2>
          <p className="text-white/30 text-xs leading-relaxed max-w-xs lg:mb-1">
            Meet the voices that will challenge, inspire and push you beyond what you think.
          </p>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center flex-1 py-8 lg:py-4 mt-8 lg:mt-0">

          {/* LEFT — Speaker info */}
          <div
            key={speaker.id}
            style={{ animation: "fadeSlideIn 0.7s ease forwards" }}
            className="flex flex-col gap-5 lg:gap-4 lg:pl-8 text-center lg:text-left items-center lg:items-start order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-2 lg:mb-5">
              <div className="h-px w-8 bg-[#e62b1e]" />
              <span className="text-[#e62b1e] text-[10px] lg:text-xs tracking-[0.4em] uppercase font-light">
                Speakers · {speaker.number} of 0{speakers.length}
              </span>
            </div>
            {/* <h2 className="text-3xl font-black leading-tight tracking-tight text-white">
              "{speaker.topic}"
            </h2> */}
            <div className="flex flex-col gap-0.5">
              <p className="text-2xl lg:text-xl font-semibold text-white">{speaker.name}</p>
              <p className="text-[#e62b1e] lg:text-white/40 text-sm lg:text-sm tracking-wide">{speaker.title}</p>
            </div>
            <div className="h-px w-16 bg-[#e62b1e]/40 my-2 lg:my-0" />
            <p className="text-white/60 lg:text-white/50 text-sm leading-relaxed max-w-md font-light px-4 lg:px-0 text-justify">
              {speaker.bio}
            </p>
            <div className="flex items-center gap-2 mt-4 lg:mt-0">
              {speakers.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === activeSpeaker ? "24px" : "6px",
                    height: "6px",
                    background: i === activeSpeaker ? "#e62b1e" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Speaker image */}
          <div
            key={`img-${speaker.id}`}
            style={{ animation: "fadeSlideInRight 0.7s ease forwards" }}
            className="relative flex items-center justify-center lg:justify-end pr-0 lg:pr-8 pb-4 lg:pb-0 order-1 lg:order-2"
          >
            <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden border border-[#e62b1e]/20 shadow-[0_0_60px_rgba(230,43,30,0.15)] bg-white/5 mx-auto lg:mx-0">
              {speaker.photo ? (
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#e62b1e]/20 border border-[#e62b1e]/30 flex items-center justify-center">
                    <span className="text-[#e62b1e] text-lg font-black">
                      {speaker.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                    </span>
                  </div>
                  <span className="text-white/20 text-xs tracking-widest uppercase">Photo Coming Soon</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e62b1e]" />
                <div className="absolute bottom-0 left-0 w-[2px] h-full bg-[#e62b1e]" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#e62b1e] px-6 py-2 rounded-full whitespace-nowrap">
              <span className="text-white text-xs font-semibold tracking-wider">{speaker.name}</span>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}