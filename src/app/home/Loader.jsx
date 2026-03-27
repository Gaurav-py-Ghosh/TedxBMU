"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";

export default function Loader({ onDone }) {
  const [sequence, setSequence] = useState("entering");

  // --- CONFIGURATION: EDIT THESE TO TWEAK POSITIONING ---
  const tedInitialX = 40;    // TED slides out from the center (start position)
  const bmuInitialX = -40;   // BMU slides out from the center (start position)
  const logoGap = "gap-1";   // Space between TED, x, and BMU
  const xOffsetX = "0px";    // Horizontal nudge for the "x"
  const xOffsetY = "-8px";   // Vertical nudge for the "x"
  // ------------------------------------------------------



  useEffect(() => {
    const t1 = setTimeout(() => setSequence("peak"), 900);
    const t2 = setTimeout(() => setSequence("zoom"), 2200);
    const t3 = setTimeout(() => setSequence("done"), 3800);
    const t4 = setTimeout(onDone, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {sequence !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Logo group */}
          <div className={`relative flex items-center ${logoGap} select-none`}>
            {/* TED */}
            <motion.div
              initial={{ opacity: 0, x: tedInitialX }}
              animate={{
                opacity: sequence === "zoom" ? 0 : 1,
                x: 0,
              }}
              transition={sequence === "zoom" ? { duration: 0.2 } : {
                opacity: { duration: 0.4, delay: 0.8 },
                x: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
              }}
              className="text-6xl font-black text-[#e62b1e]"
            >
              TED
            </motion.div>

            {/* The X — scales to fill the entire screen */}
            <div style={{ transform: `translate(${xOffsetX}, ${xOffsetY})` }}>
              <motion.div
                className="relative flex items-center justify-center origin-center"
                initial={{ scale: 0 }}
                animate={
                  sequence === "zoom"
                    ? { scale: 150 }
                    : { scale: 1 }
                }
                transition={
                  sequence === "zoom"
                    ? {
                      scale: {
                        duration: 1.4,
                        ease: [0.65, 0, 0.15, 1],
                      },
                    }
                    : {
                      scale: {
                        duration: 0.55,
                        delay: 0,
                        type: "spring",
                        bounce: 0.35,
                      },
                    }
                }
              >
                <motion.span
                  className="text-6xl font-black text-[#e62b1e] block"
                  animate={
                    sequence === "peak"
                      ? {
                        textShadow:
                          "0 0 30px rgba(230,43,30,0.5), 0 0 60px rgba(230,43,30,0.25)",
                      }
                      : sequence === "zoom"
                        ? {
                          textShadow:
                            "0 0 80px rgba(230,43,30,0.8), 0 0 160px rgba(230,43,30,0.4)",
                        }
                        : { textShadow: "0 0 0px rgba(230,43,30,0)" }
                  }
                  transition={{ duration: 0.5 }}
                >
                  x
                </motion.span>
              </motion.div>
            </div>

            {/* BMU */}
            <motion.div
              initial={{ opacity: 0, x: bmuInitialX }}
              animate={{
                opacity: sequence === "zoom" ? 0 : 1,
                x: 0,
              }}
              transition={sequence === "zoom" ? { duration: 0.2 } : {
                opacity: { duration: 0.4, delay: 0.8 },
                x: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
              }}
              className="text-6xl font-black text-white"
            >
              BMU
            </motion.div>
          </div>

          {/* 
            Black overlay that fades in AFTER the x has filled the screen,
            creating a clean handoff to the hero underneath 
          */}
          <AnimatePresence>
            {sequence === "zoom" && (
              <motion.div
                key="blackout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.1, ease: "easeIn" }}
                className="absolute inset-0 bg-black pointer-events-none z-10"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}