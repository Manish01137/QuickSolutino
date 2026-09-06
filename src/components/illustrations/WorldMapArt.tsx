import { getWorldMap } from "@/lib/maps";

function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const arcHeight = Math.min(dist * 0.35, 18);
  return `M ${x1} ${y1} Q ${mx} ${my - arcHeight} ${x2} ${y2}`;
}

export function WorldMapArt({ className = "" }: { className?: string }) {
  const { width, height, dots, hubs } = getWorldMap();
  const origin = hubs.find((h) => h.data?.label === "Asia Pacific") ?? hubs[0];
  const others = hubs.filter((h) => h !== origin);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="World map showing Quick Solutions' global service coverage across the Americas, Europe, the Middle East and Asia Pacific"
    >
      {dots.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={0.55} fill="var(--color-dot)" />
      ))}

      {others.map((h, i) => (
        <path
          key={i}
          d={arcPath(origin.x, origin.y, h.x, h.y)}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={0.35}
          strokeDasharray="1.4 1.4"
          opacity={0.6}
        />
      ))}

      {hubs.map((h, i) => (
        <g key={i}>
          <circle
            cx={h.x}
            cy={h.y}
            r={2.2}
            fill="var(--color-primary)"
            opacity={0.25}
            className="origin-center animate-ping"
            style={{ transformBox: "fill-box" }}
          />
          <circle cx={h.x} cy={h.y} r={1.1} fill="var(--color-primary)" />
        </g>
      ))}
    </svg>
  );
}
