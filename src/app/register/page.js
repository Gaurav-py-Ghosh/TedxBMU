"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null); // Clear error on typing
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/[\s\-().+]/g, "");
    return /^\d{10,13}$/.test(digits);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.college.trim()) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For now, defaulting to the free registration route as agreed
      // Can easily be swapped out for createPaymentOrder later if needed
      const result = await registerUser(formData);

      if (!result.success) {
        setError(result.error || "Failed to register. Please try again.");
        return;
      }

      // Successful registration
      // Pass ticket ID or other info to success page via query params or just standard redirect
      const ticketId = result.data?.data?.ticket_id || result.data?.ticket_id || "";
      router.push(`/register/success?ticket=${ticketId}&email=${encodeURIComponent(formData.email)}`);

    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 relative flex items-center justify-center selection:bg-[#e62b1e]/30">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-[#e62b1e]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg px-6 md:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#e62b1e]" />
            <span className="text-[#e62b1e] text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">Join Us</span>
            <div className="h-px w-8 bg-[#e62b1e]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-tight mb-3">
            <span className="text-white">Reserve Your </span>
            <span className="text-[#e62b1e]">Spot</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base font-light">
            Register now to experience TEDxBMU 2026.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-white/60 text-xs font-semibold tracking-wide uppercase">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="eg. Mehul Vig"
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#e62b1e]/50 focus:ring-1 focus:ring-[#e62b1e]/50 transition-all"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-white/60 text-xs font-semibold tracking-wide uppercase">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="eg. mehul@example.com"
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#e62b1e]/50 focus:ring-1 focus:ring-[#e62b1e]/50 transition-all"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-white/60 text-xs font-semibold tracking-wide uppercase">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="eg. +91 987xxxxxxx"
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#e62b1e]/50 focus:ring-1 focus:ring-[#e62b1e]/50 transition-all"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="college" className="text-white/60 text-xs font-semibold tracking-wide uppercase">College / University</label>
              <input
                id="college"
                name="college"
                type="text"
                value={formData.college}
                onChange={handleChange}
                placeholder="BML Munjal University"
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#e62b1e]/50 focus:ring-1 focus:ring-[#e62b1e]/50 transition-all"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-[#e62b1e] text-white font-bold tracking-wide uppercase py-4 rounded-lg hover:bg-[#ff3b2e] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(230,43,30,0.3)] hover:shadow-[0_0_30px_rgba(230,43,30,0.5)] disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Register Now</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
