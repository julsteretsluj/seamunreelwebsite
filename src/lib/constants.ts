/** Instagram Reels — 9:16 */
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

/** ~3s per committee spotlight so topics are readable */
export const COMMITTEE_SPOTLIGHT_SECONDS = 3;
export const COMMITTEE_COUNT = 10;
export const SPOTLIGHTS_DURATION_SECONDS =
  COMMITTEE_SPOTLIGHT_SECONDS * COMMITTEE_COUNT; // 30s

/**
 * Scene timeline (seconds)
 * Opening 2.2 + Committees 2.8 + Spotlights 30 + Team 2.5
 * + Delegate 2.3 + Chair 2 + Advisor 1.7 + Finale 2.5 ≈ 46s
 */
const OPENING_S = 2.2;
const COMMITTEES_S = 2.8;
const SPOTLIGHTS_S = SPOTLIGHTS_DURATION_SECONDS;
const TEAM_S = 2.5;
const DELEGATE_S = 2.3;
const CHAIR_S = 2;
const ADVISOR_S = 1.7;
const FINALE_S = 2.5;

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
