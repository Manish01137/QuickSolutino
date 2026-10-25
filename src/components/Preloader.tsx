"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const STATUS = [
  "Initializing infrastructure",
  "Connecting 100+ countries",
  "Deploying 500+ engineers",
  "All systems online",
];

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d62027";
const RED_LIGHT = "#f0555c";

function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [statusIndex, setStatusIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) =>
    String(Math.round(v)).padStart(3, "0"),
  );
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    setStatusIndex(Math.min(STATUS.length - 1, Math.floor(v / 26)));
  });

  useEffect(() => {
    // Already shown this session: CSS keeps it display:none, nothing to run.
    if (document.documentElement.hasAttribute("data-intro-seen")) return;

    lockScroll(true);
    const controls = animate(progress, 100, {
      duration: reduceMotion ? 0.4 : 2.6,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        try {
          sessionStorage.setItem("qs-intro", "1");
        } catch {}
        setTimeout(() => {
          setVisible(false);
          document.documentElement.setAttribute("data-intro-done", "");
        }, reduceMotion ? 0 : 350);
      },
    });

    return () => {
      controls.stop();
      lockScroll(false);
    };
  }, [progress, reduceMotion]);

  return (
    <AnimatePresence onExitComplete={() => lockScroll(false)}>
      {visible && (
        <motion.div
          id="intro-loader"
          role="status"
          aria-label="Loading Quick Solutions"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[var(--color-dark-1)] text-white"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(50% 0% 50% 0%)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${RED} 0%, transparent 65%)`,
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px origin-center"
            style={{
              background: `linear-gradient(90deg, transparent, ${RED_LIGHT}, transparent)`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.6, 0.15] }}
            transition={{ duration: 1.4, ease: EASE }}
          />

          <div className="relative flex flex-col items-center px-6">
            <Emblem />

            <div className="mt-8 overflow-hidden text-center">
              <div className="flex justify-center">
                {"QUICK".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-3xl font-extrabold tracking-tight sm:text-4xl"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.06, ease: EASE }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <motion.p
                className="mt-1 text-xs font-semibold text-[var(--color-primary)] sm:text-sm"
                initial={{ opacity: 0, letterSpacing: "0.9em" }}
                animate={{ opacity: 1, letterSpacing: "0.42em" }}
                transition={{ duration: 1.1, delay: 0.85, ease: EASE }}
              >
                SOLUTIONS
              </motion.p>
            </div>

            <div className="mt-8 h-5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusIndex}
                  className="inline-flex items-center gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      statusIndex === STATUS.length - 1
                        ? "bg-emerald-400"
                        : "animate-pulse bg-[var(--color-primary)]"
                    }`}
                  />
                  {STATUS[statusIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-10 sm:pb-10">
            <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
              <span className="hidden sm:inline">Global IT Infrastructure Partner</span>
              <span className="flex items-baseline gap-1 text-white">
                <motion.span className="text-4xl font-bold tabular-nums tracking-normal sm:text-6xl">
                  {counter}
                </motion.span>
                <span className="text-slate-500">%</span>
              </span>
            </div>
            <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full"
                style={{
                  scaleX: barScale,
                  background: `linear-gradient(90deg, ${RED}, ${RED_LIGHT})`,
                  boxShadow: `0 0 12px ${RED_LIGHT}`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Emblem() {
  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44">
      <motion.span
        aria-hidden
        className="absolute inset-[18%] rounded-full border-2"
        style={{ borderColor: RED_LIGHT }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.9], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />

      <svg viewBox="0 0 160 160" className="relative h-full w-full" fill="none">
        <motion.g
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 1 }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.6, delay: 0.2 },
          }}
        >
          {/* Symmetric bounding box so the orbit rotates around the true center. */}
          <circle cx="80" cy="80" r="74" />
          <circle
            cx="80"
            cy="80"
            r="66"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeDasharray="2 7"
          />
          <circle cx="80" cy="14" r="4" fill={RED_LIGHT} />
          <circle cx="137" cy="113" r="3" fill="#ffffff" />
          <circle cx="23" cy="113" r="3" fill={RED} />
        </motion.g>

        {[62, 76, 90].map((y, i) => (
          <motion.line
            key={y}
            x1={18 + i * 6}
            y1={y}
            x2={42}
            y2={y}
            stroke={i === 1 ? RED : RED_LIGHT}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, x: -24, opacity: 0 }}
            animate={{ pathLength: 1, x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
          />
        ))}

        <motion.circle
          cx="86"
          cy="76"
          r="32"
          stroke={RED}
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1, rotate: -90 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        />
        <motion.path
          d="M106 98 L124 118"
          stroke={RED}
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.25, ease: EASE }}
        />
        <motion.circle
          cx="86"
          cy="76"
          r="8"
          fill="#ffffff"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.35, ease: EASE }}
        />
      </svg>
    </div>
  );
}
