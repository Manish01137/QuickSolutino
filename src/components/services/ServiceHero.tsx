"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { PhotoCrop } from "@/data/serviceHero";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;

type Feature = { icon: string; title: string };

// Callout anchors around the photo panel (desktop). Dots sit on the photo edge.
const CALLOUTS = [
  { card: "left-[-7%] top-[10%]", dot: "right-[-0.4rem] top-1/2", line: "right-[-2.4rem] top-1/2 w-8" },
  { card: "right-[-9%] top-[30%]", dot: "left-[-0.4rem] top-1/2", line: "left-[-2.4rem] top-1/2 w-8" },
  { card: "left-[-10%] top-[56%]", dot: "right-[-0.4rem] top-1/2", line: "right-[-2.4rem] top-1/2 w-8" },
  { card: "right-[-6%] bottom-[9%]", dot: "left-[-0.4rem] top-1/2", line: "left-[-2.4rem] top-1/2 w-8" },
];

const rise: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: (d: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, delay: d, ease: EASE } }),
};

const word: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.85, delay: 0.15 + i * 0.07, ease: EASE } }),
};

export function ServiceHero({
  title,
  navTitle,
  subhead,
  ctaPrimary,
  image,
  imageAspect,
  crop,
  features,
  callouts,
}: {
  title: string;
  navTitle: string;
  subhead: string;
  ctaPrimary: string;
  image: string;
  imageAspect: number;
  crop: PhotoCrop;
  features: Feature[];
  callouts: string[];
}) {
  const words = title.split(" ");
  const darkCount = Math.max(1, Math.round(words.length / 3));
  const panelAspect = (crop.w * imageAspect) / crop.h;

  return (
    <section className="dot-grid relative isolate overflow-hidden bg-white">
      {/* Brand swooshes, echoing the banner artwork */}
      <svg aria-hidden viewBox="0 0 600 400" preserveAspectRatio="none" className="pointer-events-none absolute -right-24 -top-10 -z-10 h-[24rem] w-[44rem] max-w-none opacity-35 sm:h-[30rem] sm:opacity-90 sm:w-[56rem]">
        <defs>
          <linearGradient id="sh-red" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff5a5f" stopOpacity="0" />
            <stop offset="0.5" stopColor="#d62027" stopOpacity="0.9" />
            <stop offset="1" stopColor="#a8121a" />
          </linearGradient>
        </defs>
        <motion.path
          d="M140 0 C 300 40, 420 120, 600 330"
          stroke="url(#sh-red)"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <motion.path
          d="M230 0 C 360 30, 480 110, 600 230"
          stroke="#d62027"
          strokeOpacity="0.25"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
        />
      </svg>
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-[var(--color-primary)]/[0.07] blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8 lg:pb-20">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[var(--color-body)] sm:text-sm">
          <Link href="/" className="transition-colors hover:text-[var(--color-primary)]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <Link href="/services" className="transition-colors hover:text-[var(--color-primary)]">Services</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <span className="text-[var(--color-ink)]">{navTitle}</span>
        </nav>

        <div className="mt-8 grid items-center gap-12 lg:mt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ── Live text side ── */}
          <motion.div initial="hidden" animate="show" className="min-w-0">
            <motion.p custom={0} variants={rise} className="text-[0.6875rem] font-semibold uppercase leading-relaxed tracking-[0.3em] text-[var(--color-body)]">
              People · Technology
              <br />A Stronger Tomorrow
            </motion.p>
            <motion.span custom={0.05} variants={rise} aria-hidden className="mt-3 block h-[3px] w-10 rounded-full bg-[var(--color-primary)]" />

            <h1 className="mt-6 text-[2.25rem] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[4rem]">
              {words.map((w, i) => (
                <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span custom={i} variants={word} className={`inline-block ${i >= darkCount ? "text-[var(--color-primary)]" : ""}`}>
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div custom={0.55} variants={rise} className="mt-6 flex items-start gap-3">
              <span aria-hidden className="mt-2 h-[2px] w-8 shrink-0 bg-[var(--color-primary)]" />
              <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.22em] text-[var(--color-ink)] sm:text-sm">{subhead}</p>
            </motion.div>

            <motion.ul custom={0.7} variants={rise} className="mt-9 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {features.slice(0, 4).map((f, i) => (
                <li
                  key={f.title}
                  className={`group flex flex-col items-center gap-2 border-[var(--color-border)] px-2 text-center ${i % 2 === 1 ? "border-l border-[var(--color-border)]" : ""} ${i === 2 ? "sm:border-l" : ""}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--color-primary)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[var(--color-primary)] group-hover:text-white">
                    <Icon name={f.icon} className="h-7 w-7" />
                  </span>
                  <span className="text-[0.6875rem] font-bold uppercase leading-tight tracking-[0.08em] text-[var(--color-ink)]">{f.title}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div custom={0.85} variants={rise} className="mt-9 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
              <Button href="/#contact" size="lg" arrow className="justify-center">
                {ctaPrimary}
              </Button>
              <Button href="/services" size="lg" variant="outline" className="justify-center">
                All Services
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Photo side ── */}
          <div className="relative mx-auto w-full max-w-[34rem] lg:mr-6 lg:max-w-none">
            <motion.div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-primary)]/25 via-transparent to-[var(--color-primary)]/10 blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
            <motion.div
              className="relative overflow-hidden rounded-[2rem] shadow-[0_50px_90px_-40px_rgba(15,23,42,0.6)] ring-1 ring-black/5"
              style={{ aspectRatio: panelAspect }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            >
              {/* Only the photograph region of the banner is shown; its baked-in text is cropped away. */}
              <motion.div
                className="absolute"
                style={{
                  width: `${100 / crop.w}%`,
                  height: `${100 / crop.h}%`,
                  left: `${(-crop.x / crop.w) * 100}%`,
                  top: `${(-crop.y / crop.h) * 100}%`,
                }}
                initial={{ scale: 1.18 }}
                animate={{ scale: 1.04 }}
                transition={{ duration: 2.4, ease: EASE }}
              >
                <Image src={image} alt={title} fill priority quality={95} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              </motion.div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-1)]/45 via-transparent to-transparent" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--color-primary)]/30" />

              {/* brand wipe reveal */}
              <motion.div aria-hidden className="absolute inset-0 origin-right bg-[var(--color-primary)]" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: WIPE }} />
              <motion.div aria-hidden className="absolute inset-0 origin-right bg-[var(--color-dark-1)]" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: WIPE }} />

              <motion.div
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[var(--color-ink)] shadow-lg backdrop-blur sm:bottom-6 sm:left-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Engineers on-site
              </motion.div>
            </motion.div>

            {/* Floating callouts (desktop) */}
            {callouts.slice(0, 4).map((text, i) => {
              const pos = CALLOUTS[i];
              return (
                <motion.div
                  key={text}
                  className={`absolute z-10 hidden lg:block ${pos.card}`}
                  initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 1 + i * 0.15, ease: EASE }}
                >
                  <div className="service-hero-float relative" style={{ animationDelay: `${-i * 1.3}s` }}>
                    <span aria-hidden className={`absolute h-px bg-[var(--color-primary)] ${pos.line}`} />
                    <span aria-hidden className={`absolute h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--color-primary)] shadow-[0_0_0_4px_rgba(214,32,39,0.2)] ${pos.dot}`} />
                    <div className="flex w-[13.5rem] items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_24px_44px_-22px_rgba(15,23,42,0.55)] backdrop-blur-xl">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5a5f] to-[var(--color-primary-dark)] text-xs font-extrabold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.8125rem] font-semibold leading-snug text-[var(--color-ink)]">{text}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Callouts as chips on smaller screens */}
            <motion.ul
              className="mt-5 grid grid-cols-2 gap-2.5 lg:hidden"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } } }}
            >
              {callouts.slice(0, 4).map((text, i) => (
                <motion.li
                  key={text}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                  className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-white p-2.5 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.5)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] text-[0.625rem] font-extrabold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold leading-snug text-[var(--color-ink)]">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
