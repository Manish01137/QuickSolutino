import {
  vendorLogos,
  vendorIcons,
  regions,
  globalReachIcons,
} from "@/data/content";
import { Icon } from "./ui/Icon";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { WorldMapArt } from "./illustrations/WorldMapArt";

export function MultiVendorSupport() {
  return (
    <section id="solutions" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: Multi-Vendor Support */}
          <Reveal>
            <Eyebrow>One Partner. Multiple Technology Vendors.</Eyebrow>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[32px]">
              Multi-Vendor Support
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
              We provide multi-vendor support for leading global technology
              brands, helping businesses maintain uptime and performance
              across their IT infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {vendorLogos.map((logo) => (
                <span
                  key={logo}
                  className="text-sm font-bold tracking-wide text-[var(--color-body)] grayscale transition-colors hover:text-[var(--color-primary)]"
                >
                  {logo}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {vendorIcons.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-alt-bg)] px-4 py-2"
                >
                  <Icon
                    name={item.icon}
                    className="h-4 w-4 text-[var(--color-primary)]"
                  />
                  <span className="text-xs font-semibold text-[var(--color-ink)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <Button href="#contact">Talk to an Expert</Button>
            </div>
          </Reveal>

          {/* Right: Global Reach */}
          <Reveal delay={0.1}>
            <Eyebrow>Global Reach. Local Expertise.</Eyebrow>
            <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[32px]">
              100+ Countries. One Partner.
            </h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-alt-bg)] p-4">
              <WorldMapArt className="w-full" />
            </div>

            <RevealGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {regions.map((region) => (
                <RevealItem
                  key={region.name}
                  className="rounded-xl border border-[var(--color-border)] p-4"
                >
                  <p className="text-sm font-bold text-[var(--color-ink)]">
                    {region.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-body)]">
                    {region.countries}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-6 flex flex-wrap gap-3">
              {globalReachIcons.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-2"
                >
                  <Icon
                    name={item.icon}
                    className="h-3.5 w-3.5 text-[var(--color-primary)]"
                  />
                  <span className="text-xs font-semibold text-[var(--color-ink)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
