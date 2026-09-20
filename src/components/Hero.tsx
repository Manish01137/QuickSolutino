import Image from "next/image";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-white">
      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div className="min-w-0 max-w-xl">
          <Reveal>
            <h1 className="max-w-full break-words text-[32px] font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-[46px] lg:text-[52px]">
              IT INFRASTRUCTURE,{" "}
              <span className="text-[var(--color-primary)]">
                WITHOUT THE COMPLEXITY.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
              End-to-end IT infrastructure support for businesses across
              India and 100+ countries — powered by 24x7x365 operations,
              500+ engineers and multi-vendor expertise.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#contact">Get IT Support</Button>
              <Button href="#contact" variant="outline" arrow>
                Talk to an Expert
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          className="group relative hidden min-h-[360px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-alt-bg)] shadow-[0_24px_60px_-36px_rgba(214,32,39,0.45)] lg:block"
        >
          <Image
            src="/hero-infrastructure.jpg"
            alt="IT infrastructure supporting businesses worldwide"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </Reveal>
      </div>
    </section>
  );
}
