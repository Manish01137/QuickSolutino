/**
 * "ISO 9001:2015 Certified" seal. Deliberately not the ISO organisation's logo:
 * ISO does not permit certified companies to use it. Swap in the certification
 * body's own mark here once known.
 */
export function IsoSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="ISO 9001:2015 certified">
      <defs>
        <path id="iso-seal-top" d="M20 60 A40 40 0 0 1 100 60" />
        <path id="iso-seal-bottom" d="M20 60 A40 40 0 0 0 100 60" />
        <linearGradient id="iso-seal-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff5a5f" />
          <stop offset="1" stopColor="#a8121a" />
        </linearGradient>
      </defs>

      {/* serrated rosette edge */}
      <path
        fill="url(#iso-seal-red)"
        d={Array.from({ length: 48 }, (_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const r = i % 2 === 0 ? 59 : 55;
          return `${i === 0 ? "M" : "L"}${(60 + r * Math.cos(a)).toFixed(2)} ${(60 + r * Math.sin(a)).toFixed(2)}`;
        }).join(" ") + "Z"}
      />
      <circle cx="60" cy="60" r="51" fill="#ffffff" />
      <circle cx="60" cy="60" r="47" fill="none" stroke="#d62027" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="31" fill="url(#iso-seal-red)" />

      <text fill="#0f172a" fontSize="8.2" fontWeight="700" letterSpacing="1.4" fontFamily="var(--font-jakarta), Arial, sans-serif">
        <textPath href="#iso-seal-top" startOffset="50%" textAnchor="middle">
          QUALITY MANAGEMENT
        </textPath>
      </text>
      <text fill="#0f172a" fontSize="8.2" fontWeight="700" letterSpacing="2" fontFamily="var(--font-jakarta), Arial, sans-serif">
        <textPath href="#iso-seal-bottom" startOffset="50%" textAnchor="middle" dominantBaseline="hanging">
          CERTIFIED
        </textPath>
      </text>
      <circle cx="22.5" cy="68" r="1.6" fill="#d62027" />
      <circle cx="97.5" cy="68" r="1.6" fill="#d62027" />

      <text x="60" y="58" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="800" fontFamily="var(--font-jakarta), Arial, sans-serif">
        ISO
      </text>
      <text x="60" y="71" textAnchor="middle" fill="#ffffff" fontSize="8.6" fontWeight="700" letterSpacing="0.4" fontFamily="var(--font-jakarta), Arial, sans-serif">
        9001:2015
      </text>
    </svg>
  );
}
