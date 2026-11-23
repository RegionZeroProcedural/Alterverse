import SignUpButton from "./SignUpButton";
import SignInButton from "./SignInButton";
import { Dispatch, SetStateAction } from "react";

interface accountAreaProps {
    setAuthModalActive: Dispatch<SetStateAction<boolean>>;
    authModalActive: boolean
}

export default function AccountArea({setAuthModalActive, authModalActive}: accountAreaProps) {
    return(
        <>
            <div className="flex flex-row gap-5 pt-4 ml-8">
                <SignInButton setAuthModalActive = {setAuthModalActive} authModalActive = {authModalActive} mode="open"/>
                <SignUpButton setAuthModalActive = {setAuthModalActive} authModalActive = {authModalActive} mode="open"/>
            </div>
        </>
    )
}