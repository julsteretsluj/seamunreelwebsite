import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { sceneGate } from "../lib/motion";

type Props = {
  children: React.ReactNode;
  enterFrames?: number;
  exitFrames?: number;
};

/** Wraps a scene Sequence with iOS-bounce enter / smooth exit */
export const SceneShell: React.FC<Props> = ({
  children,
  enterFrames = 16,
  exitFrames = 14,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const gate = sceneGate(
    frame,
    fps,
    durationInFrames,
    enterFrames,
    exitFrames,
  );

  return (
    <AbsoluteFill style={{ ...gate, willChange: "transform, opacity, filter" }}>
      {children}
    </AbsoluteFill>
  );
};
