import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Masthead from "@/components/Masthead";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  getProjectBySlug,
  projects,
  isPlaceholder,
  type Figure,
} from "@/lib/projectData";

export function generateStaticParams() {
  return projects.filter((p) => p.hasPage).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.name} — Vansh Gadhia`, description: project.tagline };
}

/**
 * Renders inline [label](href) links inside prose, so copy in projectData
 * stays plain editable strings. Everything else is emitted as-is.
 */
function renderText(text: string): React.ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const href = m[2];
    const external = /^https?:/i.test(href);
    out.push(
      <a
        key={m.index}
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function FigureBlock({ figure }: { figure: Figure }) {
  if (isPlaceholder(figure)) {
    return (
      <figure className="figure">
        <div className="placeholder">{figure.placeholder}</div>
        {figure.caption && <figcaption>{figure.caption}</figcaption>}
      </figure>
    );
  }

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={figure.src}
      alt={figure.alt}
      width={figure.width}
      height={figure.height}
    />
  );

  return (
    <figure className={figure.wide ? "figure wide" : "figure"}>
      {figure.href ? (
        <a href={figure.href} target="_blank" rel="noopener noreferrer">
          {img}
        </a>
      ) : (
        img
      )}
      {figure.caption && <figcaption>{figure.caption}</figcaption>}
    </figure>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project || !project.hasPage) notFound();

  const more = projects.filter((p) => p.hasPage && p.slug !== slug);

  return (
    <main className="wrap">
      <RevealOnScroll />
      <Masthead />

      <Link href="/" className="back">
        ← Back
      </Link>

      <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
        {project.name}
      </h1>
      <p className="meta">
        {project.date} · {project.tech.join(", ")}
      </p>

      {project.sections ? (
        project.sections.map((sec, i) => (
          <section className="section reveal" key={i}>
            {sec.text.split("\n\n").map((para, j) => (
              <p key={j}>{renderText(para)}</p>
            ))}
            {sec.figure && <FigureBlock figure={sec.figure} />}
          </section>
        ))
      ) : (
        <>
          {project.images.map((img) => (
            <FigureBlock figure={img} key={img.src} />
          ))}
          {project.body.split("\n\n").map((para, i) => (
            <p key={i}>{renderText(para)}</p>
          ))}
        </>
      )}

      {project.links.length > 0 && (
        <ul>
          {project.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <hr className="rule" />

      <h2 style={{ marginTop: 0 }}>More projects</h2>
      <ul>
        {more.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
