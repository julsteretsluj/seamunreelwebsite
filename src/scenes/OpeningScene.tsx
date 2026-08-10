import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE, TEXT_SHADOW_STRONG } from "../lib/constants";
import { BRAND } from "../lib/content";
import { fadeUp, scaleFade } from "../lib/motion";
import { GlassPanel, GlassPill } from "../components/GlassPanel";

/** Scene 1 — Opening */
export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brand = fadeUp(frame, fps, 3, 28);
  const brandScale = scaleFade(frame, fps, 3, 0.94);
  const meta = fadeUp(frame, fps, 9, 24);
  const pills = fadeUp(frame, fps, 14, 20);

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
          ...meta,
        }}
      >
        <GlassPanel
          radius={22}
          style={{ flex: 1, padding: "22px 20px", textAlign: "center" }}
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
        <GlassPanel
          radius={22}
          style={{ flex: 1, padding: "22px 20px", textAlign: "center" }}
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
