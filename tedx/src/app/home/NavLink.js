"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ label, href }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (!href) return null;

  return (
    <Link
      href={href}
      className={`relative text-[14px] font-normal tracking-wider font-[family-name:var(--font-raleway)] transition-colors duration-200
        after:absolute after:bottom-[-3px] after:left-0 after:h-[2px]
        after:bg-[#e62b1e] after:transition-all after:duration-300
        hover:text-[#e62b1e] hover:after:w-full
        ${isActive
          ? "text-[#e62b1e] after:w-full"
          : "text-white after:w-0"
        }`}
    >
      {label}
    </Link>
  );
} 