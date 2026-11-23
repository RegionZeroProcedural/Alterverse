"use client";

import Header from "./components/Header";
import BackgroundImg from "./components/BackgroundImg";
import Hero from "./components/Hero";
import {useState} from "react";
import AuthModal from "./components/AuthModal";

export default function Home() {
  const [authModalActive, setAuthModalActive] = useState(false);

  return (
    <>
      <AuthModal authModalActive={authModalActive} setAuthModalActive={setAuthModalActive}/>
      <Header setAuthModalActive = {setAuthModalActive} authModalActive = {authModalActive} />
      <BackgroundImg />
      <main className="heroLayout">
        <Hero />
      </main>
    </>
  );
}
