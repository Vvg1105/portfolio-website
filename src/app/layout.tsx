import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import PCBBackground from "@/components/PCBBackground";

const inter     = Inter({       subsets: ["latin"], variable: "--font-inter",  display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], variable: "--font-mono",   display: "swap", weight: ["400","700"] });

export const metadata: Metadata = {
  title: "Vansh Gadhia",
  description: "EECS @ Stanford — Researcher, Builder, RISE Global Fellow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen antialiased">
        <PCBBackground />
        {children}
      </body>
    </html>
  );
}
