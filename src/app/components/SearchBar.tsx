"use client";

import type { RefObject } from "react";
import { IoSearch } from "react-icons/io5";

type SearchBarProps = {
  barRef: RefObject<HTMLDivElement | null>;
  width: number;
  height: number;
  expanded: boolean;
  value: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  onIconEnter: () => void;
  onBarPointerDown: () => void;
  onIconClick: () => void;
  onInputFocus: () => void;
  onEscape: () => void;
};

export default function SearchBar({
  barRef,
  width,
  height,
  expanded,
  value,
  inputRef,
  onChange,
  onIconEnter,
  onBarPointerDown,
  onIconClick,
  onInputFocus,
  onEscape,
}: SearchBarProps) {
  const progress = Math.min(Math.max((width - 40) / 160, 0), 1);
  const inputOpacity = Math.min(Math.max((progress - 0.25) / 0.75, 0), 1);

  return (
    <div
      ref={barRef}
      onPointerDown={onBarPointerDown}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onEscape();
        }
      }}
      className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/20 bg-[#090a13]/90 shadow-[0_0_18px_#ae5efa33] backdrop-blur-md"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <input
        ref={inputRef}
        type="search"
        aria-label="Search"
        placeholder="Search..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onInputFocus}
        tabIndex={expanded ? 0 : -1}
        className="absolute inset-y-0 left-0 w-[calc(100%-40px)] bg-transparent pl-4 text-sm text-white outline-none placeholder:text-gray-400"
        style={{
          opacity: inputOpacity,
          pointerEvents: expanded ? "auto" : "none",
        }}
      />

      <button
        type="button"
        aria-label={expanded ? "Focus search" : "Open search"}
        aria-expanded={expanded}
        onPointerEnter={onIconEnter}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onIconClick}
        className="absolute inset-y-0 right-0 flex w-[40px] cursor-pointer items-center justify-center text-gray-200 hover:text-white"
      >
        <IoSearch size={24} aria-hidden="true" />
      </button>
    </div>
  );
}
