import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT, SAFE } from "../lib/constants";

const STATUS_ICONS = "assets/brand/status-icons.png";

/** Match vertical position of the D-PREP partnership pill */
const BAR_TOP = Math.max(48, SAFE.top - 56);

/** iOS-style status bar — time left, signal/battery/wifi right */
export const StatusBarOverlay: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      zIndex: 60,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: BAR_TOP,
        left: 36,
        right: 36,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          color: COLORS.white,
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: "0.01em",
          lineHeight: 1,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          minWidth: 96,
        }}
      >
        16:17
      </div>
      <Img
        src={staticFile(STATUS_ICONS)}
        style={{
          height: 34,
          width: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.45))",
        }}
      />
    </div>
  </AbsoluteFill>
);
