import React from "react";
import { COLORS, FONT } from "../lib/constants";

type GlassPanelProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "panel" | "light";
  radius?: number;
};

/** Translucent teal panel — matches SEAMUN glass aesthetic */
export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  style,
  variant = "panel",
  radius = 28,
}) => {
  const isPanel = variant === "panel";
  return (
    <div
      style={{
        borderRadius: radius,
        background: isPanel
          ? `linear-gradient(114deg, ${COLORS.glassGradA} 0%, ${COLORS.glassGradB} 100%)`
          : COLORS.glassLight,
        border: isPanel
          ? `1.5px solid ${COLORS.glassBorder}`
          : `1px solid ${COLORS.glassLightBorder}`,
        boxShadow: isPanel
          ? "0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)"
          : "inset 0 1px 0 rgba(255,255,255,0.1)",
        fontFamily: FONT,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type PillProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const GlassPill: React.FC<PillProps> = ({ children, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      borderRadius: 999,
      padding: "10px 18px",
      background: COLORS.glassLight,
      border: `1px solid ${COLORS.glassLightBorder}`,
      color: COLORS.whiteSoft,
      fontFamily: FONT,
      fontSize: 22,
      fontWeight: 500,
      ...style,
    }}
  >
    {children}
  </div>
);
