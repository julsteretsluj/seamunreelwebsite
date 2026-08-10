import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, TEXT_SHADOW_STRONG } from "../lib/constants";
import { notificationDrop } from "../lib/motion";
import { GlassPanel } from "./GlassPanel";

type Props = {
  label: string;
  detail: string;
  accent: string;
  startFrame: number;
  style?: React.CSSProperties;
};

/** iOS-style Due Date notification */
export const DueDateNotification: React.FC<Props> = ({
  label,
  detail,
  accent,
  startFrame,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const motion = notificationDrop(frame, fps, startFrame);

  return (
    <div style={{ ...motion, ...style }}>
      <GlassPanel radius={22} style={{ padding: "20px 24px" }}>
        <div
          style={{
            position: "relative",
            paddingLeft: 18,
            fontFamily: FONT,
            textAlign: "left",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Accent bar — matches text block height exactly */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 2,
              bottom: 2,
              width: 5,
              borderRadius: 3,
              background: accent,
              boxShadow: `0 0 12px ${accent}66`,
            }}
          />
          <div
            style={{
              color: accent,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 6,
              lineHeight: 1.2,
              textShadow: "0 1px 6px rgba(0,0,0,0.45)",
            }}
          >
            {label}
          </div>
          <div
            style={{
              color: COLORS.white,
              fontSize: 27,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              textShadow: TEXT_SHADOW_STRONG,
            }}
          >
            {detail}
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};
