import { Dispatch, SetStateAction } from "react"

interface signUpButtonProps {
    setAuthModalActive: Dispatch<SetStateAction<boolean>>
    authModalActive: boolean
    mode?: "open" | "submit";
}

async function submitForm(setAuthModalActive: Dispatch<SetStateAction<boolean>>) {
    setAuthModalActive(false)
}

export default function SignUpButton({setAuthModalActive, authModalActive, mode }: signUpButtonProps) {
    return (
        <>
        <button 
            type={mode === "submit" ? "submit" : "button"}
            onClick={
                mode === "open"
                    ? () => setAuthModalActive(true)
                    : () => submitForm(setAuthModalActive)
            }
            className=" 
            w-35
            h-13
            relative
            rounded-xl
            bg-[image:var(--signUpBtnBg)]
            shadow-[0_0_1.25rem_var(--primaryBtnGlow)]
            border-[0.125rem]
            border-[var(--primaryBtnBorder)]
            alterverseFont
            font-medium
            tracking-wider
            hover:translate-y-[0.4rem]
            duration-300
            cursor-pointer" >Sign Up</button>
        </>
    )
}