# Rakesh Majhi · Architectural 3D Developer Portfolio

A quiet, precise, production-grade portfolio website for **Rakesh Majhi** (Salesforce Developer & Administrator · Agentforce & AI Specialist), architected with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Three.js / React Three Fiber**.

> **Affiliation & Privacy Notice:**
> - All enterprise projects and client repositories were engineered at **Abacus System & Solution Pvt. Ltd. (ASSPL)** and are confidential. Demos use synthetic sample data.
> - Not affiliated with Salesforce, Inc.

---

## 🏛️ Architectural Design Direction: "Quiet, Precise, 3D"

Designed like a modern architectural studio portfolio crossed with an enterprise developer's lab:
- **No AI visual cliches:** Zero gradient hero cards, zero blurred color blobs, zero glassmorphism cards, zero floating particles, and zero generic tech emojis.
- **Strict 12-Column Grid:** Hairline 1px borders, numbered section indexes (`01 / HERO`, `02 / ABOUT`, `03 / SKILLS`, `04 / EXPERIENCE`, `05 / PROJECTS`, `06 / PLAYGROUND`, `07 / METRICS`, `08 / CONTACT`).
- **One Hero 3D Object:** A procedural matte clay/graphite architectural cloud cluster that morphs smoothly across 5 distinct scroll-linked states via damped interpolation.
- **Single Accent Rule:** `#0176D3` (Salesforce Blue) used strictly for interactive states and focus points; `#FE9339` (Amber) used strictly for live status indicators.

---

## 🛠️ Stack & Technologies

- **Framework:** Next.js 15 (App Router, strict TypeScript, static export `output: 'export'`)
- **UI & Styling:** React 19, Tailwind CSS v4 (`@tailwindcss/postcss` with `@theme` tokens)
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Interactive Canvases:** `@xyflow/react` (Flow Builder)
- **State Management:** Zustand
- **Smooth Scrolling:** Lenis
- **Command Palette:** `cmdk` (triggered via `Cmd+K` / `Ctrl+K`)
- **Testing:** Vitest
- **Target Hosting:** GitHub Pages (static export to `out/` with `.nojekyll` and dynamic `basePath`)

---

## 🔬 Interactive Developer Lab & Demos (Section 06)

1. **SOQL Studio**: In-browser SOQL editor with syntax verification, sample dataset filters (`Opportunity`, `Contact`, `Agentforce_Log__c`), latency metrics, and JSON export.
2. **OAuth 2.0 PKCE Lab**: Live Web Crypto API generator for SHA-256 base64url challenge and code verifier pairs, simulating real Connected App token exchanges.
3. **Flow Builder Canvas**: Interactive node-graph canvas built with `@xyflow/react` modeling an enterprise record-triggered flow with Agentforce invocables.
4. **Integration Topology Map**: Real-time network map modeling 8 enterprise endpoints (Stripe, QuickBooks, CyberSource SOAP, Outlook Add-in, FastAPI, Power BI).
5. **Agentforce Autonomous Simulator**: Step-by-step trace through Einstein Trust Layer PII masking, topic routing, and Invocable Apex action execution.
6. **Apex Governor Limits Simulation**: Interactive transaction context monitoring SOQL, DML, CPU, and Heap limits with anti-pattern alarms and Queueable offloading.
7. **Release Pipeline Visualizer**: Interactive GitHub Actions CI/CD runner step-by-step through PMD linting, unit tests (>85% gate), and scratch org deployment.
8. **Vibe Lab Code Review**: Side-by-side comparison between raw AI code and Rakesh's production-hardened review with bulkification and `WITH USER_MODE`.

---

## 🚀 Local Development & Build

### Prerequisites
- Node.js `20.9+` (LTS) or `24.x`
- `pnpm` (v10+ or v12+)

### Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run unit test suite (Vitest)
pnpm test

# Build static production bundle (outputs to out/)
pnpm build
```

---

## 📦 Deployment to GitHub Pages

The repository includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Runs `pnpm install` and `pnpm test`.
2. Runs `pnpm build` with `NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }}`.
3. Deploys the static `out/` directory using `actions/deploy-pages@v4`.
