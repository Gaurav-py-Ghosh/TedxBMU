"use client";

import { useState, useEffect } from "react";
import NavLink from "./NavLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastY && currentY > 100 && !isMenuOpen); // hide on scroll down
      setLastY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY, isMenuOpen]);

  return (
    <nav
      className={`fixed left-0 z-50 backdrop-blur-md transition-all duration-500
        ${scrolled
          ? "top-4 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] mx-4 md:mx-8 rounded-2xl border border-white/10"
          : "top-0 w-full border-b border-white/5"
        }
        ${hidden ? "-translate-y-[120%]" : "translate-y-0"}
      `}
      style={{ background: scrolled ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)" }}
    >
      <div
        className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between transition-all duration-500"
        style={{ height: scrolled ? "60px" : "80px" }}
      >
        {/* Logo */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-0 leading-none">
            <span className={`text-[#e62b1e] font-black tracking-tight transition-all duration-500 ${scrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>TED</span>
            <sup className={`text-[#e62b1e] font-black leading-none transition-all duration-500 ${scrolled ? "text-sm md:text-base" : "text-base md:text-lg"}`}>x</sup>
            <span className={`text-white font-light tracking-wide ml-1 md:ml-2 transition-all duration-500 ${scrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>BMU</span>
          </div>
          <p className={`text-white/50 text-[8px] md:text-[10px] font-light tracking-wide mt-1 transition-all duration-500 ${scrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
            <span className="text-[#e62b1e]">x</span> = independently organized TED event
          </p>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`h-0.5 w-6 bg-white transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`h-0.5 w-6 bg-white transition-all ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
          <div className={`h-0.5 w-6 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Links Container */}
        <ul className={`
          flex flex-col lg:flex-row items-center gap-6 xl:gap-8
          fixed lg:static top-0 left-0 w-full h-screen lg:h-auto
          bg-black/95 lg:bg-transparent transition-all duration-500
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          justify-center lg:justify-end
        `}>
          <li onClick={() => setIsMenuOpen(false)}><NavLink label="Home" href="/" /></li>
          <li onClick={() => setIsMenuOpen(false)}><NavLink label="Events" href="/events" /></li>
          <li onClick={() => setIsMenuOpen(false)}><NavLink label="Team" href="/team" /></li>
          <li onClick={() => setIsMenuOpen(false)}><NavLink label="About" href="/about" /></li>
          <li onClick={() => setIsMenuOpen(false)}><NavLink label="Contact" href="/contact" /></li>
          <li className="hidden lg:block">
            <div className="w-px h-4 bg-white/20 mx-1"></div>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <a
              href="/register"
              className="bg-[#e62b1e] hover:bg-[#ff3b2e] text-white text-sm font-bold tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(230,43,30,0.3)] hover:shadow-[0_0_25px_rgba(230,43,30,0.5)] transform hover:-translate-y-0.5"
            >
              Register
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}