export function Eyebrow({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <p className={`eyebrow flex items-center gap-2.5 ${centered ? "justify-center text-center" : ""}`}>
      <span
        aria-hidden
        className="h-[2px] w-7 shrink-0 rounded-full bg-gradient-to-r from-transparent to-[var(--color-primary)]"
      />
      {children}
      {centered && (
        <span
          aria-hidden
          className="h-[2px] w-7 shrink-0 rounded-full bg-gradient-to-l from-transparent to-[var(--color-primary)]"
        />
      )}
    </p>
  );
}
