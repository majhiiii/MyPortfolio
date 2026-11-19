import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { RecordTabBar } from "@/components/layout/RecordTabBar";
import { BackdropScene } from "@/components/layout/BackdropScene";
import CommandPalette from "@/components/layout/CommandPalette";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rakesh Majhi — Salesforce Developer",
  description: "Salesforce Developer at ASSPL specializing in Apex, LWC, Agentforce AI, and enterprise integrations.",
  authors: [{ name: "Rakesh Majhi" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
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
      <body className="min-h-screen flex flex-col font-sans antialiased text-[var(--ink)] bg-[var(--bg)] selection:bg-[var(--turmeric)] selection:text-[var(--ink)]">
        <BackdropScene />
        <a href="#overview" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <RecordTabBar />
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <CommandPalette />
        </SmoothScroll>
      </body>
    </html>
  );
}
