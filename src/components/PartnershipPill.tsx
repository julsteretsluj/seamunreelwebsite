import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS, FONT } from "../lib/constants";
import { BRAND } from "../lib/content";

type Props = {
  style?: React.CSSProperties;
};

/** Dynamic Island–style D-PREP partnership pill */
export const PartnershipPill: React.FC<Props> = ({ style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      background: "rgba(0,0,0,0.82)",
      borderRadius: 999,
      padding: "12px 22px 12px 14px",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
      fontFamily: FONT,
      ...style,
    }}
  >
    <Img
      src={staticFile(BRAND.dprep)}
      style={{
        width: 36,
        height: 36,
        objectFit: "contain",
        borderRadius: 8,
      }}
    />
    <span
      style={{
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {BRAND.partnership}
    </span>
  </div>
);
