import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "@/styles/globals.css";
import Navigation from "@/components/layout/Navigation";
import UtilityBar from "@/components/layout/UtilityBar";
import CommandPalette from "@/components/layout/CommandPalette";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CanvasContainer } from "@/components/3d/CanvasContainer";

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
  style: "italic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rakesh Majhi — Salesforce Developer & Agentforce Specialist",
  description: "Architectural, minimal portfolio of Rakesh Majhi: Apex, LWC, Agentforce AI, and 10+ Enterprise Integrations built at ASSPL.",
  authors: [{ name: "Rakesh Majhi" }],
  keywords: ["Salesforce Developer", "Agentforce Specialist", "Apex", "LWC", "CloudCraze", "OAuth PKCE", "FastAPI"],
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
      <body className="antialiased min-h-screen font-sans selection:bg-[#0176D3] selection:text-white">
        <SmoothScroll>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <CanvasContainer />
          <Navigation />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <UtilityBar />
          <CommandPalette />
        </SmoothScroll>
      </body>
    </html>
  );
}
