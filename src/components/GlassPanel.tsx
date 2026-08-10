import React from "react";
import { COLORS, FONT } from "../lib/constants";

type GlassPanelProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "panel" | "light";
  radius?: number;
};

/**
 * Frosted glass panel — heavy blur + opaque tint so text stays readable
 * over the animated water background.
 */
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
          ? `linear-gradient(135deg, ${COLORS.glassGradA} 0%, ${COLORS.glassGradB} 100%)`
          : "rgba(255, 255, 255, 0.28)",
        border: isPanel
          ? `1.5px solid ${COLORS.glassBorder}`
          : `1px solid ${COLORS.glassLightBorder}`,
        boxShadow: isPanel
          ? "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.22)"
          : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.35)",
        backdropFilter: isPanel ? "blur(28px) saturate(1.25)" : "blur(18px)",
        WebkitBackdropFilter: isPanel
          ? "blur(28px) saturate(1.25)"
          : "blur(18px)",
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
      background: "rgba(255, 255, 255, 0.22)",
      border: `1px solid ${COLORS.glassLightBorder}`,
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      color: COLORS.white,
      fontFamily: FONT,
      fontSize: 22,
      fontWeight: 600,
      textShadow: "0 1px 6px rgba(0,0,0,0.45)",
      ...style,
    }}
  >
    {children}
  </div>
);
