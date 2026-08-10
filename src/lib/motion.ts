import type { CSSProperties } from "react";
import { Easing, interpolate, spring } from "remotion";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.4, 0, 0.2, 1);
const easeExpo = Easing.bezier(0.16, 1, 0.3, 1);

/** Soft fade + upward settle (text / cards) */
export function fadeUp(
  frame: number,
  start: number,
  duration = 14,
  distance = 40,
) {
  const opacity = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const translateY = interpolate(
    frame,
    [start, start + duration],
    [distance, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    },
  );
  return { opacity, transform: `translateY(${translateY}px)` };
}

/** Fade + rise + slight blur clear — premium entrance */
export function fadeUpBlur(
  frame: number,
  start: number,
  duration = 14,
  distance = 36,
) {
  const base = fadeUp(frame, start, duration, distance);
  const blur = interpolate(frame, [start, start + duration], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  return {
    ...base,
    filter: `blur(${blur}px)`,
  };
}

/** Icon / emblem scale-in */
export function scaleFade(
  frame: number,
  start: number,
  duration = 12,
  fromScale = 0.92,
) {
  const opacity = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const scale = interpolate(
    frame,
    [start, start + duration],
    [fromScale, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    },
  );
  return { opacity, transform: `scale(${scale})` };
}

/** Spring pop for logos / QR — snappy but restrained */
export function springPop(
  frame: number,
  fps: number,
  start: number,
  fromScale = 0.86,
) {
  const local = Math.max(0, frame - start);
  const progress = spring({
    frame: local,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.65 },
  });
  const opacity = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(progress, [0, 1], [fromScale, 1]);
  return { opacity, transform: `scale(${scale})` };
}

/** iOS-style notification drop with tiny overshoot */
export function notificationDrop(
  frame: number,
  fps: number,
  start: number,
) {
  const local = Math.max(0, frame - start);
  const progress = spring({
    frame: local,
    fps,
    config: { damping: 15, stiffness: 170, mass: 0.65 },
  });
  const opacity = interpolate(local, [0, 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [-70, 0]);
  const scale = interpolate(progress, [0, 1], [0.96, 1]);
  return {
    opacity,
    transform: `translateY(${translateY}px) scale(${scale})`,
  };
}

/** Classic horizontal swipe (signup screens) */
export function swipeTransition(
  frame: number,
  start: number,
  duration = 14,
  direction: "out" | "in" = "in",
  distance = 90,
) {
  if (direction === "out") {
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
  const opacity = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const x = interpolate(frame, [start, start + duration], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const scale = interpolate(frame, [start, start + duration], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  return { opacity, transform: `translateX(${x}px) scale(${scale})` };
}

/**
 * Perspective “card deck” swipe for committee spotlights.
 * Outgoing: drifts left, shrinks, tilts; Incoming: rises from right with depth.
 */
export function deckSwipe(
  frame: number,
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

  const opacity = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const x = interpolate(frame, [start, end], [180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const y = interpolate(frame, [start, end], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const scale = interpolate(frame, [start, end], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const rot = interpolate(frame, [start, end], [9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const blur = interpolate(frame, [start, end], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  return {
    opacity,
    filter: `blur(${blur}px)`,
    transform: `perspective(1200px) translate(${x}px, ${y}px) scale(${scale}) rotateY(${rot}deg)`,
    transformOrigin: "center center",
  };
}

/**
 * Major scene enter/exit — scale + fade + vertical drift.
 * Uses local frame within a Sequence and the sequence duration.
 */
export function sceneGate(
  frame: number,
  durationInFrames: number,
  enterFrames = 16,
  exitFrames = 14,
): CSSProperties {
  const enterOpacity = interpolate(frame, [0, enterFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const enterY = interpolate(frame, [0, enterFrames], [48, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const enterScale = interpolate(frame, [0, enterFrames], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
  });
  const enterBlur = interpolate(frame, [0, enterFrames], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpo,
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
