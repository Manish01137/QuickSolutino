# Quick Solutions — Marketing Website

A one-page marketing site for "Quick Solutions," an IT infrastructure
support and managed-services company, built from the design brief in
this repo.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme in `src/app/globals.css`)
- **Framer Motion** for scroll/entrance animations
- **lucide-react** for line icons
- **dotted-map** for the real-geography dotted world/India map illustrations

> The brief asked for Next.js 14 — this was scaffolded on the current
> stable release (16) instead, since 14 is no longer the latest LTS.
> Nothing here depends on a 14-specific API.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm start   # production build
npm run lint                 # ESLint
```

## Structure

- `src/app/page.tsx` — assembles the eleven homepage sections in order
- `src/components/` — one component per section (`Hero.tsx`,
  `Services.tsx`, `MultiVendorSupport.tsx`, …), plus:
  - `components/ui/` — shared primitives (`Button`, `Eyebrow`,
    `SectionHeading`, `Reveal` scroll-animation wrappers, the icon
    registry)
  - `components/illustrations/` — the custom SVG art: the isometric
    hero graphic, the glossy 3D "Q" emblem, and the world/India dotted
    maps
- `src/data/content.ts` — all page copy and list content (nav links,
  stats, services, vendors, regions, industries, etc.) in one place
- `src/lib/maps.ts` — generates the dotted world/India map point data
  from real country geometry via `dotted-map` (cached per process, so
  it only computes once)

## Content notes

- The 6 industry photos and the final-CTA background use hotlinked
  Unsplash photos (stable, license-free URLs) as placeholders per the
  brief — swap in licensed photography before shipping to production.
- Vendor names in "Multi-Vendor Support" are shown as text wordmarks
  rather than real trademarked logos — drop in actual vendor logo
  files if you have redistribution rights.
- Contact details (email/phone/domain) are the placeholders from the
  brief — update in `src/components/Footer.tsx`.
# QuickSolutino
