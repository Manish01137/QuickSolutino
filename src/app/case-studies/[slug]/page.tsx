import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem, RevealScale } from "@/components/ui/Reveal";

const outcomeIcons = ["trendingUp", "badgeCheck", "zap", "shieldCheck"];

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: `${study.title} | Quick Solutions Case Study`,
    description: study.problem.slice(0, 155),
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      {/* Header */}
      <section className="dot-grid border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-24 lg:px-8">
          <Reveal>
            <Eyebrow align="center">Case Study</Eyebrow>
            <h1 className="mt-3 text-[26px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[32px] lg:text-[38px]">
              {study.title}
            </h1>

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[var(--color-border)] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_16px_32px_-18px_rgba(214,32,39,0.25)]">
                <p className="eyebrow !text-[11px]">Industry</p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                  {study.industry}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_16px_32px_-18px_rgba(214,32,39,0.25)]">
                <p className="eyebrow !text-[11px]">Service</p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                  {study.service}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_16px_32px_-18px_rgba(214,32,39,0.25)]">
                <p className="eyebrow !text-[11px]">Locations</p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                  {study.locations}
                </p>
              </div>
            </div>
          </Reveal>

          <RevealScale delay={0.1} className="mt-12">
            <div className="group relative mx-auto aspect-[16/8] max-w-4xl overflow-hidden rounded-3xl shadow-[0_30px_60px_-25px_rgba(15,23,42,0.35)]">
              <Image
                src={study.image}
                alt={study.title}
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

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24 lg:px-8">
          {/* Problem */}
          <Reveal>
            <h2 className="text-xl font-extrabold text-[var(--color-ink)] sm:text-2xl">
              The Problem
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
              {study.problem}
            </p>
            {study.objective && (
              <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-alt-bg)] p-6">
                <p className="text-sm font-bold text-[var(--color-ink)]">
                  The customer needed to:
                </p>
                <ul className="mt-3 space-y-2">
                  {study.objective.map((point) => (
                    <li
                      key={point}
                      className="text-sm leading-relaxed text-[var(--color-body)]"
                    >
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          {/* Solution */}
          <Reveal delay={0.05} className="mt-14">
            <h2 className="text-xl font-extrabold text-[var(--color-ink)] sm:text-2xl">
              The Solution
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
              {study.solutionIntro}
            </p>

            <RevealGroup className="mt-6 space-y-4">
              {study.actions.map((action, i) => (
                <RevealItem key={action.heading}>
                  <div className="group flex gap-4 rounded-2xl border border-[var(--color-border)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[0_16px_32px_-18px_rgba(214,32,39,0.25)]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-chip)] text-sm font-bold text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-ink)]">
                        {action.heading}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-body)]">
                        {action.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          {/* Outcomes */}
          <Reveal delay={0.05} className="mt-14">
            <h2 className="text-xl font-extrabold text-[var(--color-ink)] sm:text-2xl">
              The Outcomes
            </h2>
            <RevealGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {study.outcomes.map((outcome, i) => (
                <RevealItem key={outcome.heading}>
                  <div className="group flex h-full gap-3 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border)] hover:bg-[var(--color-alt-bg)] hover:shadow-[0_16px_32px_-18px_rgba(15,23,42,0.2)]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                      <Icon name={outcomeIcons[i % outcomeIcons.length]} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-ink)]">
                        {outcome.heading}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-body)]">
                        {outcome.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          {/* Testimonial */}
          <Reveal delay={0.05} className="mt-14">
            <div className="rounded-2xl bg-[var(--color-alt-bg)] p-8 sm:p-10">
              <p className="text-lg font-medium italic leading-relaxed text-[var(--color-ink)] sm:text-xl">
                &ldquo;{study.testimonial}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-dark-1)]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready for results like these?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
              Tell us about your IT infrastructure challenge and we&apos;ll help
              you design the right support model.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/#contact" arrow>
                Talk to Quick Solutions Today
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
