"use client";

import { useState, useRef, useEffect } from "react";

function useVisible(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [headerRef, headerVisible] = useVisible(0.1);
  const [formRef, formVisible] = useVisible(0.1);
  const [rightRef, rightVisible] = useVisible(0.1);

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
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <main className="h-screen bg-black text-white overflow-hidden flex flex-col pt-20 pb-4 px-8 relative">

      {/* Red glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#e62b1e]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div
        ref={headerRef}
        className="max-w-7xl w-full mx-auto mb-4 flex-shrink-0 transition-all duration-700"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight uppercase mt-1">
          <span className="text-white">CONTACT </span>
          <span className="text-[#e62b1e]">US</span>
        </h1>
      </div>

      {/* Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 min-h-0">

        {/* LEFT — Form */}
        <div
          ref={formRef}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 min-h-0 transition-all duration-700 delay-100"
          style={{
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <h2 className="text-lg font-black uppercase tracking-tight flex-shrink-0">Send Us A Message</h2>

          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-full bg-[#e62b1e]/20 border border-[#e62b1e]/40 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#e62b1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-white font-semibold">Message Sent!</p>
              <p className="text-white/40 text-sm text-center">We'll get back to you as soon as possible.</p>
              <button onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", message: "" }); }}
                className="text-[#e62b1e] text-sm underline underline-offset-4">
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 flex-shrink-0">
                <div className="flex flex-col gap-1">
                  <label className="text-white/60 text-xs">First Name *</label>
                  <input type="text" placeholder="First name" value={form.firstName}
                    onChange={e => handleChange("firstName", e.target.value)}
                    className={`bg-transparent border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-200 focus:border-[#e62b1e] ${errors.firstName ? "border-[#e62b1e]" : "border-white/20"}`}
                  />
                  {errors.firstName && <span className="text-[#e62b1e] text-xs">{errors.firstName}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white/60 text-xs">Last Name *</label>
                  <input type="text" placeholder="Last name" value={form.lastName}
                    onChange={e => handleChange("lastName", e.target.value)}
                    className={`bg-transparent border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-200 focus:border-[#e62b1e] ${errors.lastName ? "border-[#e62b1e]" : "border-white/20"}`}
                  />
                  {errors.lastName && <span className="text-[#e62b1e] text-xs">{errors.lastName}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1 flex-shrink-0">
                <label className="text-white/60 text-xs">Email Address *</label>
                <input type="email" placeholder="Enter your email" value={form.email}
                  onChange={e => handleChange("email", e.target.value)}
                  className={`bg-transparent border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-200 focus:border-[#e62b1e] ${errors.email ? "border-[#e62b1e]" : "border-white/20"}`}
                />
                {errors.email && <span className="text-[#e62b1e] text-xs">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-1 flex-1 min-h-0">
                <label className="text-white/60 text-xs flex-shrink-0">Message *</label>
                <textarea placeholder="Tell us how we can help you..." value={form.message}
                  onChange={e => handleChange("message", e.target.value)}
                  className={`bg-transparent border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-200 resize-none flex-1 min-h-0 focus:border-[#e62b1e] ${errors.message ? "border-[#e62b1e]" : "border-white/20"}`}
                />
                {errors.message && <span className="text-[#e62b1e] text-xs">{errors.message}</span>}
              </div>

              <button onClick={handleSubmit}
                className="w-full bg-[#e62b1e] hover:bg-[#c0150f] text-white py-3 rounded-xl font-semibold text-sm tracking-wide flex-shrink-0
                  transition-all duration-300 flex items-center justify-center gap-2
                  shadow-[0_0_30px_rgba(230,43,30,0.3)] hover:shadow-[0_0_50px_rgba(230,43,30,0.5)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Send Message
              </button>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div
          ref={rightRef}
          className="flex flex-col gap-3 min-h-0 transition-all duration-700 delay-200"
          style={{
            opacity: rightVisible ? 1 : 0,
            transform: rightVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            <a href="mailto:tedxbmu@bmu.edu.in"
              className="bg-white/5 border border-white/10 hover:border-[#e62b1e]/40 rounded-2xl p-4 flex items-start gap-3 transition-all duration-300">
              <div className="w-9 h-9 bg-[#e62b1e] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2"/>
                  <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-white font-black text-xs uppercase tracking-wide">Email Us</p>
                <p className="text-[#e62b1e] text-xs font-medium">tedxbmu@bmu.edu.in</p>
                <p className="text-white/40 text-xs">Send us an email anytime</p>
              </div>
            </a>

            <a href="tel:+916350193201"
              className="bg-white/5 border border-white/10 hover:border-[#e62b1e]/40 rounded-2xl p-4 flex items-start gap-3 transition-all duration-300">
              <div className="w-9 h-9 bg-[#e62b1e] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-white font-black text-xs uppercase tracking-wide">Call Us</p>
                <p className="text-[#e62b1e] text-xs font-medium">+91 63501 93201</p>
                <p className="text-white/40 text-xs">Akshat Kabra (Organizer)</p>
              </div>
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col flex-1 min-h-0">
            <div className="px-4 py-3 flex-shrink-0">
              <p className="text-white font-black text-xs uppercase tracking-wide">Find Us</p>
              <p className="text-white/40 text-xs mt-0.5">Visit our campus in Gurugram</p>
            </div>
            <div className="flex-1 min-h-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.6744562543!2d76.63720731455!3d28.356589982536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3dce4de14e0b%3A0xb1787ccb5563c223!2sBML%20Munjal%20University!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                width="100%" height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="flex items-center justify-between flex-shrink-0">
            <p className="text-white/30 text-xs uppercase tracking-widest font-black">Follow TEDxBMU</p>
            <div className="flex items-center gap-2">
              <a href="https://www.linkedin.com/company/tedxbmu/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 hover:border-[#e62b1e]/40 hover:bg-[#e62b1e]/10 rounded-xl flex items-center justify-center transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/tedxbmu/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 hover:border-[#e62b1e]/40 hover:bg-[#e62b1e]/10 rounded-xl flex items-center justify-center transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}