import Image from "next/image";
import { industries } from "@/data/content";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";

export function IndustriesWeServe() {
  return (
    <section id="industries" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:py-28 lg:px-8">
        <SectionHeading
          eyebrow="IT Support Built For Your Industry"
          title="Industries We Serve"
          body="Supporting businesses with white-label IT infrastructure services across industries."
          align="center"
        />

        <p className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-[var(--color-body)] sm:hidden">
          Swipe to explore
          <span aria-hidden className="inline-block animate-[nudge_1.6s_ease-in-out_infinite]">→</span>
        </p>

        {/* Phones: swipeable snap carousel. Tablet and up: grid. */}
        <RevealGroup className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-6 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {industries.map((industry) => (
            <RevealItem key={industry.name} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <div className="group relative h-80 overflow-hidden rounded-3xl shadow-[0_20px_40px_-24px_rgba(15,23,42,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_48px_-20px_rgba(15,23,42,0.4)] sm:h-64 sm:rounded-2xl">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 80vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/10 to-transparent transition-opacity duration-300 group-hover:from-[var(--color-primary-dark)]/80" />
                <div className="absolute inset-x-5 bottom-5 transition-transform duration-500 group-hover:-translate-y-1">
                  <p className="text-lg font-bold text-white">{industry.name}</p>
                  <span className="mt-2 block h-[2px] w-8 rounded-full bg-[var(--color-primary)] transition-all duration-500 group-hover:w-20 group-hover:bg-white" />
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
