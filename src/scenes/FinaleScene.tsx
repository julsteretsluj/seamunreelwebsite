import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE } from "../lib/constants";
import { BRAND } from "../lib/content";
import { fadeUp, scaleFade, subtleScale } from "../lib/motion";
import { GlassPanel, GlassPill } from "../components/GlassPanel";
import { PartnershipPill } from "../components/PartnershipPill";

/** Scene 7 — Final CTA (18.5–22s) */
export const FinaleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const brand = fadeUp(frame, 4, 14, 40);
  const brandScale = scaleFade(frame, 4, 14, 0.96);
  const tag = fadeUp(frame, 16, 12, 32);
  const meta = fadeUp(frame, 26, 12, 28);
  const partner = fadeUp(frame, 36, 12, 24);
  const web = fadeUp(frame, 46, 12, 24);
  const qr = scaleFade(frame, 52, 14, 0.94);
  const cta = fadeUp(frame, 64, 14, 30);
  const grow = subtleScale(frame, 20, durationInFrames - 1);

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
        ...grow,
      }}
    >
      <div
        style={{
          ...brand,
          transform: `${brand.transform} ${brandScale.transform}`,
          opacity: Math.min(brand.opacity, brandScale.opacity),
          width: "100%",
          maxWidth: 920,
        }}
      >
        <GlassPanel
          radius={32}
          style={{
            padding: "40px 36px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Img
            src={staticFile(BRAND.logo)}
            style={{
              width: 140,
              height: 140,
              objectFit: "contain",
              marginBottom: 18,
              filter: "drop-shadow(0 4px 16px rgba(255,255,255,0.25))",
            }}
          />
          <div
            style={{
              color: COLORS.white,
              fontSize: 58,
              fontWeight: 800,
              letterSpacing: "0.05em",
              textShadow: "0 2px 14px rgba(0,0,0,0.45)",
            }}
          >
            {BRAND.title}
          </div>

          <div style={{ ...tag, marginTop: 14 }}>
            <div
              style={{
                color: COLORS.ice,
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: "0.14em",
              }}
            >
              {BRAND.taglineCaps}
            </div>
          </div>

          <div style={{ ...meta, marginTop: 28 }}>
            <div
              style={{
                color: COLORS.whiteSoft,
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "0.08em",
                lineHeight: 1.55,
              }}
            >
              {BRAND.datesCaps}
              <br />
              {BRAND.locationCaps}
            </div>
          </div>

          <div style={{ ...partner, marginTop: 28 }}>
            <PartnershipPill />
          </div>

          <div
            style={{
              ...web,
              marginTop: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            <GlassPill
              style={{
                background: "rgba(255,255,255,0.92)",
                color: COLORS.ink,
                fontWeight: 700,
                fontSize: 26,
                padding: "14px 36px",
                border: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              {BRAND.website}
            </GlassPill>

            <div style={qr}>
              <Img
                src={staticFile(BRAND.websiteQr)}
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "contain",
                  borderRadius: 22,
                  boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>

          <div style={{ ...cta, marginTop: 32 }}>
            <div
              style={{
                color: COLORS.whiteSoft,
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.4,
              }}
            >
              {BRAND.cta1}
              <br />
              <span style={{ color: COLORS.ice }}>{BRAND.cta2}</span>
            </div>
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};
