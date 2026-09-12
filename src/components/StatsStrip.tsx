import { stats } from "@/data/content";
import { Icon } from "./ui/Icon";
import { RevealGroup, RevealItem } from "./ui/Reveal";

export function StatsStrip() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-alt-bg)]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <RevealGroup className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <RevealItem key={stat.value} className="group flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon name={stat.icon} className="h-6 w-6" />
              </div>
              <p className="mt-4 text-base font-extrabold text-[var(--color-ink)] sm:text-lg">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[var(--color-body)] sm:text-sm">
                {stat.caption}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
