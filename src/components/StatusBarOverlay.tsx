import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, FONT } from "../lib/constants";

const STATUS_ICONS = "assets/brand/status-icons.png";

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
        top: 28,
        left: 42,
        right: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          color: COLORS.white,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: 1,
          textShadow: "0 1px 8px rgba(0,0,0,0.45)",
          paddingTop: 2,
        }}
      >
        16:17
      </div>
      <Img
        src={staticFile(STATUS_ICONS)}
        style={{
          height: 22,
          width: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.4))",
        }}
      />
    </div>
  </AbsoluteFill>
);
