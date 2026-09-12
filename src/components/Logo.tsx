import Image from "next/image";

export function Logo({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#F0555C] to-[var(--color-primary-dark)] text-base font-extrabold text-white shadow-[0_6px_14px_-4px_rgba(214,32,39,0.6)]">
          Q
        </div>
        <div className="leading-none">
          <div className="text-[15px] font-extrabold tracking-tight text-white">
            QUICK
          </div>
          <div className="text-[11px] font-semibold tracking-[0.16em] text-[var(--color-primary)]">
            SOLUTIONS
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src="/brand/quick-solutions-logo.png"
      alt="Quick Solutions"
      width={200}
      height={78}
      priority
      className="h-9 w-auto"
    />
  );
}
