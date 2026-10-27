import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <Reveal className={`max-w-2xl ${alignClass}`}>
      <Eyebrow align={align}>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[1.75rem] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[2rem] lg:text-[2.125rem]">
        {title}
      </h2>
      {body && (
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--color-body)] sm:text-base">
          {body}
        </p>
      )}
    </Reveal>
  );
}
