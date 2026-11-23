import { Dispatch, SetStateAction } from "react"

interface signInButtonProps {
    setAuthModalActive: Dispatch<SetStateAction<boolean>>
    authModalActive: boolean
    mode?: "open" | "submit";
}

async function submitForm(setAuthModalActive: Dispatch<SetStateAction<boolean>>) {
    setAuthModalActive(false)
}

export default function SignInButton({setAuthModalActive, authModalActive, mode = "open"}: signInButtonProps) {
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
            text-shadow-[0_0_1.125rem_var(--primaryBtnGlow)]
            shadow-[0_0_1.25rem_var(--primaryBtnGlow)]
            border-[0.125rem]
            border-[var(--primaryBtnBorder)]
            bg-transparent
            text-gray-100
            alterverseFont
            font-medium
            tracking-wider
            hover:translate-y-[0.4rem]
            duration-300
            cursor-pointer" >Sign In</button>
        </>
    )
}