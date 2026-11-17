/**
 * RAKESH MAJHI PORTFOLIO - JAVASCRIPT ENGINE
 * Handles Theme, Modals, Filter, and 3 Enterprise Interactive Simulators:
 * 1. Live Agentforce Simulator
 * 2. Step-by-Step PKCE Architecture Simulator
 * 3. Engineering Code Review Diff Inspector
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. THEME MANAGEMENT (Light / Dark Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleText = document.getElementById('theme-toggle-text');
  const themeIcon = document.getElementById('theme-icon');

  function getSavedTheme() {
    try {
      return localStorage.getItem('rm_portfolio_theme');
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem('rm_portfolio_theme', theme);
    } catch (e) {
      // Ignore
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
      }
      if (themeToggleText) themeToggleText.textContent = 'Light';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
      }
      if (themeToggleText) themeToggleText.textContent = 'Dark';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const hashTheme = window.location.hash === '#dark' ? 'dark' : (window.location.hash === '#light' ? 'light' : null);
  const queryTheme = urlParams.get('theme');
  const savedTheme = getSavedTheme();

  if (queryTheme === 'dark' || hashTheme === 'dark') {
    applyTheme('dark');
  } else if (queryTheme === 'light' || hashTheme === 'light') {
    applyTheme('light');
  } else if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      saveTheme(newTheme);
    });
  }

  /* ==========================================================================
     2. SCROLL PROGRESS & BACK TO TOP
     ========================================================================== */
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentScroll = window.scrollY;

    if (progressBar && scrollTotal > 0) {
      const progressPercent = (currentScroll / scrollTotal) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    if (backToTopBtn) {
      if (currentScroll > 600) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3. NAVIGATION & INTERSECTION OBSERVER
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(sec => navObserver.observe(sec));

  // Mobile Hamburger Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const closeMobileNavBtn = document.getElementById('close-mobile-nav');

  function openMobileNav() {
    if (mobileNavPanel && hamburgerBtn) {
      mobileNavPanel.classList.remove('translate-x-full');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (mobileNavPanel && hamburgerBtn) {
      mobileNavPanel.classList.add('translate-x-full');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);

  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ==========================================================================
     4. HERO TYPING ANIMATION
     ========================================================================== */
  const typeTarget = document.getElementById('typewriter-text');
  const phrases = [
    "I build Salesforce apps.",
    "I ship Agentforce agents.",
    "I connect systems with APIs.",
    "I vibe code with AI, and review every line."
  ];

  if (typeTarget) {
    if (prefersReducedMotion) {
      typeTarget.textContent = phrases[0];
    } else {
      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;
      const typeSpeed = 60;
      const deleteSpeed = 30;
      const pauseEnd = 2000;

      function typeLoop() {
        const currentPhrase = phrases[phraseIdx];
        if (isDeleting) {
          typeTarget.textContent = currentPhrase.substring(0, charIdx - 1);
          charIdx--;
        } else {
          typeTarget.textContent = currentPhrase.substring(0, charIdx + 1);
          charIdx++;
        }

        let delta = isDeleting ? deleteSpeed : typeSpeed;
        if (!isDeleting && charIdx === currentPhrase.length) {
          delta = pauseEnd;
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          delta = 350;
        }

        setTimeout(typeLoop, delta);
      }
      typeLoop();
    }
  }

  /* ==========================================================================
     5. COUNT-UP ANIMATION FOR STATS
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-count');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
          if (prefersReducedMotion) {
            stat.textContent = target;
            return;
          }
          let current = 0;
          const duration = 1200;
          const stepTime = Math.max(Math.floor(duration / target), 30);
          const timer = setInterval(() => {
            current += 1;
            stat.textContent = current;
            if (current >= target) {
              stat.textContent = target;
              clearInterval(timer);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('hero-stats');
  if (statsSection) statsObserver.observe(statsSection);

  /* ==========================================================================
     6. REVEAL ON SCROLL
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     7. SKILLS VIEW TOGGLE
     ========================================================================== */
  const skillsGrid = document.getElementById('skills-grid-view');
  const skillsCloud = document.getElementById('skills-cloud-view');
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewCloudBtn = document.getElementById('view-cloud-btn');

  function setSkillsView(view) {
    if (view === 'cloud' && window.innerWidth >= 768) {
      if (skillsGrid) skillsGrid.classList.add('hidden');
      if (skillsCloud) skillsCloud.classList.remove('hidden');
      if (viewCloudBtn) viewCloudBtn.classList.add('active');
      if (viewGridBtn) viewGridBtn.classList.remove('active');
    } else {
      if (skillsGrid) skillsGrid.classList.remove('hidden');
      if (skillsCloud) skillsCloud.classList.add('hidden');
      if (viewGridBtn) viewGridBtn.classList.add('active');
      if (viewCloudBtn) viewCloudBtn.classList.remove('active');
    }
  }

  if (viewGridBtn) viewGridBtn.addEventListener('click', () => setSkillsView('grid'));
  if (viewCloudBtn) viewCloudBtn.addEventListener('click', () => setSkillsView('cloud'));

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) setSkillsView('grid');
  });

  /* ==========================================================================
     8. PROJECT FILTERS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCats = card.getAttribute('data-category') || '';
        if (filterCategory === 'all' || cardCats.includes(filterCategory)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     9. PROJECT CASE STUDY MODAL
     ========================================================================== */
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalTag = document.getElementById('modal-project-tag');
  const modalProblem = document.getElementById('modal-project-problem');
  const modalApproach = document.getElementById('modal-project-approach');
  const modalArch = document.getElementById('modal-project-arch');
  const modalChallenges = document.getElementById('modal-project-challenges');
  const modalResult = document.getElementById('modal-project-result');
  const modalTechChips = document.getElementById('modal-project-tech');

  const CASE_STUDIES = {
    'outlook': {
      title: "In-House Outlook Add-in for Salesforce",
      tag: "Productivity & Multi-Org OAuth PKCE",
      problem: "The internal team depended on third-party mail connectors with rigid licensing and security restrictions that failed across multiple sandbox, scratch, and production environments.",
      approach: "Engineered a Connected App utilizing OAuth 2.0 PKCE login (supporting both login.salesforce.com and test.salesforce.com) that extracts instance_url dynamically without hardcoded org limits. Built a metadata discovery engine via Salesforce REST APIs and dynamic SOQL.",
      architecture: "Outlook Web/Desktop (Office.js) ──► OAuth 2.0 PKCE ──► Salesforce Org Endpoint (instance_url) ──► Dynamic DescribeSObject() ──► 1-Click Email Logging with SHA-256 deduplication into Task & EmailMessage records.",
      challenges: "Preventing duplicate email logging when users reply back and forth, and handling custom field schemas dynamically across client orgs without runtime crashes.",
      result: "Replaced third-party connectors company-wide, cut licensing expenses, and enabled 1-click email and record synchronization across any org environment with zero hardcoded limits.",
      tech: ["Connected Apps", "OAuth 2.0 PKCE", "Dynamic SOQL", "Salesforce REST API", "Office.js", "Apex"]
    },
    'agentforce-suite': {
      title: "Agentforce AI Suite for B2B Commerce & Service",
      tag: "Agentforce · 4 Production Agents",
      problem: "Customer support agents were overwhelmed with repetitive order queries, return statuses, and developer log triage, leading to high response latency.",
      approach: "Designed and deployed 4 production Agentforce agents (Employee, Guided Shopping, Debug Log Analysis, Customer Service) live on Experience Cloud with clear Topic definitions and Invocable Apex Actions.",
      architecture: "Customer Input ──► Einstein Trust Layer Guardrails ──► Agentforce Topic Planner ──► Invocable Apex Methods (Callout & SOQL) ──► Real-Time CRM Record Update & Natural Response.",
      challenges: "Prompt-injection prevention and ensuring zero hallucinations by strictly grounding agent reasoning against real-time CRM database records.",
      result: "Cut manual first-response handling time by ~40% across live Experience Cloud communities.",
      tech: ["Agentforce", "Agent Builder", "Topics & Actions", "Apex Invocables", "Experience Cloud", "Service Cloud"]
    },
    'pdf-pipeline': {
      title: "Agentforce PDF Extraction & Record Pipeline",
      tag: "AI Document Automation",
      problem: "High volume of unstructured customer invoices and onboarding PDFs required tedious manual transcription into Salesforce objects.",
      approach: "Built an end-to-end automation pipeline coupling Agentforce reasoning with async Apex to extract key-value entities from PDFs and populate relational records with automated validation checks.",
      architecture: "PDF Upload ──► Entity Extraction & Parsing ──► Schema Verification ──► Queueable Apex ──► Salesforce Object Upsert with Triage Routing on low confidence.",
      challenges: "Handling messy table structures and diverse document templates while preventing governor limit spikes on bulk uploads.",
      result: "Eliminated manual data entry workflows and automated record creation with human-in-the-loop exception handling.",
      tech: ["Agentforce", "PDF Parsing", "Apex Async", "Flow Builder", "Validation Rules"]
    },
    'stripe-sync': {
      title: "Bidirectional Stripe & Multi-Gateway Payment Sync",
      tag: "FinTech & Enterprise Integrations",
      problem: "Payment records across Stripe, PayPal, and CyberSource diverged from Salesforce billing records, causing reconciliation headaches and disputed invoices.",
      approach: "Implemented secure REST/SOAP webhook consumers in Apex with cryptographic signature verification, supporting automated billing reconciliation, order splitting, and credit balance adjustments with QuickBooks.",
      architecture: "Stripe Webhook Event ──► Signature Verification ──► Idempotency Key Check ──► Apex Handler ──► Order Payment Update ──► QuickBooks Online Credit Adjustment.",
      challenges: "Handling out-of-order webhook deliveries and concurrent payment events without race conditions.",
      result: "Reduced open billing support tickets by ~25% and eliminated manual end-of-month financial reconciliation.",
      tech: ["Stripe API", "CyberSource SOAP", "QuickBooks Online", "Apex Webhooks", "OAuth 2.0"]
    },
    'fastapi-middleware': {
      title: "FastAPI Middleware for Heymilo AI & GoHighLevel",
      tag: "Python & Real-Time Sync",
      problem: "External hiring and CRM platforms (Heymilo AI, GoHighLevel) needed seamless, high-throughput bidirectional record sync with Salesforce.",
      approach: "Constructed an async Python FastAPI middleware service that utilizes Platform Events and Salesforce Data Cloud to stream candidate and contact records with rate-limiting and failure-retry queues.",
      architecture: "External Platform Webhook ──► FastAPI Service ──► Event Validation ──► Salesforce Platform Event / REST API ──► Trigger Orchestration.",
      challenges: "Preventing API limit exhaustion during burst candidate application cycles.",
      result: "High-throughput near real-time sync with 99.9% delivery reliability and automated payload retry queues.",
      tech: ["Python 3", "FastAPI", "Platform Events", "Data Cloud", "GoHighLevel API", "REST"]
    },
    'cicd-pipeline': {
      title: "Automated GitHub CI/CD Pipeline for Salesforce",
      tag: "DevOps & Quality Engineering",
      problem: "Manual deployments across 3 client tracks resulted in deployment collisions, test regression, and recurring production defects.",
      approach: "Built a GitHub Actions automated workflow integrating Salesforce CLI (sf), scratch org test validation, PMD static analysis, and zero-downtime automated deployments.",
      architecture: "Git PR ──► Scratch Org Build ──► Apex Unit Test Run (>85% gate) ──► PMD Lint ──► Approval ──► Auto-deployment to QA/Staging/Production.",
      challenges: "Maintaining fast deployment cycles while enforcing rigorous unit test and code coverage thresholds.",
      result: "Decreased recurring production defects by ~30% and achieved 99%+ release uptime across 3 concurrent project tracks.",
      tech: ["GitHub Actions", "Salesforce CLI", "Scratch Orgs", "Bash", "Apex Testing"]
    },
    'nextjs-ecommerce': {
      title: "Next.js E-Commerce Booking Engine (planitrentals.com)",
      tag: "Full-Stack & AWS Architecture",
      problem: "Live rental platform required a lightning-fast booking and real-time inventory management experience connected to backend systems.",
      approach: "Built the booking flow on AWS Amplify using Next.js, AWS Lambda microservices, RDS (MySQL), and Salesforce REST APIs for customer account and order dispatch.",
      architecture: "Next.js Client ──► AWS Amplify ──► Lambda API ──► RDS MySQL (Inventory Lock) ──► Salesforce REST Booking Dispatch.",
      challenges: "Concurrency-safe item reservation locking to prevent duplicate equipment bookings during peak rental weekends.",
      result: "Deployed to production on AWS Amplify supporting live online rental transactions with instant confirmation.",
      tech: ["Next.js", "React.js", "AWS Amplify", "AWS Lambda", "RDS MySQL", "Salesforce REST"]
    }
  };

  let previousActiveElement = null;

  function openProjectModal(projectId) {
    const study = CASE_STUDIES[projectId];
    if (!study || !modalOverlay) return;

    previousActiveElement = document.activeElement;
    modalTitle.textContent = study.title;
    modalTag.textContent = study.tag;
    modalProblem.textContent = study.problem;
    modalApproach.textContent = study.approach;
    modalArch.textContent = study.architecture;
    modalChallenges.textContent = study.challenges;
    modalResult.textContent = study.result;

    modalTechChips.innerHTML = '';
    study.tech.forEach(t => {
      const chip = document.createElement('span');
      chip.className = 'skill-chip text-xs';
      chip.textContent = t;
      modalTechChips.appendChild(chip);
    });

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previousActiveElement) previousActiveElement.focus();
  }

  document.querySelectorAll('[data-open-case-study]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-open-case-study');
      openProjectModal(pId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('open')) closeProjectModal();
      closeMobileNav();
    }
  });

  /* ==========================================================================
     10. COPY EMAIL & RESUME
     ========================================================================== */
  const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');
  const copyToast = document.getElementById('copy-toast');

  function copyEmailAddress() {
    const email = "rakeshmajhi.connect@gmail.com";
    navigator.clipboard.writeText(email).then(showToast).catch(showToast);
  }

  function showToast() {
    if (!copyToast) return;
    copyToast.classList.add('visible');
    setTimeout(() => copyToast.classList.remove('visible'), 2800);
  }

  copyEmailBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    copyEmailAddress();
  }));

  const resumeTriggers = document.querySelectorAll('.resume-trigger');
  const resumeModalOverlay = document.getElementById('resume-modal-overlay');
  const resumeModalClose = document.getElementById('resume-modal-close');

  function openResume() {
    if (resumeModalOverlay) {
      resumeModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (resumeModalClose) resumeModalClose.focus();
    }
  }

  function closeResume() {
    if (resumeModalOverlay) {
      resumeModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  resumeTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openResume();
  }));

  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResume);
  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) closeResume();
    });
  }

  // Bind Enter key on custom chat input
  const simInput = document.getElementById('sim-user-input');
  if (simInput) {
    simInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSimCustomSubmit();
      }
    });
  }
});

/* ==========================================================================
   GLOBAL INTERACTIVE FEATURES 1, 2 & 3
   ========================================================================== */

/* --------------------------------------------------------------------------
   FEATURE 1: LIVE AGENTFORCE SIMULATOR ENGINE
   -------------------------------------------------------------------------- */
const AGENT_PERSONAS = {
  'shopping': {
    name: 'Guided Shopping Agent (B2B Commerce)',
    prompt: 'Check inventory for bulk enterprise order & verify live Stripe payment balance.',
    reply: 'Inventory verified across warehouses. Order #8821 allocated 50 units. Confirmed live Stripe transaction ($6,200.00) via webhook listener.',
    latency: '✔ Latency: 78ms',
    crmTitle: 'CRM Action: Order__c Created & Reserved',
    crmStatus: 'Status: Confirmed (Active)',
    crmDetail: 'Apex Handler: B2BOrderDispatcher.execute() · Idempotency: #ord_92019',
    trust: 'Passed · Zero PII Leakage · Masking Applied · Toxicity: 0.00',
    topic: 'Classified Intent: OrderCatalogAndBilling (Confidence: 0.98)',
    apex: '@InvocableMethod B2BOrderDispatcher.execute() · Limits: 1/100 SOQL',
    mutation: 'Upsert Order (ExternalId=ord_92019) · Audit Event Dispatched'
  },
  'debug': {
    name: 'Debug Log Analysis Agent',
    prompt: 'Analyze System.NullPointerException in StripeWebhookHandler.cls:42 on payment charge.succeeded.',
    reply: 'Stack trace pinpointed: customerId lookup returned null for guest checkout. Recommended safe-navigation (?.) or Map.containsKey() guard. Auto-created P2 Patch Task.',
    latency: '✔ Latency: 92ms',
    crmTitle: 'CRM Action: Patch Task #8402 Generated',
    crmStatus: 'Severity: P2 (Triaged)',
    crmDetail: 'Target: StripeWebhookHandler.cls:42 · Assigned: Developer Queue',
    trust: 'Passed · Log Sanitized · Stack Trace Anonymized',
    topic: 'Classified Intent: ApexExceptionDiagnostic (Confidence: 0.99)',
    apex: '@InvocableMethod ApexLogParser.analyzeStackTrace() · Limits: 0/100 SOQL',
    mutation: 'Insert Task (Priority=High, Subject="Fix NPE in Webhook")'
  },
  'pdf': {
    name: 'PDF Extraction & Record Pipeline Agent',
    prompt: 'Parse uploaded PO document #PO-2026-9042 and populate relational Order & OrderItems.',
    reply: 'PDF schema extracted with 99.4% confidence: 4 line items ($12,450.00 total) verified against active PriceBook. Master-detail records staged for approval.',
    latency: '✔ Latency: 114ms',
    crmTitle: 'CRM Action: Order & 4 OrderItems Staged',
    crmStatus: 'Status: Validation Passed',
    crmDetail: 'Apex Queueable: PDFExtractionJob.enqueue() · Validation: 100% Rules OK',
    trust: 'Passed · Financial PII Masked in Audit Log',
    topic: 'Classified Intent: DocumentEntityExtraction (Confidence: 0.97)',
    apex: '@InvocableMethod PDFEntityExtractor.parseDocument() · Async Job ID: 707DW...',
    mutation: 'Insert Order__c + Insert List<OrderItem__c> via UnitOfWork'
  },
  'employee': {
    name: 'Employee Knowledge Agent',
    prompt: 'Summarize Rakesh\'s delivery record on B2B Commerce and US client release management.',
    reply: 'Rakesh leads 3 concurrent client tracks at Abacus Systems. Delivered B2B Commerce CloudCraze order splitting (open tickets down ~25%), built Lightning storefront, and owns GitHub CI/CD with 99%+ uptime.',
    latency: '✔ Latency: 64ms',
    crmTitle: 'CRM Query: Knowledge Grounding',
    crmStatus: 'Source: Verified Experience Record',
    crmDetail: 'Entity: CandidateProfile · Focus: Salesforce Full-Stack & Agentforce',
    trust: 'Passed · Grounded strictly on portfolio verified facts',
    topic: 'Classified Intent: KnowledgeRetrieval (Confidence: 1.00)',
    apex: 'SOQL Grounding: [SELECT Experience, Metrics FROM CandidateProfile]',
    mutation: 'Zero CRM Mutation · Read-only response'
  }
};

function switchSimulatorTab(tab) {
  const consoleView = document.getElementById('sim-console-view');
  const telemetryView = document.getElementById('sim-telemetry-view');
  const consoleBtn = document.getElementById('sim-tab-console-btn');
  const telBtn = document.getElementById('sim-tab-telemetry-btn');

  if (tab === 'telemetry') {
    if (consoleView) consoleView.classList.add('hidden');
    if (telemetryView) telemetryView.classList.remove('hidden');
    if (telBtn) telBtn.classList.add('active');
    if (consoleBtn) consoleBtn.classList.remove('active');
  } else {
    if (consoleView) consoleView.classList.remove('hidden');
    if (telemetryView) telemetryView.classList.add('hidden');
    if (consoleBtn) consoleBtn.classList.add('active');
    if (telBtn) telBtn.classList.remove('active');
  }
}

function runAgentSimulator(personaKey) {
  const data = AGENT_PERSONAS[personaKey];
  if (!data) return;

  // Update persona chip buttons
  document.querySelectorAll('.agent-persona-chip').forEach(btn => {
    if (btn.getAttribute('data-persona') === personaKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Console
  const userBubble = document.getElementById('sim-user-bubble');
  const agentName = document.getElementById('sim-agent-name');
  const agentText = document.getElementById('sim-agent-text');
  const agentLatency = document.getElementById('sim-agent-latency');
  const crmCard = document.getElementById('sim-crm-card');

  if (userBubble) userBubble.textContent = data.prompt;
  if (agentName) agentName.textContent = data.name;
  if (agentText) agentText.textContent = data.reply;
  if (agentLatency) agentLatency.textContent = data.latency;

  if (crmCard) {
    crmCard.innerHTML = `
      <div class="font-bold text-[var(--navy)] flex items-center justify-between">
        <span>${data.crmTitle}</span>
        <span class="text-emerald-600 dark:text-emerald-400 font-bold">${data.crmStatus}</span>
      </div>
      <div class="text-[10px] text-[var(--text-muted)]">
        ${data.crmDetail}
      </div>
    `;
  }

  // Update Telemetry
  const telTrust = document.getElementById('tel-trust');
  const telTopic = document.getElementById('tel-topic');
  const telApex = document.getElementById('tel-apex');
  const telMutation = document.getElementById('tel-mutation');

  if (telTrust) telTrust.textContent = data.trust;
  if (telTopic) telTopic.textContent = data.topic;
  if (telApex) telApex.textContent = data.apex;
  if (telMutation) telMutation.textContent = data.mutation;
}

function handleSimCustomSubmit() {
  const input = document.getElementById('sim-user-input');
  if (!input) return;
  const val = input.value.trim().toLowerCase();
  if (!val) return;

  // Simple intent classification
  if (val.includes('debug') || val.includes('error') || val.includes('null') || val.includes('log')) {
    runAgentSimulator('debug');
  } else if (val.includes('pdf') || val.includes('invoice') || val.includes('document') || val.includes('parse')) {
    runAgentSimulator('pdf');
  } else if (val.includes('experience') || val.includes('rakesh') || val.includes('who') || val.includes('b2b')) {
    runAgentSimulator('employee');
  } else {
    runAgentSimulator('shopping');
  }

  input.value = '';
}

/* --------------------------------------------------------------------------
   FEATURE 2: STEP-BY-STEP PKCE ARCHITECTURE SIMULATOR ENGINE
   -------------------------------------------------------------------------- */
const PKCE_STAGES = [
  {
    step: 1,
    title: "PAYLOAD INSPECTOR: Stage 1 (PKCE Challenge Generation)",
    status: "Status: Client Side Initialized (S256)",
    code: `// 1. Generate cryptographically random code_verifier (128 chars)
const verifier = generateRandomCodeVerifier(128); // e.g. '7f8a9e10c7e2b...449'

// 2. Compute SHA-256 hash & Base64URL encode for challenge
const challenge = base64UrlEncode(crypto.subtle.digest('SHA-256', verifier));

// 3. Initiate Connected App authorization redirect with S256:
// https://login.salesforce.com/services/oauth2/authorize?response_type=code
// &client_id=3MVG9...&code_challenge_method=S256&code_challenge=\${challenge}`
  },
  {
    step: 2,
    title: "PAYLOAD INSPECTOR: Stage 2 (OAuth Token Exchange)",
    status: "Status: HTTP 200 OK (instance_url Discovered)",
    code: `// Exchange authorization code + code_verifier for session token
POST https://login.salesforce.com/services/oauth2/token
Headers: { "Content-Type": "application/x-www-form-urlencoded" }
Body: grant_type=authorization_code&client_id=3MVG9...&code_verifier=\${verifier}

Response (HTTP 200 OK):
{
  "access_token": "00DWC00000BtEyT!AR0AQ...masked",
  "instance_url": "https://enterprise-client.my.salesforce.com",
  "id": "https://login.salesforce.com/id/00DWC00000BtEyT2AV/005DW000001",
  "token_type": "Bearer"
}`
  },
  {
    step: 3,
    title: "PAYLOAD INSPECTOR: Stage 3 (Dynamic Metadata Describe API)",
    status: "Status: Dynamic SOQL Schema Mapped",
    code: `// Dynamic schema discovery respects custom layouts & Field-Level Security
GET https://enterprise-client.my.salesforce.com/services/data/v60.0/sobjects/Contact/describe
Headers: { "Authorization": "Bearer 00DWC00000BtEyT!..." }

Dynamic SOQL Query Constructed:
SELECT Id, Name, Email, AccountId, Title, Custom_Tier__c
FROM Contact
WHERE Email = :senderEmail WITH USER_MODE LIMIT 1`
  },
  {
    step: 4,
    title: "PAYLOAD INSPECTOR: Stage 4 (Idempotent CRM Logging)",
    status: "Status: Deduplicated Task Upsert (Zero Duplicate Logs)",
    code: `// Compute SHA-256 hash on Outlook InternetMessageId to enforce idempotency
String emailHash = EncodingUtil.convertToHex(
    Crypto.generateDigest('SHA-256', Blob.valueOf(emailMsgId))
);

// Upsert prevents duplicate task logging when reply threads cross
Task t = new Task(
    Subject = 'Email: ' + emailSubject,
    External_Id__c = emailHash,
    WhoId = matchedContactId,
    Status = 'Completed',
    ActivityDate = System.today()
);
Database.upsert(t, Task.Fields.External_Id__c, false);`
  }
];

let currentPkceStep = 1;
let pkceAutoplayTimer = null;

function jumpToPkceStep(stepNum) {
  currentPkceStep = Math.max(1, Math.min(4, stepNum));
  const stage = PKCE_STAGES[currentPkceStep - 1];

  // Update Stepper buttons
  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById(`pkce-step-btn-${i}`);
    const node = document.getElementById(`pkce-node-${i}`);
    if (btn) {
      if (i === currentPkceStep) btn.classList.add('active');
      else btn.classList.remove('active');
    }
    if (node) {
      if (i === currentPkceStep) node.classList.add('active-node');
      else node.classList.remove('active-node');
    }
  }

  // Update Inspector Code & Status
  const titleElem = document.getElementById('pkce-inspector-title');
  const statusElem = document.getElementById('pkce-inspector-status');
  const bodyElem = document.getElementById('pkce-inspector-body');

  if (titleElem) titleElem.textContent = stage.title;
  if (statusElem) statusElem.textContent = stage.status;
  if (bodyElem) bodyElem.textContent = stage.code;
}

function stepPkceSimulator(delta) {
  let next = currentPkceStep + delta;
  if (next > 4) next = 1;
  if (next < 1) next = 4;
  jumpToPkceStep(next);
}

function togglePkceAutoplay() {
  const autoBtn = document.getElementById('pkce-autoplay-btn');
  if (pkceAutoplayTimer) {
    clearInterval(pkceAutoplayTimer);
    pkceAutoplayTimer = null;
    if (autoBtn) autoBtn.textContent = 'Auto-Play';
  } else {
    stepPkceSimulator(1);
    pkceAutoplayTimer = setInterval(() => stepPkceSimulator(1), 3000);
    if (autoBtn) autoBtn.textContent = 'Pause ⏸';
  }
}

/* --------------------------------------------------------------------------
   FEATURE 3: VIBE CODING BEFORE & AFTER DIFF INSPECTOR ENGINE
   -------------------------------------------------------------------------- */
const DIFF_SCENARIOS = {
  1: {
    rawBadge: "Risk: 101 SOQL limit on bulk batch",
    cleanBadge: "Governor Safe · Bulkified · 94% Test Cov",
    rawCode: `// NAIVE AI CODE: Fails under high-volume batch
public class StripeWebhookReceiver {
  
  public static void processEvents(List<StripeEvent> events) {
    for (StripeEvent ev : events) {
      // 🚨 FLAW 1: SOQL query inside for-loop! Hits limit 101
      Account acc = [SELECT Id FROM Account WHERE Stripe_Id__c = :ev.customerId];
      
      // 🚨 FLAW 2: Missing null safety on payment fields
      acc.Balance__c += ev.amount;
      update acc; // 🚨 FLAW 3: DML inside loop!
    }
  }
}`,
    cleanCode: `// PRODUCTION-READY: Bulkified, secure & fault-tolerant
public with sharing class StripeWebhookReceiver {
  
  public static void processEvents(List<StripeEvent> events) {
    Set<String> stripeIds = new Set<String>();
    for (StripeEvent ev : events) {
      if (String.isNotBlank(ev.customerId)) stripeIds.add(ev.customerId);
    }

    // ✔ FIX: 1 Bulk SOQL Query outside loop
    Map<String, Account> accMap = new Map<String, Account>();
    for (Account a : [SELECT Id, Stripe_Id__c, Balance__c 
                     FROM Account WHERE Stripe_Id__c IN :stripeIds WITH USER_MODE]) {
      accMap.put(a.Stripe_Id__c, a);
    }

    List<Account> toUpdate = new List<Account>();
    for (StripeEvent ev : events) {
      Account acc = accMap.get(ev.customerId);
      if (acc != null && ev.amount != null) {
        acc.Balance__c = (acc.Balance__c == null ? 0 : acc.Balance__c) + ev.amount;
        toUpdate.add(acc);
      }
    }
    // ✔ FIX: 1 Single DML statement for entire batch
    if (!toUpdate.isEmpty()) Database.update(toUpdate, false);
  }
}`
  },
  2: {
    rawBadge: "Security Risk: Omitted 'with sharing' & Injection",
    cleanBadge: "Enforces USER_MODE · FLS Enforced · Clean",
    rawCode: `// NAIVE AI CODE: Omits sharing keywords; raw SOQL concatenation
public class CustomerDataService {
  
  // 🚨 FLAW 1: Inherits caller sharing context implicitly (data leak risk)
  public static List<Contact> queryContacts(String searchKey) {
    // 🚨 FLAW 2: Vulnerable to SOQL Injection!
    String query = 'SELECT Id, Name, Secret_SSN__c FROM Contact WHERE Name LIKE \\'%' + searchKey + '%\\'';
    return Database.query(query); // 🚨 FLAW 3: Ignores Field-Level Security!
  }
}`,
    cleanCode: `// PRODUCTION-READY: Explicit sharing, parameterized & FLS safe
public with sharing class CustomerDataService {
  
  // ✔ FIX 1: Explicit 'with sharing' keyword
  public static List<Contact> queryContacts(String searchKey) {
    if (String.isBlank(searchKey)) return new List<Contact>();

    String bindKey = '%' + String.escapeSingleQuotes(searchKey) + '%';

    // ✔ FIX 2: Parameterized SOQL with USER_MODE enforcing Field-Level Security
    return [SELECT Id, Name, Email 
            FROM Contact 
            WHERE Name LIKE :bindKey 
            WITH USER_MODE 
            LIMIT 50];
  }
}`
  }
};

function switchDiffScenario(scenNum) {
  const data = DIFF_SCENARIOS[scenNum];
  if (!data) return;

  const b1 = document.getElementById('diff-scen-1-btn');
  const b2 = document.getElementById('diff-scen-2-btn');

  if (scenNum === 1) {
    if (b1) b1.classList.add('active');
    if (b2) b2.classList.remove('active');
  } else {
    if (b2) b2.classList.add('active');
    if (b1) b1.classList.remove('active');
  }

  const rawBadge = document.getElementById('diff-raw-badge');
  const cleanBadge = document.getElementById('diff-clean-badge');
  const rawCode = document.getElementById('diff-raw-code');
  const cleanCode = document.getElementById('diff-clean-code');

  if (rawBadge) rawBadge.textContent = data.rawBadge;
  if (cleanBadge) cleanBadge.textContent = data.cleanBadge;
  if (rawCode) rawCode.textContent = data.rawCode;
  if (cleanCode) cleanCode.textContent = data.cleanCode;
}

function highlightDiffFlaw(type) {
  const rawCode = document.getElementById('diff-raw-code');
  const cleanCode = document.getElementById('diff-clean-code');
  if (!rawCode || !cleanCode) return;

  if (type === 'governor') {
    switchDiffScenario(1);
    rawCode.innerHTML = rawCode.textContent.replace(
      'Account acc = [SELECT Id FROM Account WHERE Stripe_Id__c = :ev.customerId];',
      '<span class="diff-line-removed">Account acc = [SELECT Id FROM Account WHERE Stripe_Id__c = :ev.customerId]; // 🚨 LIMIT 101</span>'
    );
    cleanCode.innerHTML = cleanCode.textContent.replace(
      'for (Account a : [SELECT Id, Stripe_Id__c, Balance__c',
      '<span class="diff-line-added">for (Account a : [SELECT Id, Stripe_Id__c, Balance__c // ✔ 1 SINGLE SOQL QUERY</span>'
    );
  } else if (type === 'sharing') {
    switchDiffScenario(2);
    rawCode.innerHTML = rawCode.textContent.replace(
      'public class CustomerDataService {',
      '<span class="diff-line-removed">public class CustomerDataService { // 🚨 MISSING WITH SHARING</span>'
    );
    cleanCode.innerHTML = cleanCode.textContent.replace(
      'public with sharing class CustomerDataService {',
      '<span class="diff-line-added">public with sharing class CustomerDataService { // ✔ ENFORCES SHARING</span>'
    );
  } else if (type === 'bulk') {
    switchDiffScenario(1);
    cleanCode.innerHTML = cleanCode.textContent.replace(
      'Map<String, Account> accMap = new Map<String, Account>();',
      '<span class="diff-line-added">Map<String, Account> accMap = new Map<String, Account>(); // ✔ BULK MAP PATTERN</span>'
    );
  }
}
