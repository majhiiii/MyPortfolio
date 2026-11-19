import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "@/styles/globals.css";
import Navigation from "@/components/layout/Navigation";
import UtilityBar from "@/components/layout/UtilityBar";
import CommandPalette from "@/components/layout/CommandPalette";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CanvasContainer } from "@/components/3d/CanvasContainer";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { TerminalModal } from "@/components/ui/TerminalModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rakesh Majhi — Software Engineer & Multi-Stack Builder",
  description: "Portfolio of Rakesh Majhi: Full-Stack Web, Cloud Infrastructure, AI Agents, and Enterprise Systems built at ASSPL and Briskode.",
  authors: [{ name: "Rakesh Majhi" }],
  keywords: ["Software Engineer", "Full-Stack Developer", "Next.js", "React", "Python", "AWS", "Agentforce", "Salesforce", "FastAPI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('rm_portfolio_theme');
                if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.removeAttribute('data-theme');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen font-sans selection:bg-[#0F6BFF] selection:text-white">
        <SmoothScroll>
          <div className="film-grain" aria-hidden="true" />
          <Preloader />
          <CustomCursor />
          <ScrollProgress />
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <CanvasContainer />
          <Navigation />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <UtilityBar />
          <CommandPalette />
          <TerminalModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
