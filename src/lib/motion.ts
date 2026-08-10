import type { CSSProperties } from "react";
import { Easing, interpolate, spring } from "remotion";

const easeInOut = Easing.bezier(0.4, 0, 0.2, 1);

/** Apple-like UI spring — visible bounce, then settle */
export const IOS_BOUNCE = {
  damping: 10.5,
  stiffness: 230,
  mass: 0.72,
} as const;

/** Softer bounce for large panels / scene gates */
export const IOS_BOUNCE_SOFT = {
  damping: 12,
  stiffness: 190,
  mass: 0.85,
} as const;

/** Snappy bounce for icons, QR, avatars */
export const IOS_BOUNCE_POP = {
  damping: 9.5,
  stiffness: 260,
  mass: 0.62,
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

/** Fade + rise + blur clear — bouncy entrance */
export function fadeUpBlur(
  frame: number,
  fps: number,
  start: number,
  distance = 36,
) {
  const { local, progress } = springProgress(frame, fps, start, IOS_BOUNCE);
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [distance, 0]);
  const blur = interpolate(local, [0, 10], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return {
    opacity,
    filter: `blur(${blur}px)`,
    transform: `translateY(${translateY}px)`,
  };
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
 */
export function deckSwipe(
  frame: number,
  fps: number,
  start: number,
  duration: number,
  direction: "in" | "out",
): CSSProperties {
  const end = start + duration;
  if (direction === "out") {
    const opacity = interpolate(frame, [start, end], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    const x = interpolate(frame, [start, end], [0, -160], {
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
    const rot = interpolate(frame, [start, end], [0, -8], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    const blur = interpolate(frame, [start, end], [0, 6], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    });
    return {
      opacity,
      filter: `blur(${blur}px)`,
      transform: `perspective(1200px) translate(${x}px, ${y}px) scale(${scale}) rotateY(${rot}deg)`,
      transformOrigin: "center center",
    };
  }

  const { local, progress } = springProgress(frame, fps, start, IOS_BOUNCE_SOFT);
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(progress, [0, 1], [180, 0]);
  const y = interpolate(progress, [0, 1], [28, 0]);
  const scale = interpolate(progress, [0, 1], [0.88, 1]);
  const rot = interpolate(progress, [0, 1], [9, 0]);
  const blur = interpolate(local, [0, 12], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return {
    opacity,
    filter: `blur(${blur}px)`,
    transform: `perspective(1200px) translate(${x}px, ${y}px) scale(${scale}) rotateY(${rot}deg)`,
    transformOrigin: "center center",
  };
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
  const enterOpacity = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(progress, [0, 1], [52, 0]);
  const enterScale = interpolate(progress, [0, 1], [0.92, 1]);
  const enterBlur = interpolate(local, [0, 12], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
    [0, -36],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    },
  );
  const exitScale = interpolate(
    frame,
    [exitStart, durationInFrames - 1],
    [1, 1.04],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    },
  );
  const exitBlur = interpolate(
    frame,
    [exitStart, durationInFrames - 1],
    [0, 8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeInOut,
    },
  );

  const inExit = frame >= exitStart;
  return {
    opacity: inExit ? exitOpacity : enterOpacity,
    filter: `blur(${inExit ? exitBlur : enterBlur}px)`,
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
