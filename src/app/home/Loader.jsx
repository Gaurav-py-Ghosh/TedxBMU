"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate as frameAnimate } from "motion/react";

export default function Loader({ onDone }) {
  const [sequence, setSequence] = useState("entering");

  // Track radial mask expansion (0 = solid, 1 = huge hole in middle)
  const maskExpansion = useMotionValue(0);
  const radialMask = useTransform(maskExpansion, (v) =>
    `radial-gradient(circle at center, transparent ${v * 100}%, black ${v * 150}%)`
  );

  // --- CONFIGURATION: Tweak timing and positioning ---
  const tedInitialX = 60;
  const bmuInitialX = -60;
  const logoGap = "gap-2";
  // ------------------------------------------------------

  useEffect(() => {
    // 1. Elements slide in
    const t1 = setTimeout(() => setSequence("peak"), 1000);

    // 2. Build intensity (full red glow)
    const t2 = setTimeout(() => {
      setSequence("zoom");
      // Animate the radial mask expansion DURING the zoom, but starting "a bit late"
      frameAnimate(maskExpansion, 2.0, {
        duration: 2,
        ease: [0.75, 0, 0.5, 1.5], // Extra smooth Quintic-like ease
        delay: 0.8
      });
    }, 2400);

    // 3. Complete sequences
    const t3 = setTimeout(() => setSequence("done"), 4600);
    // Call onDone slightly BEFORE the loader finishes to overlap animations
    const t4 = setTimeout(onDone, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone, maskExpansion]);

  const xPath = "M70.3,69.5h11L67.2,49.1l14.1-20.4H70.3L61.7,41.9l-8.6-13.2H42.1l14.1,20.4L42.1,69.5h11L61.7,56.7L70.3,69.5z";

  return (
    <AnimatePresence>
      {sequence !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Main Logo Container */}
          <div className={`relative flex items-center ${logoGap} select-none`}>

            {/* TED */}
            <motion.div
              initial={{ opacity: 0, x: tedInitialX }}
              animate={{
                opacity: sequence === "zoom" ? 0 : 1,
                x: 0,
                scale: sequence === "zoom" ? 0.8 : 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                opacity: { duration: 0.4, delay: 0.2 },
                x: { duration: 0.8, delay: 0.2 },
              }}
              className="text-7xl font-bold tracking-tighter text-[#e62b1e] lg:text-8xl"
            >
              TED
            </motion.div>

            {/* Premium SVG X */}
            <div className="relative -translate-y-[6px] lg:-translate-y-[8px]">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={
                  sequence === "zoom"
                    ? {
                      scale: 180,
                      rotate: 0,
                      opacity: [1, 1, 0], // Smooth fade out at the end of zoom
                      transition: {
                        duration: 1.8,
                        ease: [0.76, 0, 0.24, 1],
                        opacity: { duration: 0.8, delay: 0.8 }
                      }
                    }
                    : {
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                      }
                    }
                }
                style={{
                  WebkitMaskImage: sequence === "zoom" ? radialMask : "none",
                  maskImage: sequence === "zoom" ? radialMask : "none",
                }}
                className="flex items-center justify-center origin-center"
              >
                <motion.svg
                  viewBox="40 25 45 45"
                  className="w-10 h-10 lg:w-12 lg:h-12 overflow-visible"
                  animate={
                    sequence === "peak"
                      ? {
                        filter: "drop-shadow(0 0 30px rgba(230,43,30,0.4))",
                      }
                      : sequence === "zoom"
                        ? {
                          filter: "drop-shadow(0 0 50px rgba(230,43,30,0.6))",
                        }
                        : { filter: "drop-shadow(0 0 0px rgba(230,43,30,0))" }
                  }
                  transition={{ duration: 0.6 }}
                >
                  <path d={xPath} fill="#e62b1e" />
                </motion.svg>
              </motion.div>
            </div>


            {/* BMU */}
            <motion.div
              initial={{ opacity: 0, x: bmuInitialX }}
              animate={{
                opacity: sequence === "zoom" ? 0 : 1,
                x: 0,
                scale: sequence === "zoom" ? 0.8 : 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.4, delay: 0.2 },
                x: { duration: 0.8, delay: 0.2 },
              }}
              className="text-7xl font-bold tracking-tighter text-white lg:text-8xl"
            >
              BMU
            </motion.div>
          </div>

          {/* Handoff Blackout */}
          <AnimatePresence>
            {sequence === "zoom" && (
              <motion.div
                key="blackout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2, ease: "easeIn" }}
                className="absolute inset-0 bg-black pointer-events-none z-10"
              />
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-b from-[#e62b1e11] to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

