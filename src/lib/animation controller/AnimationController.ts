"use client";

import { useEffect, useRef, useState } from "react";

type EasingType = "ease" | "easeIn" | "easeOut" | "linear";

interface AnimationFrame {
  type: EasingType;
  duration: number;
  reverse: boolean;
  endCoords: number[];
}

type Timeline = {
  anchorTime: number;
  anchorProgress: number;
  direction: -1 | 0 | 1;
  duration: number;
};

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

// Time determines progress. Frames only decide when to display it.
function sampleProgress(timeline: Timeline, now: number): number {
  if (timeline.direction === 0 || timeline.duration <= 0) {
    return timeline.anchorProgress;
  }

  return clamp01(
    timeline.anchorProgress +
      timeline.direction * ((now - timeline.anchorTime) / timeline.duration)
  );
}

function easeProgress(progress: number, type: EasingType): number {
  switch (type) {
    case "ease":
      return (1 - Math.cos(progress * Math.PI)) / 2;
    case "easeIn":
      return 1 - Math.cos((progress * Math.PI) / 2);
    case "easeOut":
      return Math.sin((progress * Math.PI) / 2);
    case "linear":
      return progress;
  }
}

export function useAnimationController({
  type,
  duration,
  reverse,
  endCoords,
}: AnimationFrame): number[] {
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef<Timeline | null>(null);

  useEffect(() => {
    const now = performance.now();
    const previous = timelineRef.current;

    // Sample the previous direction at the exact time of the change.
    const currentProgress = previous ? sampleProgress(previous, now) : 0;
    const targetProgress = reverse ? 0 : 1;
    const safeDuration = Math.max(0, duration);

    // Record a fixed reference for this new animation segment.
    const direction: -1 | 0 | 1 =
      currentProgress === targetProgress ? 0 : reverse ? -1 : 1;

    const segment: Timeline = {
      anchorTime: now,
      anchorProgress: currentProgress,
      direction,
      duration: safeDuration,
    };

    timelineRef.current = segment;
    setProgress(currentProgress);

    // Zero-duration changes and already-reached targets need no frame loop.
    if (safeDuration === 0 || direction === 0) {
      timelineRef.current = {
        anchorTime: now,
        anchorProgress: targetProgress,
        direction: 0,
        duration: safeDuration,
      };
      setProgress(targetProgress);
      return;
    }

    let frameId: number;

    function tick(time: number) {
      const nextProgress = sampleProgress(segment, time);
      setProgress(nextProgress);

      const finished =
        direction === 1 ? nextProgress >= 1 : nextProgress <= 0;

      if (finished) {
        // Explicitly commit the endpoint, instead of leaving the timeline
        // anchored to a timestamp from an animation that finished long ago.
        timelineRef.current = {
          anchorTime: time,
          anchorProgress: targetProgress,
          direction: 0,
          duration: safeDuration,
        };
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reverse, duration]);

  const easedProgress = easeProgress(progress, type);
  return endCoords.map((coordinate) => coordinate * easedProgress);
}
