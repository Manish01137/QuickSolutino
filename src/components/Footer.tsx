import Link from "next/link";
import { Mail, Phone, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "@/data/content";
import { LinkedinIcon, XIcon, FacebookIcon } from "./ui/SocialIcons";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Smart Hands & Remote Hands", href: "/services/smart-hands-remote-hands" },
      { label: "Server, Storage & Network Support", href: "/services/server-storage-network-support" },
      { label: "Data Center Support", href: "/services/data-center-support" },
      { label: "Project Rollouts & Migrations", href: "/services/project-rollouts-migrations-deployments" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Global Coverage", href: "/#global-coverage" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Service Level Agreement", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[var(--color-dark-1)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Your Local Service Provider — end-to-end IT infrastructure
              support across India and 100+ countries.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="mailto:sales@quick-solutions.in"
                className="group flex items-center gap-2.5 text-sm text-slate-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                <Mail className="h-4 w-4 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110" />
                sales@quick-solutions.in
              </a>
              <a
                href="tel:+919586777229"
                className="group flex items-center gap-2.5 text-sm text-slate-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                <Phone className="h-4 w-4 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110" />
                +91 95867 77229
              </a>
              <a
                href="https://www.quick-solutions.in"
                className="group flex items-center gap-2.5 text-sm text-slate-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                <Globe className="h-4 w-4 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110" />
                www.quick-solutions.in
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Quick Solutions. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-slate-400 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary)] hover:text-white"
            >
              <LinkedinIcon />
            </Link>
            <Link
              href="#"
              aria-label="X (Twitter)"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary)] hover:text-white"
            >
              <XIcon />
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary)] hover:text-white"
            >
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
