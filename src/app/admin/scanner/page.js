"use client";

import { useEffect, useState, useRef } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { markAttendance } from "@/lib/api";
import { CheckCircle2, XCircle, RefreshCw, Camera } from "lucide-react";
import Link from "next/link";

export default function AdminScannerPage() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopScanner();
    };
  }, []);

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Failed to stop scanner", err);
      } finally {
        scannerRef.current = null;
      }
    }
  };

  const startScanner = async () => {
    setPermissionError(false);
    setIsScanning(true);
    setScanResult(null);

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("qr-reader", {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
        });
      }

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanError
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      setIsScanning(false);
      setPermissionError(true);
      await stopScanner();
    }
  };

  const onScanSuccess = async (decodedText) => {
    // Stop scanning immediately upon successful read to prevent duplicate calls
    setIsScanning(false);
    await stopScanner();

    setScanResult({ type: "loading", message: "Processing QR Code..." });

    try {
      const token = localStorage.getItem("adminToken");
      const result = await markAttendance(token, decodedText);

      if (result.success) {
        setScanResult({ 
          type: "success", 
          message: result.message || "Attendance marked successfully!",
          name: result.data?.name 
        });
      } else {
        setScanResult({ 
          type: "error", 
          message: result.error || "Failed to mark attendance" 
        });
      }
    } catch (err) {
      setScanResult({ 
        type: "error", 
        message: "Network error while processing QR code." 
      });
    }
  };

  const onScanError = (error) => {
    // We typically ignore read errors (it throws continually while looking for a QR code)
  };

  const resetScanner = () => {
    startScanner();
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-2xl mx-auto pb-16 pt-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight mb-2">
          Ticket <span className="text-[#e62b1e]">Scanner</span>
        </h1>
        <p className="text-white/50 text-sm">Hold the attendee's QR code up to the camera.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
        
        {/* Dynamic Background Glow based on state */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[100px] opacity-10 pointer-events-none transition-colors duration-500 ${
          scanResult?.type === 'success' ? 'bg-[#10b981]' : 
          scanResult?.type === 'error' ? 'bg-red-500' : 
          'bg-[#e62b1e]'
        }`} />

        <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
          
          {/* Scanner container always rendered but hidden when not scanning */}
          <div 
            id="qr-reader" 
            className={`w-full rounded-2xl overflow-hidden [&>*]:!font-inter ${!isScanning ? 'hidden' : ''}`} 
          />

          {!isScanning && !scanResult && (
            <div className="flex flex-col items-center text-center p-8">
              <Camera className="w-16 h-16 text-white/20 mb-6" />
              {permissionError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl mb-6">
                  Could not access camera. Please ensure you have granted camera permissions to this site.
                </div>
              )}
              <button 
                onClick={startScanner}
                className="bg-[#e62b1e] text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-[#ff3b2e] transition-colors w-full"
              >
                {permissionError ? "Retry Camera Access" : "Start Scanning"}
              </button>
            </div>
          )}

          {scanResult && scanResult.type === "loading" && (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <RefreshCw className="w-16 h-16 text-[#e62b1e] animate-spin mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-widest text-white animate-pulse">Processing</h3>
            </div>
          )}

          {scanResult && scanResult.type === "success" && (
            <div className="flex flex-col items-center justify-center text-center p-6 animate-in zoom-in-95 duration-300 w-full">
              <div className="bg-[#10b981]/20 p-4 rounded-full mb-4 ring-4 ring-[#10b981]/10">
                <CheckCircle2 className="w-16 h-16 text-[#10b981]" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-tight">Access Granted</h3>
              {scanResult.name && (
                <p className="text-[#10b981] text-xl font-bold mb-4">{scanResult.name}</p>
              )}
              <p className="text-white/60 text-sm mb-8">{scanResult.message}</p>
              
              <button 
                onClick={resetScanner}
                className="bg-white text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors w-full"
              >
                Scan Next Person
              </button>
            </div>
          )}

          {scanResult && scanResult.type === "error" && (
            <div className="flex flex-col items-center justify-center text-center p-6 animate-in zoom-in-95 duration-300 w-full">
              <div className="bg-red-500/20 p-4 rounded-full mb-4 ring-4 ring-red-500/10">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-tight">Scan Failed</h3>
              <p className="text-white/60 text-sm mb-8">{scanResult.message}</p>
              
              <button 
                onClick={resetScanner}
                className="bg-white/10 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-white/20 transition-colors w-full mb-3"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <Link 
          href="/admin/dashboard" 
          className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
