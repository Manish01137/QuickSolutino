"use client";

import { motion } from "framer-motion";
import { Clock, Globe2, Layers, Users } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const WORDS = [
  { text: "End-to-End", accent: false },
  { text: "IT", accent: true },
  { text: "Infrastructure", accent: true },
  { text: "Services", accent: false },
];

export function ServicesHero({ count }: { count: number }) {
  const chips = [
    { icon: Layers, label: `${count} Specialized Services` },
    { icon: Clock, label: "24x7x365 Support" },
    { icon: Globe2, label: "100+ Countries" },
    { icon: Users, label: "500+ Engineers" },
  ];

  return (
    <section className="hero-glow dot-grid relative overflow-hidden border-b border-[var(--color-border)] bg-white">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[54%] -z-10 select-none whitespace-nowrap text-[26vw] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(15,23,42,0.07)] lg:text-[17vw]"
        style={{ x: "-50%", y: "-50%" }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1, x: ["-50%", "-47%", "-50%"] }}
        transition={{
          opacity: { duration: 1.4, delay: 0.3 },
          scale: { duration: 1.6, delay: 0.3, ease: EASE },
          x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        SERVICES
      </motion.span>

      <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-14 text-center sm:px-6 sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24">
        <motion.p
          className="eyebrow flex items-center justify-center gap-2.5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
        >
          <span aria-hidden className="h-[2px] w-7 rounded-full bg-gradient-to-r from-transparent to-[var(--color-primary)]" />
          Our Services
          <span aria-hidden className="h-[2px] w-7 rounded-full bg-gradient-to-l from-transparent to-[var(--color-primary)]" />
        </motion.p>

        <h1 className="mt-4 text-[34px] font-extrabold leading-[1.08] tracking-tight text-[var(--color-ink)] sm:text-[48px] lg:text-[60px]">
          {WORDS.map((word, i) => (
            <span key={word.text} className="relative inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className={`inline-block ${word.accent ? "text-[var(--color-primary)]" : ""}`}
                initial={{ y: "110%", rotate: 4 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.45 + i * 0.09, ease: EASE }}
              >
                {word.text}
              </motion.span>
              {word.text === "Infrastructure" && (
                <svg
                  aria-hidden
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-0.5 left-0 h-[0.22em] w-full"
                  fill="none"
                >
                  <motion.path
                    d="M3 10 C 70 3, 160 2, 297 7"
                    stroke="var(--color-primary)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.35 }}
                    transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
                  />
                </svg>
              )}
              {i < WORDS.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-[var(--color-body)] sm:text-lg"
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
        >
          Explore the full range of services Quick Solutions delivers across
          India and 100+ countries.
        </motion.p>

        <motion.ul
          className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2.5 sm:gap-3"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.05 } } }}
        >
          {chips.map(({ icon: Icon, label }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.92 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
              }}
              className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 px-3.5 py-2 text-xs font-semibold text-[var(--color-ink)] shadow-[0_10px_24px_-18px_rgba(15,23,42,0.5)] backdrop-blur sm:px-4 sm:text-sm"
            >
              <Icon className="h-4 w-4 text-[var(--color-primary)]" />
              {label}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          aria-hidden
          className="mx-auto mt-10 hidden h-10 w-6 justify-center rounded-full border-2 border-[var(--color-ink)]/20 pt-2 sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.span
            className="h-2 w-1 rounded-full bg-[var(--color-primary)]"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
