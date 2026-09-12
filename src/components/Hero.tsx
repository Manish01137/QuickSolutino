import Image from "next/image";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function Hero() {
  return (
    <section id="home" className="dot-grid relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-8 lg:py-28 lg:px-8">
        <div>
          <Reveal>
            <h1 className="text-[38px] font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-[46px] lg:text-[52px]">
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

        <Reveal delay={0.15} className="group overflow-hidden rounded-2xl">
          <Image
            src="/hero-infrastructure.jpg"
            alt="Quick Solutions IT infrastructure — servers, cloud and global support network"
            width={2200}
            height={1294}
            priority
            className="w-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}
