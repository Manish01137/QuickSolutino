import { regions, globalReachIcons } from "@/data/content";
import { Icon } from "./ui/Icon";
import { BackgroundVideo } from "./ui/BackgroundVideo";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

export function GlobalCoverage() {
  return (
    <section
      id="global-coverage"
      className="relative isolate overflow-hidden bg-[var(--color-dark-1)]"
    >
      <div className="absolute inset-0">
        <BackgroundVideo
          sources={[
            { src: "/videos/global-coverage-1080.mp4", media: "(min-width: 768px)" },
            { src: "/videos/global-coverage-720.mp4" },
          ]}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-1)]/90 via-[var(--color-dark-1)]/55 to-[var(--color-dark-1)]/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-dark-1)] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:py-20 lg:px-8">
        <Reveal className="max-w-2xl">
          <Eyebrow>Global Coverage</Eyebrow>
          <h2 className="mt-3 text-[1.875rem] font-extrabold leading-tight text-white sm:text-[2.25rem] lg:text-[2.75rem]">
            Global Reach.{" "}
            <span className="bg-gradient-to-r from-[#ff6b70] to-[var(--color-primary)] bg-clip-text text-transparent">
              Local Expertise.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-slate-300 sm:text-base">
            One partner for multi-country IT infrastructure support. We
            deliver consistent and responsive support through a global
            network of engineers and service partners.
          </p>
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-3 gap-2.5 sm:mt-10 sm:grid-cols-6 sm:gap-4 lg:max-w-3xl 3xl:max-w-4xl">
          {globalReachIcons.map((item) => (
            <RevealItem
              key={item.label}
              className="group flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-2 py-4 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/60 hover:bg-white/10"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/15 text-[#ff6b70] ring-1 ring-[var(--color-primary)]/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white">
                <Icon name={item.icon} className="h-4 w-4" />
              </div>
              <span className="text-[0.6875rem] font-semibold leading-tight text-white/90 sm:text-xs">
                {item.label}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-4">
          {regions.map((region) => (
            <RevealItem
              key={region.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md sm:p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:bg-white/10"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[var(--color-primary)] to-[#ff6b70] transition-transform duration-500 group-hover:scale-x-100"
              />
              <p className="text-sm font-extrabold text-white">{region.name}</p>
              <ul className="mt-3 space-y-1.5">
                {region.countries.split(", ").map((country) => (
                  <li
                    key={country}
                    className="flex items-center gap-2 text-xs text-slate-300 sm:text-sm"
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
