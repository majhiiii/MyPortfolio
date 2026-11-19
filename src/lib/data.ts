export const PERSONAL_DATA = {
  name: "Rakesh Majhi",
  title: "Salesforce Developer · Apex, LWC, B2B Commerce & Integrations",
  location: "Bhubaneswar, India",
  email: "rakeshmajhi.connect@gmail.com",
  linkedin: "https://linkedin.com/in/rakeshmajhi57",
  github: "https://github.com/rakeshmajhi57",
  experienceYears: "2",
  status: "Available for Salesforce & Full-Stack Developer Roles",
  privacyNotice: "Built at ASSPL. Client projects and live orgs are private under NDA. Walkthroughs use synthetic sample data.",
  disclaimer: "Not affiliated with Salesforce, Inc.",
};

export const FACTS = [
  { label: "LOCATION", value: "Bhubaneswar, India (IST / US Timezone Overlap)" },
  { label: "EXPERIENCE", value: "2 Years Enterprise Salesforce Development & Integrations" },
  { label: "CURRENT ROLE", value: "Software Developer @ Abacus System & Solution Pvt. Ltd. (Nov 2024 – Present)" },
  { label: "PREVIOUS ROLE", value: "Web Development Intern @ Briskode Technology Pvt. Ltd. (Mar 2024 – Oct 2024)" },
  { label: "EDUCATION", value: "B.Tech in Computer Science · Raajdhani Engineering College (2019 – 2023)" },
  { label: "TRAINING", value: "Python Full Stack & Enterprise Development · Abacus Systems (2023 – 2024)" },
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
    value: "2 Years",
    label: "Production Experience",
    tag: "Abacus System & Solution Pvt. Ltd.",
    narrative: "Hands-on engineering across B2B Commerce, Sales Cloud, Service Cloud, Experience Cloud, and enterprise integrations.",
  },
  {
    value: "10+",
    label: "Enterprise Integrations",
    tag: "REST, SOAP & OAuth 2.0",
    narrative: "Production integrations across UPS Shipping, Avalara AvaTax, Stripe, PayPal, CyberSource (SOAP), QuickBooks Online, Apollo.io, and FastAPI.",
  },
  {
    value: ">85%",
    label: "Test Coverage Standard",
    tag: "Automated GitHub CI/CD",
    narrative: "Enforced strict unit test isolation, mock HTTP callouts, and PMD static code analysis across all production release branches.",
  },
  {
    value: "4",
    label: "Production AI Agents",
    tag: "Agentforce Live on Experience Cloud",
    narrative: "Configured Topics, Invocable Apex actions, and trust layer guardrails for customer service, order triage, and internal developer assistance.",
  },
  {
    value: "1-Page",
    label: "B2B Checkout Flow",
    tag: "CloudCraze Storefront Customization",
    narrative: "Overrode core CloudCraze service classes and hooks to streamline multi-step wholesale ordering into a unified checkout interface.",
  },
  {
    value: "4",
    label: "Junior Engineers Mentored",
    tag: "Agile / Scrum Delivery",
    narrative: "Daily code reviews, unblocking sprint tasks, and coaching on Apex bulkification, governor limits, and LWC state management.",
  },
];

export const EXPERIENCE_RAIL = [
  {
    period: "NOV 2024 – PRESENT",
    role: "Software Developer – Salesforce & AI Integrations",
    company: "Abacus System & Solution Pvt. Ltd.",
    location: "Bhubaneswar, India",
    bullets: [
      "Develop custom Apex classes, triggers, and Lightning Web Components (LWC) across B2B Commerce, Sales Cloud, and Service Cloud client tracks.",
      "Override B2B Commerce (CloudCraze) services and logic hooks to implement custom pricing structures, requisition workflows, and a 1-page checkout flow.",
      "Build custom 2D layout and 3D visual configurators in LWC for industrial equipment quoting and dynamic spec-sheet generation.",
      "Integrate enterprise third-party APIs over REST and SOAP (UPS shipping rates/tracking, Avalara AvaTax compliance, NACHA ACH banking, Stripe, and QuickBooks Online).",
      "Deploy autonomous Agentforce agents and Invocable Apex actions on Experience Cloud for case triage and automated chat summarization.",
      "Manage release engineering via GitHub Actions CI/CD pipelines, enforcing >85% unit test coverage and PMD code quality standards.",
    ],
    tech: ["Apex", "LWC", "B2B Commerce (CloudCraze)", "Agentforce", "OAuth 2.0 PKCE", "REST/SOAP", "GitHub Actions"],
  },
  {
    period: "MAR 2024 – OCT 2024",
    role: "Web Development Intern",
    company: "Briskode Technology Pvt. Ltd.",
    location: "Bhubaneswar, India",
    bullets: [
      "Built and shipped 10+ responsive frontend UI components and pages using React.js and Next.js for client SaaS applications.",
      "Integrated REST APIs connecting frontend views with backend endpoints, ensuring reliable client-side data validation.",
      "Participated in agile sprint cycles, standups, and Git-based collaborative development workflows.",
    ],
    tech: ["React.js", "Next.js", "REST APIs", "JavaScript (ES6+)", "Tailwind CSS"],
  },
];

export const PROJECTS_LIST = [
  {
    id: "b2b-commerce-platform",
    number: "01",
    title: "Enterprise B2B Commerce & Quoting Platform",
    subtitle: "CloudCraze Customization, 2D/3D LWC Configurators & Logistics",
    privacyBadge: "Private · Built at ASSPL",
    description: "Extended a high-volume B2B Commerce storefront with custom service overrides (ccServiceCart, cc_hk_Order), 1-page checkout, and interactive 2D layout and 3D visual configurators in LWC for equipment quoting. Automated backorder splitting with Queueable Apex and integrated UPS shipping and Avalara tax compliance.",
    tech: ["B2B Commerce (CloudCraze)", "LWC 2D/3D Configurators", "Queueable Apex", "UPS API", "Avalara AvaTax"],
    metrics: "Streamlined bulk checkout & automated backorder/split-shipment handling",
  },
  {
    id: "agentforce-invocables",
    number: "02",
    title: "Agentforce & AI Support Automation",
    subtitle: "Autonomous Invocable Actions & Einstein Trust Layer",
    privacyBadge: "Private · Built at ASSPL",
    description: "Developed Invocable Apex actions for Salesforce Agentforce to enable autonomous customer support bots on Experience Cloud. The agents triage incoming ordering and shipment questions, create structured support cases (Origin = 'Agentforce'), and log real-time chat summaries directly onto Case records.",
    tech: ["Agentforce", "Agent Builder", "Invocable Apex", "Einstein Trust Layer", "Service Cloud"],
    metrics: "Autonomous case logging & reduced tier-1 customer response turnaround",
  },
  {
    id: "outlook-addin",
    number: "03",
    title: "In-House Outlook Add-in for Salesforce",
    subtitle: "Multi-Org OAuth 2.0 PKCE & Dynamic SOQL",
    privacyBadge: "Private · Built at ASSPL",
    description: "Built an internal Office.js add-in replacing third-party connectors: Connected App with multi-org OAuth 2.0 PKCE login (works across any production, sandbox, or custom domain), dynamic SOQL schema reflection via describeSObjects, and idempotent 1-click email logging to Contact and Activity timelines.",
    tech: ["Connected Apps", "OAuth 2.0 PKCE", "Dynamic SOQL", "Office.js", "REST API"],
    metrics: "Replaced commercial add-in licensing across internal team",
  },
  {
    id: "financial-sync",
    number: "04",
    title: "Automated ACH Banking & Multi-Gateway Sync",
    subtitle: "NACHA File Generation & Financial Reconciliation",
    privacyBadge: "Private · Built at ASSPL",
    description: "Engineered automated banking batch processing generating NACHA-compliant ACH files and processing daily cash receipts against credit terms. Built webhook listeners for Stripe charge events and QuickBooks Online ledger sync.",
    tech: ["NACHA ACH Format", "Batch Apex", "Stripe API", "QuickBooks Online", "HmacSHA256"],
    metrics: "Automated banking reconciliation; zero manual ACH file compilation",
  },
  {
    id: "fastapi-middleware",
    number: "05",
    title: "FastAPI Middleware & External CRM Sync",
    subtitle: "Asynchronous Python Middleware for Salesforce",
    privacyBadge: "Private · Built at ASSPL",
    description: "Built high-throughput asynchronous Python FastAPI middleware bridging external marketing and hiring platforms with Salesforce using Platform Events and REST composite APIs with retry queues and rate limiting.",
    tech: ["Python 3", "FastAPI", "Platform Events", "Salesforce Composite REST", "Webhooks"],
    metrics: "Reliable asynchronous pipeline with automated retry handling",
  },
  {
    id: "cicd-pipeline",
    number: "06",
    title: "Automated GitHub CI/CD for Salesforce",
    subtitle: "Scratch Org Deployments & Static Code Analysis",
    privacyBadge: "Private · Built at ASSPL",
    description: "Automated multi-branch release pipeline using GitHub Actions and the Salesforce CLI (sf). Enforces PMD static code analysis, Apex unit test coverage gates (>85%), scratch org testing, and quick deployment to staging and production.",
    tech: ["GitHub Actions", "Salesforce CLI (sf)", "Apex PMD", "Scratch Orgs", "Bash"],
    metrics: "Consistently maintained >85% unit test code coverage standard",
  },
  {
    id: "ecommerce-booking",
    number: "07",
    title: "Cloud Booking Engine & CRM Sync",
    subtitle: "Next.js + AWS Amplify with Salesforce REST Integration",
    privacyBadge: "Production Cloud Application",
    description: "Full-stack booking platform built on AWS Amplify using Next.js with Lambda microservices, RDS MySQL inventory locks, and Salesforce REST customer synchronization.",
    tech: ["Next.js", "AWS Amplify", "AWS Lambda", "RDS MySQL", "Salesforce REST"],
    metrics: "Concurrency-safe inventory reservation engine",
  },
  {
    id: "territory-sales-ops",
    number: "08",
    title: "Territory Lead Routing & Sales Intelligence",
    subtitle: "Automated Sales Cloud Cadences & Apollo.io Integration",
    privacyBadge: "Private · Built at ASSPL",
    description: "Built territory-based lead routing across 50 US states, auto-converting qualified B2B leads. Integrated Apollo.io REST API inside an LWC panel for in-CRM contact enrichment and scheduled multi-day sales cadence queues.",
    tech: ["Sales Cloud", "Apex Triggers & Batches", "Apollo.io API", "Lead Conversion", "LWC"],
    metrics: "Automated state territory assignment & sales rep enrichment workflows",
  },
];

export const SKILLS_TREE = [
  {
    id: "salesforce-dev",
    category: "Programmatic Development",
    items: [
      { name: "Apex Classes & Triggers", tier: "Daily use", context: "Trigger frameworks, async Queueable/Batch jobs, and unit tests (>85% coverage gate)." },
      { name: "Lightning Web Components (LWC)", tier: "Daily use", context: "Custom LWCs, interactive 2D/3D visual configurators, and modern component lifecycle." },
      { name: "B2B Commerce (CloudCraze)", tier: "Daily use", context: "Service overrides (ccServiceCart), logic hooks (cc_hk_Order), and 1-page checkout flows." },
      { name: "Visualforce (VFP)", tier: "Used in projects", context: "CloudCraze storefront customizations, PDF spec sheets, and dynamic document generation." },
      { name: "SOQL & Dynamic SOQL", tier: "Daily use", context: "Metadata-driven dynamic queries with WITH USER_MODE and security enforcement." },
      { name: "Platform Events", tier: "Daily use", context: "Event-driven architecture for order fulfillment and asynchronous external middleware." },
      { name: "Salesforce CLI (sf)", tier: "Daily use", context: "Scratch org lifecycle automation, source tracking, and automated CI/CD deployments." },
    ],
  },
  {
    id: "agentforce-ai",
    category: "Agentforce & AI",
    items: [
      { name: "Agent Builder & Topics", tier: "Daily use", context: "Configured 4 production Agentforce agents with topic routing and guardrails." },
      { name: "Invocable Apex Actions", tier: "Daily use", context: "Transactional Apex methods invoked by Agentforce planners for live CRM support actions." },
      { name: "Einstein Trust Layer", tier: "Daily use", context: "Enforced PII masking, toxicity checking, and grounded live CRM queries." },
      { name: "LLM & OpenAI Integration", tier: "Used in projects", context: "Interactive LWC sales rep assistant providing product lookups and chat summaries." },
      { name: "Document Extraction", tier: "Used in projects", context: "Automated parsing pipeline converting unstructured PDF POs into CRM records." },
    ],
  },
  {
    id: "integrations",
    category: "Integrations & APIs",
    items: [
      { name: "REST & SOAP APIs", tier: "Daily use", context: "Built and consumed 10+ production endpoints with comprehensive error handling." },
      { name: "OAuth 2.0 PKCE", tier: "Daily use", context: "Connected App auth protocol for in-house Outlook Add-in across any org." },
      { name: "Logistics (UPS API)", tier: "Daily use", context: "Real-time shipping rate quotes, shipping labels, tracking updates, and BOLs." },
      { name: "Tax (Avalara AvaTax)", tier: "Daily use", context: "Multi-jurisdiction automated sales tax calculation and exemption handling." },
      { name: "Banking (NACHA ACH)", tier: "Daily use", context: "Automated ACH payment file generation and daily cash receipt reconciliation." },
      { name: "FastAPI / Python", tier: "Daily use", context: "Asynchronous middleware services connecting third-party platforms to Salesforce." },
    ],
  },
  {
    id: "platforms",
    category: "Platforms & Clouds",
    items: [
      { name: "B2B Commerce (CloudCraze)", tier: "Daily use", context: "Cart services, custom pricing hooks, inventory allocation, and order splitting." },
      { name: "Sales Cloud", tier: "Daily use", context: "Territory lead routing, multi-step sales cadences, and Apollo.io contact enrichment." },
      { name: "Service Cloud", tier: "Daily use", context: "Agentforce case routing, chat summarization, RMA processing, and tracking lookups." },
      { name: "Experience Cloud", tier: "Daily use", context: "Customer & Partner Communities hosting self-service storefronts and Agentforce bots." },
      { name: "Supply Chain & WMS", tier: "Daily use", context: "Receiving worksheets, bin assignments, cycle counts, and multi-warehouse transfers." },
    ],
  },
  {
    id: "admin-security",
    category: "Admin & Security Governance",
    items: [
      { name: "Flow Builder", tier: "Daily use", context: "Record-triggered, scheduled, screen, and autolaunched flows across all projects." },
      { name: "Security & Sharing Model", tier: "Daily use", context: "Profiles, permission sets, roles, sharing rules, and access audit verification." },
      { name: "Validation Rules & Approvals", tier: "Daily use", context: "Business logic enforcement and multi-tier approval process design." },
      { name: "User Administration", tier: "Daily use", context: "Onboarding/offboarding, license allocation, password policies, MFA/SSO coordination." },
    ],
  },
];
