"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket");
  const email = searchParams.get("email");

  return (
    <div className="relative w-full max-w-lg px-6 md:px-8 text-center z-10">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-[#e62b1e] rounded-full blur-[20px] opacity-40 animate-pulse" />
          <CheckCircle2 className="w-24 h-24 text-[#e62b1e] relative z-10" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-tight mb-4">
        <span className="text-white">You're </span>
        <span className="text-[#e62b1e]">In!</span>
      </h1>
      
      <p className="text-white/60 text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
        Your registration for TEDxBMU 2026 is confirmed.
      </p>

      {ticketId && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm mb-8 inline-block w-full max-w-sm mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-semibold mb-2">Ticket ID</p>
          <p className="text-[#e62b1e] text-2xl md:text-3xl font-mono font-black tracking-widest">{ticketId}</p>
          {email && (
            <p className="text-white/50 text-sm mt-4">
              We've sent an email with your ticket and QR code to <br/>
              <span className="text-white font-medium">{email}</span>
            </p>
          )}
        </div>
      )}

      <div>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold font-inter group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function RegisterSuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#e62b1e]/5 blur-[200px] rounded-full pointer-events-none" />
      
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
