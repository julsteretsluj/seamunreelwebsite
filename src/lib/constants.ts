/** Instagram Reels — 9:16 */
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

/** Total duration ≈ 26s (fits 10 spotlights + team) */
export const DURATION_IN_FRAMES = 26 * FPS;

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

/** Equal safe zones — keep content centered for IG UI */
export const SAFE = {
  top: 120,
  bottom: 160,
  side: 64,
} as const;

/**
 * Scene timeline (seconds → frames)
 * 1 Opening     0–2.2
 * 2 Committees  2.2–5
 * 3 Spotlights  5–15   (10 committees)
 * 4 Team        15–17.5
 * 5 Delegate    17.5–19.8
 * 6 Chair       19.8–21.8
 * 7 Advisor     21.8–23.5
 * 8 Finale      23.5–26
 */
export const SCENES = {
  opening: { from: 0, duration: Math.round(2.2 * FPS) },
  committees: { from: Math.round(2.2 * FPS), duration: Math.round(2.8 * FPS) },
  spotlights: { from: Math.round(5 * FPS), duration: Math.round(10 * FPS) },
  team: { from: Math.round(15 * FPS), duration: Math.round(2.5 * FPS) },
  delegate: { from: Math.round(17.5 * FPS), duration: Math.round(2.3 * FPS) },
  chair: { from: Math.round(19.8 * FPS), duration: Math.round(2 * FPS) },
  advisor: { from: Math.round(21.8 * FPS), duration: Math.round(1.7 * FPS) },
  finale: { from: Math.round(23.5 * FPS), duration: Math.round(2.5 * FPS) },
} as const;

export const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
