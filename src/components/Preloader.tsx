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
import { EMBLEM_RING, SPEED_LINES, TAIL, TIMING, createIntroCanvas } from "./preloader/engine";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d62027";
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

// Ring centre as a fraction of the emblem box: the iris opens from here.
const RING_FX = EMBLEM_RING.cx / 160;
const RING_FY = EMBLEM_RING.cy / 160;

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
            return r ? { x: r.left, y: r.top, scale: r.width / 160 } : { x: 0, y: 0, scale: 1 };
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
        <div ref={emblemRef} className="relative aspect-square" style={{ width: "clamp(150px, 34vmin, 18.75rem)" }}>
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: `${RING_FX * 100}% ${RING_FY * 100}%` }}
            animate={exiting ? { scale: 9, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.7, 0, 0.84, 0] }}
          >
            <Emblem brand={brand} progress={progressFrac} />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center sm:mt-10"
          animate={exiting ? { opacity: 0, y: -12, filter: "blur(6px)" } : { opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <DecodeText text="QUICK" startMs={reduceMotion ? 0 : 1450} className="text-4xl font-extrabold tracking-tight sm:text-5xl" />
          <motion.p
            className="mt-2 text-[0.6875rem] font-semibold text-[#ff5a5f] sm:text-sm"
            initial={{ opacity: 0, letterSpacing: "1.2em" }}
            animate={brand ? { opacity: 1, letterSpacing: "0.5em" } : { opacity: 0, letterSpacing: "1.2em" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            SOLUTIONS
          </motion.p>
        </motion.div>
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

function QStrokes({ stroke }: { stroke: string }) {
  return (
    <g stroke={stroke} strokeWidth={EMBLEM_RING.width} strokeLinecap="round" fill="none">
      {SPEED_LINES.map((l) => (
        <line key={l.y} x1={l.x1} y1={l.y} x2={l.x2} y2={l.y} />
      ))}
      <circle cx={EMBLEM_RING.cx} cy={EMBLEM_RING.cy} r={EMBLEM_RING.r} />
      <line x1={TAIL.x1} y1={TAIL.y1} x2={TAIL.x2} y2={TAIL.y2} />
    </g>
  );
}

function Emblem({ brand, progress }: { brand: boolean; progress: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full overflow-visible" fill="none" aria-hidden>
      <defs>
        {/* userSpaceOnUse: the horizontal speed lines have a zero-height bbox, which bbox-relative gradients can't paint. */}
        <linearGradient id="ql-fill" gradientUnits="userSpaceOnUse" x1="18" y1="40" x2="130" y2="124">
          <stop offset="0" stopColor="#ff6b70" />
          <stop offset="0.55" stopColor={RED} />
          <stop offset="1" stopColor="#a8121a" />
        </linearGradient>
        <linearGradient id="ql-shine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="ql-mask" maskUnits="userSpaceOnUse" x="-20" y="-20" width="200" height="200">
          <QStrokes stroke="#fff" />
        </mask>
      </defs>

      <g className="animate-[spin_14s_linear_infinite]" style={{ transformOrigin: "80px 80px", transformBox: "view-box" }}>
        <circle cx="80" cy="80" r="77" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" strokeDasharray="1.5 5" />
        <circle cx="80" cy="3" r="2" fill={RED_LIGHT} />
        <circle cx="146.7" cy="118.5" r="1.4" fill="#fff" />
      </g>

      <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <motion.circle
        cx="80"
        cy="80"
        r="70"
        stroke={RED_LIGHT}
        strokeWidth="1.4"
        strokeLinecap="round"
        transform="rotate(-90 80 80)"
        style={{ pathLength: progress }}
      />

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: brand ? 1 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ filter: "drop-shadow(0 0 14px rgba(214,32,39,0.55))" }}
      >
        <QStrokes stroke="url(#ql-fill)" />
        <circle cx={EMBLEM_RING.cx} cy={EMBLEM_RING.cy} r="7" fill="#fff" />
      </motion.g>

      <g mask="url(#ql-mask)">
        <g transform="skewX(-18)">
          <motion.rect
            y="-10"
            width="40"
            height="190"
            fill="url(#ql-shine)"
            initial={{ x: -60 }}
            animate={{ x: brand ? 220 : -60 }}
            transition={{ duration: 1, delay: brand ? 0.45 : 0, ease: [0.65, 0, 0.35, 1] }}
          />
        </g>
      </g>
    </svg>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@";

function DecodeText({ text, startMs, className }: { text: string; startMs: number; className: string }) {
  const [out, setOut] = useState(() => text.replace(/./g, " "));

  useEffect(() => {
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const t = performance.now() - t0 - startMs;
      if (t < 0) return;
      let done = true;
      const next = text
        .split("")
        .map((ch, i) => {
          if (t >= 260 + i * 90) return ch;
          done = false;
          return t >= i * 45 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : " ";
        })
        .join("");
      setOut(next);
      if (done) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [text, startMs]);

  // Fixed-width slots stop the scramble jittering; once decoded, use natural letter spacing.
  if (out === text) return <p className={className}>{text}</p>;

  return (
    <p className={className} aria-label={text}>
      {out.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={`inline-block min-w-[0.62em] text-center ${ch === text[i] ? "text-white" : "text-[#ff5a5f]"}`}
        >
          {ch}
        </span>
      ))}
    </p>
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
