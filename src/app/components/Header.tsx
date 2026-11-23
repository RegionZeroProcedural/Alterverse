import Logo from "./Logo";
import Nav from "./Nav";
import Search from "./Search";
import AccountArea from "./AccountArea";
import { Dispatch, SetStateAction } from "react";

interface headerProps {
    setAuthModalActive: Dispatch<SetStateAction<boolean>>
    authModalActive: boolean
}

export default function Header({setAuthModalActive, authModalActive}: headerProps) {
    return(
        <>
            <div className="flex flex-row absolute z-50 w-full h-[var(--headerHeight)] bg-linear-to-t from-[var(--headerShadow)]/1 to-[var(--headerShadow)]/100">
                <Logo />
                <Nav />
                <Search />
                <AccountArea setAuthModalActive = {setAuthModalActive} authModalActive = {authModalActive}/>
            </div>
        </>
    )
}