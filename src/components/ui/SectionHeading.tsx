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
      <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[var(--color-ink)] sm:text-[32px] lg:text-[34px]">
        {title}
      </h2>
      {body && (
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-body)] sm:text-base">
          {body}
        </p>
      )}
    </Reveal>
  );
}
