import Image from "next/image";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Image
          src="/heroimgbanner.png"
          alt="Quick Solutions data center infrastructure connected across a global support network"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[70%_center] lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 sm:via-white/85 lg:via-white/60 to-white/10" />
      </div>

      <div className="relative mx-auto min-h-[560px] max-w-7xl px-6 py-24 sm:min-h-[620px] lg:flex lg:min-h-[680px] lg:items-center lg:py-28 lg:px-8">
        <div className="min-w-0 max-w-xl">
          <Reveal>
            <Eyebrow>Global IT Infrastructure Partner</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 max-w-full break-words text-[32px] font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-[46px] lg:text-[52px]">
              IT INFRASTRUCTURE,{" "}
              <span className="text-[var(--color-primary)]">
                WITHOUT THE COMPLEXITY.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
              End-to-end infrastructure support built for scale — data
              centers, networks and multi-vendor environments, backed by
              500+ engineers operating 24x7x365 across India and 100+
              countries.
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
      </div>
    </section>
  );
}
