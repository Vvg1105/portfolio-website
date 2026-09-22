"use client";

import { useEffect } from "react";

/**
 * Fades sections in as they scroll into view.
 *
 * The hiding is armed by an inline script in the root layout (before first
 * paint, so nothing flashes) and only when the browser supports
 * IntersectionObserver and the visitor hasn't asked for reduced motion.
 * If neither is true the content simply renders visible and this does nothing.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    // Tell the layout's safety timeout that we made it.
    root.setAttribute("data-reveal-ready", "true");

    if (root.getAttribute("data-reveal") !== "on") return;

    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (!nodes.length) {
      root.removeAttribute("data-reveal");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
