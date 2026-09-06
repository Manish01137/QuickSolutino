import Link from "next/link";
import { Mail, Phone, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "@/data/content";
import { LinkedinIcon, XIcon, FacebookIcon } from "./ui/SocialIcons";

const footerColumns = [
  {
    title: "Services",
    links: [
      "Smart Hands & Remote Hands",
      "Server, Storage & Network Support",
      "Data Center Support",
      "Project Rollouts & Migrations",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Industries", "Global Coverage", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Service Level Agreement"],
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
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white"
              >
                <Mail className="h-4 w-4 text-[var(--color-primary)]" />
                sales@quick-solutions.in
              </a>
              <a
                href="tel:+919586777229"
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white"
              >
                <Phone className="h-4 w-4 text-[var(--color-primary)]" />
                +91 95867 77229
              </a>
              <a
                href="https://www.quick-solutions.in"
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white"
              >
                <Globe className="h-4 w-4 text-[var(--color-primary)]" />
                www.quick-solutions.in
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      {link}
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
                className="text-xs text-slate-400 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-white">
              <LinkedinIcon />
            </Link>
            <Link href="#" aria-label="X (Twitter)" className="text-slate-400 hover:text-white">
              <XIcon />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-slate-400 hover:text-white">
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
