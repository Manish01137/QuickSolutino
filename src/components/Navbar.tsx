"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { navLinks } from "@/data/content";
import { services } from "@/data/services";

function ServicesDesktopDropdown() {
  return (
    <div className="group relative">
      <Link
        href="/#services"
        className="relative flex items-center gap-1 text-sm font-medium text-[var(--color-ink)] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-primary)] after:transition-transform after:duration-300 after:content-[''] hover:text-[var(--color-primary)] group-hover:after:scale-x-100"
      >
        Services
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </Link>

      <div className="invisible absolute left-1/2 top-full z-50 w-[35rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 ease-out translate-y-1 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-[var(--color-border)] bg-white p-3 shadow-[0_24px_48px_-16px_rgba(15,23,42,0.2)]">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-[var(--color-alt-bg)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover/item:scale-110">
                <Icon name={service.icon} className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-[var(--color-ink)] transition-colors duration-200 group-hover/item:text-[var(--color-primary)]">
                {service.navTitle}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesMobileAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setServicesOpen((v) => !v)}
        aria-expanded={servicesOpen}
        className="flex w-full items-center justify-between text-base font-semibold text-[var(--color-ink)]"
      >
        Services
        <ChevronDown
          className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
        />
      </button>

      {servicesOpen && (
        <div className="mt-3 flex flex-col gap-3 border-l border-[var(--color-border)] pl-4">
          <Link
            href="/#services"
            onClick={onNavigate}
            className="text-sm font-semibold text-[var(--color-primary)]"
          >
            View all services
          </Link>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              onClick={onNavigate}
              className="text-sm text-[var(--color-body)]"
            >
              {service.navTitle}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const mobileList: Variants = {
  closed: {},
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const mobileItem: Variants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${
        scrolled
          ? "border-[var(--color-border)] bg-white/90 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)]"
          : "border-transparent bg-white/95"
      }`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, var(--color-primary), #f0555c)",
        }}
      />
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-6 lg:px-8 ${
          scrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-4"
        }`}
      >
        <Link href="/#home" aria-label="Quick Solutions home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            link.label === "Services" ? (
              <ServicesDesktopDropdown key={link.label} />
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-[var(--color-ink)] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-primary)] after:transition-transform after:duration-300 after:content-[''] hover:text-[var(--color-primary)] hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href="/#contact">Talk to an Expert</Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-ink)] lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-[var(--color-border)] bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              className="px-5 py-5 sm:px-6"
              variants={mobileList}
              initial="closed"
              animate="open"
            >
              <nav className="flex flex-col divide-y divide-[var(--color-border)]">
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={mobileItem} className="py-3.5">
                    {link.label === "Services" ? (
                      <ServicesMobileAccordion onNavigate={() => setOpen(false)} />
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between text-base font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-primary)]"
                      >
                        {link.label}
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]/30" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              <motion.div variants={mobileItem}>
                <Button href="/#contact" className="mt-4 w-full justify-center" arrow>
                  Talk to an Expert
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
