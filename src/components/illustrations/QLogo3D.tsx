export function QLogo3D({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="Quick Solutions glossy Q emblem"
    >
      <defs>
        <linearGradient id="qBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B9BFF" />
          <stop offset="45%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#123A9C" />
        </linearGradient>
        <radialGradient id="qShadowBottom" cx="50%" cy="100%" r="75%">
          <stop offset="0%" stopColor="#0B1B3A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0B1B3A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="qHighlight" cx="30%" cy="22%" r="45%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B1B3A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0B1B3A" stopOpacity="0" />
        </radialGradient>
        <filter id="qBlurSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="qDropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0B1B3A" floodOpacity="0.35" />
        </filter>
      </defs>

      <ellipse cx="160" cy="272" rx="110" ry="22" fill="url(#floorShadow)" />

      <g filter="url(#qDropShadow)">
        <rect x="40" y="40" width="240" height="240" rx="62" fill="url(#qBase)" />
        <rect x="40" y="40" width="240" height="240" rx="62" fill="url(#qShadowBottom)" />
        <ellipse cx="118" cy="96" rx="90" ry="60" fill="url(#qHighlight)" filter="url(#qBlurSoft)" />

        <text
          x="152"
          y="205"
          textAnchor="middle"
          fontFamily="var(--font-jakarta), ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize="168"
          fill="#F8FAFF"
        >
          Q
        </text>
        <rect x="176" y="196" width="46" height="20" rx="10" fill="#123A9C" transform="rotate(38 176 196)" />
      </g>
    </svg>
  );
}
