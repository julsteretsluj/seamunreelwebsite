import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, DURATION_IN_FRAMES } from "../lib/constants";
import { BRAND } from "../lib/content";
import { kenBurns } from "../lib/motion";

/** Slow cinematic water/medical background — continuous across scenes */
export const CinematicBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const duration = durationInFrames || DURATION_IN_FRAMES;
  const motion = kenBurns(frame, duration);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.deepNavy, overflow: "hidden" }}>
      <Img
        src={staticFile(BRAND.water)}
        style={{
          position: "absolute",
          width: "115%",
          height: "115%",
          left: "-7.5%",
          top: "-7.5%",
          objectFit: "cover",
          transformOrigin: "center center",
          ...motion,
        }}
      />
      {/* Teal readability overlay — keep medical imagery visible */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(2,14,24,0.35) 0%, rgba(1,90,110,0.28) 45%, rgba(2,14,24,0.48) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(22,113,163,0.18) 0%, transparent 65%)",
        }}
      />
    </AbsoluteFill>
  );
};
