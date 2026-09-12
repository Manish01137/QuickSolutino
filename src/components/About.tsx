import Image from "next/image";
import { aboutHighlights } from "@/data/content";
import { Icon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

export function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <div className="group mx-auto max-w-xs lg:max-w-sm">
            <Image
              src="/brand/q-emblem-3d.jpg"
              alt="Quick Solutions emblem"
              width={1180}
              height={1080}
              className="w-full rounded-3xl transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-1"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About Quick Solutions"
            title="One Partner. Complete IT Infrastructure Support."
            body="Quick Solutions is an IT infrastructure support partner helping businesses maintain reliable, secure and high-performing technology environments. From smart hands and remote hands to hardware maintenance, server and storage support, networking, data center services, deployments and relocations — we provide the technical expertise and operational support businesses need to keep their IT infrastructure running."
          />

          <RevealGroup className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {aboutHighlights.map((item) => (
              <RevealItem key={item.label}>
                <div className="group flex items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-[var(--color-alt-bg)]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                    <Icon name={item.icon} className="h-[18px] w-[18px]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {item.label}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
