import Link from "next/link";
import Masthead from "@/components/Masthead";
import { projects, papers, media } from "@/lib/projectData";

const EMAIL = "vanshg@stanford.edu";
const GITHUB = "https://github.com/Vvg1105";
const LINKEDIN = "https://linkedin.com/in/vansh-gadhia/";
const SCHOLAR = "https://scholar.google.com/citations?user=76HeMhsAAAAJ&hl=en";

export default function Page() {
  const featured = projects.filter((p) => p.hasPage);
  const other = projects.filter((p) => !p.hasPage);

  return (
    <main className="wrap">
      <Masthead home />

      <figure className="portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/vansh.jpg"
          alt="Vansh Gadhia in the lab, holding the macroencapsulation device"
          width={1200}
          height={817}
        />
      </figure>

      <p>
        Vansh Gadhia is a junior at Stanford studying Electrical Engineering,
        working on bioelectronics and biohybrid devices — where circuits meet
        living tissue.
      </p>

      <p>
        He researches in the{" "}
        <a
          href="https://krishnanlab.stanford.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Krishnan Lab
        </a>
        , designing macroencapsulation devices for living cell therapeutics:
        work aimed at Type 1 Diabetes and other conditions that need sustained
        cell-based drug delivery.
      </p>

      <p>
        He is from Kenya and grew up in Dubai. He is a RISE Global Fellow, a
        program run by Schmidt Futures and the Rhodes Trust.
      </p>

      <h2>Projects</h2>
      <ul>
        {featured.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`}>{p.name}</Link>
            <span className="note"> — {p.summary}</span>
          </li>
        ))}
      </ul>

      {other.length > 0 && (
        <>
          <h2>Other work</h2>
          <ul>
            {other.map((p) => {
              const link = p.links[0];
              return (
                <li key={p.slug}>
                  {link ? (
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                  <span className="note"> — {p.summary}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <h2>Papers</h2>
      <ul>
        {papers.map((paper) => (
          <li key={paper.url}>
            <a href={paper.url} target="_blank" rel="noopener noreferrer">
              {paper.title}
            </a>
            <span className="note"> — {paper.venue}</span>
          </li>
        ))}
      </ul>

      <h2>Media</h2>
      <ul>
        {media.map((item) => (
          <li key={item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
            <span className="note"> — {item.outlet}</span>
          </li>
        ))}
      </ul>

      <h2>Elsewhere</h2>
      <ul>
        <li>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={SCHOLAR} target="_blank" rel="noopener noreferrer">
            Google Scholar
          </a>
        </li>
        <li>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </li>
      </ul>
    </main>
  );
}
