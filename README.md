# Rakesh Majhi - Salesforce & AI Developer Portfolio

A modern, high-performance portfolio website built for **Rakesh Majhi** (Salesforce Developer & Administrator · Agentforce & AI Automation Specialist). Designed for instant hosting on **GitHub Pages** with zero build steps required.

---

## ⚡ Live Highlights & Features

- **Hero & Value Proposition**: Availability status, core stats (2+ yrs experience, 4 production Agentforce agents, 10+ enterprise integrations, 99%+ CI/CD uptime).
- **Official Certifications**: Salesforce Certified Agentforce Specialist & Salesforce AI Associate cards.
- **Dynamic Projects Matrix**: Interactive category filtering (`All`, `Agentforce & AI`, `Integrations`, `LWC & Cloud`, `Full Stack & CI/CD`) covering:
  - In-house Outlook Add-in for Salesforce (Multi-Org OAuth 2.0 PKCE, Dynamic SOQL, 1-Click Email Logging)
  - Agentforce AI Suite for B2B Commerce & Service (4 live agents, ~40% faster first response)
  - Agentforce Unstructured PDF Data Extraction Pipeline
  - Bidirectional Stripe & Multi-Gateway Payment Sync (Stripe, PayPal, CyberSource SOAP, QuickBooks)
  - FastAPI Middleware for Heymilo AI & GoHighLevel (Python, Data Cloud, Platform Events)
  - Automated GitHub CI/CD Pipeline for Salesforce (Scratch orgs, unit test gates, -30% defects)
  - Next.js E-Commerce Booking Flow on AWS Amplify (`planitrentals.com`)
  - Power BI Real-Time Salesforce Analytics Dashboard
- **Architectural Deep Dives**: Flowchart breakdowns of the Multi-Org PKCE Outlook Add-in and Agentforce Action Pipeline.
- **Experience Timeline**: Career journey at Abacus Systems & Solution and Briskode Technologies, with quantified achievements.
- **Interactive Salesforce Developer CLI**: Built-in terminal emulator with commands like `sf org display`, `sf agentforce status`, `sf certs list`, and `sf hire`.
- **Direct Connect**: 1-click email copy with toast alert, direct phone/WhatsApp links, LinkedIn link, and prefilled email contact form.
- **Printable Resume Viewer**: Built-in modal resume ready for viewing or 1-click PDF printing.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

Follow these simple steps to put your website live on GitHub Pages:

### Step 1: Initialize Git and Commit
Open PowerShell or your terminal in this project folder (`d:\MyPortfolio`) and run:

```bash
git init
git add .
git commit -m "Initial commit: Rakesh Majhi Salesforce & AI Portfolio"
```

### Step 2: Create a Repository on GitHub
1. Log into your GitHub account at [https://github.com](https://github.com).
2. Click **New Repository** (or visit [https://github.com/new](https://github.com/new)).
3. Name your repository:
   - **Option A (Personal Site URL):** Name it `<your-username>.github.io` (e.g., `rakeshmajhi57.github.io`). Your site will be hosted directly at `https://<your-username>.github.io`.
   - **Option B (Project Subpath):** Name it `portfolio` or `salesforce-portfolio`. Your site will be hosted at `https://<your-username>.github.io/<repo-name>`.
4. Leave it **Public** and do **not** initialize with a README (we already have one).
5. Click **Create repository**.

### Step 3: Push Your Code to GitHub
In your terminal, run:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
*(Replace `<your-username>` and `<repo-name>` with your actual GitHub username and repository name).*

### Step 4: Enable GitHub Pages
1. On your GitHub repository page, click **Settings** (top tab).
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (the included `.github/workflows/deploy.yml` will automatically deploy it), **OR** select **Deploy from a branch** -> branch: `main` -> folder: `/ (root)` -> click **Save**.
4. Within 1–2 minutes, your website is live! GitHub will display the live URL at the top of the Pages settings page.

---

## 🛠️ Project Structure

```
d:\MyPortfolio/
├── index.html                  # Main portfolio single-page application
├── css/
│   └── style.css               # Custom theme, glassmorphism, animations & typography
├── js/
│   └── main.js                 # Terminal emulator, project filters, copy toast & resume modal
├── assets/                     # Media & asset files
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions automated Pages deployment workflow
├── .gitignore                  # Git ignore rules for Salesforce CLI & OS temp files
└── README.md                   # Project documentation & deployment guide
```

---

## ✏️ Customization

- **Updating your resume or details**: All content is cleanly structured in `index.html`.
- **Styling**: Uses Tailwind CSS utilities via CDN plus custom enhancements in `css/style.css`.
- **Terminal CLI Commands**: Add or update custom commands in the `CLI_COMMANDS` dictionary inside `js/main.js`.
