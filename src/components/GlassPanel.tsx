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
        position: "relative",
        borderRadius: radius,
        overflow: "hidden",
        isolation: "isolate",
        border: isPanel
          ? `1.5px solid ${COLORS.glassBorder}`
          : `1px solid ${COLORS.glassLightBorder}`,
        boxShadow: isPanel
          ? "0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)"
          : "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
        fontFamily: FONT,
        ...style,
        // Ensure background/blur aren't overridden away by callers
        background: isPanel
          ? `linear-gradient(135deg, ${COLORS.glassGradA} 0%, ${COLORS.glassGradB} 55%, rgba(2, 28, 42, 0.9) 100%)`
          : "rgba(255, 255, 255, 0.34)",
        backdropFilter: isPanel
          ? "blur(40px) saturate(1.35) brightness(0.92)"
          : "blur(22px) saturate(1.2)",
        WebkitBackdropFilter: isPanel
          ? "blur(40px) saturate(1.35) brightness(0.92)"
          : "blur(22px) saturate(1.2)",
      }}
    >
      {/* Soft frost overlay — softens water detail behind text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: isPanel
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.12)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
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
      background: "rgba(8, 40, 58, 0.75)",
      border: `1px solid ${COLORS.glassLightBorder}`,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      color: COLORS.white,
      fontFamily: FONT,
      fontSize: 22,
      fontWeight: 700,
      textShadow: "0 1px 6px rgba(0,0,0,0.5)",
      ...style,
    }}
  >
    {children}
  </div>
);
