import { vendorLogos } from "@/data/content";

/** Endless, full-colour scrolling band of supported vendor logos. Pauses on hover. */
export function VendorMarquee() {
  const row = [...vendorLogos, ...vendorLogos];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="vendor-marquee flex w-max items-center gap-4 group-hover:[animation-play-state:paused] sm:gap-6">
        {row.map((v, i) => (
          <li
            key={`${v.name}-${i}`}
            aria-hidden={i >= vendorLogos.length}
            className="flex h-16 w-36 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white px-5 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.35)] sm:h-20 sm:w-44"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.src} alt={i < vendorLogos.length ? v.name : ""} className="h-8 w-full object-contain sm:h-9" />
          </li>
        ))}
      </ul>
    </div>
  );
}
