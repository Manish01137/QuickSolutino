import type { Metadata } from "next";
import { services } from "@/data/services";
import { getImageAspect } from "@/lib/imageSize";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "IT Infrastructure Services | Quick Solutions",
  description:
    "Explore Quick Solutions' full range of IT infrastructure services — Smart Hands, hardware maintenance, data center support, rollouts, dedicated engineers and more.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <ServicesHero count={services.length} />

      <section className="bg-[var(--color-alt-bg)]">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 3xl:grid-cols-4 4xl:grid-cols-5">
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={i}
                imageAspect={getImageAspect(service.image)}
              />
            ))}
          </div>

          <Reveal className="relative mt-12 overflow-hidden rounded-[32px] bg-[var(--color-dark-1)] px-6 py-12 text-center sm:px-12 sm:py-16 lg:mt-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[var(--color-primary)]/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#f0555c]/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-[1.625rem] font-extrabold leading-tight text-white sm:text-[2.125rem]">
                Not sure which service fits your infrastructure?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-slate-300 sm:text-base">
                Tell us about your environment and our engineers will recommend
                the right support model.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/#contact" arrow className="justify-center">
                  Talk to an Expert
                </Button>
                <Button href="tel:+919586777229" variant="outline-dark" className="justify-center">
                  Call +91 95867 77229
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
