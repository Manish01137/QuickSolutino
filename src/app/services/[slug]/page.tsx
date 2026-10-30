import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Clock, Globe2, Phone, ShieldCheck, Users } from "lucide-react";
import { services, getServiceBySlug, type ServiceSection } from "@/data/services";
import { getImageAspect } from "@/lib/imageSize";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "@/components/ui/CountUp";
import { VendorMarquee } from "@/components/ui/VendorMarquee";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceHero } from "@/components/services/ServiceHero";
import { serviceHeroCrops, DEFAULT_CROP } from "@/data/serviceHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

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

const STATS = [
  { icon: Clock, value: "24x7x365", label: "Support coverage" },
  { icon: Users, value: "500+", label: "Skilled engineers" },
  { icon: Globe2, value: "100+", label: "Countries served" },
  { icon: ShieldCheck, value: "ISO 9001:2015", label: "Certified quality" },
];

// Consecutive text-only sections are shown together as a row of feature panels.
type Block =
  | { kind: "list"; section: ServiceSection; index: number }
  | { kind: "panels"; sections: { section: ServiceSection; index: number }[] };

function toBlocks(sections: ServiceSection[]): Block[] {
  const blocks: Block[] = [];
  sections.forEach((section, index) => {
    if (section.items?.length) {
      blocks.push({ kind: "list", section, index });
      return;
    }
    const last = blocks[blocks.length - 1];
    if (last?.kind === "panels") last.sections.push({ section, index });
    else blocks.push({ kind: "panels", sections: [{ section, index }] });
  });
  return blocks;
}

const num = (i: number) => String(i + 1).padStart(2, "0");

const FALLBACK_FEATURES = [
  { icon: "userCheck", title: "Skilled Engineers" },
  { icon: "clock", title: "24x7 Support" },
  { icon: "layers", title: "Multi-Vendor" },
  { icon: "globe2", title: "Global Reach" },
];

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const blocks = toBlocks(service.sections);
  const heroFeatures = (service.highlights?.length ? service.highlights : FALLBACK_FEATURES).slice(0, 4);
  const heroCallouts = (service.sections.find((x) => x.items?.length)?.items ?? []).slice(0, 4);
  const position = services.findIndex((s) => s.slug === service.slug);
  const related = [1, 2, 3].map((k) => services[(position + k) % services.length]);

  return (
    <>
      {/* ───────── Hero (live, rebuilt from the banner artwork) ───────── */}
      <ServiceHero
        title={service.h1}
        navTitle={service.navTitle}
        subhead={service.subhead}
        ctaPrimary={service.ctaPrimary}
        image={service.image}
        imageAspect={getImageAspect(service.image)}
        crop={serviceHeroCrops[service.slug] ?? DEFAULT_CROP}
        features={heroFeatures}
        callouts={heroCallouts}
      />

      {/* ───────── Stats + overview ───────── */}
      <section className="relative border-t border-[var(--color-border)] bg-[var(--color-alt-bg)]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <Reveal>
            <ul className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white bg-white shadow-[0_30px_60px_-36px_rgba(15,23,42,0.45)] md:grid-cols-4">
              {STATS.map(({ icon: StatIcon, value, label }, i) => (
                <li
                  key={label}
                  className={`flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5 ${i % 2 === 1 ? "border-l border-[var(--color-border)]" : ""} ${i >= 2 ? "border-t border-[var(--color-border)] md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-chip)] text-[var(--color-primary)] sm:h-11 sm:w-11">
                    <StatIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <CountUp value={value} className="block text-sm font-extrabold text-[var(--color-ink)] sm:text-lg" />
                    <span className="block text-[0.6875rem] text-[var(--color-body)] sm:text-xs">{label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
              <p className="mt-3 text-[1.625rem] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[2rem]">
                {service.navTitle}, <span className="text-[var(--color-primary)]">done right.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-body)] sm:text-base lg:text-[1.0625rem]">
                {service.intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Content blocks ───────── */}
      {blocks.map((block, b) => {
        const tint = b % 2 === 0 ? "bg-[var(--color-alt-bg)]" : "bg-white";

        if (block.kind === "list") {
          const { section, index } = block;
          return (
            <section key={section.heading} className={`${tint} border-t border-[var(--color-border)]`}>
              <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16 lg:px-8 lg:py-20">
                <Reveal className="lg:sticky lg:top-28 lg:self-start">
                  <span
                    aria-hidden
                    className="block text-6xl font-extrabold leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_var(--color-primary)] sm:text-7xl"
                  >
                    {num(index)}
                  </span>
                  <h2 className="mt-4 text-[1.625rem] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[2.125rem]">
                    {section.heading}
                  </h2>
                  {section.body && (
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--color-body)] sm:text-base">{section.body}</p>
                  )}
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--color-ink)] shadow-[0_10px_24px_-16px_rgba(15,23,42,0.4)] ring-1 ring-[var(--color-border)]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[0.625rem] font-bold text-white">
                      {section.items!.length}
                    </span>
                    {/benefit/i.test(section.heading) ? "key benefits" : "capabilities covered"}
                  </p>
                </Reveal>

                <RevealGroup className="grid gap-3 sm:grid-cols-2 sm:gap-4" stagger={0.05}>
                  {section.items!.map((item, i) => (
                    <RevealItem key={item}>
                      <div className="card-glow group flex h-full items-start gap-3.5 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_40px_-24px_rgba(214,32,39,0.45)] sm:p-5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5a5f] to-[var(--color-primary-dark)] text-white shadow-[0_8px_16px_-8px_rgba(214,32,39,0.7)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.6875rem] font-bold tracking-wider text-[var(--color-primary)]/70">{num(i)}</span>
                          <span className="mt-0.5 block text-[0.9375rem] font-semibold leading-snug text-[var(--color-ink)]">{item}</span>
                        </span>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>

              {section.showVendorLogos && (
                <Reveal className="pb-12 lg:pb-20">
                  <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-body)]">
                    Trusted across leading technology brands
                  </p>
                  <VendorMarquee />
                </Reveal>
              )}
            </section>
          );
        }

        const cols = block.sections.length >= 3 ? "lg:grid-cols-3" : block.sections.length === 2 ? "md:grid-cols-2" : "";
        return (
          <section key={block.sections[0].section.heading} className={`${tint} border-t border-[var(--color-border)]`}>
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
              <RevealGroup className={`grid gap-5 ${cols}`}>
                {block.sections.map(({ section, index }) => (
                  <RevealItem key={section.heading}>
                    <article className="card-glow group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[0_20px_44px_-34px_rgba(15,23,42,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_60px_-34px_rgba(214,32,39,0.4)] sm:p-8">
                      <span aria-hidden className="absolute -right-3 -top-6 text-[7rem] font-extrabold leading-none text-[var(--color-alt-bg)] transition-colors duration-500 group-hover:text-[var(--color-chip)]">
                        {num(index)}
                      </span>
                      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                        <Icon name={service.icon} className="h-6 w-6" />
                      </span>
                      <h2 className="relative mt-5 text-xl font-extrabold leading-snug text-[var(--color-ink)] sm:text-2xl">
                        {section.heading}
                      </h2>
                      <span aria-hidden className="relative mt-3 block h-[2px] w-10 rounded-full bg-[var(--color-primary)] transition-all duration-500 group-hover:w-20" />
                      {section.body && (
                        <p className="relative mt-4 text-[0.9375rem] leading-relaxed text-[var(--color-body)] sm:text-base">{section.body}</p>
                      )}
                    </article>
                  </RevealItem>
                ))}
              </RevealGroup>

              {block.sections.some(({ section }) => section.showVendorLogos) && (
                <Reveal className="mt-12">
                  <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-body)]">
                    Trusted across leading technology brands
                  </p>
                  <VendorMarquee />
                </Reveal>
              )}
            </div>
          </section>
        );
      })}

      {/* ───────── Process timeline ───────── */}
      {service.process && (
        <section className="relative overflow-hidden bg-[var(--color-dark-1)]">
          <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "1.5rem 1.5rem" }}
          />
          <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
            <Reveal className="max-w-2xl">
              <Eyebrow>How We Deliver</Eyebrow>
              <h2 className="mt-3 text-[1.75rem] font-extrabold leading-tight text-white sm:text-[2.375rem]">
                Our Process, <span className="text-[#ff6b70]">Step by Step</span>
              </h2>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-y-10" stagger={0.08}>
              {service.process.map((step, i) => (
                <RevealItem key={step.title} className="relative pl-14 sm:pl-0">
                  {/* phone: vertical rail; sm+: horizontal rail through the nodes */}
                  <span aria-hidden className="absolute bottom-[-1rem] left-[1.15rem] top-0 w-px bg-gradient-to-b from-[var(--color-primary)] to-white/10 sm:hidden" />
                  <span aria-hidden className="absolute left-0 right-[-1.25rem] top-5 hidden h-px bg-gradient-to-r from-[var(--color-primary)] to-white/15 sm:block" />
                  <span className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff5a5f] to-[var(--color-primary-dark)] text-sm font-extrabold text-white shadow-[0_0_0_6px_rgba(214,32,39,0.15),0_10px_24px_-8px_rgba(214,32,39,0.8)] sm:relative">
                    {num(i)}
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--color-primary)]/50 hover:bg-white/[0.08] sm:mt-5">
                    <p className="text-base font-bold text-white">{step.title}</p>
                    {step.description && <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.description}</p>}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ───────── Why choose us ───────── */}
      {service.highlights && (
        <section className="border-t border-[var(--color-border)] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
              <Reveal>
                <Eyebrow>Why Quick Solutions</Eyebrow>
                <h2 className="mt-3 text-[1.75rem] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[2.375rem]">
                  Why Choose <span className="text-[var(--color-primary)]">Quick Solutions?</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--color-body)] sm:text-base lg:text-right">
                  One accountable partner for skilled engineers, multi-vendor expertise and consistent service quality across India and 100+ countries.
                </p>
              </Reveal>
            </div>

            <RevealGroup
              className={`mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 ${
                service.highlights.length === 5 ? "lg:grid-cols-3 lg:grid-rows-2" : service.highlights.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {service.highlights.map((item, i) => {
                const featured = i === 0 && service.highlights!.length === 5;
                return (
                  <RevealItem key={item.title} className={featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                    <div
                      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 sm:p-7 ${
                        featured
                          ? "bg-[var(--color-dark-1)] text-white shadow-[0_30px_60px_-30px_rgba(11,27,58,0.8)]"
                          : "card-glow border border-[var(--color-border)] bg-[var(--color-alt-bg)] hover:bg-white hover:shadow-[0_28px_50px_-30px_rgba(214,32,39,0.45)]"
                      }`}
                    >
                      {featured && (
                        <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[var(--color-primary)]/30 blur-3xl" />
                      )}
                      <span
                        className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                          featured ? "bg-[var(--color-primary)] text-white" : "bg-white text-[var(--color-primary)] shadow-[0_10px_20px_-12px_rgba(214,32,39,0.6)]"
                        }`}
                      >
                        <Icon name={item.icon} className="h-6 w-6" />
                      </span>
                      <p className={`relative mt-6 font-extrabold ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>{item.title}</p>
                      <p className={`relative mt-2 text-sm leading-relaxed ${featured ? "text-slate-300 sm:text-base" : "text-[var(--color-body)]"}`}>
                        {item.description}
                      </p>
                      {featured && (
                        <p className="relative mt-auto pt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b70]">
                          Quick Solutions advantage
                        </p>
                      )}
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ───────── CTA ───────── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-alt-bg)]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-[var(--color-dark-1)] px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
            <Image src={service.image} alt="" fill sizes="80rem" className="object-cover opacity-[0.12] mix-blend-luminosity" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-1)] via-[var(--color-dark-1)]/90 to-[var(--color-dark-1)]/60" />
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--color-primary)]/35 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="text-[1.625rem] font-extrabold leading-tight text-white sm:text-[2.25rem]">{service.ctaHeading}</h2>
                <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-slate-300 sm:text-base">{service.ctaBody}</p>
              </div>
              <div className="grid gap-3 sm:flex sm:flex-wrap lg:justify-end">
                <Button href="/#contact" arrow className="justify-center">
                  {service.ctaPrimary}
                </Button>
                <Button href="tel:+919586777229" variant="outline-dark" className="justify-center">
                  <Phone className="h-4 w-4" />
                  +91 95867 77229
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Related services ───────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <Eyebrow>Keep Exploring</Eyebrow>
              <h2 className="mt-3 text-[1.75rem] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[2.375rem]">
                More Services
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/services"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]"
              >
                View all services
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} imageAspect={getImageAspect(s.image)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
