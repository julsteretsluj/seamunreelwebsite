/** Instagram Reels — 9:16 */
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

/** Faster committee pacing for short attention spans */
export const COMMITTEE_SPOTLIGHT_SECONDS = 2;
export const COMMITTEE_COUNT = 10;
export const SPOTLIGHTS_DURATION_SECONDS =
  COMMITTEE_SPOTLIGHT_SECONDS * COMMITTEE_COUNT;

/**
 * Snappy scene lengths — still readable, less dwell time.
 * Total ≈ 39s
 */
const OPENING_S = 2.4;
const COMMITTEES_S = 2.6;
const SPOTLIGHTS_S = SPOTLIGHTS_DURATION_SECONDS;
const TEAM_S = 3;
const DELEGATE_S = 2.6;
const CHAIR_S = 2.6;
const ADVISOR_S = 2.6;
const FINALE_S = 3.2;

const t = (s: number) => Math.round(s * FPS);

export const DURATION_IN_FRAMES = t(
  OPENING_S +
    COMMITTEES_S +
    SPOTLIGHTS_S +
    TEAM_S +
    DELEGATE_S +
    CHAIR_S +
    ADVISOR_S +
    FINALE_S,
);

export const COLORS = {
  deepNavy: "#020e18",
  ink: "#071620",
  glassBorder: "rgba(173, 238, 254, 0.35)",
  ice: "rgba(220, 248, 255, 0.98)",
  iceSoft: "rgba(210, 245, 255, 0.95)",
  iceMuted: "rgba(200, 240, 255, 0.85)",
  white: "#ffffff",
  whiteSoft: "rgba(255, 255, 255, 0.96)",
  whiteDim: "rgba(255, 255, 255, 0.78)",
  /** Opaque frosted fills for readability (Remotion-friendly) */
  glassGradA: "rgba(5, 36, 56, 0.88)",
  glassGradB: "rgba(3, 55, 68, 0.86)",
  glassLight: "rgba(255, 255, 255, 0.32)",
  glassLightBorder: "rgba(255, 255, 255, 0.45)",
  tealOverlay: "rgba(2, 16, 28, 0.42)",
  notifGreen: "#6EE7B7",
  notifBlue: "#93C5FD",
  notifCoral: "#FCA5A5",
} as const;

/** Shared text shadow for contrast on teal / water */
export const TEXT_SHADOW = "0 2px 10px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.4)";
export const TEXT_SHADOW_STRONG =
  "0 3px 16px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.5)";

/** Equal safe zones — keep content centered for IG UI; top clears partnership pill */
export const SAFE = {
  top: 148,
  bottom: 160,
  side: 64,
} as const;

const openingFrom = 0;
const committeesFrom = openingFrom + t(OPENING_S);
const spotlightsFrom = committeesFrom + t(COMMITTEES_S);
const teamFrom = spotlightsFrom + t(SPOTLIGHTS_S);
const delegateFrom = teamFrom + t(TEAM_S);
const chairFrom = delegateFrom + t(DELEGATE_S);
const advisorFrom = chairFrom + t(CHAIR_S);
const finaleFrom = advisorFrom + t(ADVISOR_S);

export const SCENES = {
  opening: { from: openingFrom, duration: t(OPENING_S) },
  committees: { from: committeesFrom, duration: t(COMMITTEES_S) },
  spotlights: { from: spotlightsFrom, duration: t(SPOTLIGHTS_S) },
  team: { from: teamFrom, duration: t(TEAM_S) },
  delegate: { from: delegateFrom, duration: t(DELEGATE_S) },
  chair: { from: chairFrom, duration: t(CHAIR_S) },
  advisor: { from: advisorFrom, duration: t(ADVISOR_S) },
  finale: { from: finaleFrom, duration: t(FINALE_S) },
} as const;

export const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
