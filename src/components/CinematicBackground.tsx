import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, DURATION_IN_FRAMES } from "../lib/constants";
import { BRAND } from "../lib/content";
import { kenBurns, lightSweepProgress } from "../lib/motion";

/** Slow cinematic water background with drifting caustic light */
export const CinematicBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const duration = durationInFrames || DURATION_IN_FRAMES;
  const motion = kenBurns(frame, duration);

  const sweep = lightSweepProgress(frame, 140, 0);
  const sweep2 = lightSweepProgress(frame, 110, 40);
  const x1 = interpolate(sweep, [0, 1], [-30, 120]);
  const x2 = interpolate(sweep2, [0, 1], [110, -40]);
  const glow = 0.12 + Math.sin((frame / 50) * Math.PI * 2) * 0.04;

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
      {/* Drifting caustic highlights */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 55% 40% at ${x1}% 28%, rgba(173,238,254,${glow}) 0%, transparent 70%)`,
          mixBlendMode: "screen",
          opacity: 0.85,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 45% 35% at ${x2}% 72%, rgba(110,231,183,0.1) 0%, transparent 70%)`,
          mixBlendMode: "screen",
        }}
      />
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
