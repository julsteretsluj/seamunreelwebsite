import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONT, FPS, SAFE } from "../lib/constants";
import { ADVANCED_COMMITTEES } from "../lib/content";
import { fadeUp, scaleFade, swipeTransition } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";

const SLOT = Math.floor((6 * FPS) / ADVANCED_COMMITTEES.length); // ~45 frames each
const TRANSITION = 12;

type SpotlightCardProps = {
  index: number;
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({ index }) => {
  const frame = useCurrentFrame();
  const c = ADVANCED_COMMITTEES[index];
  const isFirst = index === 0;
  const enter = isFirst
    ? fadeUp(frame, 2, 12, 30)
    : swipeTransition(frame, 0, TRANSITION, "in", 100);
  const emblem = scaleFade(frame, isFirst ? 6 : 4, 12, 0.91);
  const name = fadeUp(frame, isFirst ? 12 : 10, 12, 28);
  const t1 = fadeUp(frame, isFirst ? 18 : 16, 12, 24);
  const t2 = fadeUp(frame, isFirst ? 24 : 22, 12, 24);

  // Exit swipe near end of slot (except last)
  const exitStart = SLOT - TRANSITION - 2;
  const shouldExit = index < ADVANCED_COMMITTEES.length - 1;
  const exit = shouldExit
    ? swipeTransition(frame, exitStart, TRANSITION, "out", 100)
    : { opacity: 1, transform: "translateX(0px)" };

  const combinedOpacity = Math.min(enter.opacity, exit.opacity);
  const transform =
    frame >= exitStart && shouldExit ? exit.transform : enter.transform;

  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE.top + 40,
        paddingBottom: SAFE.bottom,
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side + SAFE.rightExtra,
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
          padding: "48px 40px 52px",
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
              width: 280,
              height: 280,
              objectFit: "contain",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.4))",
            }}
          />
        </div>

        <div style={{ ...name, marginTop: 28 }}>
          <div
            style={{
              color: COLORS.white,
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "0.06em",
              lineHeight: 1,
              textShadow: "0 2px 16px rgba(0,0,0,0.45)",
            }}
          >
            {c.acronym}
          </div>
          <div
            style={{
              marginTop: 10,
              color: COLORS.iceSoft,
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            {c.name}
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {c.topics.map((topic, ti) => (
            <div key={topic} style={ti === 0 ? t1 : t2}>
              <GlassPanel
                variant="light"
                radius={18}
                style={{
                  padding: "16px 22px",
                  color: COLORS.whiteSoft,
                  fontSize: 26,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
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

/** Scene 3 — Committee spotlights with phone swipe transitions (5–11s) */
export const SpotlightsScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {ADVANCED_COMMITTEES.map((c, i) => (
        <Sequence key={c.id} from={i * SLOT} durationInFrames={SLOT} layout="none">
          <SpotlightCard index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
