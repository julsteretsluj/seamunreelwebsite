import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONT, FPS, SAFE } from "../lib/constants";
import { ALL_COMMITTEES } from "../lib/content";
import { fadeUp, scaleFade, swipeTransition } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";

const SPOTLIGHT_DURATION = 10 * FPS;
const SLOT = Math.floor(SPOTLIGHT_DURATION / ALL_COMMITTEES.length); // ~30 frames
const TRANSITION = 8;

type SpotlightCardProps = {
  index: number;
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({ index }) => {
  const frame = useCurrentFrame();
  const c = ALL_COMMITTEES[index];
  const isFirst = index === 0;
  const enter = isFirst
    ? fadeUp(frame, 1, 8, 24)
    : swipeTransition(frame, 0, TRANSITION, "in", 90);
  const emblem = scaleFade(frame, isFirst ? 3 : 2, 8, 0.92);
  const name = fadeUp(frame, isFirst ? 8 : 6, 8, 22);
  const t1 = fadeUp(frame, isFirst ? 12 : 10, 8, 18);
  const t2 = fadeUp(frame, isFirst ? 16 : 14, 8, 18);

  const exitStart = SLOT - TRANSITION - 1;
  const shouldExit = index < ALL_COMMITTEES.length - 1;
  const exit = shouldExit
    ? swipeTransition(frame, exitStart, TRANSITION, "out", 90)
    : { opacity: 1, transform: "translateX(0px)" };

  const combinedOpacity = Math.min(enter.opacity, exit.opacity);
  const transform =
    frame >= exitStart && shouldExit ? exit.transform : enter.transform;

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
        opacity: combinedOpacity,
        transform,
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
          <Img
            src={staticFile(c.logo)}
            style={{
              width: 220,
              height: 220,
              objectFit: "contain",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.4))",
            }}
          />
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

/** Scene 3 — All 10 committee spotlights with swipe transitions */
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
