import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CheckList } from "@/components/ui/CheckList";
import { VendorLogos } from "@/components/ui/VendorLogos";
import { Reveal, RevealGroup, RevealItem, RevealScale } from "@/components/ui/Reveal";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.metaDescription,
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      {/* Header */}
      <section className="dot-grid border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-24 lg:px-8">
          <Reveal>
            <Eyebrow align="center">Services</Eyebrow>
            <h1 className="mt-3 text-[32px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[40px] lg:text-[46px]">
              {service.h1}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-[var(--color-primary)]">
              {service.subhead}
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
              {service.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/#contact">{service.ctaPrimary}</Button>
              <Button href="/services" variant="outline">
                Back to All Services
              </Button>
            </div>
          </Reveal>

          <RevealScale delay={0.1} className="mt-12">
            <div className="group relative mx-auto aspect-[16/8] max-w-4xl overflow-hidden rounded-3xl shadow-[0_30px_60px_-25px_rgba(15,23,42,0.35)]">
              <Image
                src={service.image}
                alt={service.h1}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </RevealScale>
        </div>
      </section>

      {/* Content sections */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl space-y-14 px-6 py-16 lg:py-24 lg:px-8">
          {service.sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="text-xl font-extrabold text-[var(--color-ink)] sm:text-2xl">
                {section.heading}
              </h2>
              {section.body && (
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-body)]">
                  {section.body}
                </p>
              )}
              {section.items && (
                <div className="mt-5">
                  <CheckList items={section.items} />
                </div>
              )}
              {section.showVendorLogos && <VendorLogos className="mt-6" />}
            </Reveal>
          ))}

          {/* Process stepper */}
          {service.process && (
            <Reveal>
              <h2 className="text-xl font-extrabold text-[var(--color-ink)] sm:text-2xl">
                Our Process
              </h2>
              <RevealGroup className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {service.process.map((step, i) => (
                  <RevealItem key={step.title}>
                    <div className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-alt-bg)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_16px_32px_-16px_rgba(214,32,39,0.25)]">
                      <span className="text-xs font-bold text-[var(--color-primary)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2 text-sm font-bold text-[var(--color-ink)]">
                        {step.title}
                      </p>
                      {step.description && (
                        <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-body)]">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          )}

          {/* Why choose us / highlights */}
          {service.highlights && (
            <Reveal>
              <h2 className="text-xl font-extrabold text-[var(--color-ink)] sm:text-2xl">
                Why Choose Quick Solutions?
              </h2>
              <RevealGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {service.highlights.map((item) => (
                  <RevealItem key={item.title}>
                    <div className="group flex h-full gap-3 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border)] hover:bg-[var(--color-alt-bg)] hover:shadow-[0_16px_32px_-18px_rgba(15,23,42,0.2)]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                        <Icon name={item.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--color-ink)]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-body)]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-dark-1)]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              {service.ctaHeading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
              {service.ctaBody}
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/#contact" arrow>
                {service.ctaPrimary}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
