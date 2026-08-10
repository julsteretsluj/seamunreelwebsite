import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONT, SAFE } from "../lib/constants";
import { SignupScene as SignupData } from "../lib/content";
import { fadeUp, scaleFade, swipeTransition } from "../lib/motion";
import { DueDateNotification } from "../components/DueDateNotification";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  data: SignupData;
  /** Local frame offset where swipe-in begins (0 for first signup scene) */
  swipeIn?: boolean;
};

/** Shared Delegate / Chair / Advisor signup layout */
export const SignupScene: React.FC<Props> = ({ data, swipeIn = true }) => {
  const frame = useCurrentFrame();
  const enter = swipeIn
    ? swipeTransition(frame, 0, 12, "in", 80)
    : fadeUp(frame, 0, 12, 28);
  const headline = fadeUp(frame, 8, 12, 36);
  const notifStart = 16;
  const qr = scaleFade(frame, 34, 14, 0.94);
  const support = fadeUp(frame, 48, 12, 24);

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
        ...enter,
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
          <div
            style={{
              color: COLORS.white,
              fontSize: 46,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
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
          ...qr,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile(data.qr)}
          style={{
            width: 360,
            height: 360,
            objectFit: "contain",
            borderRadius: 28,
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          }}
        />
      </div>

      <div
        style={{
          ...support,
          marginTop: 28,
          color: COLORS.iceSoft,
          fontSize: 26,
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 820,
          whiteSpace: "pre-line",
        }}
      >
        {data.support}
      </div>
    </AbsoluteFill>
  );
};
