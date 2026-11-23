"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useState } from "react";
import { useAnimationController } from "@/lib/animation controller/AnimationController";

interface characterProps {
    name: string
    genre: string
    born: number /* use performance.now */
    icon: string
    id: string
}
export const characters: characterProps[] = [
    {
        id: "0",
        name: "Vesper",
        genre: "Alt Rock / Dark Pop",
        born: 1795308515,
        icon: "/characterIcons/Vesper icon.png"
    },
    {
        id: "1",
        name: "Luna",
        genre: "Etherial / Dark Electronic",
        born: 1795313011,
        icon: "/characterIcons/Luna icon.png"
    },
    {
        id: "2",
        name: "Exios",
        genre: "Industrial / Cyberpunk",
        born: 1795313091,
        icon: "/characterIcons/Exios icon.png"
    },
    {
        id: "3",
        name: "Lavenda",
        genre: "Alternative R&B / Electronic",
        born: 1795313164,
        icon: "/characterIcons/Lavenda icon.png"
    }
]
export default function CharacterCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    breakpoints: {
        "(max-width: 64rem)": { axis: "x" },
    },
    loop: true,
    align: "start",
    });

    const [selectedCharacter, setSelectedCharacter] = useState("0");
    
    const [entranceProgress = 0] = useAnimationController({
            type: "easeOut",
            duration: 800,
            reverse: false,
            endCoords: [1],
          });
    


    return (
        <>
            <div style={{opacity: entranceProgress, transform: `translateX(${(1-entranceProgress)*16}px)`}} className="embla flex flex-col motion-reduce:!opacity-100 motion-reduce:!transform-none">
            <button type="button" aria-label="Previous characters" onClick={() => emblaApi?.scrollPrev()} className="cursor-pointer text-purple-300/70 hover:text-purple-300 hover:translate-y-[-0.2rem] transition-all duration-300">▲</button>
            <div className="embla__viewport p-5" ref={emblaRef}>
    <div className="embla__container z-10 pl-5">
        {characters.map((character) => (
                        <div
                            key={character.id}
                            className={`
                                embla__slide
                                shrink-0
                                rounded-xl
                                overflow-hidden
                                border
                                transition-all
                                hover:-translate-x-3
                                duration-300

                                ${
                                    selectedCharacter === character.id
                                        ? `
                                            opacity-100
                                            border-b-[var(--accent)]
                                            border-r-[var(--accent)]
                                            border-l-[var(--primaryBtnHighlight)]
                                            border-t-[var(--primaryBtnHighlight)]
                                            shadow-[0_0_20px_var(--primaryBtnGlow)]
                                        `
                                        : `
                                            opacity-60
                                            border-white/20
                                            hover:opacity-100
                                            hover:border-[var(--accent)]
                                            hover:shadow-[0_0_10px_var(--primaryBtnGlow)]
                                        `
                                }
                            `}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedCharacter(character.id)}
                                aria-label={`Select ${character.name}`}
                                aria-pressed={selectedCharacter === character.id}
                                className="block h-full w-full cursor-pointer"
                            >
                                <CharacterIcon character={character} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button type="button" aria-label="Next characters" onClick={() => emblaApi?.scrollNext()} className="cursor-pointer text-purple-300/70 hover:text-purple-300 hover:translate-y-[0.2rem] transition-all duration-300">▼</button>
            </div>
        </>
    )
}


export function CharacterIcon({
    character
}: {
    character: characterProps
}) {
    return (
        <>
            <Image src={character.icon} alt={character.name} width={80} height={80}/>
        </>
    )
}
