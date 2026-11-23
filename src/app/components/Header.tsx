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
            <header className="siteHeader">
                <Logo />
                <Nav />
                <Search />
                <AccountArea setAuthModalActive = {setAuthModalActive} authModalActive = {authModalActive}/>
            </header>
        </>
    )
}
