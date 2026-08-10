/** Instagram Reels — 9:16 */
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

/** Total duration ≈ 22s */
export const DURATION_IN_FRAMES = 22 * FPS;

export const COLORS = {
  deepNavy: "#020e18",
  ink: "#071620",
  glassBorder: "#1c648b",
  ice: "rgba(173, 238, 254, 0.9)",
  iceSoft: "rgba(173, 238, 254, 0.7)",
  iceMuted: "rgba(173, 238, 254, 0.5)",
  white: "#ffffff",
  whiteSoft: "rgba(255, 255, 255, 0.85)",
  whiteDim: "rgba(255, 255, 255, 0.55)",
  glassGradA: "rgba(22, 113, 163, 0.38)",
  glassGradB: "rgba(1, 149, 160, 0.28)",
  glassLight: "rgba(255, 255, 255, 0.08)",
  glassLightBorder: "rgba(255, 255, 255, 0.18)",
  tealOverlay: "rgba(2, 16, 28, 0.42)",
  notifGreen: "#6EE7B7",
  notifBlue: "#93C5FD",
  notifCoral: "#FCA5A5",
} as const;

/** Safe zones for IG UI (px from edges) */
export const SAFE = {
  top: 120,
  bottom: 180,
  side: 72,
  rightExtra: 40,
} as const;

/**
 * Scene timeline (seconds → frames)
 * 1 Opening 0–2.5
 * 2 Committees 2.5–5
 * 3 Spotlights 5–11
 * 4 Delegate 11–14
 * 5 Chair 14–16.5
 * 6 Advisor 16.5–18.5
 * 7 Finale 18.5–22
 */
export const SCENES = {
  opening: { from: 0, duration: 2.5 * FPS },
  committees: { from: 2.5 * FPS, duration: 2.5 * FPS },
  spotlights: { from: 5 * FPS, duration: 6 * FPS },
  delegate: { from: 11 * FPS, duration: 3 * FPS },
  chair: { from: 14 * FPS, duration: 2.5 * FPS },
  advisor: { from: 16.5 * FPS, duration: 2 * FPS },
  finale: { from: 18.5 * FPS, duration: 3.5 * FPS },
} as const;

export const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
