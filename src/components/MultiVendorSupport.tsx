import Image from "next/image";
import { vendorIcons } from "@/data/content";
import { Icon } from "./ui/Icon";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { VendorLogos } from "./ui/VendorLogos";

export function MultiVendorSupport() {
  return (
    <section id="solutions" className="overflow-hidden bg-[var(--color-alt-bg)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left: Multi-Vendor Support */}
          <Reveal>
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

          <Reveal delay={0.1} className="relative">
            <div className="absolute -right-20 -top-16 h-52 w-52 rounded-full border-[24px] border-[var(--color-primary)]/10" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white p-3 shadow-[0_24px_60px_-36px_rgba(214,32,39,0.45)]">
              <Image
                src="/server_company_network.png"
                alt="Server connected to multiple technology vendors"
                width={1632}
                height={972}
                className="w-full rounded-[1.5rem] object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
