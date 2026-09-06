import { primaryServices, secondaryServices } from "@/data/content";
import { Icon } from "./ui/Icon";
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
              <div className="group h-full rounded-2xl border border-[var(--color-border)] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.15)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-chip)] text-[var(--color-primary)]">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-[var(--color-border)] group-hover:text-[var(--color-primary)]">
                    {service.number}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-[var(--color-ink)]">
                  {service.title}
                </h3>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* secondary services — desktop row */}
        <RevealGroup className="mt-6 hidden gap-5 sm:grid sm:grid-cols-5">
          {secondaryServices.map((service) => (
            <RevealItem key={service.number}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-chip)] text-[var(--color-primary)]">
                  <Icon name={service.icon} className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold leading-snug text-[var(--color-ink)]">
                  {service.title}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* secondary services — mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button href="#services" variant="outline" arrow>
            View All Service
          </Button>
        </div>
      </div>
    </section>
  );
}
