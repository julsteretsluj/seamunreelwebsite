import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SAFE } from "../lib/constants";
import { fadeUp, floatBob } from "../lib/motion";
import { PartnershipPill } from "./PartnershipPill";

/** Persistent D-PREP partnership badge — visible on every frame */
export const PartnershipOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = fadeUp(frame, fps, 0, 18);
  const bob = floatBob(frame, 3.5, 64, 8);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: Math.max(48, SAFE.top - 56),
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          ...enter,
        }}
      >
        <div style={bob}>
          <PartnershipPill />
        </div>
      </div>
    </AbsoluteFill>
  );
};
