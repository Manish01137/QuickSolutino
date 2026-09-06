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
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] hover:bg-[var(--color-primary-dark)]",
    outline:
      "bg-white text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
    "outline-dark":
      "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10",
  }[variant];

  return (
    <Link href={href} className={`${base} ${variants} ${className}`}>
      {children}
      {arrow && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
    </Link>
  );
}
