export const PERSONAL_DATA = {
  name: "Rakesh Majhi",
  title: "Salesforce Developer & Administrator · Agentforce & Integrations",
  location: "Bhubaneswar, India",
  email: "rakeshmajhi.connect@gmail.com",
  linkedin: "https://linkedin.com/in/rakeshmajhi57",
  github: "https://github.com/rakeshmajhi57",
  experienceYears: "2",
  status: "Available for Salesforce & AI Engineering Roles",
  privacyNotice: "Built at ASSPL. Source and live systems are private. Walkthroughs use sample data.",
  disclaimer: "Not affiliated with Salesforce.",
};

export const FACTS = [
  { label: "LOCATION", value: "Bhubaneswar, India (IST / US Overlap)" },
  { label: "EXPERIENCE", value: "2 Years Enterprise Salesforce & Integrations" },
  { label: "CURRENT ROLE", value: "Software Developer @ Abacus System & Solution Pvt. Ltd. (Nov 2024 – Present)" },
  { label: "PREVIOUS ROLE", value: "Web Development Intern @ Briskode Technology Pvt. Ltd. (Mar 2024 – Oct 2024)" },
  { label: "EDUCATION", value: "B.Tech in Computer Science · Raajdhani Engineering College (2019 – 2023)" },
  { label: "TRAINING", value: "Python Full Stack & Data Science · Abacus Systems (2023 – 2024)" },
];

export const CERTIFICATIONS = [
  {
    title: "Salesforce Certified Agentforce Specialist",
    issuer: "Salesforce",
    id: "CERT-AGF-90214",
    status: "Active & Verified",
    summary: "Validated architecture and deployment of autonomous Agentforce agents, Agent Builder Topics, Actions, and trust guardrails.",
  },
  {
    title: "Salesforce AI Associate",
    issuer: "Salesforce",
    id: "CERT-AI-44109",
    status: "Active & Verified",
    summary: "Foundational CRM AI concepts, ethical governance, predictive/generative models, and Einstein trust layer.",
  },
];

export const METRICS = [
  {
    value: "~40%",
    label: "First-Response Reduction",
    tag: "Agentforce Live on Experience Cloud",
    narrative: "Deployed 4 autonomous production Agentforce agents handling employee queries, guided shopping, log analysis, and customer triage, cutting manual turnaround time by ~40%.",
  },
  {
    value: "~25%",
    label: "Billing Dispute Reduction",
    tag: "B2B Commerce (CloudCraze)",
    narrative: "Resolved order splitting and credit-system reconciliation with Stripe and QuickBooks Online, dropping open client billing tickets by ~25%.",
  },
  {
    value: "~30%",
    label: "Production Issue Reduction",
    tag: "Automated GitHub CI/CD",
    narrative: "Architected multi-branch scratch org CI/CD workflows with automated unit test enforcement (>85% coverage gate) and PMD static analysis.",
  },
  {
    value: "99%+",
    label: "Release Uptime",
    tag: "3 Concurrent Project Tracks",
    narrative: "Maintained zero-downtime deployments across concurrent client tracks in Health Cloud, B2B Commerce, and custom LWC applications.",
  },
  {
    value: "10+",
    label: "Enterprise Integrations",
    tag: "REST, SOAP, OAuth & Webhooks",
    narrative: "Production integrations across Stripe, PayPal, CyberSource (SOAP), QuickBooks Online, GoHighLevel, Heymilo AI, Google Sheets, and Power BI.",
  },
  {
    value: "4",
    label: "Junior Engineers Mentored",
    tag: "Agile/Scrum Delivery",
    narrative: "Conducting daily pull request reviews, architectural coaching, and unblocking for junior engineers across active sprint tracks.",
  },
];

export const EXPERIENCE_RAIL = [
  {
    period: "NOV 2024 – PRESENT",
    role: "Software Developer – Salesforce & AI Integrations",
    company: "Abacus System & Solution Pvt. Ltd.",
    location: "Bhubaneswar, India",
    bullets: [
      "Lead technical delivery across 3 concurrent production client tracks (B2B Commerce, Health Cloud, Custom LWC), mentoring 4 junior developers with daily code reviews.",
      "Direct day-to-day communication with US and global stakeholders in Agile sprints, translating requirements into sprint-ready technical tasks.",
      "Designed and deployed 4 production Agentforce agents on Experience Cloud, cutting manual first-response handling time by ~40%.",
      "Built an in-house Outlook Add-in for Salesforce replacing third-party connectors: Connected App with OAuth 2.0 PKCE, dynamic SOQL schema discovery, and idempotent 1-click email logging.",
      "Shipped 10+ enterprise integrations over REST/SOAP and OAuth (Stripe, PayPal, CyberSource SOAP, QuickBooks Online, GoHighLevel, FastAPI).",
      "Engineered automated GitHub CI/CD pipelines for Salesforce releases, cutting recurring defects by ~30% with 99%+ uptime.",
    ],
    tech: ["Apex", "LWC", "Agentforce", "OAuth 2.0 PKCE", "Flow Builder", "FastAPI", "GitHub Actions"],
  },
  {
    period: "MAR 2024 – OCT 2024",
    role: "Web Development Intern",
    company: "Briskode Technology Pvt. Ltd.",
    location: "Bhubaneswar, India",
    bullets: [
      "Built and shipped 10+ responsive UI components and pages using React.js and Next.js for client-facing SaaS products.",
      "Designed and consumed REST APIs connecting frontend and backend, enabling reliable production data flow.",
      "Gained hands-on experience in component architecture, agile sprint cadences, and production deployment workflows.",
    ],
    tech: ["React.js", "Next.js", "REST APIs", "JavaScript (ES6+)", "Tailwind CSS"],
  },
];

export const PROJECTS_LIST = [
  {
    id: "outlook-addin",
    number: "01",
    title: "In-House Outlook Add-in for Salesforce",
    subtitle: "Multi-Org OAuth 2.0 PKCE & Dynamic SOQL",
    privacyBadge: "Private · Built at ASSPL",
    description: "Replaced commercial third-party connectors with an in-house Connected App featuring multi-org OAuth 2.0 PKCE login, dynamic SOQL schema discovery, and 1-click idempotent email logging.",
    tech: ["Connected Apps", "OAuth 2.0 PKCE", "Dynamic SOQL", "REST API", "Office.js"],
    metrics: "Replaced paid licensing across team; zero hardcoded org limits",
  },
  {
    id: "agentforce-suite",
    number: "02",
    title: "Agentforce AI Suite for B2B Commerce",
    subtitle: "Autonomous Agents live on Experience Cloud",
    privacyBadge: "Private · Built at ASSPL",
    description: "Designed and deployed 4 production Agentforce agents (Employee, Guided Shopping, Debug Log Analyzer, Customer Service) with custom Topics, Invocable Apex Actions, and Einstein Trust Layer guardrails.",
    tech: ["Agentforce", "Agent Builder", "Topics & Actions", "Apex Invocables", "Experience Cloud"],
    metrics: "~40% faster first-response turnaround across communities",
  },
  {
    id: "pdf-pipeline",
    number: "03",
    title: "Agentforce PDF Extraction & Record Pipeline",
    subtitle: "Unstructured Document AI Automation",
    privacyBadge: "Private · Built at ASSPL",
    description: "Automated document ingestion pipeline pairing Agentforce extraction with async Apex queues to transform inbound PDF invoices and purchase orders into validated CRM records.",
    tech: ["Agentforce", "PDF Parsing", "Async Apex", "Validation Rules", "Flow Builder"],
    metrics: "Zero manual data entry; automated relational record creation",
  },
  {
    id: "stripe-sync",
    number: "04",
    title: "Bidirectional Stripe & Multi-Gateway Sync",
    subtitle: "FinTech Order & Credit Management",
    privacyBadge: "Private · Built at ASSPL",
    description: "Production payment integrations across Stripe, PayPal, and CyberSource (SOAP). Handled B2B Commerce order splitting, automated dispute reconciliation, and customer credit adjustment with QuickBooks.",
    tech: ["Stripe API", "CyberSource SOAP", "QuickBooks Online", "Apex Webhooks", "OAuth 2.0"],
    metrics: "~25% reduction in open client billing dispute tickets",
  },
  {
    id: "fastapi-middleware",
    number: "05",
    title: "FastAPI Middleware for Heymilo AI & GoHighLevel",
    subtitle: "Python Event Streaming & Data Cloud",
    privacyBadge: "Private · Built at ASSPL",
    description: "High-throughput asynchronous Python FastAPI middleware bridging third-party candidate and CRM platforms to Salesforce using Platform Events and Data Cloud streaming.",
    tech: ["Python 3", "FastAPI", "Platform Events", "Data Cloud", "GoHighLevel API"],
    metrics: "99.9% delivery reliability with automated failure retry queues",
  },
  {
    id: "cicd-pipeline",
    number: "06",
    title: "Automated GitHub CI/CD for Salesforce",
    subtitle: "Scratch Org Validation & Zero-Downtime Release",
    privacyBadge: "Private · Built at ASSPL",
    description: "Multi-branch deployment automation with Salesforce CLI (sf), automated Apex unit test coverage checks (>85% threshold), PMD static analysis, and zero-downtime releases.",
    tech: ["GitHub Actions", "Salesforce CLI (sf)", "Scratch Orgs", "Bash", "PMD"],
    metrics: "~30% reduction in production regressions; 99%+ release uptime",
  },
  {
    id: "ecommerce-booking",
    number: "07",
    title: "Next.js E-Commerce Booking Engine",
    subtitle: "AWS Amplify + Salesforce REST API",
    privacyBadge: "Production Cloud App (planitrentals.com)",
    description: "Full-stack booking experience on AWS Amplify using Next.js with Lambda microservices, RDS MySQL inventory reservation locking, and Salesforce REST customer synchronization.",
    tech: ["Next.js", "AWS Amplify", "AWS Lambda", "RDS MySQL", "Salesforce REST"],
    metrics: "Live production rental platform with concurrency-safe availability locks",
  },
  {
    id: "powerbi-analytics",
    number: "08",
    title: "Power BI Real-Time Salesforce Analytics",
    subtitle: "SOQL Data Streaming & Executive Reporting",
    privacyBadge: "Private · Built at ASSPL",
    description: "Automated real-time Salesforce data pipeline feeding executive Power BI dashboards with lead conversion velocity, opportunity pipeline metrics, and role-hierarchy data governance.",
    tech: ["Power BI", "Sales Cloud", "SOQL Query Pipeline", "Role Hierarchy"],
    metrics: "Saved ~5 hours of manual spreadsheet compilation per week",
  },
];

export const SKILLS_TREE = [
  {
    id: "salesforce-dev",
    category: "Programmatic Development",
    items: [
      { name: "Apex Classes & Triggers", tier: "Daily use", context: "Triggers, async queues, batch jobs, and unit tests (>85% coverage gate)." },
      { name: "Lightning Web Components (LWC)", tier: "Daily use", context: "15+ custom LWCs pixel-matched to Zeplin designs for Experience Cloud." },
      { name: "Aura Components", tier: "Used in projects", context: "Maintained and refactored legacy components on client storefronts." },
      { name: "Visualforce (VFP)", tier: "Used in projects", context: "CloudCraze B2B Commerce customizations and document generation." },
      { name: "SOQL & Dynamic SOQL", tier: "Daily use", context: "Metadata-driven dynamic queries in Outlook Add-in with USER_MODE security." },
      { name: "Platform Events", tier: "Daily use", context: "Event-driven asynchronous order billing and external middleware triggers." },
      { name: "Salesforce CLI (sf)", tier: "Daily use", context: "Scratch org lifecycle automation, source tracking, and CI/CD deployment scripts." },
    ],
  },
  {
    id: "agentforce-ai",
    category: "Agentforce & AI",
    items: [
      { name: "Agent Builder & Topics", tier: "Daily use", context: "Configured 4 production Agentforce agents with topic routing and guardrails." },
      { name: "Apex Invocable Actions", tier: "Daily use", context: "Transactional Apex methods invoked by Agentforce planners for live CRM actions." },
      { name: "PDF Data Extraction Pipeline", tier: "Daily use", context: "Document parsing converting unstructured purchase orders into relational CRM records." },
      { name: "Einstein Trust Layer", tier: "Daily use", context: "Enforced PII masking, toxicity checking, and grounded live CRM queries." },
      { name: "ChatGPT API Integration", tier: "Used in projects", context: "Dormant customer reactivation engine with automated outreach queues." },
      { name: "Einstein Bots", tier: "Used in projects", context: "Health Cloud patient support dialogues and symptom triage routing." },
    ],
  },
  {
    id: "platforms",
    category: "Platforms & Clouds",
    items: [
      { name: "Sales Cloud", tier: "Daily use", context: "Lead conversion, account management, and opportunity-to-order automation." },
      { name: "Service Cloud", tier: "Daily use", context: "Case management, omnichannel triage, and automated resolution dispatch." },
      { name: "Experience Cloud", tier: "Daily use", context: "Customer & Partner Communities, hosted Agentforce conversational agents." },
      { name: "B2B Commerce (CloudCraze & Lightning)", tier: "Daily use", context: "Order management, order splitting, billing resolution, and storefront migration." },
      { name: "Health Cloud", tier: "Daily use", context: "Patient and member workflows, care coordination, and conversational bot triage." },
      { name: "Data Cloud", tier: "Used in projects", context: "Real-time data stream synchronization and org-to-org data mapping." },
    ],
  },
  {
    id: "integrations",
    category: "Integrations & APIs",
    items: [
      { name: "REST & SOAP APIs", tier: "Daily use", context: "Built and consumed 10+ production endpoints with comprehensive error handling." },
      { name: "OAuth 2.0 PKCE", tier: "Daily use", context: "Connected App auth protocol for in-house Outlook Add-in across any org." },
      { name: "Stripe & PayPal Sync", tier: "Daily use", context: "Bidirectional payment synchronization, webhook listeners, and chargeback handling." },
      { name: "CyberSource (SOAP)", tier: "Daily use", context: "Enterprise credit card processing and settlement verification." },
      { name: "QuickBooks Online", tier: "Daily use", context: "Customer credit system integration automating billing balance adjustments." },
      { name: "FastAPI / Python", tier: "Daily use", context: "Asynchronous middleware services connecting third-party platforms to Salesforce." },
    ],
  },
  {
    id: "admin-security",
    category: "Admin & Security Governance",
    items: [
      { name: "Flow Builder", tier: "Daily use", context: "Record-triggered, scheduled, screen, and autolaunched flows across all projects." },
      { name: "Security & Sharing Model", tier: "Daily use", context: "Profiles, permission sets, roles, sharing rules, and access audit verification." },
      { name: "Validation Rules & Approvals", tier: "Daily use", context: "Business logic enforcement and multi-tier approval process design." },
      { name: "User Administration", tier: "Daily use", context: "Onboarding/offboarding, license allocation, password policies, MFA/SSO." },
      { name: "Reports & Dashboards", tier: "Daily use", context: "Sales conversion tracking, pipeline velocity, and executive KPI visibility." },
    ],
  },
];
