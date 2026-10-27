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
      <div
        className="absolute inset-x-0 top-1/2 hidden aspect-2014/780 w-full -translate-y-1/2 lg:block 5xl:left-auto 5xl:max-w-[2560px]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)",
        }}
      >
        <Image
          src="/banner.png"
          alt="Server connected to multiple technology vendors including IBM, Dell, Cisco, Oracle, Hitachi and NetApp"
          fill
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:py-28 lg:px-8">
        <Reveal className="max-w-xl 3xl:max-w-2xl">
          <Eyebrow>Multi-Vendor Support</Eyebrow>
          <h2 className="mt-3 max-w-lg text-[2rem] font-extrabold leading-[1.12] text-[var(--color-ink)] sm:text-[2.625rem]">
            One Partner. Multiple Technology Vendors.
          </h2>
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--color-body)] sm:text-base 3xl:text-lg">
            We provide multi-vendor support for leading global technology
            brands, helping businesses maintain uptime and performance
            across their IT infrastructure.
          </p>

          <VendorLogos className="mt-9 max-w-xl 3xl:max-w-2xl" />

          <div className="mt-8 flex max-w-xl flex-wrap gap-2 sm:mt-9 sm:grid sm:grid-cols-5 sm:gap-3 3xl:max-w-2xl">
            {vendorIcons.map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3.5 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[0_10px_20px_-10px_rgba(214,32,39,0.35)] sm:min-h-20 sm:flex-col sm:justify-center sm:rounded-xl sm:px-2 sm:py-3 sm:text-center"
              >
                <Icon
                  name={item.icon}
                  className="h-4 w-4 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
                />
                <span className="text-xs font-semibold text-[var(--color-ink)] sm:text-[0.6875rem]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <Button href="#contact" arrow>
              Talk to an Expert
            </Button>
          </div>
        </Reveal>

        <Reveal className="mt-12 lg:hidden">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_24px_50px_-28px_rgba(214,32,39,0.45)] sm:aspect-[16/9]">
            <Image
              src="/banner.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[78%_center]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
