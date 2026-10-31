"use client";

import { motion, type Variants } from "framer-motion";

// Everything lives in one 640x560 SVG so it scales as a unit on every screen.
const RED = "#d62027";
const RED_LIGHT = "#ff4d55";
const EASE = [0.22, 1, 0.36, 1] as const;

// Where the connectors meet the tower (front face, roughly mid-height).
const HUB = { x: 320, y: 300 };

const BUBBLES = [
  { name: "HP", src: "/vendors/hp.svg", x: 320, y: 70, w: 44, h: 44 },
  { name: "IBM", src: "/vendors/ibm.svg", x: 150, y: 140, w: 70, h: 28 },
  { name: "Dell", src: "/vendors/dell.svg", x: 490, y: 140, w: 46, h: 46 },
  { name: "NetApp", src: "/vendors/netapp.png", x: 82, y: 282, w: 74, h: 16 },
  { name: "Cisco", src: "/vendors/cisco.svg", x: 558, y: 276, w: 62, h: 34 },
  { name: "Hitachi", src: "/vendors/hitachi.svg", x: 132, y: 418, w: 74, h: 13 },
  { name: "Oracle", src: "/vendors/oracle.svg", x: 518, y: 412, w: 74, h: 12 },
];
const R = 48;

// Drive bays on the tower's front face (local, pre-skew coordinates).
const BAYS = [0, 1, 2, 3, 4, 5];

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.5 + i * 0.08, ease: EASE },
  }),
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.9 + i * 0.08, ease: EASE },
  }),
};

function edgePoint(b: (typeof BUBBLES)[number]) {
  const dx = HUB.x - b.x;
  const dy = HUB.y - b.y;
  const d = Math.hypot(dx, dy);
  // Rounded so server and browser render identical values (avoids hydration mismatches).
  const round = (n: number) => Math.round(n * 10) / 10;
  return { x: round(b.x + (dx / d) * (R + 4)), y: round(b.y + (dy / d) * (R + 4)) };
}

export function VendorOrbit({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 640 560"
      role="img"
      aria-label="Server connected to HP, IBM, Dell, NetApp, Cisco, Hitachi and Oracle"
      className={`h-auto w-full overflow-visible ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <defs>
        <radialGradient id="vo-floor" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f3f4f7" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vo-swoosh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={RED} stopOpacity="0" />
          <stop offset="0.45" stopColor={RED} stopOpacity="0.85" />
          <stop offset="1" stopColor="#a8121a" />
        </linearGradient>
        <linearGradient id="vo-swoosh-soft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={RED} stopOpacity="0" />
          <stop offset="1" stopColor={RED} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="vo-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262b36" />
          <stop offset="1" stopColor="#0c0e13" />
        </linearGradient>
        <linearGradient id="vo-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1a1d25" />
          <stop offset="1" stopColor="#323845" />
        </linearGradient>
        <radialGradient id="vo-bubble" cx="40%" cy="32%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.75" stopColor="#f6f7f9" />
          <stop offset="1" stopColor="#e9ebef" />
        </radialGradient>
        <radialGradient id="vo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={RED_LIGHT} stopOpacity="0.55" />
          <stop offset="1" stopColor={RED_LIGHT} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vo-fade-g" cx="50%" cy="55%" r="62%">
          <stop offset="0.55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="vo-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="560">
          <rect width="640" height="560" fill="url(#vo-fade-g)" />
        </mask>
        <filter id="vo-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.16" />
        </filter>
        <filter id="vo-neon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Floor and brand swooshes, faded into the page at the edges */}
      <g mask="url(#vo-fade)">
      <ellipse cx="330" cy="455" rx="300" ry="80" fill="url(#vo-floor)" />
      <motion.path
        d="M10 520 C 170 470, 300 470, 430 505 S 600 560, 640 470 L 640 560 L 10 560 Z"
        fill="url(#vo-swoosh-soft)"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.2 } } }}
      />
      <motion.path
        d="M60 545 C 240 470, 420 520, 640 400"
        fill="none"
        stroke="url(#vo-swoosh)"
        strokeWidth="14"
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.6, delay: 0.2, ease: EASE } } }}
      />
      <motion.path
        d="M420 60 C 560 90, 640 170, 640 300"
        fill="none"
        stroke="url(#vo-swoosh)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.75"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.6, delay: 0.35, ease: EASE } } }}
      />
      </g>

      {/* Platform rings and glow */}
      <ellipse cx="320" cy="440" rx="160" ry="46" fill="url(#vo-glow)" />
      <ellipse cx="320" cy="440" rx="146" ry="36" fill="none" stroke={RED} strokeWidth="1.6" opacity="0.7" />
      <ellipse cx="320" cy="440" rx="146" ry="36" fill="none" stroke={RED_LIGHT} strokeWidth="1.2">
        <animate attributeName="rx" values="146;185" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="ry" values="36;48" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2.8s" repeatCount="indefinite" />
      </ellipse>

      {/* Back halves of the orbit rings (behind the tower) */}
      <path d="M208 292 A 112 22 0 0 1 432 292" fill="none" stroke={RED} strokeWidth="2" opacity="0.35" />
      <path d="M196 346 A 124 25 0 0 1 444 346" fill="none" stroke={RED} strokeWidth="2" opacity="0.3" />

      {/* Connectors with travelling data pulses */}
      {BUBBLES.map((b, i) => {
        const e = edgePoint(b);
        const d = `M${e.x.toFixed(1)} ${e.y.toFixed(1)} L${HUB.x} ${HUB.y}`;
        return (
          <g key={`line-${b.name}`}>
            <motion.path d={d} stroke={RED} strokeWidth="1.6" strokeOpacity="0.75" fill="none" custom={i} variants={draw} />
            <motion.circle cx={e.x} cy={e.y} r="5" fill="#fff" stroke={RED} strokeWidth="2.4" custom={i} variants={pop} />
            <circle r="3" fill={RED_LIGHT} filter="url(#vo-neon)" className="motion-reduce:hidden">
              <animateMotion dur={`${2.2 + (i % 3) * 0.5}s`} begin={`${1.6 + i * 0.3}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        );
      })}

      {/* Server tower */}
      <g>
        <ellipse cx="320" cy="436" rx="112" ry="18" fill="#000" opacity="0.3" />
        {/* base plinth */}
        <path d="M212 412 L320 390 L428 412 L320 436 Z" fill="#2b303b" />
        <path d="M212 412 L320 436 L320 452 L212 428 Z" fill="#14171e" />
        <path d="M320 436 L428 412 L428 428 L320 452 Z" fill="#1d212a" />
        {[0, 1, 2, 3].map((k) => {
          const x = 232 + k * 22;
          return <circle key={k} cx={x} cy={421 + (x - 212) * 0.222} r="2.4" fill={RED_LIGHT} filter="url(#vo-neon)" />;
        })}

        {/* top */}
        <path d="M240 150 L336 173 L404 158 L308 135 Z" fill="#3a404d" />
        {/* front face */}
        <g transform="translate(240 150) skewY(13.5)">
          <rect width="96" height="250" fill="url(#vo-front)" />
          {BAYS.map((i) => (
            <g key={i} transform={`translate(7 ${10 + i * 40})`}>
              <rect width="82" height="30" rx="3" fill="#0d1016" stroke="#323846" strokeWidth="1" />
              <rect x="6" y="6" width="11" height="7" rx="1.5" fill={RED} filter="url(#vo-neon)">
                <animate attributeName="opacity" values="1;0.35;1" dur={`${1.4 + (i % 3) * 0.6}s`} repeatCount="indefinite" />
              </rect>
              <rect x="6" y="17" width="11" height="7" rx="1.5" fill={RED} opacity="0.75" />
              <rect x="24" y="9" width="44" height="2" rx="1" fill="#2c323e" />
              <rect x="24" y="15" width="44" height="2" rx="1" fill="#2c323e" />
              <rect x="24" y="21" width="32" height="2" rx="1" fill="#2c323e" />
              <circle cx="74" cy="22" r="2.4" fill={RED_LIGHT}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${0.9 + (i % 4) * 0.35}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </g>
        {/* side face */}
        <g transform="translate(336 173) skewY(-12.5)">
          <rect width="68" height="250" fill="url(#vo-side)" />
          <rect x="9" y="12" width="50" height="226" rx="4" fill="none" stroke="#3b4250" strokeWidth="1.2" />
          <path d="M9 120 L59 120" stroke={RED} strokeOpacity="0.5" strokeWidth="1" />
        </g>
        {/* front edge highlight */}
        <path d="M336 173 L336 423" stroke="#4a5160" strokeWidth="1.2" />
      </g>

      {/* Front halves of the orbit rings + glare line */}
      <path d="M208 292 A 112 22 0 0 0 432 292" fill="none" stroke={RED_LIGHT} strokeWidth="2.6" filter="url(#vo-neon)" />
      <path d="M196 346 A 124 25 0 0 0 444 346" fill="none" stroke={RED_LIGHT} strokeWidth="2.4" filter="url(#vo-neon)" opacity="0.9" />
      <path d="M140 318 L500 318" stroke={RED_LIGHT} strokeWidth="1.4" opacity="0.55" filter="url(#vo-neon)" />

      {/* Vendor bubbles */}
      {BUBBLES.map((b, i) => (
        <motion.g key={b.name} custom={i} variants={pop} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <g className="vo-float" style={{ animationDelay: `${-i * 0.7}s` }}>
            <g className="vo-bubble" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <circle cx={b.x} cy={b.y} r={R} fill="url(#vo-bubble)" filter="url(#vo-shadow)" />
              <circle cx={b.x} cy={b.y} r={R - 0.5} fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <image
                href={b.src}
                x={b.x - b.w / 2}
                y={b.y - b.h / 2}
                width={b.w}
                height={b.h}
                preserveAspectRatio="xMidYMid meet"
              />
              <title>{b.name}</title>
            </g>
          </g>
        </motion.g>
      ))}
    </motion.svg>
  );
}
