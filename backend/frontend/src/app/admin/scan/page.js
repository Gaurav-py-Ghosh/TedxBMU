"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5002";

export default function ScanPage() {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading, logout, getToken } = useAuth();
    const [scanning, setScanning] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success'|'warning'|'error', message: string }
    const [cameraError, setCameraError] = useState(null);
    const scannerRef = useRef(null);
    const processingRef = useRef(false);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/admin/login");
            return;
        }

        return () => {
            // Cleanup scanner on unmount
            if (scannerRef.current?.isScanning) {
                scannerRef.current.stop().catch(() => { });
            }
        };
    }, [authLoading, isAuthenticated, router]);

    const startScanner = async () => {
        setCameraError(null);
        setStatus(null);

        try {
            const scanner = new Html5Qrcode("qr-reader");
            scannerRef.current = scanner;

            await scanner.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                onScanSuccess,
                () => { } // ignore scan failures (no QR in frame)
            );

            setScanning(true);
        } catch (err) {
            console.error("Camera error:", err);
            setCameraError(
                "Camera access denied. Please allow camera permissions and try again."
            );
        }
    };

    const stopScanner = async () => {
        if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop();
        }
        setScanning(false);
    };

    const onScanSuccess = async (decodedText) => {
        // Prevent multiple simultaneous scans
        if (processingRef.current) return;
        processingRef.current = true;

        setLoading(true);
        setStatus(null);

        try {
            // Validate JSON format
            let parsed;
            try {
                parsed = JSON.parse(decodedText);
            } catch {
                setStatus({ type: "error", message: "Invalid QR code format" });
                setLoading(false);
                processingRef.current = false;
                return;
            }

            if (!parsed.ticket_id || !parsed.signature) {
                setStatus({ type: "error", message: "QR code missing required fields" });
                setLoading(false);
                processingRef.current = false;
                return;
            }

            const token = getToken();
            if (!token) {
                setStatus({ type: "error", message: "Not authenticated. Please login first." });
                setLoading(false);
                processingRef.current = false;
                return;
            }

            const res = await fetch(`${BACKEND_URL}/api/attendance/mark`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ qr_data: decodedText }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({
                    type: "success",
                    message: data.name
                        ? `✅ ${data.name} — Attendance marked!`
                        : "✅ Attendance marked successfully!",
                });
            } else if (res.status === 400 && data.message?.includes("already")) {
                setStatus({ type: "warning", message: `⚠️ ${data.message}` });
            } else if (res.status === 403) {
                setStatus({ type: "error", message: `🚫 ${data.message}` });
            } else if (res.status === 401) {
                setStatus({ type: "error", message: "🔒 Session expired. Please login again." });
            } else {
                setStatus({ type: "error", message: `❌ ${data.message || "Unknown error"}` });
            }
        } catch (err) {
            console.error("Scan request error:", err);
            setStatus({ type: "error", message: "Network error. Check your connection." });
        }

        setLoading(false);

        // Allow next scan after a short delay
        setTimeout(() => {
            processingRef.current = false;
        }, 2000);
    };

    return (
        <>
            {authLoading ? (
                <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
                    <div className="text-gray-400">Loading...</div>
                </div>
            ) : !isAuthenticated ? (
                null
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex flex-col gap-4">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-white tracking-tight">
                                        TEDx<span className="text-red-500">BMU</span> Scanner
                                    </h1>
                                    <p className="text-gray-400 text-sm mt-1">Scan attendee QR codes</p>
                                </div>
                                <div className="flex gap-3 w-full">
                                    <Link
                                        href="/admin/dashboard"
                                        className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors text-center cursor-pointer border border-gray-700/50"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors border border-gray-700/50 cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Scanner Card */}
                        <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Camera View */}
                            <div className="p-4">
                                <div
                                    id="qr-reader"
                                    className="w-full rounded-xl overflow-hidden bg-gray-900/80"
                                    style={{ minHeight: scanning ? "300px" : "0px" }}
                                />

                                {!scanning && !cameraError && (
                                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                        <svg
                                            className="w-16 h-16 mb-3 opacity-40"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M3 9V6a3 3 0 013-3h3M21 9V6a3 3 0 00-3-3h-3M3 15v3a3 3 0 003 3h3m6 0h3a3 3 0 003-3v-3"
                                            />
                                        </svg>
                                        <p className="text-sm">Tap Start to begin scanning</p>
                                    </div>
                                )}

                                {/* Camera Error */}
                                {cameraError && (
                                    <div className="flex flex-col items-center justify-center py-8 text-red-400">
                                        <svg
                                            className="w-12 h-12 mb-3 opacity-60"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"
                                            />
                                        </svg>
                                        <p className="text-sm text-center px-4">{cameraError}</p>
                                    </div>
                                )}
                            </div>

                            {/* Status Message */}
                            {(status || loading) && (
                                <div className="px-4 pb-4">
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-700/50 text-gray-300 text-sm">
                                            <svg
                                                className="w-4 h-4 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                />
                                            </svg>
                                            Verifying...
                                        </div>
                                    ) : status ? (
                                        <div
                                            className={`py-3 px-4 rounded-xl text-sm font-medium ${status.type === "success"
                                                ? "bg-green-500/15 text-green-400 border border-green-500/30"
                                                : status.type === "warning"
                                                    ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                                                    : "bg-red-500/15 text-red-400 border border-red-500/30"
                                                }`}
                                        >
                                            {status.message}
                                        </div>
                                    ) : null}
                                </div>
                            )}

                            {/* Controls */}
                            <div className="p-4 pt-0">
                                {!scanning ? (
                                    <button
                                        onClick={startScanner}
                                        className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
                                    >
                                        Start Scanner
                                    </button>
                                ) : (
                                    <button
                                        onClick={stopScanner}
                                        className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
                                    >
                                        Stop Scanner
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Footer hint */}
                        <p className="text-center text-gray-600 text-xs mt-4">
                            Point the camera at a TEDxBMU ticket QR code
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
