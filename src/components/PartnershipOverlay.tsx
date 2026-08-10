import React from "react";
import { AbsoluteFill } from "remotion";
import { SAFE } from "../lib/constants";
import { PartnershipPill } from "./PartnershipPill";

/** Persistent D-PREP partnership badge — visible on every frame */
export const PartnershipOverlay: React.FC = () => (
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
      }}
    >
      <PartnershipPill />
    </div>
  </AbsoluteFill>
);
