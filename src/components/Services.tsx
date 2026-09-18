import Link from "next/link";
import Image from "next/image";
import { primaryServices, secondaryServices } from "@/data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Button } from "./ui/Button";

export function Services() {
  return (
    <section id="services" className="bg-[var(--color-alt-bg)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="End-to-End IT Infrastructure Services"
          align="center"
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {primaryServices.map((service) => (
            <RevealItem key={service.number}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full rounded-2xl border border-[var(--color-border)] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-primary)]/30 hover:shadow-[0_24px_44px_-18px_rgba(214,32,39,0.3)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-chip)] p-1 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                    <Image
                      src={service.iconImage}
                      alt=""
                      width={80}
                      height={80}
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                  <span className="text-sm font-bold text-[var(--color-border)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                    {service.number}
                  </span>
                </div>
                <h3 className="mt-6 text-base font-bold text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                  {service.title}
                </h3>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* secondary services — desktop row */}
        <RevealGroup className="mt-6 hidden gap-5 sm:grid sm:grid-cols-4">
          {secondaryServices.map((service) => (
            <RevealItem key={service.number}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-primary)]/30 hover:shadow-[0_24px_44px_-18px_rgba(214,32,39,0.3)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-chip)] p-1 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <Image
                    src={service.iconImage}
                    alt=""
                    width={80}
                    height={80}
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <p className="text-xs font-semibold leading-snug text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                  {service.title}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* secondary services — mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button href="/services" variant="outline" arrow>
            View All Service
          </Button>
        </div>
      </div>
    </section>
  );
}
