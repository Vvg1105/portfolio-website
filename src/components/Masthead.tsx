import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

/** Name on the left, theme toggle on the right. `home` renders it as a heading. */
export default function Masthead({ home = false }: { home?: boolean }) {
  return (
    <header className="masthead">
      {home ? (
        <h1>Vansh Gadhia</h1>
      ) : (
        <p className="name">
          <Link href="/">Vansh Gadhia</Link>
        </p>
      )}
      <ThemeToggle />
    </header>
  );
}
