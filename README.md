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
| Opening | 0–2.2s | Branding, dates, location, D-PREP |
| Committees | 2.2–5s | All 10 committee emblems |
| Spotlights | 5–15s | Swipe through each committee + topics |
| Our Team | 15–17.5s | Full secretariat |
| Delegate | 17.5–19.8s | Due-date notification + QR |
| Chair | 19.8–21.8s | Due-date notification + QR |
| Advisor | 21.8–23.5s | Due-date notification + QR |
| Finale | 23.5–26s | CTA + seamun.com QR |

## Editable layers

- `src/SeamunReel.tsx` — master timeline
- `src/scenes/*` — per-scene compositions
- `src/components/*` — glass panels, partnership pill, notifications
- `src/lib/content.ts` — copy & asset paths
- `public/assets/*` — logos, water background, QR codes
