"use client";

import React from "react";

export default function StarBorder({
  as: Component = "button",
  children,
  className = "",
  ...props
}) {
  return (
    <Component
      className={`relative z-10 inline-flex items-center justify-center cursor-pointer 
        text-white text-base font-medium px-12 py-4 rounded-full 
        border border-white/30 transition-all duration-300
        hover:border-[#e62b1e] hover:shadow-[0_0_35px_6px_rgba(230,43,30,0.4)] 
        bg-white/5 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}