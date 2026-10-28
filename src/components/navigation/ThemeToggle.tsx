"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const root = () => document.documentElement;
const readTheme = (): Theme => (root().dataset.theme === "dark" ? "dark" : "light");
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

/** Theme switch with a top-down "page turn" wipe where View Transitions exist. */
export function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  // The boot script sets data-theme before paint; the server snapshot is unknown (null).
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      root().dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) document.startViewTransition(apply);
    else apply();
  };

  const label = theme === "dark" ? toLight : toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="hover:text-accent -m-2.5 grid size-10 place-items-center transition-colors md:size-9"
    >
      <svg
        viewBox="0 0 16 16"
        className="size-4 transition-transform duration-700 ease-(--ease-editorial) [[data-theme=dark]_&]:rotate-180"
        aria-hidden
      >
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  );
}
