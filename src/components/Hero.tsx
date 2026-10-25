import Image from "next/image";
import { Button } from "./ui/Button";

const ALT =
  "Quick Solutions — IT Infrastructure, Without The Complexity. Global IT Infrastructure Partner, backed by 500+ engineers operating 24x7x365 across India and 100+ countries.";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="relative">
        <div className="hero-enter hero-enter-image">
          <Image
            src="/newbannerimg.png"
            alt={ALT}
            width={1983}
            height={793}
            priority
            quality={95}
            sizes="100vw"
            className="hidden h-auto w-full sm:block"
          />
          <Image
            src="/herobannermobileeenew.png"
            alt={ALT}
            width={946}
            height={1663}
            priority
            quality={95}
            sizes="100vw"
            className="h-auto w-full sm:hidden"
          />
        </div>

        {/* Positioned in image-relative units so the CTAs sit under the banner's own text column. */}
        <div className="hero-enter hero-enter-cta absolute left-[8%] right-[4%] top-[36%] sm:left-[6%] sm:right-auto sm:top-[71%]">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            <Button href="#contact" size="lg" className="ring-2 ring-white/70">
              Get IT Support
            </Button>
            <Button
              href="#contact"
              size="lg"
              variant="outline"
              arrow
              className="shadow-[0_14px_30px_-12px_rgba(15,23,42,0.35)]"
            >
              Talk to an Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
