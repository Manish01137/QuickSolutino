import { deliveryCapabilities, deliveryBenefits } from "@/data/content";
import { Icon } from "./ui/Icon";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

export function DeliveryCapabilities() {
  return (
    <section className="bg-[var(--color-alt-bg)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow align="center">From Deployment To Ongoing Support</Eyebrow>
          <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[32px]">
            Project &amp; Delivery Capabilities
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {deliveryCapabilities.map((item) => (
            <RevealItem key={item.title}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-primary)]/30 hover:shadow-[0_20px_36px_-18px_rgba(214,32,39,0.3)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-chip)] text-[var(--color-primary)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold leading-snug text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                  {item.title}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deliveryBenefits.map((benefit) => (
            <RevealItem key={benefit.title}>
              <p className="text-sm font-bold text-[var(--color-ink)]">
                {benefit.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                {benefit.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
