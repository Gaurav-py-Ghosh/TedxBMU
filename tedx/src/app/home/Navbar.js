"use client";

import { useState, useEffect } from "react";
import NavLink from "./NavLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 z-50 backdrop-blur-md border-b border-white/5 transition-all duration-500
        ${scrolled
          ? "top-4 w-[calc(100%-4rem)] mx-8"
          : "top-0 w-full"
        }`}
      style={{ background: scrolled ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.2)" }}
    >
      <div className="max-w-7xl mx-auto px-16 flex items-center justify-between transition-all duration-500"
        style={{ height: scrolled ? "60px" : "80px" }}
      >

        {/* Logo */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-0 leading-none">
            <span className={`text-[#e62b1e] font-black tracking-tight transition-all duration-500 ${scrolled ? "text-3xl" : "text-4xl"}`}>TED</span>
            <sup className={`text-[#e62b1e] font-black leading-none transition-all duration-500 ${scrolled ? "text-base" : "text-lg"}`}>x</sup>
            <span className={`text-white font-light tracking-wide ml-2 transition-all duration-500 ${scrolled ? "text-3xl" : "text-4xl"}`}>BMU</span>
          </div>
          <p className={`text-white/50 text-[10px] font-light tracking-wide mt-1 transition-all duration-500 ${scrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
            <span className="text-[#e62b1e]">x</span> = independently organized TED event
          </p>
        </div>

        {/* Nav Links */}
        <ul className="flex items-center gap-8">
  <li><NavLink label="Home" href="/" /></li>
  <li><NavLink label="Events" href="/events" /></li>
  <li><NavLink label="Team" href="/team" /></li>
  <li><NavLink label="About" href="/about" /></li>
  <li><NavLink label="Contact Us" href="/contact" /></li>
  
  <li>
    <a
      href="https://www.bmu.edu.in/"
      target="_blank"
      rel="noopener noreferrer"
      className="relative text-[14px] font-normal tracking-wider font-[family-name:var(--font-raleway)] text-white hover:text-[#e62b1e] transition-colors duration-200"
    >
      BMU
    </a>
  </li>

    <li><NavLink label="Register Now" href="#" /></li>

</ul>

      </div>
    </nav>
  );
}