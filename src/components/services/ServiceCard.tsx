"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const delay = (index % 3) * 0.12;
  const number = String(index + 1).padStart(2, "0");

  // Pointer position within the card, 0..1 on each axis.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), spring);
  const mx = useTransform(px, (v) => `${v * 100}%`);
  const my = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx} ${my}, rgba(214,32,39,0.10), transparent 65%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.article
      className="h-full"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      style={{ transformPerspective: 1200, transformOrigin: "50% 100%" }}
      variants={{
        hidden: { opacity: 0, y: 70, rotateX: 16, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          transition: { duration: 0.9, delay, ease: EASE },
        },
      }}
    >
      <motion.div
        className="h-full"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <Link
          href={`/services/${service.slug}`}
          className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-white shadow-[0_20px_44px_-34px_rgba(15,23,42,0.45)] transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-primary)]/30 hover:shadow-[0_44px_70px_-38px_rgba(214,32,39,0.45)]"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          <div className="relative aspect-[16/9] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              variants={{
                hidden: { scale: 1.25 },
                show: { scale: 1, transition: { duration: 1.4, delay: delay + 0.2, ease: EASE } },
              }}
            >
              <Image
                src={service.image}
                alt={service.navTitle}
                fill
                sizes="(min-width: 2560px) 20vw, (min-width: 1920px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </motion.div>

            {/* Brand wipe: navy lifts first, then red, uncovering the image. */}
            <motion.div
              aria-hidden
              className="absolute inset-0 z-20 origin-right bg-[var(--color-dark-1)]"
              variants={{
                hidden: { scaleX: 1 },
                show: { scaleX: 0, transition: { duration: 0.75, delay: delay + 0.15, ease: WIPE } },
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 z-10 origin-right bg-[var(--color-primary)]"
              variants={{
                hidden: { scaleX: 1 },
                show: { scaleX: 0, transition: { duration: 0.75, delay: delay + 0.3, ease: WIPE } },
              }}
            />
          </div>

          <div className="relative z-20 flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_-14px_rgba(214,32,39,0.55)] ring-1 ring-[var(--color-border)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Image src={service.iconImage} alt="" width={96} height={96} className="h-11 w-11 object-contain" />
              </div>
              <span
                aria-hidden
                className="text-5xl font-extrabold leading-none tracking-tight text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_var(--color-border)] group-hover:[-webkit-text-stroke-color:var(--color-primary)]"
              >
                {number}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-bold leading-snug text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
              {service.navTitle}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-body)]">{service.subhead}</p>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
              <span className="text-sm font-semibold text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                Explore service
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition-all duration-500 group-hover:rotate-45 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}
