import Image from "next/image";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function Hero() {
  return (
    <section id="home" className="bg-white">
      <div className="relative">
        <Image
          src="/newbannerimg.png"
          alt="Quick Solutions — IT Infrastructure, Without The Complexity. Global IT Infrastructure Partner, backed by 500+ engineers operating 24x7x365 across India and 100+ countries."
          width={1983}
          height={793}
          priority
          quality={95}
          sizes="100vw"
          className="hidden h-auto w-full sm:block"
        />
        <Image
          src="/herobannermobileeenew.png"
          alt="Quick Solutions — IT Infrastructure, Without The Complexity. Global IT Infrastructure Partner, backed by 500+ engineers operating 24x7x365 across India and 100+ countries."
          width={946}
          height={1663}
          priority
          quality={95}
          sizes="100vw"
          className="h-auto w-full sm:hidden"
        />

        <div className="absolute inset-x-0 bottom-[7%]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button href="#contact" className="ring-2 ring-white/70">
                Get IT Support
              </Button>
              <Button href="#contact" variant="outline" arrow>
                Talk to an Expert
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
