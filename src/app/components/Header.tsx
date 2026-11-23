"use client";

import Logo from "./Logo";
import Nav from "./Nav";
import Search from "./Search";
import AccountArea from "./AccountArea";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

interface headerProps {
    setAuthModalActive: Dispatch<SetStateAction<boolean>>
    authModalActive: boolean
}

export default function Header({setAuthModalActive, authModalActive}: headerProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const drawerRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const drawer = drawerRef.current;

        if (!menuOpen) {
            if (drawer?.open) drawer.close();
            return;
        }

        if (drawer && !drawer.open) drawer.showModal();

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen]);

    useEffect(() => {
        const mobileViewport = window.matchMedia("(max-width: 64rem)");
        const closeOnDesktop = () => {
            if (!mobileViewport.matches) setMenuOpen(false);
        };

        mobileViewport.addEventListener("change", closeOnDesktop);
        return () => mobileViewport.removeEventListener("change", closeOnDesktop);
    }, []);

    return(
        <>
            <header className="siteHeader">
                <Logo />
                <div className="desktopNav mr-40">
                    <Nav />
                </div>
                <Search />
                <AccountArea setAuthModalActive = {setAuthModalActive} authModalActive = {authModalActive}/>
                <button
                    type="button"
                    className="mobileNavToggle"
                    aria-label="Open navigation menu"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    aria-haspopup="dialog"
                    onClick={() => setMenuOpen(true)}
                >
                    <IoMenu aria-hidden="true" />
                </button>
            </header>
            <dialog
                ref={drawerRef}
                id="mobile-navigation"
                className="mobileNavDrawer"
                aria-labelledby="mobile-navigation-title"
                onClose={() => setMenuOpen(false)}
                onKeyDown={(event) => {
                    if (event.key !== "Tab") return;
                    const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
                    const first = controls[0];
                    const last = controls[controls.length - 1];
                    if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last?.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first?.focus();
                    }
                }}
                onClick={(event) => {
                    if (event.target !== event.currentTarget) return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    if (event.clientX < bounds.left || event.clientX > bounds.right ||
                        event.clientY < bounds.top || event.clientY > bounds.bottom) {
                        setMenuOpen(false);
                    }
                }}
            >
                <div className="mobileNavHeading">
                    <span id="mobile-navigation-title">EXPLORE ALTERVERSE</span>
                    <button
                        type="button"
                        className="mobileNavClose"
                        aria-label="Close navigation menu"
                        onClick={() => setMenuOpen(false)}
                    >
                        <IoClose aria-hidden="true" />
                    </button>
                </div>
                <Nav ariaLabel="Mobile navigation" onNavigate={() => setMenuOpen(false)} />
            </dialog>
        </>
    )
}
