import { Check } from "lucide-react";

export function CheckList({
  items,
  columns = 2,
}: {
  items: string[];
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={`grid grid-cols-1 gap-x-6 gap-y-3 ${
        columns === 2 ? "sm:grid-cols-2" : ""
      }`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-chip)] text-[var(--color-primary)]">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className="text-sm leading-relaxed text-[var(--color-body)]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
