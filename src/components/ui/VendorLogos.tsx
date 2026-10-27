import { vendorLogos } from "@/data/content";

export function VendorLogos({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 ${className}`}>
      {vendorLogos.map((vendor) => (
        <li
          key={vendor.name}
          title={vendor.name}
          className="group flex h-14 3xl:h-16 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white/90 px-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/40 hover:shadow-[0_12px_24px_-14px_rgba(214,32,39,0.4)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vendor.src}
            alt={vendor.name}
            className="h-7 w-full object-contain opacity-70 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
