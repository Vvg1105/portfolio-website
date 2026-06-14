export interface ProjectImage {
  src: string;
  alt: string;
}

export interface LinkedInPost {
  url: string;
  preview: string; // short description of the post
}

export interface ProjectDetail {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  devpost?: string;
  liveUrl?: string;
  stars?: number;
  hasDetailPage: boolean;
  category: "research" | "hackathon" | "tool" | "ml" | "ai";
  images: ProjectImage[];       // user will populate with real images
  linkedinPosts: LinkedInPost[];
  githubEmbedRepo?: string;     // e.g. "Vvg1105/maestro-treehacks"
  date: string;
}

export const projects: ProjectDetail[] = [
  {
    slug: "krishnan-lab",
    name: "Biohybrid Cell Therapy Device",
    tagline: "Macroencapsulation device for living cell therapeutics",
    description:
      "Designing a mechanically robust macroencapsulation device that integrates microcapsule immunoisolation with a 3D-printed porous chassis for long-term subcutaneous implantation.",
    longDescription: `
Working in the Krishnan Lab at Stanford, I'm developing a next-generation macroencapsulation device for living cell therapeutics — specifically targeting Type 1 Diabetes and other conditions requiring sustained cell-based drug delivery.

The device integrates two key innovations: a microcapsule immunoisolation layer that shields therapeutic cells from immune rejection, and a 3D-printed porous outer chassis optimized for long-term subcutaneous implantation.

My work focuses on parametric CAD development in Fusion 360, systematically iterating pore geometry, lattice spacing, and wall thickness to balance three competing constraints: mechanical strength, metabolite diffusion efficiency, and fibrosis mitigation at the implant-tissue interface.
    `.trim(),
    tech: ["Fusion 360", "CAD", "Biomaterials", "3D Printing", "Python"],
    hasDetailPage: true,
    category: "research",
    images: [],
    linkedinPosts: [],
    githubEmbedRepo: undefined,
    date: "Sep 2025 – Present",
  },
  {
    slug: "maestro",
    name: "Maestro",
    tagline: "Real-Time Air Instrument & AI Music Coach — TreeHacks 2025",
    description:
      "Play air instruments detected via computer vision and receive live AI coaching feedback. Built at Stanford TreeHacks 2025.",
    longDescription: `
Maestro is a real-time air instrument system built over 36 hours at Stanford TreeHacks 2025.

Using computer vision (MediaPipe hand tracking), the system detects hand gestures and maps them to musical notes and rhythms — letting you play a "drum kit" or "piano" entirely in mid-air.

Layered on top is an AI music coach that listens to your playing, analyzes timing and technique, and delivers spoken feedback in real time. The coach model was fine-tuned to give constructive, musician-style critiques rather than generic tips.

The project won recognition at TreeHacks for its novelty at the intersection of CV, generative audio, and educational AI.
    `.trim(),
    tech: ["TypeScript", "Python", "MediaPipe", "Computer Vision", "WebRTC", "OpenAI"],
    github: "https://github.com/Vvg1105/maestro-treehacks",
    devpost: "https://devpost.com/software/maestro-n0uqyz",
    stars: 1,
    hasDetailPage: true,
    category: "hackathon",
    images: [],
    linkedinPosts: [
      {
        url: "https://www.linkedin.com/in/vansh-gadhia/",
        preview: "Our TreeHacks 2025 demo — playing a full drum solo in mid-air with AI coaching.",
      },
    ],
    githubEmbedRepo: "Vvg1105/maestro-treehacks",
    date: "Feb 2025",
  },
  {
    slug: "suno",
    name: "Suno AI Music Project",
    tagline: "AI-powered music generation experiments",
    description:
      "Exploring the frontier of AI music generation with Suno, building tooling and creative pipelines on top of the Suno API.",
    longDescription: `
Suno represents my exploration of AI-generated music — from experimenting with the Suno v3/v4 models to building lightweight tooling and creative pipelines on top of the API.

Projects in this space include automated prompt engineering for genre-consistent music generation, a playlist curator that generates custom background music based on mood/context tags, and integration experiments combining Suno output with real instrument recordings.

This work sits at the intersection of creative AI and music production — two areas I care deeply about as a drummer and technologist.
    `.trim(),
    tech: ["Python", "Suno API", "TypeScript", "Generative AI"],
    hasDetailPage: true,
    category: "ai",
    images: [],
    linkedinPosts: [
      {
        url: "https://www.linkedin.com/in/vansh-gadhia/",
        preview: "Experimenting with Suno AI to generate full tracks from natural language prompts.",
      },
    ],
    githubEmbedRepo: undefined,
    date: "2025",
  },
  {
    slug: "ambient-scribe",
    name: "Ambient Scribe",
    tagline: "Real-time ambient documentation using LLMs",
    description:
      "Ambient documentation tool that captures, transcribes, and structures spoken notes in real time using large language models.",
    longDescription: `
Ambient Scribe is a voice-first documentation tool that runs in the background while you work, think, or talk — capturing spoken notes and instantly structuring them into clean, searchable documents.

The system uses the Web Audio API for continuous audio capture, Whisper for transcription, and a structured LLM pipeline to organize notes into sections, action items, and summaries.

Built with Next.js and deployed as a lightweight progressive web app that works offline-first with local audio buffers.
    `.trim(),
    tech: ["TypeScript", "Next.js", "Web Audio API", "Whisper", "OpenAI", "Tailwind"],
    github: "https://github.com/Vvg1105/ambient-scribe",
    hasDetailPage: true,
    category: "tool",
    images: [],
    linkedinPosts: [],
    githubEmbedRepo: "Vvg1105/ambient-scribe",
    date: "Aug 2025",
  },
  {
    slug: "diabetes-predictor",
    name: "Type 2 Diabetes Risk Predictor",
    tagline: "ML pipeline for diabetes risk in under-resourced populations",
    description:
      "End-to-end ML pipeline trained on 500+ patient records from Kenya. Predicts diabetes risk from demographic, clinical, and retinal imaging data.",
    longDescription: `
Developed as part of my lead investigator role at Lions Diabetes Care in Nairobi, this ML pipeline tackles early diabetes detection in populations with limited access to advanced diagnostics.

The model was trained on 500+ patient records collected during summer 2022, combining demographic data, clinical measurements (HbA1c, BMI, blood pressure), and retinal fundus images. XGBoost outperformed baseline logistic regression by 18% on AUC.

A key finding: tribal ethnicity was a statistically significant predictor even after controlling for lifestyle factors — a novel correlation that has implications for population-targeted screening programs.
    `.trim(),
    tech: ["Python", "scikit-learn", "XGBoost", "Pandas", "NumPy", "SQL", "matplotlib"],
    hasDetailPage: true,
    category: "ml",
    images: [],
    linkedinPosts: [],
    date: "2022 – 2023",
  },
  {
    slug: "trading-platform",
    name: "Algorithmic Trading Platform",
    tagline: "Backtesting engine with risk management",
    description:
      "Comprehensive algorithmic trading platform with backtesting engine, risk management module, and multi-source data analysis.",
    longDescription: `
A full-featured algorithmic trading platform built for systematic strategy development and backtesting.

Core components include a vectorized backtesting engine (faster than event-driven for most strategies), a configurable risk management layer (position sizing, drawdown limits, correlation-adjusted exposure), and data ingestion pipelines for multiple sources.

Strategy implementations include momentum, mean-reversion, and pairs trading — all testable against tick-level historical data.
    `.trim(),
    tech: ["Python", "Pandas", "NumPy", "matplotlib", "yfinance"],
    github: "https://github.com/Vvg1105/trading-platform",
    hasDetailPage: false,
    category: "tool",
    images: [],
    linkedinPosts: [],
    date: "Aug 2025",
  },
  {
    slug: "inception",
    name: "Inception",
    tagline: "Deep learning architectures from scratch",
    description:
      "Deep learning research project implementing neural network architectures and training pipelines from scratch.",
    longDescription: `
Inception is a from-scratch implementation of foundational deep learning architectures — reimplementing key models without relying on high-level framework abstractions to build genuine understanding of backpropagation, optimizers, and architecture choices.

Implementations include multi-layer perceptrons, CNNs (including a simplified Inception-v1 module), attention mechanisms, and basic transformer blocks.
    `.trim(),
    tech: ["Python", "PyTorch", "NumPy"],
    github: "https://github.com/Vvg1105/Inception",
    stars: 1,
    hasDetailPage: false,
    category: "ml",
    images: [],
    linkedinPosts: [],
    date: "Apr 2026",
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}
