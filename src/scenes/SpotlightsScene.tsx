import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
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
import { ALL_COMMITTEES, CommitteeSpotlight } from "../lib/content";
import { deckSwipe, fadeUpBlur, springPop } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";
import { CommitteeLogo } from "../components/CommitteeLogo";

const SLOT = Math.round(COMMITTEE_SPOTLIGHT_SECONDS * FPS);
const TRANSITION = 10;
const FLASH_HALF = 5;

/** Compact overlapping portrait stack for bottom-right badge */
const CORNER_PORTRAITS = [
  { x: -44, y: 8, z: 1, rot: -10, size: 64 },
  { x: -22, y: -2, z: 2, rot: -4, size: 70 },
  { x: 0, y: -10, z: 3, rot: 0, size: 78 },
  { x: 22, y: -2, z: 2, rot: 4, size: 70 },
  { x: 44, y: 8, z: 1, rot: 10, size: 64 },
];

type SpotlightCardProps = {
  index: number;
};

const CornerFeature: React.FC<{
  committee: CommitteeSpotlight;
  featureStyle: React.CSSProperties;
  frame: number;
  fps: number;
}> = ({ committee: c, featureStyle, frame, fps }) => {
  const portraits = c.featurePortraits ?? [];
  const flashPair = c.featureFlashPair;
  const isLandscape = c.featureArtLayout === "landscape";

  const flashPhase = Math.floor(frame / FLASH_HALF) % 2;
  const blueOn = Boolean(flashPair) && flashPhase === 0;
  const flashPulse = flashPair
    ? interpolate(frame % FLASH_HALF, [0, 1, FLASH_HALF - 1], [1.06, 1, 0.97], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        ...featureStyle,
        position: "absolute",
        right: isLandscape ? -28 : -18,
        bottom: isLandscape ? -22 : -28,
        zIndex: 8,
        pointerEvents: "none",
        filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.45))",
      }}
    >
      {flashPair ? (
        <div
          style={{
            position: "relative",
            width: 132,
            height: 158,
            transform: `rotate(8deg) scale(${flashPulse})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-18%",
              borderRadius: "50%",
              background: blueOn
                ? "radial-gradient(circle, rgba(40,120,255,0.5) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(255,40,50,0.5) 0%, transparent 70%)",
            }}
          />
          <Img
            src={staticFile(flashPair[0])}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: blueOn ? 1 : 0,
            }}
          />
          <Img
            src={staticFile(flashPair[1])}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: blueOn ? 0 : 1,
            }}
          />
        </div>
      ) : portraits.length > 0 ? (
        <div style={{ position: "relative", width: 160, height: 120 }}>
          {portraits.map((src, i) => {
            const layout = CORNER_PORTRAITS[i] ?? CORNER_PORTRAITS[2];
            const pop = springPop(frame, fps, 1 + i * 1.2, 0.82);
            return (
              <div
                key={src}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: layout.size,
                  height: layout.size,
                  marginLeft: -layout.size / 2,
                  marginTop: -layout.size / 2,
                  transform: `translate(${layout.x}px, ${layout.y}px) rotate(${layout.rot}deg) ${pop.transform}`,
                  opacity: pop.opacity,
                  zIndex: layout.z,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid rgba(255,255,255,0.92)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                  background: "rgba(255,255,255,0.12)",
                }}
              >
                <Img
                  src={staticFile(src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : c.featureArt ? (
        <Img
          src={staticFile(c.featureArt)}
          style={
            isLandscape
              ? {
                  width: 220,
                  height: 128,
                  objectFit: "contain",
                  borderRadius: 12,
                  transform: "rotate(-6deg)",
                }
              : {
                  width: 148,
                  height: 168,
                  objectFit: "contain",
                  transform: "rotate(7deg)",
                }
          }
        />
      ) : null}
    </div>
  );
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = ALL_COMMITTEES[index];
  const isFirst = index === 0;
  const hasCornerArt =
    Boolean(c.featureArt) ||
    Boolean(c.featurePortraits?.length) ||
    Boolean(c.featureFlashPair);

  const enter = isFirst
    ? fadeUpBlur(frame, fps, 1, 32)
    : deckSwipe(frame, fps, 0, TRANSITION, "in");

  const feature = springPop(frame, fps, isFirst ? 4 : 3, 0.9);
  const emblem = springPop(frame, fps, isFirst ? 2 : 1, 0.84);
  const name = fadeUpBlur(frame, fps, isFirst ? 6 : 4, 22);
  const t1 = fadeUpBlur(frame, fps, isFirst ? 11 : 8, 18);
  const t2 = fadeUpBlur(frame, fps, isFirst ? 15 : 12, 18);

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
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 920,
        }}
      >
        <GlassPanel
          radius={32}
          style={{
            width: "100%",
            padding: "40px 36px 44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              ...emblem,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              transformOrigin: "center center",
            }}
          >
            <CommitteeLogo src={c.logo} size={200} pad={16} />
          </div>

          <div
            style={{
              ...name,
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                color: COLORS.white,
                fontSize: 58,
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
                fontSize: 23,
                fontWeight: 600,
                textShadow: TEXT_SHADOW_STRONG,
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
                    color: COLORS.white,
                    fontSize: 25,
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

        {hasCornerArt ? (
          <CornerFeature
            committee={c}
            featureStyle={feature}
            frame={frame}
            fps={fps}
          />
        ) : null}
      </div>
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
