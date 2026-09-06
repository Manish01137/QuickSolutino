import { getIndiaMap } from "@/lib/maps";

export function IndiaMapArt({ className = "" }: { className?: string }) {
  const { width, height, dots, hubs } = getIndiaMap();

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="Map of India showing Quick Solutions' pan-India city coverage"
    >
      {dots.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={0.5} fill="var(--color-dot)" />
      ))}

      {hubs.map((h, i) => (
        <g key={i}>
          <circle
            cx={h.x}
            cy={h.y}
            r={1.8}
            fill="var(--color-primary)"
            opacity={0.25}
            className="origin-center animate-ping"
            style={{ transformBox: "fill-box" }}
          />
          <circle cx={h.x} cy={h.y} r={0.9} fill="var(--color-primary)" />
        </g>
      ))}
    </svg>
  );
}
