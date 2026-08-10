import { Easing, interpolate, spring } from "remotion";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.4, 0, 0.2, 1);

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
    config: { damping: 16, stiffness: 160, mass: 0.7 },
  });
  const opacity = interpolate(local, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [-60, 0]);
  return { opacity, transform: `translateY(${translateY}px)` };
}

/** Horizontal swipe between screens */
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
    return { opacity, transform: `translateX(${x}px)` };
  }
  const opacity = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOut,
  });
  const x = interpolate(frame, [start, start + duration], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOut,
  });
  return { opacity, transform: `translateX(${x}px)` };
}

/** Continuous cinematic background ken-burns */
export function kenBurns(frame: number, durationInFrames: number) {
  const t = frame / Math.max(1, durationInFrames - 1);
  const scale = interpolate(t, [0, 1], [1, 1.05]);
  const x = interpolate(t, [0, 1], [0, -18]);
  const y = interpolate(t, [0, 1], [0, -10]);
  return { transform: `scale(${scale}) translate(${x}px, ${y}px)` };
}

/** Subtle finale scale */
export function subtleScale(frame: number, start: number, end: number) {
  const scale = interpolate(frame, [start, end], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOut,
  });
  return { transform: `scale(${scale})` };
}

export function seconds(frames: number, fps: number) {
  return frames / fps;
}
