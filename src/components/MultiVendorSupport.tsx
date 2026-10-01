import Image from "next/image";
import { vendorIcons } from "@/data/content";
import { Icon } from "./ui/Icon";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { VendorLogos } from "./ui/VendorLogos";

export function MultiVendorSupport() {
  return (
    <section id="solutions" className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-1/2 aspect-2014/780 w-full -translate-y-1/2">
        <Image
          src="/banner.png"
          alt="Server connected to multiple technology vendors including IBM, Dell, Cisco, Oracle, Hitachi and NetApp"
          fill
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <Reveal className="max-w-xl">
          <Eyebrow>Multi-Vendor Support</Eyebrow>
          <h2 className="mt-3 max-w-lg text-[32px] font-extrabold leading-[1.12] text-[var(--color-ink)] sm:text-[42px]">
            One Partner. Multiple Technology Vendors.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
            We provide multi-vendor support for leading global technology
            brands, helping businesses maintain uptime and performance
            across their IT infrastructure.
          </p>

          <VendorLogos className="mt-9 max-w-xl" />

          <div className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-5">
            {vendorIcons.map((item) => (
              <div
                key={item.label}
                className="group flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-2 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_10px_20px_-10px_rgba(214,32,39,0.35)]"
              >
                <Icon
                  name={item.icon}
                  className="h-5 w-5 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-[11px] font-semibold text-[var(--color-ink)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <Button href="#contact">Talk to an Expert</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
