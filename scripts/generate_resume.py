import subprocess
import os
import base64

def get_photo_b64():
    photo_path = os.path.abspath("public/assets/rakesh_photo.jpg")
    if os.path.exists(photo_path):
        with open(photo_path, "rb") as f:
            return base64.b64encode(f.read()).decode("utf-8")
    return ""

def build_html(photo_b64):
    photo_tag = f'<img src="data:image/jpeg;base64,{photo_b64}" alt="Rakesh Majhi" class="photo" />' if photo_b64 else ''
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Rakesh Majhi - Salesforce Developer Resume</title>
<style>
  @page {{
    size: A4;
    margin: 11mm 14mm 11mm 14mm;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #1a1a1a;
    background: #ffffff;
    font-size: 9.1pt;
    line-height: 1.33;
  }}
  .header {{
    border-bottom: 2.5px solid #1F2A5C;
    padding-bottom: 7px;
    margin-bottom: 9px;
  }}
  .header-content {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
  }}
  .header-text {{
    flex: 1;
  }}
  .photo {{
    width: 23mm;
    height: 28mm;
    object-fit: cover;
    object-position: top;
    border-radius: 5px;
    border: 1.5px solid #1F2A5C;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }}
  .name {{
    font-size: 21pt;
    font-weight: 800;
    color: #1F2A5C;
    letter-spacing: -0.5px;
    line-height: 1.1;
  }}
  .headline {{
    font-size: 10pt;
    font-weight: 600;
    color: #8A4B2A;
    margin-top: 2px;
    margin-bottom: 4px;
  }}
  .contact-bar {{
    font-size: 8.4pt;
    color: #4a4a4a;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }}
  .contact-bar a {{
    color: #1F2A5C;
    text-decoration: none;
    font-weight: 500;
  }}
  .section {{
    margin-bottom: 9px;
  }}
  .section-title {{
    font-size: 10pt;
    font-weight: 700;
    color: #1F2A5C;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    border-bottom: 1.2px solid #e0e0e0;
    padding-bottom: 2px;
    margin-bottom: 5px;
  }}
  .summary-text {{
    font-size: 8.9pt;
    color: #2a2a2a;
    text-align: justify;
    line-height: 1.34;
  }}
  .skills-grid {{
    display: grid;
    grid-template-columns: 1fr;
    gap: 3px;
    font-size: 8.7pt;
  }}
  .skill-row strong {{
    color: #1F2A5C;
    font-weight: 600;
  }}
  .job {{
    margin-bottom: 7px;
  }}
  .job-header {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 9.4pt;
  }}
  .job-title {{
    font-weight: 700;
    color: #111;
  }}
  .job-company {{
    color: #8A4B2A;
    font-weight: 600;
    font-size: 8.9pt;
  }}
  .job-dates {{
    font-size: 8.4pt;
    color: #555;
    font-weight: 600;
  }}
  .bullets {{
    list-style-type: none;
    margin-top: 2.5px;
    padding-left: 0;
  }}
  .bullets li {{
    position: relative;
    padding-left: 13px;
    font-size: 8.6pt;
    color: #2b2b2b;
    margin-bottom: 2px;
    line-height: 1.31;
  }}
  .bullets li::before {{
    content: '•';
    position: absolute;
    left: 2px;
    color: #1F2A5C;
    font-weight: bold;
    font-size: 9.5pt;
  }}
  .cert-grid {{
    display: flex;
    gap: 12px;
    font-size: 8.7pt;
    font-weight: 600;
    color: #2a2a2a;
  }}
  .cert-badge {{
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #f4f6fb;
    padding: 3.5px 9px;
    border-radius: 4px;
    border: 1px solid #d8deeb;
    color: #1F2A5C;
  }}
</style>
</head>
<body>

<div class="header">
  <div class="header-content">
    <div class="header-text">
      <div class="name">RAKESH MAJHI</div>
      <div class="headline">Salesforce Developer &amp; Administrator · Apex, LWC &amp; Flow · Integrations · Agentforce &amp; AI Automation</div>
      <div class="contact-bar">
        <span>📍 Bhubaneswar, India</span>
        <span>📞 +91 8342849764</span>
        <span>✉️ <a href="mailto:rakeshmajhi.connect@gmail.com">rakeshmajhi.connect@gmail.com</a></span>
        <span>🔗 <a href="https://linkedin.com/in/rakeshmajhi57">linkedin.com/in/rakeshmajhi57</a></span>
        <span>💻 <a href="https://github.com/majhiiii">github.com/majhiiii</a></span>
        <span>🌐 <a href="https://majhiiii.github.io/MyPortfolio/">Live Portfolio</a></span>
      </div>
    </div>
    <div class="header-photo">
      {photo_tag}
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">Professional Summary</div>
  <p class="summary-text">
    Salesforce Developer with 2 years of experience delivering Apex, Visualforce, Lightning Web Components (LWC), and Flow solutions across Sales Cloud, Service Cloud, Experience Cloud, and B2B Commerce. Delivered 10+ enterprise integrations over REST/SOAP and OAuth (Stripe, PayPal, QuickBooks, CyberSource, GoHighLevel, Power BI), deployed 4 production Agentforce agents on Experience Cloud, and manages automated release pipelines via GitHub CI/CD across 3 concurrent projects. Solid expertise in Salesforce administration, data security, and Agile teamwork with US stakeholders.
  </p>
</div>

<div class="section">
  <div class="section-title">Core Technical Skills</div>
  <div class="skills-grid">
    <div class="skill-row"><strong>Salesforce Development:</strong> Apex (Classes, Triggers, Batch, Queueable, Unit Testing &gt;85%), LWC, Aura Components, Visualforce, SOQL, SOSL, Platform Events, Connected Apps, SFDX CLI</div>
    <div class="skill-row"><strong>Salesforce Administration:</strong> Flow Builder (Record-triggered, Screen, Autolaunched), Validation Rules, Approval Processes, Security Model (Profiles, Permission Sets, Sharing Rules, Roles), Reports &amp; Dashboards, MFA/SSO coordination</div>
    <div class="skill-row"><strong>Integrations &amp; Middleware:</strong> REST/SOAP APIs, OAuth 2.0 PKCE, Signed Webhooks, FastAPI (Python), Office.js (Outlook Add-ins), Google Tag Manager</div>
    <div class="skill-row"><strong>AI &amp; Automation:</strong> Agentforce (Agent Builder, Topics, Guardrails, Invocables), Einstein Bots, PDF Extraction Pipelines, ChatGPT API</div>
    <div class="skill-row"><strong>Full-Stack &amp; Cloud:</strong> Python, JavaScript (ES6+), React.js, Next.js, HTML5/CSS3, AWS (Amplify, EC2, Lambda, RDS, S3, CloudFront), PostgreSQL, MySQL</div>
    <div class="skill-row"><strong>DevOps &amp; Tools:</strong> Git, GitHub Actions CI/CD, VS Code, Postman, Workbench, Zeplin, Agile/Scrum</div>
  </div>
</div>

<div class="section">
  <div class="section-title">Professional Experience</div>

  <div class="job">
    <div class="job-header">
      <span class="job-title">Software Developer – Salesforce &amp; AI Integrations</span>
      <span class="job-dates">Nov 2024 – Present</span>
    </div>
    <div class="job-company">Abacus System &amp; Solution Pvt. Ltd. (ASSPL) · Bhubaneswar, India</div>
    <ul class="bullets">
      <li>Technical developer on 3 concurrent client projects spanning B2B Commerce (CloudCraze), Experience Cloud, and custom multi-tenant CRM integrations for US-based stakeholders.</li>
      <li>Engineered 15+ custom Lightning Web Components (LWC) pixel-matched from Zeplin designs, replacing legacy Visualforce pages with modern reactive UI.</li>
      <li>Overrode CloudCraze core pricing and checkout hooks (ccServiceCart, cc_hk_Order) with single-pass Apex logic to support volume tiered pricing and order splitting within governor limits.</li>
      <li>Configured and deployed 4 production Agentforce agents on Experience Cloud (Guided Shopping, Employee Support, Debug Log Analysis, Customer Care) with custom @InvocableMethod Apex actions and Einstein Trust Layer guardrails.</li>
      <li>Engineered automated PDF document extraction pipeline extracting structured data from supplier invoices directly into Salesforce Lead and Case records.</li>
      <li>Delivered 10+ bidirectional integrations via REST/SOAP with Stripe, PayPal, QuickBooks Online, CyberSource, GoHighLevel, and Power BI dashboards, eliminating ~5 hours/week of manual sync.</li>
      <li>Built an in-house Office.js Outlook add-in using OAuth 2.0 PKCE and dynamic describeSObjects REST queries with 1-click email logging to Tasks and EmailMessages.</li>
      <li>Managed Salesforce administration: org security, permission set groups, sharing rules, validation rules, screen flows, and quarterly security audits.</li>
      <li>Configured GitHub Actions CI/CD pipeline automating metadata validation, unit test execution, and deployment to staging and production orgs. Mentored 4 junior developers.</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-title">Web Development Intern</span>
      <span class="job-dates">Mar 2024 – Oct 2024</span>
    </div>
    <div class="job-company">Briskode Technology · Bhubaneswar, India</div>
    <ul class="bullets">
      <li>Built responsive client-facing web application components using React.js, Next.js, and modern CSS frameworks.</li>
      <li>Connected frontend state to backend REST APIs, handled asynchronous error states, and implemented token authentication flows.</li>
      <li>Participated in daily Agile standups, code reviews, and Git version control across a 5-member development team.</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-title">Software Developer Trainee (Python Full Stack)</span>
      <span class="job-dates">Sep 2023 – Feb 2024</span>
    </div>
    <div class="job-company">Abacus System &amp; Solution Pvt. Ltd. · Bhubaneswar, India</div>
    <ul class="bullets">
      <li>Completed intensive 6-month full-stack engineering program covering Python, FastAPI/Django, PostgreSQL schema design, and REST APIs.</li>
      <li>Developed solid fundamentals in relational data modeling, query optimization, and test-driven development applied directly in production client solutions.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Education &amp; Certifications</div>
  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
    <div>
      <strong>Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering</strong><br>
      <span style="color: #666; font-size: 8.7pt;">Raajdhani Engineering College (BPUT), Bhubaneswar</span>
    </div>
    <span style="font-size: 8.4pt; color: #555; font-weight: 600;">2019 – 2023</span>
  </div>

  <div style="margin-top: 5px;">
    <strong style="color: #1F2A5C; font-size: 8.9pt;">Salesforce Certifications:</strong>
    <div class="cert-grid" style="margin-top: 3px;">
      <span class="cert-badge">🏅 Salesforce Certified Agentforce Specialist</span>
      <span class="cert-badge">🏅 Salesforce Certified AI Associate</span>
    </div>
  </div>
</div>

</body>
</html>
"""

def main():
    photo_b64 = get_photo_b64()
    resume_html = build_html(photo_b64)

    temp_html = os.path.abspath("resume_temp.html")
    output_pdf = os.path.abspath("public/assets/Rakesh_Majhi_Resume.pdf")

    os.makedirs("public/assets", exist_ok=True)

    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(resume_html)

    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    cmd = [
        edge_path,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={output_pdf}",
        temp_html,
    ]
    subprocess.run(cmd, check=True)

    print("Generated PDF at:", output_pdf)
    print("PDF File size:", os.path.getsize(output_pdf), "bytes")

    if os.path.exists(temp_html):
        os.remove(temp_html)

if __name__ == "__main__":
    main()
