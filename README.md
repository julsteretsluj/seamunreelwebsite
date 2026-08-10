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
| Opening | ~2.4s | Branding, dates, location, D-PREP |
| Committees | ~2.6s | All 10 committee emblems |
| Spotlights | ~20s | ~2s per committee with topics |
| Our Team | ~3s | Full secretariat |
| Delegate | ~2.6s | Due-date notification + QR |
| Chair | ~2.6s | Due-date notification + QR |
| Advisor | ~2.6s | Due-date notification + QR |
| Finale | ~3.2s | CTA + seamun.com QR |

Total ≈ **39 seconds**

## Editable layers

- `src/SeamunReel.tsx` — master timeline
- `src/scenes/*` — per-scene compositions
- `src/components/*` — glass panels, partnership pill, notifications
- `src/lib/content.ts` — copy & asset paths
- `public/assets/*` — logos, water background, QR codes
