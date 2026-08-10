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
| Opening | 0–4s | Branding, dates, location, D-PREP |
| Committees | 4–8s | All 10 committee emblems |
| Spotlights | 8–38s | ~3s per committee with topics |
| Our Team | 38–42.5s | Full secretariat |
| Delegate | 42.5–46.7s | Due-date notification + QR |
| Chair | 46.7–50.9s | Due-date notification + QR |
| Advisor | 50.9–55.1s | Due-date notification + QR |
| Finale | 55.1–60.1s | CTA + seamun.com QR |

## Editable layers

- `src/SeamunReel.tsx` — master timeline
- `src/scenes/*` — per-scene compositions
- `src/components/*` — glass panels, partnership pill, notifications
- `src/lib/content.ts` — copy & asset paths
- `public/assets/*` — logos, water background, QR codes
