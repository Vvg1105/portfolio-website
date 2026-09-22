export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Break out wider than the text column — for dense images like posters. */
  wide?: boolean;
  /** Wrap the figure in a link, e.g. to a full-resolution PDF. */
  href?: string;
}

/** A labelled empty box standing in for art that doesn't exist yet. */
export interface FigurePlaceholder {
  placeholder: string;
  caption?: string;
}

export type Figure = ProjectImage | FigurePlaceholder;

export function isPlaceholder(f: Figure): f is FigurePlaceholder {
  return "placeholder" in f;
}

/** One beat of a project page: prose, optionally paired with a figure. */
export interface Section {
  text: string;
  figure?: Figure;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** One line, shown next to the title on the landing page. */
  summary: string;
  /** Paragraphs, separated by blank lines. Used when `sections` is absent. */
  body: string;
  /** Preferred over `body`: each section reveals on scroll with its figure. */
  sections?: Section[];
  tech: string[];
  date: string;
  /** False = listed on the landing page as a plain external link, no page of its own. */
  hasPage: boolean;
  links: ProjectLink[];
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    slug: "krishnan-lab",
    name: "Biohybrid Cell Therapy Device",
    tagline: "Battery-free implant that generates oxygen for encapsulated cell therapies",
    summary: "Battery-free implant that keeps encapsulated cell therapies alive",
    body: "",
    sections: [
      {
        text:
          "I work in the [Krishnan Lab](https://krishnanlab.stanford.edu/) at Stanford on implantable devices for living cell therapeutics — engineered cells that sit under the skin and produce a drug continuously, so the patient doesn't have to keep re-dosing. The targets are Type 1 Diabetes, immunotherapy, and hormone replacement.\n\nThe lab's wider remit is bio-integrated and biohybrid devices: pairing electronic materials with living tissue, across drug delivery, biosensing, and tissue engineering. My work sits on the drug-delivery side of that, and the biosensing thread at the end of this page runs back toward the rest of it.",
        figure: {
          src: "/implant.jpg",
          alt: "The assembled implant held between two gloved fingers",
          width: 1200,
          height: 989,
          caption:
            "The assembled implant: macroporous chassis at the top, PCB and receiver antenna below.",
        },
      },
      {
        text: "Keeping those cells alive is the hard part. They have to be hidden from the immune system and they have to breathe. The device does both: a microcapsule immunoisolation layer shields the cells, and a proton exchange membrane splits water to generate oxygen locally, on demand, instead of relying on whatever diffuses in from the surrounding tissue.",
      },
      {
        text: "My work runs across the stack rather than down one layer of it. On the materials side I fabricate the devices — PDMS processing and the porous chassis, with parametric CAD in Fusion 360 iterating pore geometry, lattice spacing, and wall thickness against three constraints that pull against each other: mechanical strength, metabolite diffusion, and fibrosis at the implant-tissue interface.",
        figure: {
          src: "/pdms-chassis.jpg",
          alt: "The macroporous lattice chassis beside its clear backend case on a cutting mat",
          width: 1200,
          height: 1126,
          caption:
            "The macroporous chassis beside its backend case. The lattice is what the CAD iteration tunes.",
        },
      },
      {
        text:
          "On the electronics side I design PCBs and work on the Class-E RF amplifier that delivers wireless power at 13.56 MHz.",
        figure: {
          placeholder: "Class-E power amplifier — photo to come",
        },
      },
      {
        text:
          "Through Stanford EE's REU program I presented this work with David Hu, mentored by Atharv Naik.",
        figure: {
          src: "/reu-poster.jpg",
          alt: "REU poster: Battery-free oxygenation for long-term cell therapies in mice",
          width: 1800,
          height: 1500,
          wide: true,
          href: "/reu-poster.pdf",
          caption: "The REU poster — open it for full resolution.",
        },
      },
      {
        text: "Next is closing the loop: adding biosensors so the implant can report back and have its power and therapy adjusted in real time, rather than being driven blind.",
      },
    ],
    tech: ["Fusion 360", "PDMS", "Microfabrication", "Class-E RF amplifiers", "Wireless power", "Biomaterials", "3D printing"],
    date: "Sep 2025 – Present",
    hasPage: true,
    links: [
      { label: "REU poster (PDF)", url: "/reu-poster.pdf" },
    ],
    images: [],
  },
  {
    slug: "maestro",
    name: "Maestro",
    tagline: "Turns a broom into a playable guitar",
    summary: "Turns a broom into a playable guitar, with AI coaching",
    body: `
Maestro turns a broom into a playable guitar. A camera tracks your hands, magenta tape on the pole marks out the fretboard, and a strum registers when your strumming hand crosses the neck with enough velocity — so pitch and rhythm come from how you actually move. An iPhone companion detects pressed "strings", letting you form chords.

The premise is that everyone has already done this. Desks, bottles, brooms — people reach for whatever is nearby to make rhythm. Maestro makes that real, with no instrument to buy and no training required.

It also coaches. When you stop playing, two models run in parallel: Qwen2.5-VL reads posture and technique from video while NVIDIA Music Flamingo reads timing and style from audio. Their output is merged into short spoken feedback. In generation mode, what you played becomes the seed for a fully produced track.

The whole system runs in real time — a Python WebSocket server streaming webcam frames to a browser front end, with the models on an ASUS GX10. The hard constraint was latency: for a strum to feel musical it has to be instant, which mattered far more than model size.
    `.trim(),
    tech: ["Python", "TypeScript", "MediaPipe", "OpenCV", "WebSockets", "Qwen2.5-VL", "Suno API", "iOS"],
    date: "Feb 2025",
    hasPage: true,
    links: [
      { label: "GitHub", url: "https://github.com/Vvg1105/maestro-treehacks" },
      { label: "Devpost", url: "https://devpost.com/software/maestro-n0uqyz" },
    ],
    images: [],
  },
  {
    slug: "diabetes-predictor",
    name: "Type 2 Diabetes Risk Predictor",
    tagline: "ML pipeline for diabetes risk in under-resourced populations",
    summary: "ML pipeline for diabetes risk in under-resourced populations",
    body: `
Developed as part of my lead investigator role at Lions Diabetes Care in Nairobi, this ML pipeline tackles early diabetes detection in populations with limited access to advanced diagnostics.

The model was trained on 500+ patient records collected during summer 2022, combining demographic data, clinical measurements (HbA1c, BMI, blood pressure), and retinal fundus images. XGBoost outperformed baseline logistic regression by 18% on AUC.

A key finding: tribal ethnicity was a statistically significant predictor even after controlling for lifestyle factors — a novel correlation that has implications for population-targeted screening programs.
    `.trim(),
    tech: ["Python", "scikit-learn", "XGBoost", "Pandas", "NumPy", "SQL", "matplotlib"],
    date: "2022 – 2023",
    hasPage: true,
    links: [],
    images: [],
  },
  {
    slug: "inception",
    name: "Inception",
    tagline: "Multi-brain 3D city builder driven by EEG and emotion",
    summary: "A 3D city shaped by EEG and emotion, built at Global NeuroHack",
    body: `
Inception is a browser-based 3D city builder where the world is shaped by how you feel. Emotion — arousal, valence, focus — together with mood and environment settings like sun elevation and fog density, determines what gets built and how it looks. You place objects on a grid by typing a prompt or by blinking, and Claude turns the object plus its emotional context into concrete Three.js material parameters: emissive glow, roughness, metalness, scale.

A second dimension runs through Meta's TRIBE v2 brain encoder. A prompt becomes an image via FLUX, the image becomes a short clip, TRIBE extracts a neural feature vector from it, and a scikit-learn classifier maps that vector onto a city element — bridge, lake, skyscraper, tree — which then spawns in the scene. The same vectors can be rendered as cortical surface maps with nilearn.

The most interesting mode is multi-brain. Two people wear EEG headsets — a g.tec BCICore-8 and an OpenBCI Cyton — and co-create in one shared world. The system streams each person's emotion at 10 Hz, watches for blinks to trigger hands-free placement, and computes symbiosis scores correlating the two signals. What shapes the city's atmosphere is the collective emotional state, not any one person's.

Around that sits a FastAPI backend and three WebSocket services: EEG decoding, MediaPipe iris tracking that steers the camera by gaze at 30 fps, and the TRIBE decoder. ElevenLabs narrates placements, and Perplexity or Sketchfab search pulls in external GLB models when the built-in asset kit doesn't have what you asked for.

Built in 48 hours at Global NeuroHack 2026, held at Frontier Tower in San Francisco, alongside teams from Oxford, Berkeley, Rice, and Imperial.
    `.trim(),
    tech: ["Three.js", "Python", "FastAPI", "TRIBE v2", "scikit-learn", "OpenBCI", "MediaPipe", "WebSockets"],
    date: "Apr 2026",
    hasPage: true,
    links: [{ label: "GitHub", url: "https://github.com/Vvg1105/Inception" }],
    images: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export interface Paper {
  title: string;
  venue: string;
  url: string;
}

export const papers: Paper[] = [
  {
    title:
      "Review of Genetic and Artificial Intelligence Approaches to Improving Gestational Diabetes Mellitus Screening and Diagnosis in sub-Saharan Africa",
    venue: "Yale Journal of Biology and Medicine, 2024",
    url: "https://pubmed.ncbi.nlm.nih.gov/38559462/",
  },
  {
    title:
      "Development and evaluation of a machine learning model to predict positive urine cultures in the outpatient setting and minimize the use of antibiotics",
    venue: "BMJ Health & Care Informatics, 2022",
    url: "https://informatics.bmj.com/content/29/Suppl_1/A6",
  },
];

export interface MediaItem {
  title: string;
  outlet: string;
  url: string;
}

export const media: MediaItem[] = [
  {
    title: "17-year-old Dubai student in top 50 Global Student Prize 2023 shortlist",
    outlet: "Khaleej Times",
    url: "https://www.khaleejtimes.com/uae/17-year-old-dubai-student-in-top-50-global-student-prize-2023-shortlist",
  },
  {
    title: "Global Student Prize 2023 finalist",
    outlet: "Global Student Prize",
    url: "https://globalteacherprize.org/news/global-student-prize-finalists/2023-finalists-global-student-prize/1016/1016-Vansh-Gadhia",
  },
  {
    title: "Rise Global Winner profile",
    outlet: "Rise for the World",
    url: "https://www.risefortheworld.org/winners/vansh-gadhia/",
  },
];
