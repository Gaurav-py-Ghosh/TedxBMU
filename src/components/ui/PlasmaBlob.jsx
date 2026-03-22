"use client";

import { useEffect, useRef } from "react";

export default function PlasmaBlob() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.3, y: 0.4, r: 0.35, sx: 0.0003, sy: 0.0004, ox: 0, oy: 0 },
      { x: 0.7, y: 0.6, r: 0.30, sx: 0.0004, sy: 0.0003, ox: 1, oy: 1 },
      { x: 0.5, y: 0.3, r: 0.25, sx: 0.0005, sy: 0.0002, ox: 2, oy: 2 },
      { x: 0.2, y: 0.7, r: 0.28, sx: 0.0002, sy: 0.0005, ox: 3, oy: 3 },
      { x: 0.8, y: 0.3, r: 0.22, sx: 0.0006, sy: 0.0003, ox: 4, oy: 4 },
    ];

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, i) => {
        const cx = (blob.x + Math.sin(t * blob.sx + blob.ox) * 0.2) * canvas.width;
        const cy = (blob.y + Math.cos(t * blob.sy + blob.oy) * 0.2) * canvas.height;
        const r = blob.r * Math.min(canvas.width, canvas.height);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);

        if (i % 2 === 0) {
          grad.addColorStop(0, "rgba(230, 43, 30, 0.55)");
          grad.addColorStop(0.4, "rgba(180, 10, 10, 0.25)");
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          grad.addColorStop(0, "rgba(150, 0, 0, 0.45)");
          grad.addColorStop(0.4, "rgba(80, 0, 0, 0.2)");
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        }

        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle noise grain overlay
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}