export function Eyebrow({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <p className={`eyebrow ${align === "center" ? "text-center" : ""}`}>
      {children}
    </p>
  );
}
