import { useAnimationController } from "@/lib/animation controller/AnimationController";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import { Dispatch, SetStateAction } from "react";
import { HiCubeTransparent } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";

interface authProps {
    authModalActive: boolean
    setAuthModalActive: Dispatch<SetStateAction<boolean>>
}

export default function AuthModal({authModalActive, setAuthModalActive}: authProps) {

    const [animatedOpacity = 0] = useAnimationController({
        type: "ease",
        duration: 500,
        reverse: !authModalActive,
        endCoords: [1],
    });
    
    return(
        <>  
            <div
            style={{
                opacity: animatedOpacity*0.75,
                pointerEvents: authModalActive ? "auto" : "none",
            }}
            aria-hidden={!authModalActive}
            inert={!authModalActive}
            className="authLayer"
            >
                <div role="dialog" aria-modal="true" aria-label="Welcome to Alterverse" className="authPanel">
                <button
                type="button"
                aria-label="Close authentication modal"
                onClick={() => setAuthModalActive(false)}
                className="
                    absolute
                    z-250
                    w-8
                    h-8
                    grid
                    place-items-center
                    cursor-pointer
                    text-gray-200
                    hover:text-white
                    transition-colors
                    duration-200
                    cursor-pointer
                    rounded-full
                "
            >
                <IoMdCloseCircle
                    className="w-8 h-8"
                />
            </button>
                <div className="shadow-[0_0_35px_#7828c255] z-101 flex place-items-center w-80 h-130 bg-[image:var(--primaryBtnBg)] opacity-60 blur-sm rounded-2xl border-6 border-[var(--primaryBtnHighlight)]">
                </div>
                <div className="absolute z-102 w-70 h-100 bg-[#5900ff] opacity-20 blur-3xl rounded-2xl">
                
                </div>
                <div className="absolute z-102 w-60 h-90 bg-[#000000] opacity-40 blur-xl rounded-2xl">
                
                </div>
                <div className="absolute z-102 w-40 h-65 bg-[#000000] opacity-40 blur-lg rounded-2xl">
                
                </div>
                <div className="authContent z-200 gap-7 flex flex-col absolute w-70 h-120">
                    <HiCubeTransparent className="text-[var(--accent2)] self-center w-40 h-40 mt-7"/>
                    <div className="text-[var(--primaryBtnBorder)] blur-[0.6px] text-[1.4rem] scale-y-125 w-80 font-bold">WELCOME TO ALTERVERSE</div>
                    <input className="bg-[#090a13]/40
                                border border-[#ca7afb]/40
                                rounded-md
                                h-8
                                px-3
                                text-white
                                placeholder:text-[#d4c5e8]
                                focus:border-[var(--primaryBtnHighlight)]
                                focus:outline-none" type="text" placeholder="Username/E-mail"/>
                    <input className="bg-[#090a13]/40
                                border border-[#ca7afb]/40
                                rounded-md
                                h-8
                                px-3
                                text-white
                                placeholder:text-[#d4c5e8]
                                focus:border-[var(--primaryBtnHighlight)]
                                focus:outline-none" type="password" placeholder="Password"/>
                    <div className="flex flex-row gap-5">
                        <SignInButton authModalActive = {authModalActive} setAuthModalActive={setAuthModalActive} mode="submit"/>
                        <SignUpButton authModalActive = {authModalActive} setAuthModalActive={setAuthModalActive} mode="submit"/>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
