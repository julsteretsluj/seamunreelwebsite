import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE, TEXT_SHADOW_STRONG } from "../lib/constants";
import { BRAND } from "../lib/content";
import { cascadeIn, fadeUp, scaleFade, springPop } from "../lib/motion";
import { GlassPanel, GlassPill } from "../components/GlassPanel";
import { LightSweep } from "../components/LightSweep";

/** Scene 1 — Opening */
export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brand = fadeUp(frame, fps, 3, 28);
  const brandScale = scaleFade(frame, fps, 3, 0.94);
  const logo = springPop(frame, fps, 4, 0.78);
  const metaLeft = cascadeIn(frame, fps, 10, { x: -40, y: 24, fromScale: 0.9 });
  const metaRight = cascadeIn(frame, fps, 12, { x: 40, y: 24, fromScale: 0.9 });
  const pills = fadeUp(frame, fps, 16, 20);

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
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          ...brand,
          transform: `${brand.transform} ${brandScale.transform}`,
          opacity: Math.min(brand.opacity, brandScale.opacity),
        }}
      >
        <GlassPanel
          radius={32}
          style={{
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <LightSweep radius={32} period={90} phase={0} />
          <div style={logo}>
            <Img
              src={staticFile(BRAND.logo)}
              style={{
                width: 168,
                height: 168,
                objectFit: "contain",
                marginBottom: 22,
                filter: "drop-shadow(0 4px 18px rgba(255,255,255,0.28))",
              }}
            />
          </div>
          <div
            style={{
              color: COLORS.white,
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "0.04em",
              lineHeight: 1.05,
              textShadow: TEXT_SHADOW_STRONG,
            }}
          >
            {BRAND.title}
          </div>
          <div
            style={{
              marginTop: 14,
              color: COLORS.ice,
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {BRAND.tagline}
          </div>
        </GlassPanel>
      </div>

      <div
        style={{
          marginTop: 28,
          width: "100%",
          maxWidth: 920,
          display: "flex",
          gap: 16,
        }}
      >
        <div style={{ ...metaLeft, flex: 1 }}>
          <GlassPanel
            radius={22}
            style={{ padding: "22px 20px", textAlign: "center" }}
          >
            <div
              style={{
                color: COLORS.iceMuted,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.16em",
                marginBottom: 10,
              }}
            >
              DATES
            </div>
            <div
              style={{
                color: COLORS.white,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {BRAND.dates}
            </div>
          </GlassPanel>
        </div>
        <div style={{ ...metaRight, flex: 1 }}>
          <GlassPanel
            radius={22}
            style={{ padding: "22px 20px", textAlign: "center" }}
          >
            <div
              style={{
                color: COLORS.iceMuted,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.16em",
                marginBottom: 10,
              }}
            >
              LOCATION
            </div>
            <div
              style={{
                color: COLORS.white,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
              }}
            >
              {BRAND.location}
            </div>
          </GlassPanel>
        </div>
      </div>

      <div
        style={{
          marginTop: 26,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          ...pills,
        }}
      >
        <GlassPill>{BRAND.website}</GlassPill>
        <GlassPill style={{ fontSize: 18 }}>{BRAND.email}</GlassPill>
      </div>
    </AbsoluteFill>
  );
};
