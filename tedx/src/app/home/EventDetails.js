"use client";

import { useRef, useEffect, useState } from "react";
import BlurText from "@/components/ui/BlurText";
import CountUp from "@/components/ui/CountUp";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

function StatBox({ number, suffix, label, start }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-3xl font-black text-white flex items-center">
        <CountUp
          from={0}
          to={number}
          duration={2}
          startWhen={start}
          className="text-3xl font-black text-white"
        />
        {suffix}
      </span>
      <span className="text-white/40 text-xs tracking-widest uppercase">{label}</span>
    </div>
  );
}

const wordData = [
  { text: "Think.", color: "#e62b1e" },
  { text: "See.", color: "#00f2ff" },
  { text: "Know.", color: "#b2f24ab7" },
  { text: "Imagine.", color: "#ff8c00" }
];

export default function Theme() {
  const [visible, setVisible] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [mobileWordIndex, setMobileWordIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  // Scroll logic for Desktop
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isMobile ? ["start end", "end start"] : ["start start", "end end"]
  });

  const scrollWordIndex = useTransform(scrollYProgress, isMobile ? [0.3, 0.7] : [0.1, 0.9], [0, 3]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Interval logic for Mobile
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setMobileWordIndex((prev) => (prev + 1) % wordData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const [currentWord, setCurrentWord] = useState(wordData[0]);

  useEffect(() => {
    if (isMobile) {
      setCurrentWord(wordData[mobileWordIndex]);
    } else {
      const unsubscribe = scrollWordIndex.on("change", (v) => {
        const index = Math.min(Math.floor(v), wordData.length - 1);
        setCurrentWord(wordData[index]);
      });
      return () => unsubscribe();
    }
  }, [isMobile, mobileWordIndex, scrollWordIndex]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setStatsStarted(true), 600);
      setMobileWordIndex(0); // Reset to "Think." on entry
    }
  }, [visible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        setVisible(entry.isIntersecting); 
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`relative bg-black text-white ${isMobile ? "py-24 min-h-screen" : "h-[300vh]"}`}
    >
      <div className={`${isMobile ? "relative px-8" : "sticky top-0 h-screen px-8"} flex items-center overflow-hidden`}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Text */}
            <div className={`flex flex-col gap-6 md:gap-8 transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#e62b1e]" />
              </div>
              <div className="flex flex-col gap-1 pr-4">
                <BlurText text="Beyond" delay={150} animateBy="words" direction="top"
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-white uppercase" />

                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight flex flex-col gap-0 items-start">
                  <span className="uppercase text-white mb-1">What We</span>
                  <div className="relative h-[1.1em] min-w-[3ch] flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWord.text}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        style={{ color: currentWord.color }}
                        className="inline-block uppercase whitespace-nowrap"
                      >
                        {currentWord.text}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md font-light">
                TEDxBMU 2026 invites you to shatter the boundaries of conventional thinking.
                This is a space where curiosity meets courage, where ideas that once seemed
                impossible become the blueprints of tomorrow.
              </p>
              <div className="flex flex-wrap gap-8 md:gap-12 mt-4">
                <StatBox number={6} suffix="+" label="Speakers" start={statsStarted} />
                <StatBox number={100} suffix="+" label="Attendees" start={statsStarted} />
                <StatBox number={1} suffix="" label="Day of Ideas" start={statsStarted} />
              </div>
            </div>

            {/* RIGHT — Images */}
            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <div className="col-span-1 row-span-2 bg-white/5 rounded-lg overflow-hidden h-80 border border-[#e62b1e]/20 flex items-center justify-center shadow-[0_0_30px_rgba(230,43,30,0.15)] hover:shadow-[0_0_50px_rgba(230,43,30,0.3)] hover:border-[#e62b1e]/40 transition-all duration-500">
                <img
                  src="/gallery/1.jpg"
                  alt="Photo 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white/5 rounded-lg overflow-hidden h-[152px] border border-[#e62b1e]/20 flex items-center justify-center shadow-[0_0_20px_rgba(230,43,30,0.1)] hover:shadow-[0_0_40px_rgba(230,43,30,0.25)] hover:border-[#e62b1e]/40 transition-all duration-500">
                <img
                  src="/gallery/2.jpg"
                  alt="Photo 2"
                  className="w-full h-full object-cover"
                />            </div>
              <div className="bg-white/5 rounded-lg overflow-hidden h-[152px] border border-[#e62b1e]/20 flex items-center justify-center shadow-[0_0_20px_rgba(230,43,30,0.1)] hover:shadow-[0_0_40px_rgba(230,43,30,0.25)] hover:border-[#e62b1e]/40 transition-all duration-500">
                <img
                  src="/gallery/12.jpg"
                  alt="Photo 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}