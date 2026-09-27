import Link from "next/link";
import Image from "next/image";
import { primaryServices } from "@/data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

export function Services() {
  return (
    <section id="services" className="dot-grid bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="End-to-End IT Infrastructure Services"
          align="center"
        />

        <RevealGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {primaryServices.map((service) => (
            <RevealItem key={service.number}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-primary)]/30 hover:shadow-[0_24px_44px_-18px_rgba(214,32,39,0.3)] sm:p-6"
              >
                <div className="flex h-16 w-16 items-center justify-center transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-110 sm:h-20 sm:w-20">
                  <Image
                    src={service.iconImage}
                    alt=""
                    width={96}
                    height={96}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="mt-5 text-xs font-bold text-[var(--color-body)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                  {service.number}
                </span>
                <h3 className="mt-1.5 text-sm font-bold leading-snug text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                  {service.title}
                </h3>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="group/btn inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[var(--color-ink)]/25 px-8 py-3.5 text-sm font-bold text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-[0_14px_28px_-18px_rgba(214,32,39,0.25)]"
          >
            View All Service
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
