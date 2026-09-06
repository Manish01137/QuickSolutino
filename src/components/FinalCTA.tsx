import Image from "next/image";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--color-dark-1)]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=75&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-1)] via-[var(--color-dark-1)]/95 to-[var(--color-dark-2)]/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-[28px] font-extrabold leading-tight text-white sm:text-[34px] lg:text-[38px]">
            Keep Your IT Infrastructure Running.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Whether you need 24x7 support, onsite engineers, hardware
            maintenance, project deployment or multi-country IT support,
            Quick Solutions is ready to help. Let&apos;s discuss how we can
            support your IT operations.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#contact" arrow>
              Talk to an IT Expert
            </Button>
            <Button href="#contact" variant="outline-dark" arrow>
              Request a Service
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
