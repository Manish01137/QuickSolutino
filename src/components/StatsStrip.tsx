import { stats } from "@/data/content";
import { Icon } from "./ui/Icon";
import { CountUp } from "./ui/CountUp";
import { RevealGroup, RevealItem } from "./ui/Reveal";

export function StatsStrip() {
  return (
    <section className="relative border-y border-[var(--color-border)] bg-[var(--color-alt-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-[var(--color-border)]">
          {stats.map((stat, i) => (
            <RevealItem
              key={stat.value}
              className={`group flex flex-col items-center px-2 text-center ${
                i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--color-primary)] shadow-[0_10px_24px_-14px_rgba(214,32,39,0.55)] ring-1 ring-[var(--color-border)] transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:bg-[var(--color-primary)] group-hover:text-white">
                <Icon name={stat.icon} className="h-6 w-6" />
              </div>
              <CountUp
                value={stat.value}
                className="mt-4 text-base font-extrabold text-[var(--color-ink)] sm:text-lg lg:text-xl"
              />
              <p className="mt-1 max-w-[16ch] text-xs leading-snug text-[var(--color-body)] sm:text-sm">
                {stat.caption}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
