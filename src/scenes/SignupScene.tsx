import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, SAFE, TEXT_SHADOW_STRONG } from "../lib/constants";
import { SignupScene as SignupData } from "../lib/content";
import {
  fadeUp,
  fadeUpBlur,
  pulseScale,
  springPop,
  swipeTransition,
} from "../lib/motion";
import { DueDateNotification } from "../components/DueDateNotification";
import { GlassPanel } from "../components/GlassPanel";
import { LightSweep } from "../components/LightSweep";

type Props = {
  data: SignupData;
  /** Local frame offset where swipe-in begins (0 for first signup scene) */
  swipeIn?: boolean;
  /** Alternate swipe distance / energy */
  swipeFrom?: "left" | "right";
};

/** Shared Delegate / Chair / Advisor signup layout */
export const SignupScene: React.FC<Props> = ({
  data,
  swipeIn = true,
  swipeFrom = "right",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const distance = swipeFrom === "right" ? 110 : -110;
  const enter = swipeIn
    ? swipeTransition(frame, fps, 0, "in", Math.abs(distance))
    : fadeUpBlur(frame, fps, 0, 32);
  // Flip sign for left arrivals by mirroring translate after swipe helper (always +distance)
  const enterMotion =
    swipeIn && swipeFrom === "left"
      ? {
          ...enter,
          transform: String(enter.transform || "").replace(
            /translateX\((-?\d+(?:\.\d+)?)px\)/,
            (_, n) => `translateX(${-Number(n)}px)`,
          ),
        }
      : enter;

  const headline = fadeUpBlur(frame, fps, 2, 24);
  const notifStart = 6;
  const qrPop = springPop(frame, fps, 14, 0.88);
  const qrPulse = pulseScale(frame, 20, 40, 0.025);
  const support = fadeUp(frame, fps, 22, 16);
  const ring = interpolate(
    Math.sin(((frame - 18) / 28) * Math.PI * 2),
    [-1, 1],
    [0.35, 0.85],
  );

  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE.top,
        paddingBottom: SAFE.bottom,
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        ...enterMotion,
      }}
    >
      <div style={{ ...headline, width: "100%", maxWidth: 920 }}>
        <GlassPanel
          radius={28}
          style={{
            padding: "28px 32px",
            textAlign: "center",
          }}
        >
          <LightSweep radius={28} period={88} phase={12} />
          <div
            style={{
              color: COLORS.white,
              fontSize: 46,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textShadow: TEXT_SHADOW_STRONG,
            }}
          >
            {data.headline}
          </div>
        </GlassPanel>
      </div>

      <DueDateNotification
        label={data.dueLabel}
        detail={data.dueDetail}
        accent={data.accent}
        startFrame={notifStart}
        style={{ marginTop: 28, width: "100%", maxWidth: 920 }}
      />

      <div
        style={{
          marginTop: 36,
          ...qrPop,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            ...qrPulse,
            position: "relative",
            width: 360,
            height: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 400,
              height: 400,
              marginLeft: -200,
              marginTop: -200,
              borderRadius: 36,
              border: `2px solid ${data.accent}`,
              opacity: Math.max(0, ring),
              boxShadow: `0 0 28px ${data.accent}55`,
            }}
          />
          <Img
            src={staticFile(data.qr)}
            style={{
              position: "relative",
              zIndex: 1,
              width: 360,
              height: 360,
              objectFit: "contain",
              objectPosition: "center",
              borderRadius: 28,
              display: "block",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          ...support,
          marginTop: 28,
          color: COLORS.whiteSoft,
          fontSize: 26,
          fontWeight: 600,
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 820,
          whiteSpace: "pre-line",
          textShadow: TEXT_SHADOW_STRONG,
        }}
      >
        {data.support}
      </div>
    </AbsoluteFill>
  );
};
