"use client";

import { HiSquare3Stack3D } from "react-icons/hi2";
import { TbGavel } from "react-icons/tb";
import { BiSignal4 } from "react-icons/bi";
import { ReactNode, useEffect, useState } from "react";

import { useAnimationController } from "@/lib/animation controller/AnimationController";

interface cardProps {
    title: string;
    desc: ReactNode;
    icon: number;
}

// Independent atmospheric animation settings
const driftSettings = [
    {
        duration: 4500,
        delay: 0,
        x: 2,
        y: -5
    },
    {
        duration: 5200,
        delay: 750,
        x: -2,
        y: -4
    },
    {
        duration: 5800,
        delay: 1500,
        x: 1.5,
        y: -6
    }
];

export default function HeroActionCard({
    title,
    desc,
    icon
}: cardProps) {

    const [reverse, setReverse] = useState(true);

    // Choose animation settings based on the card
    const settings = driftSettings[
        Math.max(0, Math.min(icon - 1, driftSettings.length - 1))
    ];

    // Use your animation controller
    const [driftX, driftY] = useAnimationController({
        type: "ease",
        duration: settings.duration,
        reverse,
        endCoords: [settings.x, settings.y]
    });

    // Atmospheric animation loop
    useEffect(() => {

        const motionPreference = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        let startTimer: ReturnType<typeof setTimeout> | undefined;
        let loopTimer: ReturnType<typeof setInterval> | undefined;

        function stopTimers() {
            clearTimeout(startTimer);
            clearInterval(loopTimer);
        }

        function startAnimation() {

            stopTimers();

            if (motionPreference.matches) {
                setReverse(true);
                return;
            }

            // Stagger the beginning of each card
            startTimer = setTimeout(() => {

                setReverse(false);

                // Alternate animation direction
                loopTimer = setInterval(() => {
                    setReverse(previous => !previous);
                }, settings.duration);

            }, settings.delay);
        }

        startAnimation();

        motionPreference.addEventListener(
            "change",
            startAnimation
        );

        return () => {
            stopTimers();

            motionPreference.removeEventListener(
                "change",
                startAnimation
            );
        };

    }, [settings.duration, settings.delay]);

    return (
        <div
            className="
                flex
                flex-col
                w-47
                h-50
                mt-20
                gap-3
                actionCards
                will-change-transform
                motion-reduce:!transform-none
            "

            style={{
                transform: `
                    translate3d(
                        ${driftX}px,
                        ${driftY}px,
                        0
                    )
                `
            }}
        >

            {icon === 1
                ? (
                    <HiSquare3Stack3D
                        className="z-10 text-[var(--accent)] min-w-12 min-h-12"
                        size={48}
                    />
                )
                : icon === 2
                    ? (
                        <TbGavel
                            className="z-10 text-[var(--accent)] min-w-12 min-h-12"
                            size={48}
                        />
                    )
                    : (
                        <BiSignal4
                            className="z-10 text-[var(--accent)] min-w-12 min-h-12"
                            size={48}
                        />
                    )
            }

            <div
                className="
                    text-[1.65rem]
                    tracking-widest
                    z-10
                    text-gray-300
                    actionCardText
                    font-bold
                "
            >
                {title}
            </div>

            <div
                className="
                    text-[1.25rem]
                    z-10
                    tracking-wider
                    text-gray-300
                    font-light
                    actionCardText
                    leading-6.5
                "
            >
                {desc}
            </div>

        </div>
    );
}