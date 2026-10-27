import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { ContactForms } from "./ContactForms";

const contactDetails = [
  { icon: Phone, label: "Call us", value: "+91 95867 77229", href: "tel:+919586777229" },
  { icon: Mail, label: "Email us", value: "sales@quick-solutions.in", href: "mailto:sales@quick-solutions.in" },
  {
    icon: MapPin,
    label: "Visit us",
    value: "12th Floor, 1215, Ganesh Glory, Jagatpur Road, Ahmedabad, Gujarat 382470",
  },
];

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-[var(--color-border)] bg-gradient-to-b from-[#f3f5f9] to-[#e8ecf2]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-48 -z-10 h-[32.5rem] w-[32.5rem] rounded-full bg-[var(--color-primary)]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8 lg:py-28">
        <Reveal>
          <Eyebrow>Get In Touch</Eyebrow>
          <h2 className="mt-3 text-[1.875rem] font-extrabold leading-[1.1] text-[var(--color-ink)] sm:text-[2.25rem] lg:text-[2.625rem]">
            Keep Your IT Infrastructure{" "}
            <span className="text-[var(--color-primary)]">Running.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--color-body)] sm:text-base">
            Whether you need 24x7 support, onsite engineers, hardware
            maintenance, project deployment or multi-country IT support,
            Quick Solutions is ready to help. Let&apos;s discuss how we can
            support your IT operations.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Button href="tel:+919586777229" arrow className="justify-center">
              Talk to an IT Expert
            </Button>
            <Button href="#contact-forms" variant="outline" arrow className="justify-center">
              Request a Service
            </Button>
          </div>

          <ul className="mt-10 space-y-3">
            {contactDetails.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--color-primary)] shadow-[0_8px_18px_-12px_rgba(214,32,39,0.6)] ring-1 ring-[var(--color-border)] transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-white">
                    <Icon className="h-[1.125rem] w-[1.125rem]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-body)]">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold leading-snug text-[var(--color-ink)]">
                      {value}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-white/70">
                      {body}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 rounded-2xl p-2">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForms />
        </Reveal>
      </div>
    </section>
  );
}
