"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { getProjectBySlug, projects } from "@/lib/projectData";

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded font-mono"
      style={{ background: "rgba(255,255,255,0.04)", color: "#909090", border: "1px solid #2a2a2a" }}>
      {label}
    </span>
  );
}

function ImagePlaceholder({ index }: { index: number }) {
  return (
    <div className="aspect-video rounded-lg flex items-center justify-center text-center p-4"
      style={{ background: "#0f0f0f", border: "2px dashed #1f1f1f" }}>
      <div>
        <svg className="w-8 h-8 mx-auto mb-2" style={{ color: "#2a2a2a" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
        </svg>
        <p className="text-xs font-mono" style={{ color: "#3f3f46" }}>Image {index + 1}</p>
        <p className="text-xs mt-1" style={{ color: "#2a2a2a" }}>Add your photo here</p>
      </div>
    </div>
  );
}

function LinkedInPostCard({ url, preview }: { url: string; preview: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-lg transition-all group"
      style={{ background: "#0f0f0f", border: "1px solid #1f1f1f" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "#383838")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "#1f1f1f")}>
      <div className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #2a2a2a" }}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#707070" }}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium mb-1" style={{ color: "#606060" }}>LinkedIn Post</p>
        <p className="text-sm leading-relaxed" style={{ color: "#c0c0c0" }}>{preview}</p>
        <p className="text-xs mt-2 transition-colors" style={{ color: "#707070" }}>View on LinkedIn →</p>
      </div>
    </a>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const categoryColors: Record<string, string> = {
    research: "#818cf8",
    hackathon: "#f59e0b",
    tool: "#22c55e",
    ml: "#e879f9",
    ai: "#38bdf8",
  };

  const placeholderCount = project.images.length > 0 ? 0 : 3;

  return (
    <main className="min-h-screen pt-20 pb-24" style={{ position: "relative", zIndex: 1 }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Back button */}
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: "#52525b" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
          onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          Back to projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded font-mono capitalize"
              style={{
                background: `${categoryColors[project.category]}18`,
                color: categoryColors[project.category],
                border: `1px solid ${categoryColors[project.category]}30`,
              }}>
              {project.category}
            </span>
            <span className="text-xs font-mono" style={{ color: "#52525b" }}>{project.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{project.name}</h1>
          <p className="text-lg" style={{ color: "#a0a0a0" }}>{project.tagline}</p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.map(t => <Tag key={t} label={t} />)}
        </div>

        {/* External links */}
        {(project.github || project.devpost || project.liveUrl) && (
          <div className="flex flex-wrap gap-3 mb-10">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
                style={{ border: "1px solid #2a2a2a", color: "#71717a" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(34,197,94,0.3)"; el.style.color = "#4ade80"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#2a2a2a"; el.style.color = "#71717a"; }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
            {project.devpost && (
              <a href={project.devpost} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
                style={{ border: "1px solid #2a2a2a", color: "#71717a" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(34,197,94,0.3)"; el.style.color = "#4ade80"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#2a2a2a"; el.style.color = "#71717a"; }}>
                🏅 Devpost
              </a>
            )}
          </div>
        )}

        {/* Image gallery */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 font-mono" style={{ color: "#52525b" }}>Gallery</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {project.images.map((img, i) => (
              <img key={i} src={img.src} alt={img.alt}
                className="w-full aspect-video object-cover rounded-lg"
                style={{ border: "1px solid #1f1f1f" }} />
            ))}
            {Array.from({ length: placeholderCount }).map((_, i) => (
              <ImagePlaceholder key={i} index={i} />
            ))}
          </div>
          {placeholderCount > 0 && (
            <p className="text-xs mt-3 font-mono" style={{ color: "#3f3f46" }}>
              Add images to <code className="text-green-500/60">src/lib/projectData.ts</code> → <code className="text-green-500/60">{project.slug}.images</code>
            </p>
          )}
        </div>

        {/* Long description */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 font-mono" style={{ color: "#52525b" }}>About</h2>
          <div className="rounded-lg p-6" style={{ background: "#0f0f0f", border: "1px solid #1f1f1f" }}>
            {project.longDescription.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm leading-relaxed mb-4 last:mb-0" style={{ color: "#c0c0c0" }}>{para}</p>
            ))}
          </div>
        </div>

        {/* LinkedIn posts */}
        {project.linkedinPosts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 font-mono" style={{ color: "#52525b" }}>Posts</h2>
            <div className="space-y-3">
              {project.linkedinPosts.map((post, i) => (
                <LinkedInPostCard key={i} {...post} />
              ))}
            </div>
          </div>
        )}

        {/* Other projects */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 font-mono" style={{ color: "#52525b" }}>More Projects</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {projects.filter(p => p.slug !== slug && p.hasDetailPage).slice(0, 4).map(p => (
              <Link key={p.slug} href={`/projects/${p.slug}`}
                className="rounded-lg p-4 transition-all group"
                style={{ background: "#0f0f0f", border: "1px solid #1f1f1f" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#383838")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1f1f1f")}>
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-white/80 transition-colors">{p.name}</h3>
                <p className="text-xs" style={{ color: "#909090" }}>{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
