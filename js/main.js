/**
 * RAKESH MAJHI PORTFOLIO - JAVASCRIPT ENGINE
 * Handles Theme Toggle, Typing Animations, Modals, Filters, and Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
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
      // Ignore if cookies/storage blocked
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

  // Initial theme detection: query param, hash, saved, or system
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
      const typeSpeed = 65;
      const deleteSpeed = 35;
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
          delta = 400;
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
     6. FADE + TRANSLATE REVEAL ON SCROLL
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
     7. SKILLS VIEW TOGGLE (Grid vs Cloud View)
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

  // Fallback to grid on mobile resize
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      setSkillsView('grid');
    }
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
     9. PROJECT CASE STUDY MODAL (Accessible & Focus Trapped)
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
    },
    'powerbi-sales': {
      title: "Power BI Real-Time Salesforce Analytics Dashboard",
      tag: "Executive Analytics & BI",
      problem: "Leadership spent hours each week manually extracting CSVs to compile sales conversion and pipeline velocity reports.",
      approach: "Engineered an automated SOQL-driven ingestion pipeline delivering live Salesforce sales and pipeline data directly into Power BI executive dashboards.",
      architecture: "Salesforce Sales Cloud ──► SOQL Query Service ──► Data Pipeline ──► Power BI Service Streaming Dataset.",
      challenges: "Enforcing role-hierarchy and field-level security permissions so viewers only see data appropriate to their role.",
      result: "Eliminated manual spreadsheet compilation, saving ~5 hours of manual reporting time each week.",
      tech: ["Power BI", "Sales Cloud", "SOQL", "Data Governance", "Executive Dashboards"]
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

    // Focus on close button
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  }

  // Attach event to project cards
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
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('open')) {
        closeProjectModal();
      }
      closeMobileNav();
    }
  });

  /* ==========================================================================
     10. VIBE CODING FAUX TERMINAL TYPING & DIFF
     ========================================================================== */
  const vibePrompt = document.getElementById('vibe-prompt-text');
  const vibeDiff = document.getElementById('vibe-diff-box');

  if (vibePrompt && vibeDiff && !prefersReducedMotion) {
    const promptString = "Implement an Agentforce custom action to triage cases and verify Stripe webhook status...";
    let pIdx = 0;

    function typeVibePrompt() {
      if (pIdx < promptString.length) {
        vibePrompt.textContent += promptString.charAt(pIdx);
        pIdx++;
        setTimeout(typeVibePrompt, 35);
      } else {
        setTimeout(() => {
          vibeDiff.classList.remove('opacity-0');
        }, 400);
      }
    }

    const vibeSection = document.getElementById('vibe-coding');
    if (vibeSection) {
      const vibeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeVibePrompt();
            vibeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      vibeObserver.observe(vibeSection);
    }
  } else if (vibePrompt && vibeDiff) {
    vibePrompt.textContent = "Implement an Agentforce custom action to triage cases and verify Stripe webhook status...";
    vibeDiff.classList.remove('opacity-0');
  }

  /* ==========================================================================
     11. CLICK TO COPY EMAIL WITH TOAST
     ========================================================================== */
  const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');
  const copyToast = document.getElementById('copy-toast');

  function copyEmailAddress() {
    const email = "rakeshmajhi.connect@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast();
    }).catch(() => {
      showToast();
    });
  }

  function showToast() {
    if (!copyToast) return;
    copyToast.classList.add('visible');
    setTimeout(() => {
      copyToast.classList.remove('visible');
    }, 2800);
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailAddress();
    });
  });

  /* ==========================================================================
     12. RESUME VIEW / PRINT TRIGGER
     ========================================================================== */
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

  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResume);
  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) {
        closeResume();
      }
    });
  }

});
