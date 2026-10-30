"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { LOGO_RING, TIMING, createIntroCanvas } from "./preloader/engine";
import { LOGO_H, LOGO_W } from "./preloader/logoPoints";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED_LIGHT = "#f0555c";

const LOG = [
  { at: 150, done: 700, text: "Initializing infrastructure" },
  { at: 800, done: 1400, text: "Connecting 100+ countries" },
  { at: 1500, done: 2150, text: "Deploying 500+ engineers" },
  { at: 2250, done: 2700, text: "All systems online" },
];

const CORNERS = [
  "left-4 top-4 border-l border-t sm:left-8 sm:top-8",
  "right-4 top-4 border-r border-t sm:right-8 sm:top-8",
  "bottom-4 left-4 border-b border-l sm:bottom-8 sm:left-8",
  "bottom-4 right-4 border-b border-r sm:bottom-8 sm:right-8",
];

// The logo's Q ring centre as a fraction of the logo box: the iris opens from here.
const RING_FX = LOGO_RING.cx / LOGO_W;
const RING_FY = LOGO_RING.cy / LOGO_H;

const istFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

const noopSubscribe = () => () => {};
const seenOnClient = () => document.documentElement.hasAttribute("data-intro-seen");
const seenOnServer = () => false;

export function Preloader() {
  const seen = useSyncExternalStore(noopSubscribe, seenOnClient, seenOnServer);
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [exiting, setExiting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<() => void>(() => {});

  const progress = useMotionValue(0);
  const progressFrac = useTransform(progress, [0, 100], [0, 1]);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));

  const fade = useMotionValue(1);
  const irisX = useMotionValue(0);
  const irisY = useMotionValue(0);
  const irisR = useMotionValue(0);
  const irisEdge = useTransform(irisR, (r) => r + 2);
  const iris = useMotionTemplate`radial-gradient(circle at ${irisX}px ${irisY}px, transparent ${irisR}px, #000 ${irisEdge}px)`;

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-intro-seen")) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 500 : TIMING.exit;
    const start = performance.now();
    lockScroll(true);

    const engine =
      !reduce && canvasRef.current
        ? createIntroCanvas(canvasRef.current, () => {
            const r = emblemRef.current?.getBoundingClientRect();
            return r ? { x: r.left, y: r.top, scale: r.width / LOGO_W } : { x: 0, y: 0, scale: 1 };
          })
        : null;

    const progressAnim = animate(progress, 100, { duration: total / 1000, ease: [0.65, 0, 0.35, 1] });
    let exited = false;
    let tick = 0;

    const finish = () => {
      engine?.stop();
      lockScroll(false);
      setVisible(false);
    };

    const beginExit = () => {
      if (exited) return;
      exited = true;
      window.clearInterval(tick);
      progressAnim.stop();
      progress.set(100);
      try {
        sessionStorage.setItem("qs-intro", "1");
      } catch {}
      // Lets the hero start its entrance while the iris opens.
      document.documentElement.setAttribute("data-intro-done", "");

      if (reduce) {
        animate(fade, 0, { duration: 0.4, onComplete: finish });
        return;
      }

      const rect = emblemRef.current?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width * RING_FX : window.innerWidth / 2;
      const cy = rect ? rect.top + rect.height * RING_FY : window.innerHeight / 2;
      irisX.set(cx);
      irisY.set(cy);
      const maxR =
        Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) + 60;

      engine?.explode();
      setExiting(true);
      animate(irisR, maxR, { duration: 1.15, delay: 0.15, ease: [0.83, 0, 0.17, 1], onComplete: finish });
    };
    exitRef.current = beginExit;

    tick = window.setInterval(() => {
      const t = performance.now() - start;
      setElapsed(t);
      if (t >= total) beginExit();
    }, 50);

    return () => {
      window.clearInterval(tick);
      progressAnim.stop();
      engine?.stop();
      lockScroll(false);
    };
  }, [progress, fade, irisR, irisX, irisY]);

  if (!visible || seen) return null;

  const brand = reduceMotion || elapsed >= TIMING.brand;
  const fadeOut = { opacity: exiting ? 0 : 1 };

  return (
    <motion.div
      id="intro-loader"
      role="status"
      aria-label="Loading Quick Solutions"
      className="fixed inset-0 z-[100] overflow-hidden bg-[#06102a] text-white"
      style={exiting ? { opacity: fade, maskImage: iris, WebkitMaskImage: iris } : { opacity: fade }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,#152c60_0%,#0b1b3a_45%,#040b1d_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)]"
      />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      <motion.div
        aria-hidden
        className="absolute inset-x-0 h-40"
        initial={{ top: "-25%" }}
        animate={{ top: "125%" }}
        transition={{ duration: 1.7, ease: "easeInOut", delay: 0.1 }}
      >
        <div className="h-full bg-gradient-to-b from-transparent via-[#f0555c]/[0.10] to-transparent" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#ff7a7e]/70 to-transparent" />
      </motion.div>

      {CORNERS.map((c) => (
        <motion.span
          key={c}
          aria-hidden
          className={`absolute h-5 w-5 border-white/30 sm:h-7 sm:w-7 ${c}`}
          initial={{ opacity: 0, scale: 1.8 }}
          animate={exiting ? { opacity: 0 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: exiting ? 0 : 0.2, ease: EASE }}
        />
      ))}

      <motion.div
        className="absolute inset-x-0 top-0 flex items-start justify-between px-8 pt-8 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-slate-400 sm:px-14 sm:pt-12"
        initial={{ opacity: 0 }}
        animate={fadeOut}
        transition={{ duration: exiting ? 0.3 : 0.8, delay: exiting ? 0 : 0.3 }}
      >
        <div className="hidden leading-relaxed sm:block">
          <p className="text-white/80">Quick Solutions</p>
          <p className="text-slate-500">Global IT Infrastructure Partner</p>
        </div>
        <div className="ml-auto flex items-center gap-5">
          <span className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Ahmedabad <IstClock /> IST
          </span>
          <button
            type="button"
            onClick={() => exitRef.current()}
            className="rounded-full border border-white/15 px-3.5 py-1.5 text-[0.625rem] tracking-[0.2em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            Skip intro
          </button>
        </div>
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div
          ref={emblemRef}
          className="relative"
          style={{ width: "clamp(260px, 56vmin, 36rem)", aspectRatio: `${LOGO_W} / ${LOGO_H}` }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: `${RING_FX * 100}% ${RING_FY * 100}%` }}
            animate={exiting ? { scale: 9, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.7, 0, 0.84, 0] }}
          >
            <LogoReveal brand={brand} progress={progressFrac} />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 px-6 pb-7 sm:px-14 sm:pb-12"
        initial={{ opacity: 0 }}
        animate={fadeOut}
        transition={{ duration: exiting ? 0.3 : 0.8, delay: exiting ? 0 : 0.4 }}
      >
        <div className="flex items-end justify-between gap-6">
          <ul className="w-full max-w-[62%] space-y-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] sm:max-w-sm sm:text-[0.6875rem]">
            {LOG.map((line) => {
              const shown = reduceMotion || elapsed >= line.at;
              const ok = reduceMotion || elapsed >= line.done;
              return (
                <li
                  key={line.text}
                  className={`flex items-center transition-all duration-500 ${shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                >
                  <span className="text-[#ff5a5f]">›</span>
                  <span className="ml-2 whitespace-nowrap text-slate-300">{line.text}</span>
                  <span className="mx-2 min-w-3 flex-1 border-b border-dotted border-white/15" />
                  {ok ? (
                    <span className="text-emerald-400">OK</span>
                  ) : (
                    <span className="animate-pulse text-slate-500">···</span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="shrink-0 text-right">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.3em] text-slate-500 sm:text-[0.625rem]">Loading</p>
            <p className="font-mono text-4xl font-bold leading-none tabular-nums sm:text-6xl">
              <motion.span>{counter}</motion.span>
              <span className="text-lg text-slate-500 sm:text-2xl">%</span>
            </p>
          </div>
        </div>
        <div className="mt-4 h-px w-full bg-white/10">
          <motion.div
            className="h-px origin-left bg-gradient-to-r from-[#d62027] to-[#ff7a7e] shadow-[0_0_12px_#f0555c]"
            style={{ scaleX: progressFrac }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

const LOGO_SRC = "/brand/quick-solutions-logo-white.svg";
const LOGO_MASK = `url(${LOGO_SRC}) center / contain no-repeat`;
// Orbit ring around the logo's Q bubble, as a fraction of the logo box.
const ORBIT_D = 64 / LOGO_W;

function LogoReveal({ brand, progress }: { brand: boolean; progress: MotionValue<number> }) {
  return (
    <>
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="absolute overflow-visible"
        style={{
          width: `${ORBIT_D * 100}%`,
          left: `${(RING_FX - ORBIT_D / 2) * 100}%`,
          top: "50%",
          transform: `translateY(calc(-50% + ${(RING_FY - 0.5) * 100}%))`,
          aspectRatio: "1",
        }}
        fill="none"
      >
        <g className="animate-[spin_14s_linear_infinite]" style={{ transformOrigin: "50px 50px", transformBox: "view-box" }}>
          <circle cx="50" cy="50" r="49" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5" strokeDasharray="1.2 4" />
          <circle cx="50" cy="1" r="1.6" fill={RED_LIGHT} />
          <circle cx="92.4" cy="74.5" r="1.1" fill="#fff" />
        </g>
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          stroke={RED_LIGHT}
          strokeWidth="1.1"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ pathLength: progress }}
        />
      </svg>

      {/* The real logo, revealed over the particles that formed it. */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={brand ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(6px)" }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ filter: "drop-shadow(0 0 22px rgba(214,32,39,0.45))" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_SRC} alt="Quick Solutions — Your Local Service Provider" className="h-full w-full" draggable={false} />
      </motion.div>

      {/* Light sweep clipped to the logo's own shape. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ mask: LOGO_MASK, WebkitMask: LOGO_MASK }}
      >
        <motion.div
          className="absolute inset-y-[-20%] w-1/4 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/90 to-transparent"
          initial={{ left: "-35%" }}
          animate={{ left: brand ? "120%" : "-35%" }}
          transition={{ duration: 1.1, delay: brand ? 0.4 : 0, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </>
  );
}

function IstClock() {
  const [now, setNow] = useState(() => istFormat.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setNow(istFormat.format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span suppressHydrationWarning className="tabular-nums text-white/80">
      {now}
    </span>
  );
}
