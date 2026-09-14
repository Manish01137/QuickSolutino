import { vendorLogos } from "@/data/content";

export function VendorLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-5 ${className}`}>
      {vendorLogos.map((vendor) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={vendor.name}
          src={vendor.src}
          alt={vendor.name}
          title={vendor.name}
          className={`h-8 shrink-0 object-contain object-left grayscale transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:grayscale-0 ${vendor.widthClass}`}
        />
      ))}
    </div>
  );
}
