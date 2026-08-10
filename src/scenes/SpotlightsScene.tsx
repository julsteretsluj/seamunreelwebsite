import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  COLORS,
  COMMITTEE_SPOTLIGHT_SECONDS,
  FONT,
  FPS,
  SAFE,
} from "../lib/constants";
import { ALL_COMMITTEES } from "../lib/content";
import { deckSwipe, fadeUpBlur, springPop } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";
import { CommitteeLogo } from "../components/CommitteeLogo";

const SLOT = Math.round(COMMITTEE_SPOTLIGHT_SECONDS * FPS);
const TRANSITION = 10;

type SpotlightCardProps = {
  index: number;
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = ALL_COMMITTEES[index];
  const isFirst = index === 0;

  const enter = isFirst
    ? fadeUpBlur(frame, fps, 1, 32)
    : deckSwipe(frame, fps, 0, TRANSITION, "in");

  const emblem = springPop(frame, fps, isFirst ? 3 : 2, 0.84);
  const name = fadeUpBlur(frame, fps, isFirst ? 7 : 5, 22);
  const t1 = fadeUpBlur(frame, fps, isFirst ? 12 : 9, 18);
  const t2 = fadeUpBlur(frame, fps, isFirst ? 16 : 13, 18);

  const exitStart = SLOT - TRANSITION - 1;
  const shouldExit = index < ALL_COMMITTEES.length - 1;
  const exit = shouldExit
    ? deckSwipe(frame, fps, exitStart, TRANSITION, "out")
    : { opacity: 1, transform: "none", filter: "none" };

  const inExit = frame >= exitStart && shouldExit;
  const motion = inExit ? exit : enter;

  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE.top,
        paddingBottom: SAFE.bottom,
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        willChange: "transform, opacity, filter",
        ...motion,
      }}
    >
      <GlassPanel
        radius={32}
        style={{
          width: "100%",
          maxWidth: 920,
          padding: "40px 36px 44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={emblem}>
          <CommitteeLogo src={c.logo} size={200} pad={16} />
        </div>

        <div style={{ ...name, marginTop: 20 }}>
          <div
            style={{
              color: COLORS.white,
              fontSize: 58,
              fontWeight: 800,
              letterSpacing: "0.04em",
              lineHeight: 1,
              textShadow: "0 2px 16px rgba(0,0,0,0.45)",
            }}
          >
            {c.acronym}
          </div>
          <div
            style={{
              marginTop: 8,
              color: COLORS.iceSoft,
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            {c.name}
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          {c.topics.map((topic, ti) => (
            <div key={topic} style={{ ...(ti === 0 ? t1 : t2), width: "100%" }}>
              <GlassPanel
                variant="light"
                radius={18}
                style={{
                  padding: "14px 20px",
                  color: COLORS.whiteSoft,
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  textAlign: "center",
                }}
              >
                {topic}
              </GlassPanel>
            </div>
          ))}
        </div>
      </GlassPanel>
    </AbsoluteFill>
  );
};

/** Scene 3 — Committee spotlights with perspective deck-swipe transitions */
export const SpotlightsScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {ALL_COMMITTEES.map((c, i) => (
        <Sequence key={c.id} from={i * SLOT} durationInFrames={SLOT} layout="none">
          <SpotlightCard index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
