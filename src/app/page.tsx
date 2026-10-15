import Link from "next/link";
import Masthead from "@/components/Masthead";
import { projects, papers, media } from "@/lib/projectData";

const EMAIL = "vanshg [at] stanford [dot] edu";
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
        I&apos;m a junior at Stanford studying Electrical Engineering. I work
        broadly around bioelectronics and biohybrid technology — electronics
        built to live inside the body and work with living tissue rather than
        against it.
      </p>

      <p>
        In the{" "}
        <a
          href="https://krishnanlab.stanford.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Krishnan Lab
        </a>{" "}
        I build implants that keep engineered cells alive under the skin, so
        they can produce a drug continuously instead of the patient re-dosing. I
        also work on biosensing, and on the wearables that power the implant and
        talk to it from outside.
      </p>

      <p>
        I&apos;m from Kenya and grew up in Dubai. I&apos;m a Rise Global Winner,
        a fellowship run by Schmidt Futures and the Rhodes Trust.
      </p>

      <p className="links">
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={SCHOLAR} target="_blank" rel="noopener noreferrer">
          Google Scholar
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
        <span className="email">{EMAIL}</span>
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

    </main>
  );
}
