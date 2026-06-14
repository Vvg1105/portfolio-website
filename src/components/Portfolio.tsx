"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projectData";

/* ══════════════════════ DATA ══════════════════════ */

const person = {
  name: "Vansh Gadhia",
  headline: "EECS @ Stanford",
  subheadline: "Researcher · Builder · RISE Global Fellow",
  email: "vanshg@stanford.edu",
  linkedin: "https://linkedin.com/in/vansh-gadhia/",
  github: "https://github.com/Vvg1105",
  avatar: "https://avatars.githubusercontent.com/u/70324382?v=4",
  bio: "First-year EECS student at Stanford working at the intersection of AI, hardware, and global health. I build things that matter — from real-time NLP pipelines and medical devices to hackathon winners and social ventures. RISE Global Fellow (Schmidt Futures & Rhodes Trust). Top 50 Chegg Global Student Prize. 2× published researcher.",
};

const education = [
  {
    school: "Stanford University",
    degree: "B.S. Electrical Engineering & Math",
    gpa: "3.7",
    dates: "Sep 2024 – Present",
    location: "Stanford, CA",
    courses: ["Circuits", "Digital System Design", "Medical Device Innovation", "Machine Learning", "Linear Algebra", "Programming Abstractions"],
  },
  {
    school: "Dubai College",
    degree: "A-Levels · All A*/A*",
    dates: "Sep 2017 – June 2024",
    location: "Dubai, UAE",
    notes: "GCSE School Topper · World Topper in GCSE History · AP CS A, Calc BC, Psychology (all 5s)",
  },
];

const experience = [
  {
    company: "Krishnan Lab, Stanford University",
    title: "Undergraduate Researcher — Biohybrid Cell Therapy",
    dates: "Sep 2025 – Present",
    location: "Stanford, CA",
    bullets: [
      "Designing a mechanically robust macroencapsulation device for living cell therapeutics, integrating microcapsule immunoisolation with a 3D-printed porous chassis optimized for long-term subcutaneous implantation",
      "Led parametric CAD development in Fusion 360 to optimize pore geometry, lattice spacing, and wall thickness",
    ],
  },
  {
    company: "Ruya AI",
    title: "AI/NLP Engineering Intern",
    dates: "Jul 2025 – Sep 2025",
    location: "Dubai, UAE",
    bullets: [
      "Built modular real-time pipeline detecting major global events by ingesting news, Twitter, and Reddit via FastAPI, Airflow, and PostgreSQL with async rate-limiting and semantic deduplication",
      "Designed LangChain multi-agent system for event summarization, sentiment classification, and tweet generation using Sentence-BERT and KeyBERT",
    ],
  },
  {
    company: "Stanford King Center on Global Development",
    title: "Undergraduate Research Fellow",
    dates: "Jan 2025 – Dec 2025",
    location: "Stanford, CA",
    bullets: [
      "Researched stroke epidemiology and biomarker determinants to advance equitable care in Kenyan populations under Prof. Ngaruiya",
      "Presented at Stanford's Global Development Research Symposium; undertook fully funded field research in Kenya",
    ],
  },
  {
    company: "Lions Diabetes Care & Lions SightFirst Eye Hospital",
    title: "Lead Investigator",
    dates: "Nov 2021 – Dec 2023",
    location: "Nairobi, Kenya",
    bullets: [
      "Secured IRB approval from Kenyatta University Ethics Review Committee; interviewed 500+ participants across diverse tribal regions",
      "Built ML pipeline (Python, scikit-learn, XGBoost, Pandas) predicting Type 2 Diabetes risk; identified novel correlations between tribal ethnicity and prevalence",
    ],
  },
  {
    company: "Yale Medicine",
    title: "Clinical Research Assistant",
    dates: "Apr 2023 – Dec 2023",
    location: "New Haven, CT",
    bullets: [
      "First-author publication in Yale Journal of Biology and Medicine (March 2024) on SNPs elevating gestational diabetes risk in sub-Saharan Africa",
    ],
  },
  {
    company: "Clinical AI Lab — NYUAD & Cleveland Clinic",
    title: "AI Research Assistant",
    dates: "Sep 2021 – May 2022",
    location: "Abu Dhabi, UAE",
    bullets: [
      "Developed ML models under Prof. Farah Shamout to predict urinary tract infections, minimising antibiotic overprescription",
      "Published in British Medical Journal: Health & Care Informatics (2022, Vol 29, Suppl 1)",
    ],
  },
];

const awards = [
  { title: "RISE Global Fellow", org: "Schmidt Futures & Rhodes Trust", year: "2023 – Present", description: "Top 100 globally from 14,000+ applicants. Oxford summit; collaborated with Think of Us to build AI chatbot for California homeless healthcare systems.", badge: "🌍" },
  { title: "VP of Hackspace", org: "BASES @ Stanford", year: "Apr 2025 – Present", description: "Selected from 300+ (30 chosen). Leads weekly hacker hours, hackathons, faculty speaker series, and Demo Day with Builder Grants.", badge: "⚡" },
  { title: "Chegg.org Global Student Prize — Top 50", org: "The Varkey Foundation & Chegg.org", year: "2023", description: "Selected from 3,851 global applicants. Top 50 student changemakers for equitable health access in Kenya.", badge: "🏆" },
  { title: "Global Advisory Board Member", org: "Safe Engage Foundation", year: "Sep 2024 – Present", description: "Board member of Kenyan NGO dedicated to empowerment, protection, and development of children and adolescents.", badge: "🤝" },
  { title: "Founder — Old Frames for New Eyes", org: "Diana Award Roll of Honour", year: "2017 – 2019", description: "Vision screening for 63,000+ children; 500 tailor-made glasses; 25 sight-restoring surgeries. Featured by Dubai TV & Gulf News.", badge: "👁" },
];

/* ══════════════════════ TYPES ══════════════════════ */

type SectionId = "about" | "experience" | "projects" | "awards" | "life";

const HOTSPOTS: {
  id: SectionId; label: string; partNum: string; hint: string;
  pins: number; x: string; y: string;
}[] = [
  { id: "about",      label: "ABOUT",      partNum: "VG-001A", hint: "background · education",   pins: 4, x: "13%", y: "27%" },
  { id: "experience", label: "EXPERIENCE", partNum: "VG-002B", hint: "research · internships",   pins: 3, x: "79%", y: "22%" },
  { id: "projects",   label: "PROJECTS",   partNum: "VG-003C", hint: "things i've built",        pins: 3, x: "18%", y: "72%" },
  { id: "awards",     label: "AWARDS",     partNum: "VG-004D", hint: "recognition · leadership", pins: 2, x: "81%", y: "67%" },
  { id: "life",       label: "LIFE",       partNum: "VG-005E", hint: "drums · poker · tennis",   pins: 2, x: "55%", y: "81%" },
];

/* ══════════════════════ SHARED SUB-COMPONENTS ══════════════════════ */

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded font-mono"
      style={{ background: "rgba(255,255,255,0.04)", color: "#888", border: "1px solid #2a2a2a" }}>
      {label}
    </span>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <p className="text-xs font-mono uppercase tracking-[0.22em] mb-4" style={{ color: "rgba(34,211,238,0.45)" }}>
      {title}
    </p>
  );
}

function EmailReveal() {
  const [state, setState] = useState<"hidden" | "revealed">("hidden");
  const [copied, setCopied] = useState(false);
  const [hov, setHov] = useState(false);
  const email = "vanshg@stanford.edu";

  const handleClick = async () => {
    if (state === "hidden") { setState("revealed"); return; }
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <button onClick={handleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-2.5 px-4 py-2 rounded-md text-sm font-mono cursor-pointer"
      style={{
        background: hov ? "rgba(34,211,238,0.10)" : "rgba(34,211,238,0.05)",
        border: `1px solid rgba(34,211,238,${hov ? 0.55 : 0.25})`,
        color: `rgba(34,211,238,${hov ? 1 : 0.75})`,
        boxShadow: hov ? "0 0 16px rgba(34,211,238,0.12), 0 0 4px rgba(34,211,238,0.08)" : "none",
        transition: "all 0.2s ease",
      }}>
      {/* Mail icon */}
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>

      {state === "hidden" ? (
        <span className="flex items-center gap-2">
          <span className="tracking-wide" style={{ color: `rgba(34,211,238,${hov ? 0.65 : 0.40})` }}>
            vanshg [at] stanford [dot] edu
          </span>
          <span className="text-xs px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(34,211,238,0.10)",
              border: "1px solid rgba(34,211,238,0.20)",
              color: "rgba(34,211,238,0.70)",
              fontSize: 10, letterSpacing: "0.12em",
            }}>
            TAP TO REVEAL
          </span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <span style={{
            background: copied
              ? "transparent"
              : "linear-gradient(90deg, rgba(34,211,238,0.5) 0%, rgba(34,211,238,1) 40%, rgba(34,211,238,1) 60%, rgba(34,211,238,0.5) 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: copied ? undefined : "text",
            WebkitTextFillColor: copied ? "rgba(34,211,238,1)" : "transparent",
            backgroundClip: copied ? undefined : "text",
            animation: copied ? "none" : "email-shimmer 2s linear infinite",
          }}>
            {copied ? "✓ Copied!" : email}
          </span>
          {!copied && (
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
              style={{ opacity: 0.6 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          )}
        </span>
      )}
    </button>
  );
}

/* ══════════════════════ PANEL CONTENT ══════════════════════ */

function AboutPanel() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <SectionHeading title="Bio" />
        <p className="text-sm leading-relaxed" style={{ color: "#c0c0c0" }}>{person.bio}</p>
      </div>

      <div>
        <SectionHeading title="Education" />
        <div className="space-y-3">
          {education.map(e => (
            <div key={e.school} className="rounded-lg p-4" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
              <div className="flex flex-wrap justify-between gap-1 mb-1">
                <h3 className="font-semibold text-white text-sm">{e.school}</h3>
                <span className="text-xs font-mono" style={{ color: "#555" }}>{e.dates}</span>
              </div>
              <p className="text-xs mb-1" style={{ color: "#b0b0b0" }}>{e.degree}</p>
              <p className="text-xs mb-2" style={{ color: "#555" }}>{e.location}</p>
              {e.gpa && <p className="text-xs mb-2" style={{ color: "#888" }}>GPA: <span className="text-white">{e.gpa}</span></p>}
              {e.notes && <p className="text-xs italic" style={{ color: "#555" }}>{e.notes}</p>}
              {e.courses && <div className="flex flex-wrap gap-1 mt-2">{e.courses.map(c => <Tag key={c} label={c} />)}</div>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeading title="Contact" />
        <div className="flex flex-col gap-2">
          <EmailReveal />
          <div className="flex gap-2 mt-1 flex-wrap">
            <a href={person.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={{ border: "1px solid #2a2a2a", color: "#888" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#444"; el.style.color = "#d4d4d4"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#2a2a2a"; el.style.color = "#888"; }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={{ border: "1px solid #2a2a2a", color: "#888" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#444"; el.style.color = "#d4d4d4"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#2a2a2a"; el.style.color = "#888"; }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="p-6">
      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "#1e1e1e" }} />
        <div className="space-y-4">
          {experience.map((exp, i) => (
            <div key={i} className="pl-8 relative">
              <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full"
                style={{ border: "2px solid rgba(34,211,238,0.3)", background: "#0a0a0a" }} />
              <div className="rounded-lg p-4" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
                <div className="flex flex-wrap justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-white text-sm leading-snug">{exp.title}</h3>
                  <span className="text-xs font-mono flex-shrink-0" style={{ color: "#606060" }}>{exp.dates}</span>
                </div>
                <div className="flex flex-wrap gap-x-3 mb-3">
                  <span className="text-xs" style={{ color: "#909090" }}>{exp.company}</span>
                  <span className="text-xs" style={{ color: "#555" }}>{exp.location}</span>
                </div>
                <ul className="space-y-1.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-xs leading-relaxed flex gap-2" style={{ color: "#a0a0a0" }}>
                      <span className="flex-shrink-0 mt-0.5" style={{ color: "#555" }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div className="p-6">
      <div className="space-y-3">
        {projects.map(p => {
          const card = (
            <div className="rounded-lg p-4 flex flex-col h-full transition-all"
              style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}
              onMouseEnter={el => { el.currentTarget.style.borderColor = "#383838"; }}
              onMouseLeave={el => { el.currentTarget.style.borderColor = "#1e1e1e"; }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white text-sm leading-snug pr-2">{p.name}</h3>
                {p.stars && (
                  <span className="flex items-center gap-0.5 text-xs flex-shrink-0" style={{ color: "#555" }}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {p.stars}
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#a0a0a0" }}>{p.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">{p.tech.map(t => <Tag key={t} label={t} />)}</div>
              {p.hasDetailPage && (
                <p className="text-xs mt-1" style={{ color: "#555" }}>View full project →</p>
              )}
            </div>
          );
          return p.hasDetailPage ? (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="block">{card}</Link>
          ) : (
            <div key={p.slug}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}

function AwardsPanel() {
  return (
    <div className="p-6">
      <div className="space-y-3">
        {awards.map(a => (
          <div key={a.title} className="rounded-lg p-4 flex gap-3" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
            <div className="text-lg flex-shrink-0 mt-0.5 leading-none">{a.badge}</div>
            <div>
              <div className="flex flex-wrap justify-between gap-1 mb-0.5">
                <h3 className="font-semibold text-white text-sm">{a.title}</h3>
                <span className="text-xs font-mono" style={{ color: "#606060" }}>{a.year}</span>
              </div>
              <p className="text-xs mb-1.5" style={{ color: "#909090" }}>{a.org}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#707070" }}>{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LifePanel() {
  return (
    <div className="p-6 space-y-8">
      {/* Drums */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">🥁 Drums</h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#c0c0c0" }}>
          Completed all 8 grades of Trinity College Rock &amp; Pop drumkit. Currently preparing for the ATCL diploma (undergraduate-level). Performed at venues across the UAE.
        </p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[["8", "Trinity grades"], ["ATCL", "Next milestone"], ["10+", "Years playing"]].map(([v, l]) => (
            <div key={l} className="rounded p-2.5 text-center" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
              <div className="text-sm font-bold text-white">{v}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#555" }}>{l}</div>
            </div>
          ))}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "#808080" }}>
          At Stanford, exploring the intersection of music and AI — experimenting with generative tools like Suno while keeping one foot in the physical: real kit, real sound.
        </p>
      </div>

      {/* Poker */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">🃏 Poker</h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#c0c0c0" }}>
          Selected for the <span className="text-white">SoCal College Poker Tournament</span> — 120 students, sponsored by Jane Street, HRT, Citadel, and Jump Trading. Also competed at the <span className="text-white">Stanford × Berkeley Invitational</span>.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[["120", "SoCal field size"], ["2×", "Invitationals"]].map(([v, l]) => (
            <div key={l} className="rounded p-2.5 text-center" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
              <div className="text-sm font-bold text-white">{v}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#555" }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Jane Street", "HRT", "Citadel", "Jump Trading"].map(s => (
            <span key={s} className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ background: "rgba(255,255,255,0.04)", color: "#888", border: "1px solid #2a2a2a" }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Tennis */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">🎾 Tennis</h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#c0c0c0" }}>
          Regular UAE Tennis Federation competitor. Highest national ranking of <span className="text-white">#44 in UAE U18 Male (2022)</span>. Multiple junior tournament wins.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[["#44", "UAE U18 ranking"], ["5+", "Tournament wins"]].map(([v, l]) => (
            <div key={l} className="rounded p-2.5 text-center" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
              <div className="text-sm font-bold text-white">{v}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#555" }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {["FuturePro U18 & U16", "SuperSports U14 (×2)", "Advantage Sports U12"].map(t => (
            <div key={t} className="flex items-center gap-2 text-xs" style={{ color: "#a0a0a0" }}>
              <span style={{ color: "#555" }}>›</span>{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelContent({ id }: { id: SectionId }) {
  switch (id) {
    case "about":      return <AboutPanel />;
    case "experience": return <ExperiencePanel />;
    case "projects":   return <ProjectsPanel />;
    case "awards":     return <AwardsPanel />;
    case "life":       return <LifePanel />;
  }
}

/* ══════════════════════ IC CHIP NODE ══════════════════════ */

const BREATHE_ANIMS     = ["chip-breathe-0","chip-breathe-1","chip-breathe-2","chip-breathe-3","chip-breathe-4"];
const BREATHE_DURATIONS = ["3.4s","4.0s","3.0s","4.4s","3.7s"];
const BREATHE_DELAYS    = ["0s","0.8s","1.5s","0.4s","1.2s"];

// Schematic-style SVG path per section (24×24 viewbox)
const SECTION_ICONS: Record<SectionId, React.ReactNode> = {
  about: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      <line x1="12" y1="1" x2="12" y2="4"/>
      <line x1="12" y1="12" x2="12" y2="14"/>
    </svg>
  ),
  experience: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,12 5,12 7,6 10,18 13,9 16,14 18,11 22,11"/>
    </svg>
  ),
  projects: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <path d="M17.5 14v7M14 17.5h7"/>
    </svg>
  ),
  awards: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.1,8.6 22,9.6 17,14.4 18.2,21.2 12,18 5.8,21.2 7,14.4 2,9.6 8.9,8.6"/>
    </svg>
  ),
  life: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),
};

function ChipNode({
  id, label, partNum, hint, pins, x, y, onClick, faded, animIdx,
}: {
  id: SectionId; label: string; partNum: string; hint: string; pins: number;
  x: string; y: string; onClick: () => void; faded: boolean; animIdx: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [litPad, setLitPad] = useState(-1);

  useEffect(() => {
    if (!hovered) { setLitPad(-1); return; }
    let i = 0;
    const iv = setInterval(() => { setLitPad(i++ % (pins * 2)); }, 75);
    return () => clearInterval(iv);
  }, [hovered, pins]);

  // Layout
  const LEAD_W  = 20;
  const LEAD_H  = 11;
  const PITCH   = 19;
  const V_PAD   = 14;
  const GAP     = 4;
  const BODY_W  = 130;
  const BODY_H  = V_PAD * 2 + (pins - 1) * PITCH + LEAD_H;
  const TOTAL_W = LEAD_W * 2 + GAP * 2 + BODY_W;
  const BODY_X  = LEAD_W + GAP;

  const C = (a: number) => `rgba(34,211,238,${a})`;

  const leadColor = (idx: number) =>
    idx === litPad ? C(1) : hovered ? C(0.7) : C(0.35);
  const leadGlow  = (idx: number) =>
    idx === litPad ? `0 0 12px ${C(0.9)}, 0 0 4px ${C(1)}` : "none";

  const breathe = `${BREATHE_ANIMS[animIdx % 5]} ${BREATHE_DURATIONS[animIdx % 5]} ease-in-out ${BREATHE_DELAYS[animIdx % 5]} infinite`;
  const monoFont = "var(--font-mono), 'Courier New', monospace";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute", left: x, top: y,
        transform: "translate(-50%,-50%)",
        opacity: faded ? 0.06 : 1,
        transition: "opacity 0.4s ease",
        zIndex: 10,
        cursor: "pointer",
        background: "none", border: "none", padding: 0,
        userSelect: "none",
      }}
    >
      {/* Wide ambient glow on hover */}
      {hovered && (
        <div style={{
          position: "absolute", inset: -20, borderRadius: 12,
          background: `radial-gradient(ellipse, ${C(0.10)} 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}

      <div style={{ position: "relative", width: TOTAL_W, height: BODY_H }}>

        {/* Silkscreen placement outline */}
        <div style={{
          position: "absolute", inset: -9,
          border: `1px dashed ${C(hovered ? 0.45 : 0.18)}`,
          borderRadius: 6,
          transition: "border-color 0.3s",
          animation: hovered ? "none" : "silkscreen-pulse 4s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* Pin numbers — left side */}
        {Array.from({ length: pins }).map((_, i) => (
          <div key={`lpn${i}`} style={{
            position: "absolute",
            left: -14, top: V_PAD + i * PITCH + 1,
            fontFamily: monoFont, fontSize: 7,
            color: C(hovered ? 0.5 : 0.2),
            lineHeight: 1, pointerEvents: "none",
            transition: "color 0.2s",
          }}>{i + 1}</div>
        ))}

        {/* Pin numbers — right side */}
        {Array.from({ length: pins }).map((_, i) => (
          <div key={`rpn${i}`} style={{
            position: "absolute",
            right: -14, top: V_PAD + i * PITCH + 1,
            fontFamily: monoFont, fontSize: 7,
            color: C(hovered ? 0.5 : 0.2),
            lineHeight: 1, pointerEvents: "none",
            transition: "color 0.2s",
          }}>{pins + i + 1}</div>
        ))}

        {/* LEFT LEADS */}
        {Array.from({ length: pins }).map((_, i) => (
          <div key={`l${i}`} style={{
            position: "absolute",
            left: 0, top: V_PAD + i * PITCH,
            width: LEAD_W, height: LEAD_H,
            background: leadColor(i),
            borderRadius: "2px 0 0 2px",
            boxShadow: leadGlow(i),
            transition: "background 0.06s, box-shadow 0.06s",
          }} />
        ))}

        {/* RIGHT LEADS */}
        {Array.from({ length: pins }).map((_, i) => (
          <div key={`r${i}`} style={{
            position: "absolute",
            right: 0, top: V_PAD + i * PITCH,
            width: LEAD_W, height: LEAD_H,
            background: leadColor(pins + i),
            borderRadius: "0 2px 2px 0",
            boxShadow: leadGlow(pins + i),
            transition: "background 0.06s, box-shadow 0.06s",
          }} />
        ))}

        {/* CHIP BODY */}
        <div style={{
          position: "absolute",
          left: BODY_X, top: 0,
          width: BODY_W, height: BODY_H,
          background: "#060810",
          border: `1px solid ${C(hovered ? 0.75 : 0.35)}`,
          borderRadius: 3,
          overflow: "hidden",
          animation: hovered ? "none" : breathe,
          boxShadow: hovered ? `0 0 40px ${C(0.35)}, 0 0 16px ${C(0.22)}` : undefined,
          transition: "border-color 0.2s, box-shadow 0.3s",
        }}>

          {/* Scan line */}
          {hovered && (
            <div style={{
              position: "absolute", top: -2, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg,transparent,${C(0.8)} 35%,${C(1)} 50%,${C(0.8)} 65%,transparent)`,
              animation: "scandown 1.3s linear infinite",
              pointerEvents: "none", zIndex: 5,
            }} />
          )}

          {/* Pin-1 circle */}
          <div style={{
            position: "absolute", top: 6, left: 7,
            width: 6, height: 6, borderRadius: "50%",
            background: C(hovered ? 1 : 0.5),
            boxShadow: hovered ? `0 0 8px ${C(1)}` : "none",
            transition: "all 0.2s", pointerEvents: "none",
          }} />

          {/* Status LED */}
          <div style={{
            position: "absolute", top: 7, right: 8,
            width: 6, height: 6, borderRadius: "50%",
            background: hovered ? C(1) : C(0.6),
            boxShadow: hovered ? `0 0 10px ${C(1)}, 0 0 4px ${C(1)}` : `0 0 4px ${C(0.5)}`,
            animation: "led-blink 2.3s ease-in-out infinite",
            transition: "all 0.2s", pointerEvents: "none",
          }} />

          {/* Inner die outline */}
          <div style={{
            position: "absolute", top: 10, left: 10, right: 10, bottom: 10,
            border: `1px solid ${C(hovered ? 0.18 : 0.08)}`,
            borderRadius: 2, pointerEvents: "none",
          }} />

          {/* ── CONTENT: icon + label + partNum ── */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 5, pointerEvents: "none",
          }}>
            {/* Section SVG icon */}
            <div style={{
              color: C(hovered ? 0.9 : 0.45),
              filter: hovered ? `drop-shadow(0 0 5px ${C(0.7)})` : "none",
              transition: "color 0.2s, filter 0.2s",
              lineHeight: 0,
            }}>
              {SECTION_ICONS[id]}
            </div>

            {/* Section label */}
            <p style={{
              fontFamily: monoFont,
              fontSize: 12, fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C(hovered ? 1 : 0.75),
              textShadow: hovered ? `0 0 12px ${C(0.6)}` : `0 0 6px ${C(0.3)}`,
              transition: "color 0.2s, text-shadow 0.2s",
              lineHeight: 1, margin: 0,
            }}>{label}</p>

            {/* Part number */}
            <p style={{
              fontFamily: monoFont,
              fontSize: 8, letterSpacing: "0.16em",
              color: C(hovered ? 0.35 : 0.2),
              transition: "color 0.2s",
              lineHeight: 1, margin: 0,
            }}>{partNum}</p>

            {/* Hint slides in */}
            <div style={{ overflow: "hidden", maxHeight: hovered ? "14px" : "0", transition: "max-height 0.22s ease" }}>
              <p style={{
                fontFamily: monoFont, fontSize: 8,
                color: C(0.5), lineHeight: 1,
                margin: "2px 0 0", whiteSpace: "nowrap",
              }}>{hint}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════ ROOT ══════════════════════ */

export default function Portfolio() {
  const [active, setActive] = useState<SectionId | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const activeLabel = HOTSPOTS.find(h => h.id === active)?.label ?? "";

  return (
    <div className="fixed inset-0" style={{ zIndex: 1 }}>

      {/* ── Hero ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          opacity: active ? 0.12 : mounted ? 1 : 0,
          pointerEvents: active ? "none" : "auto",
          transition: "opacity 0.5s ease, transform 0.9s ease",
          transform: mounted ? "translateY(0)" : "translateY(18px)",
        }}
      >
        <div className="text-center px-6">
          {/* Avatar */}
          <div className="relative mb-5 inline-block">
            <div className="absolute inset-0 rounded-full scale-110"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)", filter: "blur(10px)" }} />
            <Image src={person.avatar} alt={person.name} width={84} height={84}
              className="relative rounded-full" priority
              style={{ border: "2px solid rgba(255,255,255,0.14)", outline: "1px solid rgba(255,255,255,0.05)" }} />
          </div>

          <p className="font-mono text-xs tracking-[0.28em] uppercase mb-2" style={{ color: "#22c55e" }}>Hello, I&apos;m</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{person.name}</h1>
          <p className="text-base font-medium mb-1" style={{ color: "#d8d8d8" }}>{person.headline}</p>
          <p className="text-sm font-mono mb-8" style={{ color: "#5a5a5a" }}>{person.subheadline}</p>

          {/* Contact buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-9">
            <EmailReveal />
            <a href={person.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={{ border: "1px solid #2a2a2a", color: "#888" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#444"; el.style.color = "#d4d4d4"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#2a2a2a"; el.style.color = "#888"; }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={{ border: "1px solid #2a2a2a", color: "#888" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#444"; el.style.color = "#d4d4d4"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#2a2a2a"; el.style.color = "#888"; }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Hint text */}
          <p className="text-[11px] font-mono tracking-wider" style={{ color: "rgba(34,211,238,0.22)" }}>
            — tap a node to explore —
          </p>
        </div>
      </div>

      {/* ── Desktop scattered IC chips ── */}
      {HOTSPOTS.map((h, idx) => (
        <div key={h.id} className="hidden md:block">
          <ChipNode
            id={h.id}
            label={h.label}
            partNum={h.partNum}
            hint={h.hint}
            pins={h.pins}
            x={h.x}
            y={h.y}
            onClick={() => setActive(h.id)}
            faded={active !== null}
            animIdx={idx}
          />
        </div>
      ))}

      {/* ── Mobile button row ── */}
      <div
        className="md:hidden absolute bottom-8 left-0 right-0 flex flex-wrap justify-center gap-2 px-6"
        style={{
          opacity: active ? 0 : mounted ? 1 : 0,
          pointerEvents: active ? "none" : "auto",
          transition: "opacity 0.4s ease",
          zIndex: 10,
        }}
      >
        {HOTSPOTS.map(h => (
          <button key={h.id} onClick={() => setActive(h.id)}
            className="px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all"
            style={{ border: "1px solid rgba(34,211,238,0.2)", color: "rgba(34,211,238,0.5)", background: "rgba(34,211,238,0.04)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(34,211,238,0.9)"; el.style.borderColor = "rgba(34,211,238,0.5)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(34,211,238,0.5)"; el.style.borderColor = "rgba(34,211,238,0.2)"; }}>
            {h.label}
          </button>
        ))}
      </div>

      {/* ── Backdrop (closes panel on click) ── */}
      {active && (
        <div className="absolute inset-0" style={{ zIndex: 30 }} onClick={() => setActive(null)} />
      )}

      {/* ── Sliding panel ── */}
      <div
        className="absolute top-0 right-0 h-full overflow-y-auto"
        style={{
          width: "clamp(320px, 52vw, 680px)",
          transform: active ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          background: "rgba(6,6,6,0.97)",
          borderLeft: "1px solid #1c1c1c",
          zIndex: 40,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Panel header */}
        <div
          className="sticky top-0 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(6,6,6,0.95)",
            borderBottom: "1px solid #181818",
            backdropFilter: "blur(8px)",
            zIndex: 1,
          }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.22em]" style={{ color: "rgba(34,211,238,0.45)" }}>
            {activeLabel}
          </p>
          <button
            onClick={() => setActive(null)}
            className="w-7 h-7 flex items-center justify-center rounded text-xs transition-all"
            style={{ border: "1px solid #242424", color: "#555" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#404040"; el.style.color = "#aaa"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#242424"; el.style.color = "#555"; }}
          >
            ✕
          </button>
        </div>

        {active && <PanelContent id={active} />}
      </div>

    </div>
  );
}
