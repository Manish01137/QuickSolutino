export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B9BFF] to-[var(--color-primary-dark)] text-base font-extrabold text-white shadow-[0_6px_14px_-4px_rgba(37,99,235,0.6)]">
        Q
      </div>
      <div className="leading-none">
        <div
          className={`text-[15px] font-extrabold tracking-tight ${
            dark ? "text-white" : "text-[var(--color-ink)]"
          }`}
        >
          QUICK
        </div>
        <div className="text-[11px] font-semibold tracking-[0.16em] text-[var(--color-primary)]">
          SOLUTIONS
        </div>
      </div>
    </div>
  );
}
