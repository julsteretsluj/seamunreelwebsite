import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE } from "../lib/constants";
import { ALL_COMMITTEES } from "../lib/content";
import { fadeUp, springPop } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";
import { PartnershipPill } from "../components/PartnershipPill";
import { CommitteeLogo } from "../components/CommitteeLogo";

/** Scene 2 — All 10 committees */
export const CommitteesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = fadeUp(frame, fps, 4, 36);
  const partner = fadeUp(frame, fps, 0, 20);

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
      }}
    >
      <div style={{ ...partner, marginBottom: 28 }}>
        <PartnershipPill />
      </div>

      <div style={{ ...title, width: "100%", maxWidth: 920 }}>
        <GlassPanel
          radius={30}
          style={{
            padding: "32px 28px 36px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: COLORS.white,
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 28,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            Choose Your Committee
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "18px 10px",
              justifyItems: "center",
              alignItems: "start",
            }}
          >
            {ALL_COMMITTEES.map((c, i) => {
              const anim = springPop(frame, fps, 4 + i * 2, 0.82);
              return (
                <div
                  key={c.id}
                  style={{
                    ...anim,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                  }}
                >
                  <CommitteeLogo src={c.logo} size={108} pad={8} />
                  <div
                    style={{
                      color: COLORS.ice,
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      lineHeight: 1.15,
                      textAlign: "center",
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
