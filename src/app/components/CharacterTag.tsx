import { useAnimationController } from "@/lib/animation controller/AnimationController";
import { GiSoundWaves } from "react-icons/gi";

interface characterProps {
    character: characterProps
    name: string
    genre: string
    born: number /* use performance.now */
    icon: string
    id: string
    
}

export default function CharacterTag({character}: characterProps) {
    
    const [animatedWidth = 0, animatedHeight = 0] = useAnimationController({
        type: "easeOut",
        duration: 800,
        reverse: false,
        endCoords: [
          22,
          0,
        ],
      });

    return (
        <div style={{transform: `translateX(${22-animatedWidth}rem)`}} className="fixed bottom-8 right-8 z-100 overflow-visible">
            <div className="flex flex-row w-68 h-16 bg-[#020202dd] rounded-r-lg translate-y-[-10rem] mr-5 overflow-visible">
                <div className="w-1 bg-[var(--primaryBtnHighlight)] blur-[1.3px] h-full shadow-[0_0_15px_var(--accent)]" />
                <div className="flex flex-col text-gray-100 z-200 ml-5 justify-center">
                    <div className="text-[1.2rem] tracking-[0.3rem]">
                        {character.name.toUpperCase()}
                    </div>
                    <div className="font-light tracking-widest">
                        {character.genre}
                    </div>
                </div>
                <GiSoundWaves className="self-center ml-5 w-10 h-10 text-gray-100"/>
            </div>
        </div>
    );
}