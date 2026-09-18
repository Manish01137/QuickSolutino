import { indiaStats, whyQuickSolutions } from "@/data/content";
import Image from "next/image";
import { Icon } from "./ui/Icon";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

export function NationwideCoverage() {
  return (
    <section id="global-coverage" className="bg-[var(--color-alt-bg)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: Nationwide Coverage */}
          <Reveal>
            <Eyebrow>Strong Presence. Nationwide Coverage.</Eyebrow>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[32px]">
              One Partner. All of India.
            </h2>

            <div className="group relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_22px_45px_-30px_rgba(15,23,42,0.45)]">
              <Image
                src="/vendors/Globar coverage img.png"
                alt="Global coverage from Quick Solutions with India as the head office"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <RevealGroup className="mt-6 space-y-3">
              {indiaStats.map((item) => (
                <RevealItem
                  key={item.label}
                  className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_14px_28px_-18px_rgba(214,32,39,0.3)]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {item.label}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          {/* Right: Why Quick Solutions */}
          <Reveal delay={0.1}>
            <Eyebrow>Why Quick Solutions</Eyebrow>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[32px]">
              One Partner. Complete Support. Always.
            </h2>

            <RevealGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {whyQuickSolutions.map((item) => (
                <RevealItem key={item.title}>
                  <div className="group flex h-full gap-3 rounded-xl border border-transparent p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border)] hover:bg-white hover:shadow-[0_14px_28px_-18px_rgba(15,23,42,0.2)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--color-primary)] shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-ink)]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--color-body)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
