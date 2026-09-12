import Image from "next/image";
import { industries } from "@/data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";

export function IndustriesWeServe() {
  return (
    <section id="industries" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <SectionHeading
          eyebrow="IT Support Built For Your Industry"
          title="Industries We Serve"
          body="Supporting businesses with white-label IT infrastructure services across industries."
          align="center"
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <RevealItem key={industry.name}>
              <div className="group relative h-64 overflow-hidden rounded-2xl shadow-[0_16px_32px_-20px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_48px_-20px_rgba(15,23,42,0.4)]">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/10 to-transparent transition-opacity duration-300 group-hover:from-[var(--color-primary-dark)]/80" />
                <p className="absolute bottom-5 left-5 text-base font-bold text-white transition-transform duration-300 group-hover:-translate-y-1">
                  {industry.name}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
