import Link from "next/link";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { IsoSeal } from "./ui/IsoSeal";
import { Button } from "./ui/Button";
import { navLinks } from "@/data/content";
import { LinkedinIcon, InstagramIcon, FacebookIcon } from "./ui/SocialIcons";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

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

const contactLink =
  "group flex items-center gap-3 text-base text-neutral-300 transition-all duration-200 hover:translate-x-1 hover:text-white";
const contactIcon = "h-5 w-5 shrink-0 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110";
const socialLink =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-[var(--color-primary)] hover:text-white";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#2a2d32]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <RevealGroup className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <RevealItem>
            <Logo dark />
            <p className="mt-5 max-w-sm text-base leading-relaxed text-neutral-300">
              Your Local Service Provider — end-to-end IT infrastructure
              support across India and 100+ countries.
            </p>
            <div className="mt-7 space-y-4">
              <a href="mailto:sales@quick-solutions.in" className={contactLink}>
                <Mail className={contactIcon} />
                sales@quick-solutions.in
              </a>
              <a href="tel:+919586777229" className={contactLink}>
                <Phone className={contactIcon} />
                +91 95867 77229
              </a>
              <a href="https://www.quick-solutions.in" className={contactLink}>
                <Globe className={contactIcon} />
                www.quick-solutions.in
              </a>
              <div className="flex items-start gap-3 text-base leading-relaxed text-neutral-300">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                <span>
                  12th Floor, 1215, Ganesh Glory, Jagatpur Road, Sarkhej -
                  Gandhinagar Hwy, Ahmedabad, Gujarat 382470
                </span>
              </div>
            </div>
          </RevealItem>

          <RevealItem className="min-w-0">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
              {footerColumns.map((col) => (
                <div key={col.title} className={col.title === "Services" ? "col-span-2 sm:col-span-1" : ""}>
                  <p className="text-lg font-bold text-white">{col.title}</p>
                  <span aria-hidden className="mt-2 block h-[2px] w-8 rounded-full bg-[var(--color-primary)]" />
                  <ul className="mt-5 space-y-3.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-block text-base leading-snug text-neutral-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-center gap-5">
                <IsoSeal className="h-20 w-20 shrink-0 drop-shadow-[0_8px_18px_rgba(214,32,39,0.35)]" />
                <div>
                  <p className="text-lg font-bold text-white">ISO 9001:2015 Certified</p>
                  <p className="mt-0.5 text-sm text-neutral-300">Quality Management System</p>
                  <p className="mt-1 text-sm text-neutral-400">Certificate number: 305026071787Q</p>
                </div>
              </div>
              <Button href="/#contact" arrow className="justify-center sm:shrink-0">
                Talk to an Expert
              </Button>
            </div>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 lg:flex-row">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Quick Solutions. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base text-neutral-300 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="https://www.linkedin.com/company/quick-solutions1" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={socialLink}>
              <LinkedinIcon />
            </Link>
            <Link href="https://www.instagram.com/quick.solutions11?igsi=MTNhdzU3dHRyYTg1bA==" target="_blank" rel="noreferrer" aria-label="Instagram" className={socialLink}>
              <InstagramIcon />
            </Link>
            <Link href="https://www.facebook.com/share/1G3fAaaVCr/" target="_blank" rel="noreferrer" aria-label="Facebook" className={socialLink}>
              <FacebookIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
