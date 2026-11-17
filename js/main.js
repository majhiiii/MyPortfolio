// Main JavaScript for Rakesh Majhi's Portfolio

// Mobile Navigation Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when clicking any nav link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Copy Email with Toast notification
function copyEmail() {
  const email = "rakeshmajhi.connect@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast("Copied to clipboard!", email);
  }).catch(() => {
    showToast("Email address:", email);
  });
}

function showToast(title, body) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastBody = document.getElementById('toast-body');

  if (toast && toastTitle && toastBody) {
    toastTitle.textContent = title;
    toastBody.textContent = body;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

// Filter Projects
function filterProjects(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Set active class on clicked button
  event.target.classList.add('active');

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCat.includes(category)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Resume Modal Open/Close
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking backdrop
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeResumeModal();
  }
});

const resumeModal = document.getElementById('resume-modal');
if (resumeModal) {
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeResumeModal();
    }
  });
}

// Interactive Salesforce CLI Terminal
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const CLI_COMMANDS = {
  'help': `Available Commands:
  • sf org display       - View Rakesh's developer profile & core metrics
  • sf agentforce status - View deployed Agentforce production agents
  • sf certs list        - View official Salesforce certifications
  • sf skills matrix     - List core technical competencies
  • sf contact get       - Get direct contact channels (Phone, Email, LinkedIn)
  • sf hire              - Why hire Rakesh Majhi? (Value proposition)
  • clear                - Clear terminal output`,

  'sf org display': `=== Org Information: Rakesh Majhi ===
Developer: Rakesh Majhi
Title: Salesforce Developer & Administrator · AI Automation Specialist
Current Org: Abacus System & Solution Pvt. Ltd. (Nov 2024 - Present)
Experience: 2+ Years
Active Cloud Tracks: Sales Cloud, Service Cloud, Experience Cloud, Health Cloud, B2B Commerce
Concurrent Projects: 3 Production Tracks
CI/CD Pipeline: GitHub Actions (99%+ release uptime, -30% defects)
Mentorship: Mentoring 4 Junior Developers
Status: Available for Full-Time / Consulting Roles`,

  'sf agentforce status': `=== Agentforce Production Deployment (4 Agents Live) ===
1. Employee Agent        [Experience Cloud] -> Automated internal operations queries
2. Guided Shopping Agent [B2B Commerce]     -> Product discovery & guided checkout
3. Debug Log Analyzer    [Developer Tool]   -> Automated Apex exception parsing
4. Customer Service      [Service Cloud]    -> Omnichannel triage & case deflection
Metric: ~40% reduction in first-response handling time
Pipeline: PDF unstructured data extraction to relational Salesforce CRM records`,

  'sf certs list': `=== Active Salesforce Certifications ===
[VERIFIED] 1. Salesforce Certified Agentforce Specialist
            Topics: Agent Builder, Topics & Custom Actions, Apex Invocables, Trust Layer
[VERIFIED] 2. Salesforce AI Associate
            Topics: Generative & Predictive AI, CRM Ethics, Data Readiness`,

  'sf skills matrix': `=== Technical Competency Matrix ===
• Core Dev:     Apex (Triggers, Batch, Async, Test >85%), LWC, Aura, Visualforce, SOQL/SOSL
• Platforms:    Sales, Service, Experience Cloud, Health Cloud, B2B Commerce (CloudCraze/Lightning), Data Cloud
• Automation:   Flow Builder (Record/Scheduled/Screen/Autolaunched), Validation Rules, Approvals
• Security:     Profiles, Permission Sets, Sharing Rules, MFA/SSO, Access Audits
• Integrations: Stripe, PayPal, CyberSource (SOAP), QuickBooks, GoHighLevel, FastAPI, Power BI
• Cloud/Web:    Python, Next.js, React.js, AWS Amplify/Lambda/RDS, GitHub CI/CD`,

  'sf contact get': `=== Direct Contact Details ===
Name:     Rakesh Majhi
Email:    rakeshmajhi.connect@gmail.com
Phone:    +91 8342849764
LinkedIn: https://linkedin.com/in/rakeshmajhi57
Location: Bhubaneswar, India (IST UTC+5:30 · US Timezone Overlap)`,

  'sf hire': `=== Why Hire Rakesh Majhi? ===
1. Production Agentforce Specialist: One of few developers who has deployed 4 real production agents.
2. Full Lifecycle Developer: Writes clean Apex/LWC, configures deep admin security, and builds CI/CD pipelines.
3. 10+ Integrations Delivered: Proven hands-on with Stripe, PayPal, CyberSource, QuickBooks, and custom FastAPI middleware.
4. Leadership & Scrum: Mentors 4 junior devs, leads client sprint unblocking with US/Global stakeholders.`,

  'clear': 'CLEAR'
};

function runCliCommand(cmd) {
  if (!terminalOutput) return;

  const sanitized = cmd.trim().toLowerCase();
  
  if (sanitized === 'clear') {
    terminalOutput.innerHTML = `<p class="text-slate-400">Type <span class="text-sf-accent">help</span> to view available commands.</p>`;
    return;
  }

  // Append user command
  const cmdElem = document.createElement('p');
  cmdElem.className = 'text-white font-semibold pt-1';
  cmdElem.innerHTML = `<span class="text-emerald-400 font-bold">rakesh@sf:~$</span> ${cmd}`;
  terminalOutput.appendChild(cmdElem);

  // Look up command
  const response = CLI_COMMANDS[sanitized] || 
    `Command not recognized: '${cmd}'. Type 'help' to see valid commands.`;

  const respElem = document.createElement('pre');
  respElem.className = 'text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed pl-2 border-l-2 border-sf-blue/50 my-1';
  respElem.textContent = response;
  terminalOutput.appendChild(respElem);

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function handleTerminalSubmit() {
  if (!terminalInput) return;
  const val = terminalInput.value;
  if (!val.trim()) return;
  runCliCommand(val);
  terminalInput.value = '';
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleTerminalSubmit();
    }
  });
}

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const subject = document.getElementById('form-subject').value;
  const message = document.getElementById('form-message').value;

  const mailtoBody = encodeURIComponent(
    `Hi Rakesh,\n\nName: ${name}\nEmail: ${email}\nDiscussion: ${subject}\n\nMessage:\n${message}\n\nSent from Portfolio Website`
  );

  const mailtoUrl = `mailto:rakeshmajhi.connect@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
  window.location.href = mailtoUrl;

  showToast("Email client opened!", "Check your default email app to hit send.");
}
