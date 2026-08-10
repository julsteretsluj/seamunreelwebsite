import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONT, SAFE } from "../lib/constants";
import { ADVANCED_COMMITTEES } from "../lib/content";
import { fadeUp, scaleFade } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";
import { PartnershipPill } from "../components/PartnershipPill";

/** Scene 2 — Choose Your Committee (2.5–5s) */
export const CommitteesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const title = fadeUp(frame, 4, 12, 36);
  const partner = fadeUp(frame, 0, 10, 20);

  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE.top,
        paddingBottom: SAFE.bottom,
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side + SAFE.rightExtra,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: FONT,
      }}
    >
      <div style={partner}>
        <PartnershipPill />
      </div>

      <div style={{ ...title, marginTop: 56, width: "100%" }}>
        <GlassPanel
          radius={30}
          style={{
            padding: "40px 36px 48px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: COLORS.white,
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 40,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            Choose Your Committee
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 28,
              justifyItems: "center",
            }}
          >
            {ADVANCED_COMMITTEES.map((c, i) => {
              const start = 14 + i * 6; // ~0.2s stagger at 30fps
              const anim = scaleFade(frame, start, 12, 0.9);
              return (
                <div
                  key={c.id}
                  style={{
                    ...anim,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    width: 220,
                  }}
                >
                  <Img
                    src={staticFile(c.logo)}
                    style={{
                      width: 168,
                      height: 168,
                      objectFit: "contain",
                      filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))",
                    }}
                  />
                  <div
                    style={{
                      color: COLORS.ice,
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {c.acronym}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};
