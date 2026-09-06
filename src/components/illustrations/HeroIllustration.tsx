"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, Users, Clock } from "lucide-react";

const worldDots: [number, number][] = [
  [40, 60], [70, 50], [100, 55], [130, 45], [160, 55], [190, 48], [220, 58],
  [55, 85], [85, 78], [115, 82], [145, 75], [175, 80], [205, 84], [235, 78],
  [30, 110], [65, 105], [100, 112], [135, 106], [170, 110], [200, 104], [230, 112], [260, 105],
  [50, 135], [90, 140], [125, 134], [160, 140], [195, 135], [225, 140],
];

const arcs = [
  "M40,110 Q160,20 280,95",
  "M60,140 Q170,190 260,130",
  "M30,90 Q130,150 245,90",
];

function StatChip({
  icon,
  label,
  className,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2 shadow-[0_12px_24px_-12px_rgba(15,23,42,0.25)] ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-chip)] text-[var(--color-primary)]">
        {icon}
      </div>
      <span className="text-xs font-semibold text-[var(--color-ink)] whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] pt-6 pb-16">
      <svg
        viewBox="0 0 600 480"
        className="w-full"
        role="img"
        aria-label="Illustration of server infrastructure, cloud and security protected by Quick Solutions"
      >
        <defs>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EAF1FE" />
            <stop offset="100%" stopColor="#DCE7FB" />
          </linearGradient>
          <linearGradient id="rackFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="rackFrontB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B4B63" />
            <stop offset="100%" stopColor="#233042" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#DCEAFE" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* faint world map / network overlay */}
        <g opacity="0.35">
          {worldDots.map(([x, y], i) => (
            <circle key={i} cx={x + 140} cy={y + 10} r="2" fill="#94A3B8" />
          ))}
          {arcs.map((d, i) => (
            <path
              key={i}
              d={d.replace(/(-?\d+(\.\d+)?)/g, (n) => n)}
              transform="translate(140,10)"
              stroke="#93C5FD"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="3 4"
            />
          ))}
        </g>

        {/* floor platform */}
        <ellipse cx="300" cy="410" rx="230" ry="42" fill="url(#floorGrad)" />
        <ellipse
          cx="300"
          cy="410"
          rx="230"
          ry="42"
          fill="none"
          stroke="#C7D7F5"
          strokeWidth="1"
        />

        {/* rack tower A (tall) */}
        <g>
          <polygon points="230,190 300,190 326,204 256,204" fill="#475569" />
          <polygon points="300,190 326,204 326,364 300,350" fill="#0F172A" />
          <rect x="230" y="204" width="70" height="146" fill="url(#rackFront)" rx="3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line
                x1="238"
                y1={222 + i * 26}
                x2="292"
                y2={222 + i * 26}
                stroke="#1E293B"
                strokeWidth="10"
              />
              <circle
                cx="284"
                cy={222 + i * 26}
                r="2.4"
                fill={i % 2 === 0 ? "#60A5FA" : "#34D399"}
              />
            </g>
          ))}
        </g>

        {/* rack tower B (shorter) */}
        <g>
          <polygon points="330,230 388,230 410,242 352,242" fill="#3B4B63" />
          <polygon points="388,230 410,242 410,364 388,352" fill="#111C2E" />
          <rect x="330" y="242" width="58" height="110" fill="url(#rackFrontB)" rx="3" />
          <rect x="338" y="256" width="42" height="5" rx="2.5" fill="#2563EB" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <line
                x1="338"
                y1={278 + i * 24}
                x2="380"
                y2={278 + i * 24}
                stroke="#0F172A"
                strokeWidth="8"
              />
              <circle
                cx="374"
                cy={278 + i * 24}
                r="2.2"
                fill={i % 2 === 0 ? "#60A5FA" : "#F59E0B"}
              />
            </g>
          ))}
        </g>

        {/* laptop */}
        <g>
          <polygon
            points="120,372 260,372 286,388 146,388"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="1"
          />
          <polygon
            points="150,300 250,300 260,372 140,372"
            fill="#0F172A"
          />
          <polygon
            points="158,308 242,308 250,364 150,364"
            fill="#1D4ED8"
            opacity="0.9"
          />
          <polyline
            points="168,344 190,326 208,338 232,316"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* shield badge */}
        <g transform="translate(150,232)">
          <path
            d="M20 0 L40 8 V24 C40 38 28 46 20 50 C12 46 0 38 0 24 V8 Z"
            fill="url(#shieldGrad)"
          />
          <path
            d="M10 25 L17 32 L31 16"
            fill="none"
            stroke="white"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* cloud */}
        <g transform="translate(378,150)">
          <path
            d="M20 38 C8 38 0 30 0 20 C0 10 8 3 18 3 C21 -4 29 -9 38 -9 C50 -9 60 0 61 12 C70 13 77 20 77 29 C77 34 73 38 68 38 Z"
            fill="url(#cloudGrad)"
            stroke="#BFDBFE"
            strokeWidth="1"
          />
        </g>
      </svg>

      <StatChip
        icon={<Globe className="h-3.5 w-3.5" strokeWidth={2} />}
        label="100+ Countries"
        className="left-0 top-4 sm:left-2"
        delay={0.1}
      />
      <StatChip
        icon={<Clock className="h-3.5 w-3.5" strokeWidth={2} />}
        label="24x7x365 Support"
        className="right-0 top-16 sm:right-2"
        delay={0.4}
      />
      <StatChip
        icon={<Users className="h-3.5 w-3.5" strokeWidth={2} />}
        label="500+ Engineers"
        className="left-0 bottom-8 sm:left-4"
        delay={0.7}
      />
      <StatChip
        icon={<ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />}
        label="100+ Cities"
        className="right-0 bottom-20 sm:right-6"
        delay={1}
      />
    </div>
  );
}
