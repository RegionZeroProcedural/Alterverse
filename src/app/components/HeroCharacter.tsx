"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Vesper from "../../../public/heroCharacters/Vesper.png";
import { useAnimationController } from "@/lib/animation controller/AnimationController";

const ENTRANCE_DURATION = 1100;
const AMBIENT_DURATION = 4500;

export default function HeroCharacter() {
  const [ambientReverse, setAmbientReverse] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Cinematic entrance
  const [entranceProgress] = useAnimationController({
    type: "easeOut",
    duration: reducedMotion ? 0 : ENTRANCE_DURATION,
    reverse: false,
    endCoords: [1],
  });

  // Continuous atmospheric movement
  const [driftX, driftY, driftScale] = useAnimationController({
    type: "ease",
    duration: reducedMotion ? 0 : AMBIENT_DURATION,
    reverse: ambientReverse,
    endCoords: [5, -8, 0.009],
  });

  // Respect reduced-motion preferences
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setReducedMotion(media.matches);
    };

    updatePreference();

    media.addEventListener("change", updatePreference);

    return () => {
      media.removeEventListener("change", updatePreference);
    };
  }, []);

  // Start atmospheric movement after entrance
  useEffect(() => {
    if (reducedMotion) return;

    let intervalId: number | undefined;

    const startId = window.setTimeout(() => {
      setAmbientReverse(false);

      intervalId = window.setInterval(() => {
        setAmbientReverse((previous) => !previous);
      }, AMBIENT_DURATION);
    }, ENTRANCE_DURATION + 150);

    return () => {
      window.clearTimeout(startId);

      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [reducedMotion]);

  // Entrance transformation
  const entranceOffsetX = (1 - entranceProgress) * 40;
  const entranceOffsetY = (1 - entranceProgress) * 16;
  const entranceScale = 1.035 - entranceProgress * 0.035;

  return (
    <div
      className="relative w-fit motion-reduce:!opacity-100 motion-reduce:!transform-none"
      style={{
        opacity: entranceProgress,

        transform: `
          translate3d(
            ${entranceOffsetX / 16}rem,
            ${entranceOffsetY / 16}rem,
            0
          )
          scale(${entranceScale})
        `,

        transformOrigin: "center bottom",
      }}
    >
      <div
        className="w-fit motion-reduce:!transform-none"
        style={{
          transform: `
            translate3d(
              ${driftX / 16}rem,
              ${driftY / 16}rem,
              0
            )
            scale(${1 + driftScale})
          `,

          transformOrigin: "center bottom",
        }}
      >
        <Image
          src={Vesper}
          alt="Vesper"
          loading="eager"
          sizes="(max-width: 64rem) 100vw, 70vw"
          className="block h-auto max-w-full"
        />
      </div>
    </div>
  );
}