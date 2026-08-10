import React from "react";
import { useCurrentFrame } from "remotion";
import { lightSweepProgress } from "../lib/motion";

type Props = {
  /** Soft specular sweep across glass panels */
  radius?: number;
  period?: number;
  phase?: number;
};

/** Subtle light sweep for glass surfaces */
export const LightSweep: React.FC<Props> = ({
  radius = 32,
  period = 100,
  phase = 0,
}) => {
  const frame = useCurrentFrame();
  const t = lightSweepProgress(frame, period, phase);
  const x = -40 + t * 140;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: radius,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          bottom: "-20%",
          left: `${x}%`,
          width: "28%",
          background:
            "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.14) 45%, transparent 100%)",
          transform: "skewX(-18deg)",
        }}
      />
    </div>
  );
};
