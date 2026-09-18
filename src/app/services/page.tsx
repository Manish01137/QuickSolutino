import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "IT Infrastructure Services | Quick Solutions",
  description:
    "Explore Quick Solutions' full range of IT infrastructure services — Smart Hands, hardware maintenance, data center support, rollouts, dedicated engineers and more.",
};

export default function ServicesIndexPage() {
  return (
    <section className="dot-grid bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="End-to-End IT Infrastructure Services"
          body="Explore the full range of services Quick Solutions delivers across India and 100+ countries."
          align="center"
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <RevealItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_28px_48px_-20px_rgba(15,23,42,0.25)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.navTitle}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                  <span className="absolute right-4 top-4 text-xs font-bold text-white/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute -bottom-8 left-5 flex h-18 w-18 items-center justify-center rounded-2xl bg-white p-1 shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                    <Image
                      src={service.iconImage}
                      alt=""
                      width={96}
                      height={96}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-5 pb-6 pt-9">
                  <h3 className="text-base font-bold text-[var(--color-ink)]">
                    {service.navTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-body)]">
                    {service.subhead}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
