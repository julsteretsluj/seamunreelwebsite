# SEAMUN I 2027 — Instagram Reel

Editable Remotion composition (1080×1920, ~22s) built from the existing SEAMUN campaign visuals.

## Preview

```bash
npm install
npm run studio
```

Open Remotion Studio to scrub the timeline. Each scene is a named `Sequence` layer.

## Export MP4

```bash
npm run render
```

Output: `out/seamun-i-2027-reel.mp4`

## Scene timeline

| Scene | Time | Content |
|-------|------|---------|
| Opening | 0–2.5s | Branding, dates, location, D-PREP |
| Committees | 2.5–5s | Advanced emblems (DISEC, FWC, INTERPOL, WHO) |
| Spotlights | 5–11s | Swipe through committee topics |
| Delegate | 11–14s | Due-date notification + QR |
| Chair | 14–16.5s | Due-date notification + QR |
| Advisor | 16.5–18.5s | Due-date notification + QR |
| Finale | 18.5–22s | CTA + seamun.com QR |

## Editable layers

- `src/SeamunReel.tsx` — master timeline
- `src/scenes/*` — per-scene compositions
- `src/components/*` — glass panels, partnership pill, notifications
- `src/lib/content.ts` — copy & asset paths
- `public/assets/*` — logos, water background, QR codes
