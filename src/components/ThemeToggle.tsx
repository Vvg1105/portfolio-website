"use client";

import { useSyncExternalStore } from "react";

const root = () =>
  typeof document === "undefined" ? null : document.documentElement;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const isDark = () => root()?.getAttribute("data-theme") === "dark";

// The server can't know the visitor's theme. The inline script in the root
// layout sets data-theme before first paint and CSS positions the knob from
// it, so this only affects the ARIA state for one render.
const isDarkOnServer = () => false;

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, isDarkOnServer);

  const toggle = () => {
    const el = root();
    if (!el) return;
    const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
    el.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — theme just won't persist */
    }
  };

  return (
    <button
      type="button"
      className="toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
    >
      <span />
    </button>
  );
}
