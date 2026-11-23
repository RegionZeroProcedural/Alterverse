"use client";

import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { useAnimationController } from "@/lib/animation controller/AnimationController";

const COLLAPSED_WIDTH = 40;
const COLLAPSED_HEIGHT = 40;
const EXPANDED_WIDTH = 200;
const EXPANDED_HEIGHT = 50;

export default function Search() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [query, setQuery] = useState("");

  // This is the *visible, animated search bar*, NOT its 200px hover hitbox.
  const barRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const expanded = hovered || pinned || query.trim().length > 0;

  const [animatedWidth = 0, animatedHeight = 0] = useAnimationController({
    type: "easeOut",
    duration: 500,
    reverse: !expanded,
    endCoords: [
      EXPANDED_WIDTH - COLLAPSED_WIDTH,
      EXPANDED_HEIGHT - COLLAPSED_HEIGHT,
    ],
  });

  // Diagnostic: record the state that actually controls the animation.
  useEffect(() => {
    console.log('[search state]', {
      hovered, pinned, query, expanded,
      timestamp: performance.now().toFixed(1),
    });
  }, [hovered, pinned, query, expanded]);

  // A document-level capture listener observes outside clicks even when
  // the input has focus. Do not treat the invisible hover hitbox as the bar.
  useEffect(() => {
    function handleOutsidePointerDown(event: PointerEvent) {
      const bar = barRef.current;
      const insideBar = !!bar && event.target instanceof Node && bar.contains(event.target);
      const inputValue = inputRef.current?.value ?? '';
      console.log('[search document pointerdown]', {
        target: event.target instanceof Element ? event.target.tagName + (event.target.className && typeof event.target.className === 'string' ? '.' + event.target.className.split(' ').filter(Boolean).slice(0, 2).join('.') : '') : String(event.target),
        insideBar,
        inputValue: JSON.stringify(inputValue),
        timestamp: performance.now().toFixed(1),
      });
      if (!bar || insideBar) return;
      if (inputValue.trim()) return;
      console.log('[search action] OUTSIDE CLOSE');

      // Clear BOTH reasons that might be holding the search open.
      setHovered(false);
      setPinned(false);
      inputRef.current?.blur();
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
  }, []);

  return (
    <div className="headerSearch relative z-50 ml-80 mt-5 h-[50px] w-[40px] shrink-0">
      {/* Stationary hover region: not used to decide inside/outside clicks. */}
      <div
        onPointerLeave={() => { console.log("[search trigger] hover-area LEAVE"); setHovered(false); }}
        className={`absolute right-0 top-0 h-[50px] w-[200px] ${
          expanded ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <SearchBar
          barRef={barRef}
          width={COLLAPSED_WIDTH + animatedWidth}
          height={COLLAPSED_HEIGHT + animatedHeight}
          expanded={expanded}
          value={query}
          inputRef={inputRef}
          onChange={setQuery}
          onIconEnter={() => { console.log("[search trigger] icon ENTER"); setHovered(true); }}
          onBarPointerDown={() => { console.log("[search trigger] bar POINTER DOWN -> PIN"); setPinned(true); }}
          onIconClick={() => {
            console.log("[search trigger] icon CLICK -> PIN + FOCUS");
            setPinned(true);
            inputRef.current?.focus();
          }}
          onInputFocus={() => { console.log("[search trigger] input FOCUS -> PIN"); setPinned(true); }}
          onEscape={() => {
            console.log("[search trigger] ESCAPE");
            setQuery("");
            setHovered(false);
            setPinned(false);
            inputRef.current?.blur();
          }}
        />
      </div>
    </div>
  );
}
