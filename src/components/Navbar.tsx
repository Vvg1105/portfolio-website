"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HOME_LINKS = ["About", "Experience", "Projects", "Awards", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hrefFor = (anchor: string) =>
    isHome ? `#${anchor.toLowerCase()}` : `/#${anchor.toLowerCase()}`;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? { background: "rgba(10,10,10,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a" } : {}}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-mono font-bold text-sm tracking-widest transition-colors" style={{ color: "#22c55e" }}>
          VG<span style={{ color: "#fff" }}>.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {isHome && HOME_LINKS.map((l) => (
            <a key={l} href={hrefFor(l)} className="text-sm font-medium transition-colors" style={{ color: "#71717a" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
              onMouseLeave={e => (e.currentTarget.style.color = "#71717a")}>
              {l}
            </a>
          ))}
          {!isHome && (
            <Link href="/" className="text-sm font-medium transition-colors flex items-center gap-1" style={{ color: "#71717a" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
              onMouseLeave={e => (e.currentTarget.style.color = "#71717a")}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Home
            </Link>
          )}
          <Link href="/life"
            className="text-sm font-medium transition-colors"
            style={{ color: pathname === "/life" ? "#22c55e" : "#71717a" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
            onMouseLeave={e => (e.currentTarget.style.color = pathname === "/life" ? "#22c55e" : "#71717a")}>
            Life
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden transition-colors" style={{ color: "#71717a" }}
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3"
          style={{ background: "rgba(10,10,10,0.96)", borderBottom: "1px solid #1a1a1a" }}>
          {isHome && HOME_LINKS.map((l) => (
            <a key={l} href={hrefFor(l)} onClick={() => setMenuOpen(false)}
              className="text-sm py-1 transition-colors" style={{ color: "#71717a" }}>{l}</a>
          ))}
          {!isHome && (
            <Link href="/" onClick={() => setMenuOpen(false)}
              className="text-sm py-1 transition-colors" style={{ color: "#71717a" }}>← Home</Link>
          )}
          <Link href="/life" onClick={() => setMenuOpen(false)}
            className="text-sm py-1 transition-colors" style={{ color: pathname === "/life" ? "#22c55e" : "#71717a" }}>
            Life
          </Link>
        </div>
      )}
    </nav>
  );
}
