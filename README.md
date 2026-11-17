# Rakesh Majhi · Cloud Workspace Portfolio

A modern portfolio website for **Rakesh Majhi** (Salesforce Developer & Administrator · Agentforce & AI Specialist), designed under the **"Cloud Workspace"** aesthetic: a clean, airy, trustworthy Salesforce Lightning app crossed with a developer's personal lab. 

> **Trademark & Affiliation Notice:** Original artwork only. Not affiliated with Salesforce.

---

## 🎨 Design System & Tokens Guide

The site implements a full CSS variable token architecture with native light and dark mode support, fluid typography, and WCAG AA contrast compliance across all text and surfaces.

### 1. Color Palette Tokens

| Token | Light Mode (`:root`) | Dark Mode (`[data-theme="dark"]`) | Usage / Contrast |
| :--- | :--- | :--- | :--- |
| `--bg` | `#F7FAFD` | `#061226` | Page background |
| `--surface` | `#FFFFFF` | `#0C1D38` | Primary cards, panels, modals |
| `--surface-2` | `#EAF5FE` | `#11284A` | Secondary surfaces, chips, inputs |
| `--surface-3` | `#DDF0FF` | `#183560` | Hover states, tab containers |
| `--text` | `#0B1F3A` | `#EAF2FF` | Primary headings & body (WCAG AAA &gt;15:1) |
| `--text-muted` | `#4A5B72` | `#9FB3CE` | Secondary text, captions (WCAG AA &gt;6.2:1) |
| `--border` | `#D8E3F0` | `#1D3558` | Structural dividing borders & cards |
| `--primary` | `#0176D3` | `#1B96FF` | Brand primary, action buttons, active tabs |
| `--primary-hover` | `#014486` | `#5EB4FF` | Interactive hover & focus states |
| `--navy` | `#032D60` | `#EAF2FF` | Deep contrast text & tooltips |
| `--accent-teal` | `#06A59A` | `#14D2C3` | Document AI & data highlights |
| `--accent-green` | `#2E844A` | `#38C172` | Success badges, 99%+ uptime |
| `--accent-amber` | `#B85D00` | `#FFA94D` | FinTech, payment sync highlights (WCAG AA) |
| `--accent-violet` | `#673AB7` | `#A78BFA` | Agentforce AI badges & gradients |
| `--gradient-hero`| `linear-gradient(135deg, #EAF5FE 0%, #D6ECFF 50%, #F7FAFD 100%)` | `linear-gradient(135deg, #0A1E3E 0%, #061226 60%, #030A17 100%)` | Hero & contact banner backdrop |
| `--gradient-cta` | `linear-gradient(135deg, #0176D3, #1B96FF)` | `linear-gradient(135deg, #1B96FF, #0176D3)` | Primary action buttons |

### 2. Spacing, Radii & Elevation

- **Radii:**
  - Chips & Pills: `8px` (`--radius-chip`)
  - Cards: `16px` (`--radius-card`)
  - Hero Panels & Modal Dialogs: `24px` (`--radius-panel`)
- **Spacing Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`.
- **Vertical Section Padding:** `96px` desktop (`py-24`), `64px` mobile (`py-16`).
- **Max Content Width:** `1200px` (`max-w-[1200px]`), with a max reading length of `70ch` on prose paragraphs.
- **Shadows:** Soft and layered in light mode (`0 1px 2px rgba(3,45,96,.06)`, `0 8px 24px rgba(3,45,96,.08)`). In dark mode, borders and subtle ambient glows (`0 0 24px rgba(27,150,255,.15)`) replace heavy drop shadows.

### 3. Typography Hierarchy

- **Headings Font:** `Plus Jakarta Sans` (weights 700 and 800), with `-0.02em` tracking.
- **Body Font:** `Inter` (weights 400, 500, 600) at fluid `17px` with `1.65` line-height.
- **Code & Chips Font:** `JetBrains Mono` (weights 400, 500, 600).
- **Scale (Fluid with CSS Clamp):**
  - **H1:** `clamp(2.5rem, 4.5vw + 1rem, 4.25rem)` (56px to 72px)
  - **H2:** `clamp(1.85rem, 2.5vw + 0.75rem, 2.5rem)` (36px to 44px)
  - **H3:** `clamp(1.25rem, 1.2vw + 0.5rem, 1.5rem)` (22px to 26px)
  - **Body:** `17px` / `1.65` line-height
  - **Small / Metadata:** `14px`

---

## 📸 Responsive Verification Screenshots

Full-fidelity headless captures rendered at the required responsive breakpoints:

| Breakpoint | Light Mode | Dark Mode |
| :--- | :--- | :--- |
| **Desktop (1440px)** | [desktop_light_1440.png](screenshots/desktop_light_1440.png) | [desktop_dark_1440.png](screenshots/desktop_dark_1440.png) |
| **Tablet (768px)** | [tablet_light_768.png](screenshots/tablet_light_768.png) | [tablet_dark_768.png](screenshots/tablet_dark_768.png) |
| **Mobile (375px)** | [mobile_light_375.png](screenshots/mobile_light_375.png) | [mobile_dark_375.png](screenshots/mobile_dark_375.png) |

---

## ⚡ Core Sections & Feature Specifications

1. **Top Navigation**:
   - Sticky glass navigation with `backdrop-filter: blur(12px)`.
   - Scroll progress indicator bar (gradient fill matching page scroll).
   - Monogram "RM" in an original cloud silhouette.
   - Smooth light/dark mode switch saved to `localStorage`.
   - Active section highlighted via `IntersectionObserver`.
   - Mobile: full-height slide-in panel with accessible tap targets (&ge;44px).

2. **Hero Section (Full Viewport)**:
   - Status pill: *"Salesforce Developer · Agentforce · Integrations"* with a pulsing green dot.
   - Fluid H1 with typing animation cycling across:
     - *"I build Salesforce apps."*
     - *"I ship Agentforce agents."*
     - *"I connect systems with APIs."*
     - *"I vibe code with AI, and review every line."*
   - Pure HTML/CSS **Salesforce Lightning Window Mockup** simulating a live Agentforce autonomous case triage chat with orbiting tech chips (`Apex`, `LWC`, `Flow`, `Agentforce`, `REST`, `OAuth 2.0 PKCE`).
   - Animated count-up stats row: **2+ yrs experience**, **4 production AI agents**, **10+ integrations**, **3 concurrent projects**.

3. **About & Credentials**:
   - Cloud-masked profile ring placeholder `[PHOTO_URL]`.
   - Quick facts: Location (Bhubaneswar), Focus (Salesforce + AI), Education (B.Tech CSE), Credentials.
   - Original shield badge cards for **Salesforce Certified Agentforce Specialist** and **Salesforce AI Associate** with `[CREDENTIAL_URL]` verification links.

4. **Skills ("The Skill Cloud")**:
   - 7 groups: *Salesforce Dev*, *Platforms & Clouds*, *Admin & Automation*, *Agentforce & AI*, *Integrations & APIs*, *Full-stack & Cloud*, *Delivery & Tooling*.
   - Honest proficiency tiers: **Daily use** vs. **Used in projects** (no fake percentage bars).
   - Every chip has a hover tooltip detailing where the technology was deployed in production.
   - View toggle: **Grid View** & **Cloud View** (cluster view inside a cloud canvas).

5. **Experience (Vertical Timeline)**:
   - Alternating timeline on desktop, collapsed to left on mobile, with original cloud node icons.
   - Role cards for **Abacus System & Solution Pvt. Ltd.** and **Briskode Technology Pvt. Ltd.**
   - Metric callouts: `~40%` faster response, `~25%` ticket reduction, `~30%` defect reduction, `99%+` release uptime.

6. **Projects & Case Study Modals**:
   - Animated pill filter: `All`, `Salesforce`, `AI`, `Integrations`, `Full-stack`.
   - **Feature Card**: *In-House Outlook Add-in for Salesforce* featuring an **interactive OAuth 2.0 PKCE flowchart** with animated directional hover state.
   - Detailed project cards with `[DEMO_URL]` and `[REPO_URL]` actions.
   - Accessible case study modal with focus trap, Escape key dismiss, and structured sections: Problem, Approach, Architecture, Challenges, Result.

7. **Vibe Coding ("Built with AI")**:
   - Contrast dark navy section (`#061226`) with subtle dotted code-grid background.
   - Horizontal 6-stage pipeline: **Prompt → Plan → Generate → Review → Test → Deploy**.
   - Faux IDE terminal showing live prompt typing and applied Apex diff.
   - Engineering discipline checklist: *"I read every diff"*, *"I write tests for business logic"*, *"I never paste secrets into prompts"*, *"I own the code"*.
   - Tool chips for Claude Code, Google Antigravity, and ChatGPT API.

8. **Contact & Footer**:
   - Headline: *"Let's build something great."* (no trademarked slogans).
   - Direct Email mailto link, LinkedIn, GitHub, and 1-click **Copy Email** with a floating toast alert.
   - **No form backend, no phone number on page.**
   - Footer: `© 2026 Rakesh Majhi · Built with AI-assisted development · Not affiliated with Salesforce.`

9. **Accessibility & Motion**:
   - `skip-to-content` link at top.
   - Visible `2px` focus rings with offset.
   - Full support for `prefers-reduced-motion` (turns off typing loops, parallax, and count-up animations).

---

## 🚀 How to Host on GitHub Pages

1. **Commit and Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete Cloud Workspace portfolio under new design spec"
   git push -u origin main
   ```
2. **Enable GitHub Pages:**
   - In your repository on GitHub, open **Settings → Pages**.
   - Under **Build and deployment → Source**, choose **GitHub Actions** (the included `.github/workflows/deploy.yml` will automatically build and publish the site) or select **Deploy from a branch** (`main` / `/ root`).
   - Your site will be live at `https://<your-username>.github.io/<repo-name>`.
