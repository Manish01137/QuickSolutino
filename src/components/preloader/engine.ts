// Canvas engine for the intro: a drifting node network whose particles leave
// to assemble into the real Quick Solutions logo, then burst outward on exit.
// Logo geometry is in the logo's own 200x78 unit box (see logoPoints.ts).

import { LOGO_RING, RED_POINTS, WHITE_POINTS } from "./logoPoints";

export { LOGO_RING };

export const TIMING = {
  formStart: 700,
  formDuration: 1300,
  brand: 1900,
  exit: 3000,
};

type Emblem = { x: number; y: number; scale: number };

type Particle = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  delay: number;
  swirl: number;
  size: number;
  white: boolean;
  phase: number;
  burst: number;
  appear: number;
};

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Packet = { a: number; b: number; t: number; speed: number };

const TAU = Math.PI * 2;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function sampleTarget() {
  // ~2:1 red to white, matching the logo's ink; a little jitter keeps it organic.
  const white = Math.random() < 0.33;
  const pts = white ? WHITE_POINTS : RED_POINTS;
  const [x, y] = pts[Math.floor(Math.random() * pts.length)];
  return { x: x + (Math.random() - 0.5) * 0.5, y: y + (Math.random() - 0.5) * 0.5, white };
}

export function createIntroCanvas(canvas: HTMLCanvasElement, getEmblem: () => Emblem) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { stop() {}, explode() {} };

  let w = 0;
  let h = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const area = w * h;
  const particleCount = clamp(Math.round(area / 950), 450, 1500);
  const nodeCount = clamp(Math.round(area / 17000), 26, 85);
  const linkDistance = clamp(Math.min(w, h) * 0.2, 110, 170);

  const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: 1 + Math.random() * 1.6,
  }));

  const particles: Particle[] = Array.from({ length: particleCount }, () => {
    const target = sampleTarget();
    return {
      sx: Math.random() * w,
      sy: Math.random() * h,
      tx: target.x,
      ty: target.y,
      delay: Math.random() * 420,
      swirl: (Math.random() - 0.5) * 180,
      size: 0.5 + Math.random() * 1.1,
      white: target.white,
      phase: Math.random() * TAU,
      burst: 0.6 + Math.random() * 0.9,
      appear: Math.random() * 650,
    };
  });

  const packets: Packet[] = Array.from({ length: 14 }, () => ({
    a: Math.floor(Math.random() * nodeCount),
    b: Math.floor(Math.random() * nodeCount),
    t: Math.random(),
    speed: 0.006 + Math.random() * 0.01,
  }));

  const start = performance.now();
  let exitAt: number | null = null;
  let raf = 0;

  function nearestNeighbour(i: number) {
    let best = i;
    let bestD = Infinity;
    for (let j = 0; j < nodes.length; j++) {
      if (j === i) continue;
      const d = Math.hypot(nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y);
      if (d < bestD && Math.random() > 0.35) {
        bestD = d;
        best = j;
      }
    }
    return best;
  }

  function frame(now: number) {
    const t = now - start;
    const em = getEmblem();
    const ringX = em.x + LOGO_RING.cx * em.scale;
    const ringY = em.y + LOGO_RING.cy * em.scale;
    const ex = exitAt === null ? 0 : clamp((now - exitAt) / 950, 0, 1);

    ctx!.clearRect(0, 0, w, h);

    // Network layer: fades in, then recedes as the logo forms.
    const netAlpha =
      clamp(t / 600, 0, 1) * (1 - clamp((t - 1100) / 1000, 0, 0.8)) * (1 - ex);
    if (netAlpha > 0.01) {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < linkDistance) {
            ctx!.strokeStyle = `rgba(240,85,92,${(1 - d / linkDistance) * 0.5 * netAlpha})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx!.fillStyle = `rgba(255,255,255,${0.7 * netAlpha})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, TAU);
        ctx!.fill();
      }
      for (const p of packets) {
        p.t += p.speed;
        if (p.t >= 1 || p.a === p.b) {
          p.a = p.b;
          p.b = nearestNeighbour(p.a);
          p.t = 0;
        }
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx!.fillStyle = `rgba(255,107,112,${netAlpha})`;
        ctx!.shadowColor = "rgba(255,90,95,0.9)";
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.8, 0, TAU);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    // Particle layer: spiral in to the emblem, breathe, then burst out.
    ctx!.globalCompositeOperation = "lighter";
    const brandDim = 1 - 0.55 * clamp((t - TIMING.brand - 100) / 600, 0, 1);
    const burst = ex * ex;

    for (const p of particles) {
      const appear = clamp((t - p.appear) / 500, 0, 1);
      const raw = clamp((t - TIMING.formStart - p.delay) / TIMING.formDuration, 0, 1);
      const f = easeInOutCubic(raw);

      const tx = em.x + p.tx * em.scale;
      const ty = em.y + p.ty * em.scale;
      const dx = tx - p.sx;
      const dy = ty - p.sy;
      const len = Math.hypot(dx, dy) || 1;
      const swirl = Math.sin(Math.PI * f) * p.swirl;

      let x = p.sx + dx * f + (-dy / len) * swirl;
      let y = p.sy + dy * f + (dx / len) * swirl;

      if (raw === 0) {
        x += Math.sin(t * 0.0012 + p.phase) * 6;
        y += Math.cos(t * 0.001 + p.phase) * 6;
      } else if (raw === 1) {
        x += Math.sin(t * 0.004 + p.phase) * 0.6;
        y += Math.cos(t * 0.0035 + p.phase) * 0.6;
      }

      let alpha = appear * (0.5 + 0.5 * f) * brandDim;

      if (burst > 0) {
        const ox = x - ringX;
        const oy = y - ringY;
        const d = Math.hypot(ox, oy) || 1;
        const push = burst * 1100 * p.burst;
        x += (ox / d) * push;
        y += (oy / d) * push;
        alpha *= 1 - ex;
      }

      if (alpha < 0.01) continue;
      ctx!.fillStyle = p.white ? `rgba(255,255,255,${alpha})` : `rgba(255,77,85,${alpha})`;
      ctx!.beginPath();
      ctx!.arc(x, y, p.size, 0, TAU);
      ctx!.fill();
    }
    ctx!.globalCompositeOperation = "source-over";

    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);

  return {
    explode() {
      if (exitAt === null) exitAt = performance.now();
    },
    stop() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    },
  };
}
