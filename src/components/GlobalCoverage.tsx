import { regions, globalReachIcons } from "@/data/content";
import Image from "next/image";
import { Icon } from "./ui/Icon";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

export function GlobalCoverage() {
  return (
    <section
      id="global-coverage"
      className="relative isolate overflow-hidden bg-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/globalcoveragbanner.png"
          alt="World map showing Quick Solutions' global IT infrastructure support network"
          fill
          sizes="100vw"
          className="object-cover object-[65%_center] lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 sm:via-white/85 lg:via-white/55 to-white/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <Reveal className="max-w-2xl">
          <Eyebrow>Global Coverage</Eyebrow>
          <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[32px] lg:text-[38px]">
            Global Reach. Local Expertise.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
            One partner for multi-country IT infrastructure support. We
            deliver consistent and responsive support through a global
            network of engineers and service partners.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4 lg:max-w-3xl">
          {globalReachIcons.map((item) => (
            <RevealItem
              key={item.label}
              className="group flex flex-col items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white/85 px-2 py-4 text-center shadow-[0_14px_32px_-26px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_14px_28px_-18px_rgba(214,32,39,0.3)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                <Icon name={item.icon} className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold leading-tight text-[var(--color-ink)] sm:text-xs">
                {item.label}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-20 lg:grid-cols-4">
          {regions.map((region) => (
            <RevealItem
              key={region.name}
              className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_18px_36px_-20px_rgba(214,32,39,0.28)]"
            >
              <p className="text-sm font-extrabold text-[var(--color-primary)]">
                {region.name}
              </p>
              <ul className="mt-3 space-y-1.5">
                {region.countries.split(", ").map((country) => (
                  <li
                    key={country}
                    className="flex items-center gap-2 text-xs text-[var(--color-body)] sm:text-sm"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]" />
                    {country}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
