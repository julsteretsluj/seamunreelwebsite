import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE, TEXT_SHADOW_STRONG } from "../lib/constants";
import { ALL_COMMITTEES } from "../lib/content";
import { cascadeIn, fadeUp } from "../lib/motion";
import { GlassPanel } from "../components/GlassPanel";
import { CommitteeLogo } from "../components/CommitteeLogo";
import { LightSweep } from "../components/LightSweep";

/** Scene 2 — All 10 committees */
export const CommitteesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = fadeUp(frame, fps, 2, 28);

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
      <div style={{ ...title, width: "100%", maxWidth: 920 }}>
        <GlassPanel
          radius={30}
          style={{
            padding: "32px 28px 36px",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <LightSweep radius={30} period={110} phase={6} />
          <div
            style={{
              color: COLORS.white,
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 28,
              textShadow: TEXT_SHADOW_STRONG,
              textAlign: "center",
              width: "100%",
            }}
          >
            Choose Your Committee
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: "18px 8px",
              justifyItems: "center",
              alignItems: "start",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {ALL_COMMITTEES.map((c, i) => {
              const col = i % 5;
              const row = Math.floor(i / 5);
              const anim = cascadeIn(frame, fps, 3 + i * 1.4, {
                x: (col - 2) * 18,
                y: 36 + row * 10,
                fromScale: 0.72,
              });
              return (
                <div
                  key={c.id}
                  style={{
                    ...anim,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 8,
                    width: "100%",
                    maxWidth: 140,
                    transformOrigin: "center center",
                  }}
                >
                  <CommitteeLogo src={c.logo} size={108} pad={8} />
                  <div
                    style={{
                      color: COLORS.ice,
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: "0.02em",
                      lineHeight: 1.15,
                      textAlign: "center",
                      textShadow: TEXT_SHADOW_STRONG,
                      width: "100%",
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
