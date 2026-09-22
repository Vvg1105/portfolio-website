import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vansh Gadhia",
  description:
    "Vansh Gadhia is a junior at Stanford studying Electrical Engineering, working on bioelectronics and biohybrid devices.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

// Runs before first paint so the page never flashes the wrong theme.
const themeScript = `
try {
  var t = localStorage.getItem("theme");
  if (t !== "light" && t !== "dark") {
    t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", t);
} catch (e) {}

// Arm the scroll reveal before first paint so sections never flash in.
// Only when the browser can observe and the visitor hasn't asked for less
// motion; the timeout un-arms it if hydration never lands, so prose can
// never be left permanently hidden.
try {
  var r = document.documentElement;
  if ("IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    r.setAttribute("data-reveal", "on");
    setTimeout(function () {
      if (!r.hasAttribute("data-reveal-ready")) r.removeAttribute("data-reveal");
    }, 2500);
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={serif.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
