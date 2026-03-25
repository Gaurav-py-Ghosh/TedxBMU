"use client";

import { useState } from "react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5002";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Basic client-side validation
        if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.college.trim()) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(form.phone.trim())) {
            setError("Please enter a valid 10-digit Indian phone number.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/registration`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    college: form.college.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Registration failed. Please try again.");
                setLoading(false);
                return;
            }

            setSuccess({
                message: "Registration successful! 🎉",
                ticketId: data.data?.ticket_id,
                name: form.name.trim(),
            });

            // Reset form
            setForm({ name: "", email: "", phone: "", college: "" });
        } catch (err) {
            console.error("Registration error:", err);
            setError("Network error. Is the backend running?");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        TEDx<span className="text-red-500">BMU</span>
                    </h1>
                    <p className="text-gray-400 text-base mt-2">
                        Register for TEDxBMU 2026
                    </p>
                </div>

                {/* Success State */}
                {success ? (
                    <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-5">
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            You&apos;re In! 🎉
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Hey {success.name}, your registration is confirmed!
                        </p>

                        {success.ticketId && (
                            <div className="bg-gray-900/60 border border-gray-700/40 rounded-xl p-4 mb-5">
                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Ticket ID</p>
                                <p className="text-red-400 text-lg font-mono font-bold">{success.ticketId}</p>
                            </div>
                        )}

                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 text-left">
                            <p className="text-yellow-400 text-sm font-medium mb-2">📩 Check your email!</p>
                            <p className="text-yellow-400/70 text-sm">
                                We&apos;ve sent your event ticket with a QR code to your email. Make sure to save it — you&apos;ll need it at the venue.
                            </p>
                        </div>

                        <button
                            onClick={() => setSuccess(null)}
                            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors cursor-pointer"
                        >
                            Register Another
                        </button>
                    </div>
                ) : (
                    /* Registration Form */
                    <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-900/60 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-900/60 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</span>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        maxLength={10}
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-2.5 bg-gray-900/60 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 transition-colors"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            {/* College */}
                            <div>
                                <label htmlFor="college" className="block text-sm font-medium text-gray-300 mb-1.5">
                                    College / Institution <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="college"
                                    name="college"
                                    type="text"
                                    required
                                    value={form.college}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-900/60 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/40 transition-colors"
                                    placeholder="Enter your college name"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:bg-red-800 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer text-base"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Registering...
                                    </span>
                                ) : (
                                    "Register Now"
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="text-center text-gray-600 text-xs mt-6">
                            By registering, you agree to attend the TEDxBMU 2026 event.
                        </p>
                    </div>
                )}

                {/* Admin link */}
                <div className="text-center mt-6">
                    <Link
                        href="/admin/login"
                        className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
                    >
                        Admin Login →
                    </Link>
                </div>
            </div>
        </div>
    );
}
