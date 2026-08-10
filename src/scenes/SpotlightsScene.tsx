import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  COLORS,
  COMMITTEE_SPOTLIGHT_SECONDS,
  FONT,
  FPS,
  SAFE,
  TEXT_SHADOW_STRONG,
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
  const hasFeature = Boolean(c.featureArt);
  const isLandscape = c.featureArtLayout === "landscape";
  const compact = hasFeature;

  const enter = isFirst
    ? fadeUpBlur(frame, fps, 1, 32)
    : deckSwipe(frame, fps, 0, TRANSITION, "in");

  const feature = springPop(frame, fps, isFirst ? 2 : 1, 0.88);
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
          padding: compact ? "28px 32px 40px" : "40px 36px 44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {hasFeature ? (
          <div
            style={{
              ...feature,
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: isLandscape ? 12 : 8,
            }}
          >
            {!isLandscape ? (
              <div
                style={{
                  position: "absolute",
                  width: 340,
                  height: 340,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -48%)",
                  pointerEvents: "none",
                }}
              />
            ) : null}
            <Img
              src={staticFile(c.featureArt!)}
              style={
                isLandscape
                  ? {
                      width: "100%",
                      maxWidth: 820,
                      height: 280,
                      objectFit: "contain",
                      position: "relative",
                      borderRadius: 18,
                      filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.45))",
                    }
                  : {
                      width: 300,
                      height: 380,
                      objectFit: "contain",
                      position: "relative",
                      filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.55))",
                    }
              }
            />
          </div>
        ) : (
          <div style={emblem}>
            <CommitteeLogo src={c.logo} size={200} pad={16} />
          </div>
        )}

        <div
          style={{
            ...name,
            marginTop: compact ? 4 : 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {hasFeature ? (
            <div style={emblem}>
              <CommitteeLogo src={c.logo} size={72} pad={8} />
            </div>
          ) : null}
          <div
            style={{
              color: COLORS.white,
              fontSize: compact ? 52 : 58,
              fontWeight: 800,
              letterSpacing: "0.04em",
              lineHeight: 1,
              textShadow: TEXT_SHADOW_STRONG,
            }}
          >
            {c.acronym}
          </div>
          <div
            style={{
              marginTop: 4,
              color: COLORS.ice,
              fontSize: compact ? 21 : 23,
              fontWeight: 600,
              textShadow: TEXT_SHADOW_STRONG,
            }}
          >
            {c.name}
          </div>
        </div>

        <div
          style={{
            marginTop: compact ? 18 : 28,
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
                  color: COLORS.white,
                  fontSize: compact ? 23 : 25,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  textAlign: "center",
                  textShadow: TEXT_SHADOW_STRONG,
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
