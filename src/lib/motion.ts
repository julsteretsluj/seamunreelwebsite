import type { CSSProperties } from "react";
import { Easing, interpolate, spring } from "remotion";

const easeInOut = Easing.bezier(0.4, 0, 0.2, 1);

/** Apple-like UI spring — snappy bounce, settles fast */
export const IOS_BOUNCE = {
  damping: 12,
  stiffness: 280,
  mass: 0.58,
} as const;

/** Softer bounce for large panels / scene gates */
export const IOS_BOUNCE_SOFT = {
  damping: 13,
  stiffness: 240,
  mass: 0.7,
} as const;

/** Snappy bounce for icons, QR, avatars */
export const IOS_BOUNCE_POP = {
  damping: 11,
  stiffness: 320,
  mass: 0.5,
} as const;

function springProgress(
  frame: number,
  fps: number,
  start: number,
  config: typeof IOS_BOUNCE = IOS_BOUNCE,
) {
  const local = Math.max(0, frame - start);
  return {
    local,
    progress: spring({ frame: local, fps, config }),
  };
}

/** Soft fade + upward settle with iOS bounce overshoot */
export function fadeUp(
  frame: number,
  fps: number,
  start: number,
  distance = 40,
) {
  const { local, progress } = springProgress(frame, fps, start, IOS_BOUNCE);
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [distance, 0]);
  return { opacity, transform: `translateY(${translateY}px)` };
}

/** Fade + rise — no text blur (keeps copy sharp) */
export function fadeUpBlur(
  frame: number,
  fps: number,
  start: number,
  distance = 36,
) {
  return fadeUp(frame, fps, start, distance);
}

/** Icon / emblem scale-in with bounce */
export function scaleFade(
  frame: number,
  fps: number,
  start: number,
  fromScale = 0.92,
) {
  const { local, progress } = springProgress(frame, fps, start, IOS_BOUNCE_POP);
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(progress, [0, 1], [fromScale, 1]);
  return { opacity, transform: `scale(${scale})` };
}

/** Spring pop for logos / QR — classic iOS bounce */
export function springPop(
  frame: number,
  fps: number,
  start: number,
  fromScale = 0.86,
) {
  const { local, progress } = springProgress(frame, fps, start, IOS_BOUNCE_POP);
  const opacity = interpolate(local, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(progress, [0, 1], [fromScale, 1]);
  return { opacity, transform: `scale(${scale})` };
}

/** iOS notification banner — drop in with bounce */
export function notificationDrop(
  frame: number,
  fps: number,
  start: number,
) {
  const { local, progress } = springProgress(frame, fps, start, {
    damping: 11,
    stiffness: 240,
    mass: 0.7,
  });
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [-72, 0]);
  const scale = interpolate(progress, [0, 1], [0.94, 1]);
  return {
    opacity,
    transform: `translateY(${translateY}px) scale(${scale})`,
  };
}

/** Horizontal swipe — bounce settle on enter */
export function swipeTransition(
  frame: number,
  fps: number,
  start: number,
  direction: "out" | "in" = "in",
  distance = 90,
): CSSProperties {
  if (direction === "out") {
    const duration = 12;
    const opacity = interpolate(frame, [start, start + duration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    const x = interpolate(frame, [start, start + duration], [0, -distance], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    const scale = interpolate(frame, [start, start + duration], [1, 0.94], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    return { opacity, transform: `translateX(${x}px) scale(${scale})` };
  }

  const { local, progress } = springProgress(frame, fps, start, IOS_BOUNCE);
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(progress, [0, 1], [distance, 0]);
  const scale = interpolate(progress, [0, 1], [0.92, 1]);
  return { opacity, transform: `translateX(${x}px) scale(${scale})` };
}

/**
 * Perspective card deck swipe — bounce on settle (enter).
 * `from` = which side the card arrives from (exit goes the opposite way).
 */
export function deckSwipe(
  frame: number,
  fps: number,
  start: number,
  duration: number,
  direction: "in" | "out",
  from: "left" | "right" = "right",
): CSSProperties {
  const end = start + duration;
  const sign = from === "right" ? 1 : -1;
  if (direction === "out") {
    const opacity = interpolate(frame, [start, end], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    const x = interpolate(frame, [start, end], [0, -160 * sign], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    const y = interpolate(frame, [start, end], [0, 18], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    const scale = interpolate(frame, [start, end], [1, 0.86], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    const rot = interpolate(frame, [start, end], [0, -8 * sign], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    return {
      opacity,
      transform: `perspective(1200px) translate(${x}px, ${y}px) scale(${scale}) rotateY(${rot}deg)`,
      transformOrigin: "center center",
    };
  }

  const { local, progress } = springProgress(frame, fps, start, IOS_BOUNCE_SOFT);
  const opacity = interpolate(local, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(progress, [0, 1], [160 * sign, 0]);
  const y = interpolate(progress, [0, 1], [22, 0]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);
  const rot = interpolate(progress, [0, 1], [7 * sign, 0]);
  return {
    opacity,
    transform: `perspective(1200px) translate(${x}px, ${y}px) scale(${scale}) rotateY(${rot}deg)`,
    transformOrigin: "center center",
  };
}

/** Gentle idle float — keeps corner art / badges alive */
export function floatBob(
  frame: number,
  amplitude = 6,
  period = 48,
  phase = 0,
): CSSProperties {
  const t = ((frame + phase) % period) / period;
  const y = Math.sin(t * Math.PI * 2) * amplitude;
  const rot = Math.sin(t * Math.PI * 2 + 0.6) * 1.6;
  return { transform: `translateY(${y}px) rotate(${rot}deg)` };
}

/** Cascade in from an offset — great for grids / avatars */
export function cascadeIn(
  frame: number,
  fps: number,
  start: number,
  opts: { x?: number; y?: number; fromScale?: number } = {},
): CSSProperties {
  const { x = 0, y = 28, fromScale = 0.82 } = opts;
  const { local, progress } = springProgress(frame, fps, start, IOS_BOUNCE_POP);
  const opacity = interpolate(local, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tx = interpolate(progress, [0, 1], [x, 0]);
  const ty = interpolate(progress, [0, 1], [y, 0]);
  const scale = interpolate(progress, [0, 1], [fromScale, 1]);
  return {
    opacity,
    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
    transformOrigin: "center center",
  };
}

/** Soft breathing pulse for QR / CTAs */
export function pulseScale(
  frame: number,
  start = 0,
  period = 36,
  amount = 0.03,
): CSSProperties {
  const local = Math.max(0, frame - start);
  const t = (local % period) / period;
  const scale = 1 + Math.sin(t * Math.PI * 2) * amount;
  return { transform: `scale(${scale})` };
}

/** Horizontal light sweep progress 0→1 looping */
export function lightSweepProgress(frame: number, period = 90, phase = 0) {
  return ((frame + phase) % period) / period;
}

/**
 * Major scene enter/exit — bouncy enter, smooth exit.
 */
export function sceneGate(
  frame: number,
  fps: number,
  durationInFrames: number,
  enterFrames = 16,
  exitFrames = 14,
): CSSProperties {
  const { local, progress } = springProgress(frame, fps, 0, IOS_BOUNCE_SOFT);
  const enterOpacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(progress, [0, 1], [40, 0]);
  const enterScale = interpolate(progress, [0, 1], [0.94, 1]);

  const exitStart = durationInFrames - exitFrames;
  const exitOpacity = interpolate(
    frame,
    [exitStart, durationInFrames - 1],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    },
  );
  const exitY = interpolate(
    frame,
    [exitStart, durationInFrames - 1],
    [0, -28],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    },
  );
  const exitScale = interpolate(
    frame,
    [exitStart, durationInFrames - 1],
    [1, 1.03],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    },
  );

  const inExit = frame >= exitStart;
  return {
    opacity: inExit ? exitOpacity : enterOpacity,
    // Avoid filter blur on scenes — softens all text
    transform: inExit
      ? `translateY(${exitY}px) scale(${exitScale})`
      : `translateY(${enterY}px) scale(${enterScale})`,
  };
}

/** Continuous cinematic background ken-burns */
export function kenBurns(frame: number, durationInFrames: number) {
  const t = frame / Math.max(1, durationInFrames - 1);
  const scale = interpolate(t, [0, 1], [1, 1.07]);
  const x = interpolate(t, [0, 1], [0, -28]);
  const y = interpolate(t, [0, 1], [0, -14]);
  return { transform: `scale(${scale}) translate(${x}px, ${y}px)` };
}

/** Subtle finale scale */
export function subtleScale(frame: number, start: number, end: number) {
  const scale = interpolate(frame, [start, end], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOut,
  });
  return { transform: `scale(${scale})` };
}

export function seconds(frames: number, fps: number) {
  return frames / fps;
}
