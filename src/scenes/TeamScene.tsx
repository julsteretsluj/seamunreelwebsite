import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE } from "../lib/constants";
import { TEAM } from "../lib/content";
import { fadeUp, springPop } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";

/** Scene 4 — Our Team (secretariat leadership) */
export const TeamScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = fadeUp(frame, 2, 12, 32);

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
      <div style={{ ...title, width: "100%", maxWidth: 960 }}>
        <GlassPanel
          radius={30}
          style={{
            padding: "32px 24px 36px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: COLORS.white,
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 28,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            Our Team
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px 14px",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {TEAM.map((member, i) => {
              const anim = springPop(frame, fps, 2 + i, 0.82);
              return (
                <div
                  key={member.name}
                  style={{
                    ...anim,
                    width: 118,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Img
                    src={staticFile(member.img)}
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid rgba(173,238,254,0.45)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                      background: "rgba(0,0,0,0.35)",
                    }}
                  />
                  <div
                    style={{
                      color: COLORS.white,
                      fontSize: 13,
                      fontWeight: 700,
                      lineHeight: 1.15,
                      textAlign: "center",
                    }}
                  >
                    {member.name}
                  </div>
                  <div
                    style={{
                      color: COLORS.iceMuted,
                      fontSize: 11,
                      fontWeight: 500,
                      lineHeight: 1.2,
                      textAlign: "center",
                    }}
                  >
                    {member.role}
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
