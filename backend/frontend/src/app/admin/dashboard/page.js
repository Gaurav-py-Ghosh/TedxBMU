"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5002";
const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || "";

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading, logout, getToken } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloading, setDownloading] = useState({ attended: false });

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/admin/login");
            return;
        }

        if (!authLoading && isAuthenticated) {
            fetchStats();
        }
    }, [authLoading, isAuthenticated, router, fetchStats]);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            if (!token) {
                router.push("/admin/login");
                return;
            }

            const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401 || res.status === 403) {
                logout();
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to fetch stats");
            }

            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error("Stats fetch error:", err);
            setError("Failed to load dashboard data. Please try again.");
        }

        setLoading(false);
    }, [router, logout, getToken]);

    const handleDownload = async (type) => {
        setDownloading((prev) => ({ ...prev, [type]: true }));
        try {
            const token = getToken();
            if (!token) {
                router.push("/admin/login");
                return;
            }

            const res = await fetch(`${BACKEND_URL}/api/admin/download/${type}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401 || res.status === 403) {
                logout();
                return;
            }

            if (!res.ok) {
                throw new Error("Download failed");
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "attended_people.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download error:", err);
            alert("Failed to download file. Please try again.");
        }
        setDownloading((prev) => ({ ...prev, [type]: false }));
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const statCards = stats
        ? [
            {
                label: "Total Registrations",
                value: stats.total_registrations,
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                ),
                color: "blue",
            },
            {
                label: "Attended",
                value: stats.total_attended,
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                color: "green",
            },
            {
                label: "Remaining",
                value: stats.total_remaining,
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
                color: "yellow",
            },
            {
                label: "Attendance %",
                value: `${stats.attendance_percentage}%`,
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                ),
                color: "red",
            },
        ]
        : [];

    const colorMap = {
        blue: {
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            icon: "text-blue-400",
            value: "text-blue-300",
        },
        green: {
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            icon: "text-green-400",
            value: "text-green-300",
        },
        yellow: {
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20",
            icon: "text-yellow-400",
            value: "text-yellow-300",
        },
        red: {
            bg: "bg-red-500/10",
            border: "border-red-500/20",
            icon: "text-red-400",
            value: "text-red-300",
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                TEDx<span className="text-red-500">BMU</span> Dashboard
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">Event analytics overview</p>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Link
                                href="/admin/scan"
                                className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-medium transition-colors text-center cursor-pointer"
                            >
                                Scanner
                            </Link>
                            <button
                                onClick={logout}
                                className="flex-1 sm:flex-none px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors border border-gray-700/50 cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-5 animate-pulse"
                            >
                                <div className="h-4 bg-gray-700/50 rounded w-2/3 mb-4" />
                                <div className="h-8 bg-gray-700/50 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button
                            onClick={fetchStats}
                            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Stats Cards */}
                {stats && !loading && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {statCards.map((card) => {
                                const colors = colorMap[card.color];
                                return (
                                    <div
                                        key={card.label}
                                        className={`${colors.bg} border ${colors.border} rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-400 text-sm font-medium">
                                                {card.label}
                                            </span>
                                            <span className={colors.icon}>{card.icon}</span>
                                        </div>
                                        <p className={`text-3xl font-bold ${colors.value}`}>
                                            {card.value}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Progress Bar */}
                        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-white font-semibold">Attendance Progress</h2>
                                <span className="text-gray-400 text-sm">
                                    {stats.total_attended} / {stats.total_registrations}
                                </span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${stats.attendance_percentage}%` }}
                                />
                            </div>
                            <p className="text-gray-500 text-xs mt-2 text-right">
                                {stats.attendance_percentage}% checked in
                            </p>
                        </div>

                        {/* Export Data */}
                        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mt-6">
                            <h2 className="text-white font-semibold mb-4">Export Data</h2>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    id="view-registrations"
                                    href={GOOGLE_SHEET_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors ${GOOGLE_SHEET_URL ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer" : "bg-gray-700 text-gray-500 cursor-not-allowed pointer-events-none"}`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    View Registrations
                                </a>
                                <button
                                    id="download-attended"
                                    onClick={() => handleDownload("attended")}
                                    disabled={downloading.attended}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
                                >
                                    {downloading.attended ? (
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    )}
                                    {downloading.attended ? "Downloading..." : "Download Attended"}
                                </button>
                            </div>
                        </div>

                        {/* Refresh Button */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={fetchStats}
                                className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors border border-gray-700/50 cursor-pointer"
                            >
                                ↻ Refresh Data
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
