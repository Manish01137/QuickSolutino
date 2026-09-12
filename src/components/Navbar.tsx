"use client";

import { useState } from "react";
import Link from "next/link";
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

      <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 ease-out translate-y-1 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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
        className="flex w-full items-center justify-between text-sm font-medium text-[var(--color-ink)]"
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

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
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

      {open && (
        <div className="border-t border-[var(--color-border)] bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <ServicesMobileAccordion
                  key={link.label}
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-[var(--color-ink)]"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <Button href="/#contact" className="mt-5 w-full justify-center">
            Talk to an Expert
          </Button>
        </div>
      )}
    </header>
  );
}
