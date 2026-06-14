"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon: string }) {
  return (
    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <span className="flex items-center gap-3">
        <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: "#22c55e" }} />
        {children}
      </span>
    </h2>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="aspect-video rounded-lg flex items-center justify-center text-center p-4"
      style={{ background: "#0f0f0f", border: "2px dashed #1f1f1f" }}>
      <div>
        <svg className="w-7 h-7 mx-auto mb-2" style={{ color: "#2a2a2a" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
        </svg>
        <p className="text-xs font-mono" style={{ color: "#3f3f46" }}>{label}</p>
      </div>
    </div>
  );
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg p-4 text-center" style={{ background: "#0f0f0f", border: "1px solid #1f1f1f" }}>
      <div className="text-lg font-bold" style={{ color: "#e0e0e0" }}>{value}</div>
      <div className="text-xs mt-0.5" style={{ color: "#606060" }}>{label}</div>
    </div>
  );
}

// ── Drums Section ──────────────────────────────────────────────────────────────

function Drums() {
  const { ref, visible } = useFadeIn();
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <div ref={ref} className="transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)" }}>
        <SectionTitle icon="🥁">Drums</SectionTitle>

        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#c0c0c0" }}>
              I&apos;ve been drumming seriously since I was a kid — completed all 8 grades of the Trinity College Rock &amp; Pop syllabus for drumkit and I&apos;m currently preparing for the ATCL diploma (undergraduate-level). I&apos;ve performed at venues and events across the UAE.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#c0c0c0" }}>
              At Stanford, I&apos;ve been exploring the intersection of music and AI — experimenting with generative tools like Suno while keeping one foot firmly in the physical side: real kit, real sound.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <StatBadge value="8" label="Trinity grades" />
              <StatBadge value="ATCL" label="Next milestone" />
              <StatBadge value="10+" label="Years playing" />
            </div>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-3">
            <ImagePlaceholder label="Live performance" />
            <ImagePlaceholder label="Kit setup" />
            <ImagePlaceholder label="Band shot" />
            <ImagePlaceholder label="Backstage" />
          </div>
        </div>

        {/* LinkedIn post placeholder */}
        <div className="rounded-lg p-4 flex items-start gap-4"
          style={{ background: "#0f0f0f", border: "1px dashed #2a2a2a" }}>
          <div className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center"
            style={{ background: "rgba(34,197,94,0.06)", border: "1px solid #1f1f1f" }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#3f3f46" }}>
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-mono mb-1" style={{ color: "#3f3f46" }}>LinkedIn Post</p>
            <p className="text-sm" style={{ color: "#52525b" }}>Add a link to your band/performance post here.</p>
            <p className="text-xs mt-1 font-mono" style={{ color: "#2a2a2a" }}>→ projectData or life/page.tsx</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Poker Section ──────────────────────────────────────────────────────────────

function Poker() {
  const { ref, visible } = useFadeIn();
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <div ref={ref} className="transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)" }}>
        <SectionTitle icon="🃏">Poker</SectionTitle>

        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#c0c0c0" }}>
              Selected for the <span style={{ color: "#f0f0f0" }}>SoCal College Poker Tournament</span> — 120 students across the U.S., sponsored by Jane Street, HRT, Citadel, and Jump Trading. Also competed at the <span style={{ color: "#f0f0f0" }}>Stanford × Berkeley College Poker Invitational</span>.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#c0c0c0" }}>
              Poker has sharpened how I think about probabilistic reasoning, expected value, and decision-making under uncertainty — skills that transfer directly to research and engineering.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <StatBadge value="120" label="SoCal field size" />
              <StatBadge value="2×" label="Invitationals" />
            </div>
            {/* Sponsors */}
            <div className="mt-5">
              <p className="text-xs font-mono mb-2" style={{ color: "#3f3f46" }}>Tournament sponsors</p>
              <div className="flex flex-wrap gap-2">
                {["Jane Street", "HRT", "Citadel", "Jump Trading"].map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ background: "rgba(255,255,255,0.04)", color: "#909090", border: "1px solid #2a2a2a" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ImagePlaceholder label="Tournament" />
            <ImagePlaceholder label="Table shot" />
            <div className="col-span-2">
              <ImagePlaceholder label="Stanford × Berkeley Invitational" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Tennis Section ─────────────────────────────────────────────────────────────

function Tennis() {
  const { ref, visible } = useFadeIn();
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <div ref={ref} className="transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)" }}>
        <SectionTitle icon="🎾">Tennis</SectionTitle>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#c0c0c0" }}>
              Regular participant in UAE Tennis Federation matches. Reached a highest national ranking of <span style={{ color: "#f0f0f0" }}>#44 in the UAE U18 Male category (2022)</span> and won multiple junior tournaments across age groups.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <StatBadge value="#44" label="UAE U18 ranking" />
              <StatBadge value="5+" label="Tournament wins" />
            </div>
            <div className="mt-5 space-y-2">
              {[
                "FuturePro U18 & U16",
                "SuperSports U14 (×2)",
                "Advantage Sports U12",
              ].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm" style={{ color: "#a0a0a0" }}>
                  <span style={{ color: "#555555" }}>›</span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ImagePlaceholder label="Match shot" />
            <ImagePlaceholder label="Tournament" />
            <div className="col-span-2">
              <ImagePlaceholder label="Award ceremony" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────

function LifeHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  return (
    <section className="pt-28 pb-10 px-6 max-w-5xl mx-auto">
      <div className="transition-all duration-700"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)" }}>
        <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "#22c55e" }}>Outside the lab</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Life</h1>
        <p className="text-base max-w-lg" style={{ color: "#71717a" }}>
          I drum, play poker, and compete in tennis. Here&apos;s a window into everything that&apos;s not on the resume.
        </p>
      </div>
    </section>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────

export default function LifePage() {
  return (
    <main className="min-h-screen" style={{ position: "relative", zIndex: 1 }}>
      {/* Back link */}
      <div className="fixed top-4 left-5 z-50">
        <Link href="/"
          className="flex items-center gap-1.5 text-xs font-mono transition-colors px-3 py-1.5 rounded"
          style={{ color: "#555", border: "1px solid #1e1e1e", background: "rgba(6,6,6,0.8)", backdropFilter: "blur(8px)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#aaa"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#555"; }}>
          ← home
        </Link>
      </div>
      <LifeHero />
      <div style={{ borderTop: "1px solid #1a1a1a" }} className="max-w-5xl mx-auto" />
      <Drums />
      <div style={{ borderTop: "1px solid #1a1a1a" }} className="max-w-5xl mx-auto" />
      <Poker />
      <div style={{ borderTop: "1px solid #1a1a1a" }} className="max-w-5xl mx-auto" />
      <Tennis />
      <footer className="text-center py-5 mt-10" style={{ borderTop: "1px solid #141414" }}>
        <p className="text-xs font-mono" style={{ color: "#2a2a2a" }}>© 2026 Vansh Gadhia</p>
      </footer>
    </main>
  );
}
