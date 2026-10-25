"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { CheckCircle2, Cloud, Globe2, Server, ShieldCheck, Users, Wrench } from "lucide-react";
import type { WorldHub, WorldMapArt } from "@/lib/maps";
import { Button } from "../ui/Button";
import { CountUp } from "../ui/CountUp";
import { useIntroReady } from "./useIntroReady";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d62027";
const RED_LIGHT = "#f0555c";

const HEADLINE = [
  { words: ["IT", "INFRASTRUCTURE,"], accent: false, offset: 0 },
  { words: ["WITHOUT", "THE", "COMPLEXITY."], accent: true, offset: 2 },
];

// Engineer is clipped to the inside of the ring below the head, so he "pops out" of the Q.
const ENGINEER_MASK =
  "radial-gradient(36.4% 36.4% at 50% 55%, #000 99%, transparent 100%), linear-gradient(to bottom, #000 45%, transparent 45%)";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: EASE },
  }),
};

const wordUp: Variants = {
  hidden: { y: "115%", rotate: 3 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.08, ease: EASE },
  }),
};

const appear = (delay: number, duration = 1): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration, delay } },
});

export function HeroClient({ map }: { map: WorldMapArt }) {
  const ready = useIntroReady();
  const state = ready ? "show" : "hidden";

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="home"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-white to-[#f6f7fb]"
    >
      <Backdrop state={state} />

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 pb-28 pt-10 sm:px-6 sm:pt-14 lg:min-h-[min(calc(100svh_-_76px),860px)] lg:grid-cols-[1.08fr_1fr] lg:gap-4 lg:px-8 lg:pb-36 lg:pt-8">
        <motion.div initial="hidden" animate={state} className="relative z-10">
          <motion.p
            custom={0}
            variants={fadeUp}
            className="js-failsafe eyebrow flex items-center gap-3"
          >
            Global IT Infrastructure Partner
            <span aria-hidden className="relative h-[2px] w-12 rounded-full bg-[var(--color-primary)] sm:w-16">
              <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]" />
            </span>
          </motion.p>

          <h1 className="mt-5 text-[34px] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[var(--color-ink)] min-[400px]:text-[38px] sm:text-[54px] lg:text-[48px] xl:text-[58px]">
            {HEADLINE.map((line) => (
              <span key={line.offset} className="block">
                {line.words.map((word, i) => (
                  <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0">
                    <motion.span
                      custom={line.offset + i}
                      variants={wordUp}
                      className={`js-failsafe inline-block ${line.accent ? "text-[var(--color-primary)]" : ""}`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            custom={0.6}
            variants={fadeUp}
            className="js-failsafe mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-body)] sm:text-lg"
          >
            End-to-end infrastructure support built for scale — data centers,
            networks and multi-vendor environments, backed by 500+ engineers
            operating 24x7x365 across India and 100+ countries.
          </motion.p>

          <motion.div custom={0.75} variants={fadeUp} className="js-failsafe mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button href="#contact" size="lg">
              Get IT Support
            </Button>
            <Button href="#contact" size="lg" variant="outline" arrow className="shadow-[0_14px_30px_-16px_rgba(15,23,42,0.35)]">
              Talk to an Expert
            </Button>
          </motion.div>

          <motion.ul custom={0.9} variants={fadeUp} className="js-failsafe mt-10 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-4 lg:grid lg:gap-3 xl:flex xl:gap-x-6">
            <TrustItem icon={ShieldCheck} title="ISO 9001:2015" caption="Certified quality" />
            <li aria-hidden className="hidden h-9 w-px bg-[var(--color-border)] sm:block lg:hidden xl:block" />
            <TrustItem icon={Users} title="500+ Engineers" caption="Across India" />
            <li aria-hidden className="hidden h-9 w-px bg-[var(--color-border)] sm:block lg:hidden xl:block" />
            <TrustItem icon={Globe2} title="100+ Countries" caption="Global coverage" />
          </motion.ul>
        </motion.div>

        <Visual map={map} state={state} sx={sx} sy={sy} />
      </div>
    </section>
  );
}

function TrustItem({
  icon: Icon,
  title,
  caption,
}: {
  icon: typeof ShieldCheck;
  title: string;
  caption: string;
}) {
  return (
    <li className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-2.5 lg:flex-col lg:items-start lg:gap-2 xl:flex-row xl:items-center xl:gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--color-primary)] shadow-[0_10px_22px_-14px_rgba(214,32,39,0.6)] ring-1 ring-[var(--color-border)]">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-bold text-[var(--color-ink)] sm:text-sm">{title}</span>
        <span className="block text-[11px] text-[var(--color-body)] sm:text-xs">{caption}</span>
      </span>
    </li>
  );
}

function Parallax({
  depth,
  sx,
  sy,
  className = "",
  children,
}: {
  depth: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

function Visual({
  map,
  state,
  sx,
  sy,
}: {
  map: WorldMapArt;
  state: "show" | "hidden";
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  return (
    <motion.div
      initial="hidden"
      animate={state}
      className="relative mx-auto mb-12 mt-4 aspect-square w-full max-w-[420px] sm:mb-0 sm:max-w-[520px] lg:mt-0 lg:max-w-[600px]"
    >
      <Parallax depth={12} sx={sx} sy={sy} className="pointer-events-none absolute left-1/2 top-[46%] w-[170%] -translate-x-1/2 -translate-y-1/2">
        <WorldMap map={map} />
      </Parallax>

      <div
        aria-hidden
        className="absolute left-1/2 top-[55%] h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,32,39,0.2),transparent)] blur-2xl"
      />

      <Parallax depth={18} sx={sx} sy={sy} className="absolute inset-0">
        <motion.div
          className="absolute left-[12%] top-[17%] h-[76%] w-[76%] rounded-full bg-[radial-gradient(circle_at_40%_28%,#ffffff_0%,#fff6f6_45%,#fde2e3_100%)] shadow-[inset_0_-24px_60px_rgba(214,32,39,0.14),0_50px_90px_-45px_rgba(214,32,39,0.55)]"
          variants={{
            hidden: { scale: 0.6, opacity: 0 },
            show: { scale: 1, opacity: 1, transition: { duration: 1.1, delay: 0.1, ease: EASE } },
          }}
        />
        <Ring />
      </Parallax>

      <Parallax depth={24} sx={sx} sy={sy} className="absolute inset-0">
        <div className="absolute inset-0" style={{ maskImage: ENGINEER_MASK, WebkitMaskImage: ENGINEER_MASK }}>
          <motion.div
            className="absolute bottom-[8.6%] left-[14%] w-[72%]"
            variants={{
              hidden: { y: "18%", opacity: 0, filter: "blur(10px)" },
              show: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 1.3, delay: 0.55, ease: EASE } },
            }}
          >
            <Image
              src="/hero/engineer.png"
              alt="Quick Solutions IT engineer working on a laptop"
              width={576}
              height={636}
              priority
              quality={95}
              sizes="(min-width: 1024px) 440px, 72vw"
              className="h-auto w-full drop-shadow-[0_30px_40px_rgba(15,23,42,0.22)]"
            />
          </motion.div>
        </div>
      </Parallax>

      <FloatCard depth={34} delay={1.15} float={5.5} sx={sx} sy={sy} className="left-0 top-0 sm:left-[-4%] sm:top-[8%] lg:left-[2%]">
        <MonitoringCard />
      </FloatCard>

      <FloatCard depth={28} delay={1.3} float={6.5} sx={sx} sy={sy} className="right-[2%] top-[2%] sm:right-[4%]">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_20px_40px_-20px_rgba(214,32,39,0.55)] ring-1 ring-[var(--color-border)] sm:h-20 sm:w-20">
          <Image src="/brand/q-emblem-3d.jpg" alt="" width={160} height={160} className="h-full w-full object-contain" />
        </div>
      </FloatCard>

      <FloatCard depth={40} delay={1.45} float={6} sx={sx} sy={sy} className="right-0 top-[42%] hidden sm:block sm:-right-[6%] lg:-right-[2%] xl:-right-[8%]">
        <EngineersCard />
      </FloatCard>

      <FloatCard depth={30} delay={1.55} float={4.8} sx={sx} sy={sy} className="left-[-2%] top-[50%] hidden sm:block">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--color-primary)] shadow-[0_18px_36px_-18px_rgba(15,23,42,0.45)] ring-1 ring-[var(--color-border)]">
          <Cloud className="h-7 w-7" strokeWidth={1.75} />
        </div>
      </FloatCard>

      <FloatCard depth={36} delay={1.65} float={5.2} sx={sx} sy={sy} className="bottom-[-9%] left-1/2 -translate-x-1/2 sm:bottom-[3%] sm:left-[-6%] sm:translate-x-0">
        <DispatchCard />
      </FloatCard>
    </motion.div>
  );
}

function Ring() {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden>
      <defs>
        <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff5a5f" />
          <stop offset="0.55" stopColor={RED} />
          <stop offset="1" stopColor="#a8121a" />
        </linearGradient>
      </defs>

      <motion.g variants={appear(0.5, 1.2)}>
        <g className="animate-[spin_50s_linear_infinite]" style={{ transformOrigin: "50px 55px", transformBox: "view-box" }}>
          <circle cx="50" cy="55" r="46" stroke="rgba(214,32,39,0.28)" strokeWidth="0.35" strokeDasharray="0.6 2.2" />
          <circle cx="50" cy="9" r="1.3" fill={RED} />
          <circle cx="89.8" cy="78" r="0.95" fill={RED_LIGHT} />
          <circle cx="10.2" cy="78" r="0.95" fill="#0b1b3a" />
        </g>
      </motion.g>

      <motion.circle
        cx="50"
        cy="55"
        r="38"
        stroke="url(#hero-ring)"
        strokeWidth="3.2"
        strokeLinecap="round"
        transform="rotate(-90 50 55)"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: 1.5, delay: 0.25, ease: EASE } },
        }}
      />
      <motion.path
        d="M76.9 81.9 L89 94"
        stroke="url(#hero-ring)"
        strokeWidth="3.2"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: 0.5, delay: 1.55, ease: EASE } },
        }}
      />
    </svg>
  );
}

function arcPath(a: WorldHub, b: WorldHub) {
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.32;
  return `M${a.x} ${a.y} Q${midX} ${midY - lift} ${b.x} ${b.y}`;
}

function WorldMap({ map }: { map: WorldMapArt }) {
  const hq = map.hubs.find((h) => h.hq);
  const others = map.hubs.filter((h) => !h.hq);

  return (
    <svg
      viewBox={`0 0 ${map.width} ${map.height}`}
      className="h-auto w-full overflow-visible"
      aria-hidden
      style={{
        maskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)",
      }}
    >
      <motion.path
        d={map.dotsPath}
        stroke={RED}
        strokeOpacity={0.22}
        strokeWidth={0.42}
        strokeLinecap="round"
        variants={appear(0.1, 1.4)}
      />

      {hq &&
        others.map((hub, i) => (
          <motion.path
            key={hub.label}
            d={arcPath(hq, hub)}
            fill="none"
            stroke={RED}
            strokeWidth={0.22}
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: { pathLength: 1, opacity: 0.55, transition: { duration: 1.4, delay: 0.7 + i * 0.08, ease: EASE } },
            }}
          />
        ))}

      {hq && (
        <motion.g variants={appear(2.2)} className="motion-reduce:hidden">
          {others.map((hub, i) => (
            <circle key={hub.label} r={0.45} fill={RED}>
              <animateMotion dur={`${2.8 + (i % 4) * 0.45}s`} repeatCount="indefinite" path={arcPath(hq, hub)} />
            </circle>
          ))}
        </motion.g>
      )}

      <motion.g variants={appear(0.9)}>
        {map.hubs.map((hub, i) => (
          <g key={hub.label}>
            <circle cx={hub.x} cy={hub.y} r={hub.hq ? 0.9 : 0.55} fill={hub.hq ? RED : "#ffffff"} stroke={RED} strokeWidth={0.22} />
            <circle cx={hub.x} cy={hub.y} r={0.55} fill="none" stroke={RED} strokeWidth={0.15}>
              <animate attributeName="r" values={hub.hq ? "0.9;3.4" : "0.55;2.2"} dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

function FloatCard({
  depth,
  delay,
  float,
  sx,
  sy,
  className,
  children,
}: {
  depth: number;
  delay: number;
  float: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Parallax depth={depth} sx={sx} sy={sy} className={`absolute z-20 ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.8, y: 20, filter: "blur(8px)" },
          show: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, delay, ease: EASE } },
        }}
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: float, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </Parallax>
  );
}

const glass =
  "rounded-2xl border border-white/80 bg-white/85 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl";

const BARS = [42, 68, 54, 82, 60, 92, 70, 58];

function MonitoringCard() {
  return (
    <div className={`${glass} w-[138px] p-2.5 sm:w-[196px] sm:p-4`}>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--color-body)] sm:text-[10px]">
          Live Monitoring
        </span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      </div>
      <p className="mt-1 text-base font-extrabold text-[var(--color-ink)] sm:text-xl">24×7×365</p>
      <div className="mt-2 flex h-6 items-end gap-[3px] sm:h-9 sm:gap-1">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="w-full rounded-[3px] bg-gradient-to-t from-[var(--color-primary)] to-[#ff8a8e]"
            style={{ height: `${h}%` }}
            animate={{ height: [`${h}%`, `${BARS[(i + 3) % BARS.length]}%`, `${h}%`] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
          />
        ))}
      </div>
      <p className="mt-2 flex items-center gap-1 text-[9px] font-semibold text-emerald-600 sm:text-[10px]">
        <CheckCircle2 className="h-3 w-3" /> All systems online
      </p>
    </div>
  );
}

function EngineersCard() {
  const avatars = [
    { icon: Users, bg: "bg-[var(--color-dark-1)]" },
    { icon: Wrench, bg: "bg-[var(--color-primary)]" },
    { icon: Server, bg: "bg-[#f0555c]" },
  ];
  return (
    <div className={`${glass} w-[176px] p-4`}>
      <div className="flex -space-x-2">
        {avatars.map(({ icon: Icon, bg }, i) => (
          <span key={i} className={`flex h-8 w-8 items-center justify-center rounded-full text-white ring-2 ring-white ${bg}`}>
            <Icon className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>
      <CountUp value="500+" className="mt-3 block text-2xl font-extrabold text-[var(--color-ink)]" />
      <p className="text-[11px] leading-snug text-[var(--color-body)]">Skilled field engineers</p>
    </div>
  );
}

function DispatchCard() {
  return (
    <div className={`${glass} flex w-[248px] items-center gap-3 p-3 sm:w-[236px]`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
        <CheckCircle2 className="h-5 w-5" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[13px] font-bold text-[var(--color-ink)]">Engineer dispatched</span>
        <span className="block text-[11px] text-[var(--color-body)]">Same / Next Business Day SLA</span>
      </span>
    </div>
  );
}

function Backdrop({ state }: { state: "show" | "hidden" }) {
  return (
    <motion.div aria-hidden initial="hidden" animate={state} className="pointer-events-none absolute inset-0 -z-10">
      <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_25%_25%,#000,transparent_65%)]" />
      <div className="absolute -right-48 top-0 h-[640px] w-[640px] rounded-full bg-[var(--color-primary)]/[0.07] blur-3xl" />

      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[110px] w-full sm:h-[150px]">
        <defs>
          <linearGradient id="hero-wave-soft" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={RED} stopOpacity="0.35" />
            <stop offset="0.55" stopColor={RED} stopOpacity="0.08" />
            <stop offset="1" stopColor={RED} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-wave-red" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#c1121a" />
            <stop offset="0.35" stopColor={RED} stopOpacity="0.85" />
            <stop offset="0.7" stopColor={RED_LIGHT} stopOpacity="0.15" />
            <stop offset="1" stopColor={RED_LIGHT} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 200 L0 70 C 260 30 560 120 880 140 C 1120 155 1300 130 1440 100 L1440 200 Z"
          fill="url(#hero-wave-soft)"
          variants={appear(0.3, 1.4)}
        />
        <motion.path
          d="M0 200 L0 120 C 320 80 600 175 940 185 C 1180 192 1320 180 1440 168 L1440 200 Z"
          fill="url(#hero-wave-red)"
          variants={appear(0.5, 1.4)}
        />
        <motion.path
          d="M0 60 C 300 10 620 120 960 130 C 1180 136 1330 112 1440 90"
          fill="none"
          stroke={RED}
          strokeWidth="1.5"
          strokeOpacity="0.6"
          variants={{
            hidden: { pathLength: 0 },
            show: { pathLength: 1, transition: { duration: 2, delay: 0.6, ease: EASE } },
          }}
        />
      </svg>
    </motion.div>
  );
}
