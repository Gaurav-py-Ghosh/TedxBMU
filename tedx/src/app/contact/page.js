"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light">
            Get In Touch
          </span>
          <h1 className="text-7xl lg:text-8xl font-black leading-none tracking-tight uppercase mt-2">
            <span className="text-white">CONTACT </span>
            <span className="text-[#e62b1e]">US</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT — Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Send Us A Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16">
                <div className="w-16 h-16 rounded-full bg-[#e62b1e]/20 border border-[#e62b1e]/40 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#e62b1e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg">
                  Message Sent!
                </p>
                <p className="text-white/40 text-sm text-center">
                  We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      firstName: "",
                      lastName: "",
                      email: "",
                      message: "",
                    });
                  }}
                  className="text-[#e62b1e] text-sm underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/70 text-xs font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      value={form.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      className={`bg-transparent border rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-200
                        focus:border-[#e62b1e] ${errors.firstName ? "border-[#e62b1e]" : "border-white/20"}`}
                    />
                    {errors.firstName && (
                      <span className="text-[#e62b1e] text-xs">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/70 text-xs font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={`bg-transparent border rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-200
                        focus:border-[#e62b1e] ${errors.lastName ? "border-[#e62b1e]" : "border-white/20"}`}
                    />
                    {errors.lastName && (
                      <span className="text-[#e62b1e] text-xs">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/70 text-xs font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`bg-transparent border rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-200
                      focus:border-[#e62b1e] ${errors.email ? "border-[#e62b1e]" : "border-white/20"}`}
                  />
                  {errors.email && (
                    <span className="text-[#e62b1e] text-xs">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/70 text-xs font-medium">
                    Message *
                  </label>
                  <textarea
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={6}
                    className={`bg-transparent border rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-200 resize-none
                      focus:border-[#e62b1e] ${errors.message ? "border-[#e62b1e]" : "border-white/20"}`}
                  />
                  {errors.message && (
                    <span className="text-[#e62b1e] text-xs">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#e62b1e] hover:bg-[#c0150f] text-white py-4 rounded-xl font-semibold text-sm tracking-wide
                    transition-all duration-300 flex items-center justify-center gap-2
                    shadow-[0_0_30px_rgba(230,43,30,0.3)] hover:shadow-[0_0_50px_rgba(230,43,30,0.5)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Send Message
                </button>
              </>
            )}
          </div>

          {/* RIGHT — Info + Map + Social */}
          <div className="flex flex-col gap-4">
            {/* Email + Phone row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <a
                href="mailto:tedxbmu@bmu.edu.in"
                className="bg-white/5 border border-white/10 hover:border-[#e62b1e]/40 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#e62b1e] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M22 6l-10 7L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-white font-black text-sm uppercase tracking-wide">
                    Email Us
                  </p>
                  <p className="text-[#e62b1e] text-xs font-medium">
                    tedxbmu@bmu.edu.in
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    Send us an email anytime
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919810915857"
                className="bg-white/5 border border-white/10 hover:border-[#e62b1e]/40 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#e62b1e] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-white font-black text-sm uppercase tracking-wide">
                    Call Us
                  </p>
                  <p className="text-[#e62b1e] text-xs font-medium">
                    +91 63501 93201
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    Akshat Kabra (Organizer)
                  </p>
                </div>
              </a>
            </div>

            {/* Map */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
              <div className="px-5 py-4">
                <p className="text-white font-black text-sm uppercase tracking-wide">
                  Find Us
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  Visit our campus in Gurugram
                </p>
              </div>
              <div className="w-full h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.6744562543!2d76.63720731455!3d28.356589982536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3dce4de14e0b%3A0xb1787ccb5563c223!2sBML%20Munjal%20University!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "invert(90%) hue-rotate(180deg)",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Social */}
            <div className=" rounded-2xl px-5 py-5 flex flex-col gap-4">
              <p className="text-white font-black text-sm uppercase tracking-wide">
                Follow TEDxBMU
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/tedxbmu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 hover:border-[#e62b1e]/40 hover:bg-[#e62b1e]/10 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/tedxbmu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 hover:border-[#e62b1e]/40 hover:bg-[#e62b1e]/10 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Red glow */}
      <div className="absolute top-32 left-0 w-96 h-96 bg-[#e62b1e]/5 blur-[120px] rounded-full pointer-events-none" />
    </main>
  );
}
