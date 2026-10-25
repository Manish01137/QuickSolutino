"use client";

import { useEffect, useRef, useState } from "react";

type Source = { src: string; media?: string };

/** Muted looping background video that only downloads once it's near the viewport. */
export function BackgroundVideo({
  sources,
  className = "",
}: {
  sources: Source[];
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!load || !el) return;
    el.load();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.play().catch(() => {});
    }
  }, [load]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload={load ? "auto" : "none"}
      aria-hidden
      className={className}
    >
      {load &&
        sources.map((s) => (
          <source key={s.src} src={s.src} media={s.media} type="video/mp4" />
        ))}
    </video>
  );
}
