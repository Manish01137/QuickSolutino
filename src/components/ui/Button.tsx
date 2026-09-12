import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "outline-dark";
  arrow?: boolean;
  className?: string;
}) {
  const base =
    "group/btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white shadow-[0_8px_20px_-6px_rgba(214,32,39,0.5)] hover:bg-[var(--color-primary-dark)] hover:shadow-[0_14px_28px_-8px_rgba(214,32,39,0.6)]",
    outline:
      "bg-white text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:shadow-[0_10px_24px_-12px_rgba(15,23,42,0.25)]",
    "outline-dark":
      "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10",
  }[variant];

  return (
    <Link href={href} className={`${base} ${variants} ${className}`}>
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          strokeWidth={2}
        />
      )}
    </Link>
  );
}
