# AegisTrace v3.0 — Security Log & Alert Triage Workbench
### Module 06 Capstone Project &bull; Cybersecurity & Ethical Hacking Virtual Internship
**Codomax Digital Solutions**

---

## 📌 Intern & Project Metadata

| Attribute | Details |
| :--- | :--- |
| **Intern Name** | **Debsumi Sengupta** |
| **Intern ID** | `CDS/INT/2026/26637657` |
| **Internship Track** | Cybersecurity & Ethical Hacking |
| **Module** | **Module 06 — Cybersecurity Capstone Project (Day 26 – Day 30)** |
| **Project Title** | **AegisTrace — Security Log & Alert Triage Workbench** |
| **Primary Focus** | Defensive SecOps, Threat Hunting, Log Correlation & Incident Triage |
| **Deployment Target** | **Vercel Production Edge** (`https://<your-project-name>.vercel.app`) |
| **Architecture** | Zero-Dependency, Client-Side Sandboxed Web App with `vercel.json` Security Headers |

---

## 🛡️ Executive Summary & Solution Overview

In modern Security Operations Centers (SOCs), analysts battle alert fatigue across disparate operating system authentication trails (`sshd`, `sudo`), web reverse proxies/WAFs (Nginx, Apache, Cloudflare), and perimeter stateful firewalls (`iptables`, kernel netfilter). Traditional centralized SIEM solutions often impose significant cloud costs and introduce data leakage risks when confidential logs are transmitted over external networks.

**AegisTrace** is an autonomous, zero-dependency, client-side **Security Log Analyzer & Incident Triage Workbench** built specifically for lightning-fast deployment on **Vercel**. It delivers instantaneous heuristic detection, Indicator of Compromise (IoC) extraction, MITRE ATT&CK technique correlation, adversary quarantine controls, and automated SecOps remediation playbooks directly inside the analyst's browser sandbox—ensuring sensitive log telemetry never leaves the local perimeter.

---

## 🚀 Key Architectural & Operational Features

1. **Multi-Vector Telemetry Normalization & Ingestion**
   - Ingests Linux authentication logs (`auth.log`), web access/WAF logs (Common/Combined Log Format), and perimeter firewall dropped/forwarded packet records (`iptables` / kernel).
   - Instant preloaded attack scenarios alongside custom file upload (`.log`, `.txt`, `.json`, `.csv`) and real-time live attack injection (`+ Inject Live Attack Event`).

2. **Heuristic Detection & MITRE ATT&CK Mapping**
   - Rules engine correlates signature patterns to standardized techniques:
     - **T1059.004 / T1105**: Command Injection & Remote Shell Payload Ingestion
     - **T1190**: Exploitation of Public-Facing Applications (SQLi, Shellshock)
     - **T1083 / T1005**: Directory Traversal & Sensitive File Exposure (`/etc/passwd`, `.env`)
     - **T1110.001**: SSH Password Guessing & Credential Stuffing
     - **T1078.003**: Unauthorized Root Privilege Transitions
     - **T1046 / T1595.002**: Network Port Sweeps & Automated Scanners (`sqlmap`, `nikto`)
     - **T1071.001**: Suspicious Outbound Egress / C2 Beaconing (Port 4444, 1337)

3. **Dynamic Threat Scoring & Visual Severity Breakdown**
   - Real-time metric cards for Total Events, Critical Incidents, High Alerts, Medium Warnings, and Active IoCs.
   - Live **DEFCON Threat Index Status** in the tactical HUD bar (DEFCON 1 Critical, DEFCON 2 Elevated, DEFCON 5 Nominal).
   - Proportional **Threat Severity Distribution Bar** providing immediate visual ratio feedback.
   - Interactive severity chips (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `INFO`) and real-time substring search with keyword highlighting.

4. **Interactive IoC Quarantine & Containment CLI**
   - Active adversary IoC list with one-click IP copy and **"Isolate / Unblock"** quarantine simulation.
   - Deep-dive incident modal provides exact raw normalized telemetry, step-by-step **NIST SP 800-61** remediation workflows, and a one-click **"Copy Containment CLI Command"** (e.g. `iptables`, `fail2ban`).

5. **Multi-Format Forensic Export Engine**
   - Export structured **Markdown (`.md`)** executive triage reports.
   - Export raw machine-readable **JSON (`.json`)** security records with quarantine states.
   - Export filtered **CSV (`.csv`)** logs for spreadsheet auditing.

6. **Tactical SOC Audio & Zero-Trust Privacy Model**
   - Synthesized Web Audio API sound feedback (zero audio file dependencies).
   - 100% in-browser memory model with strict HTML entity escaping (`escapeHTML()`) neutralizing Stored XSS attacks from hostile log headers.

---

## 🔒 Safe Testing & Authorized Usage Disclaimer

> **IMPORTANT NOTICE:**  
> This solution was developed exclusively for academic research, defensive security evaluation, and educational demonstration as part of the **Codomax Digital Solutions Cybersecurity & Ethical Hacking Virtual Internship**.  
> All sample attack patterns and logs included in this workbench are synthetic or sanitized. Users must obtain explicit written authorization before ingesting live production telemetry or running active network scans against any system or infrastructure. The author and Codomax Digital Solutions assume no liability for misuse.

---

## 📁 Streamlined Repository Structure

```text
codomax-cybersecurity-capstone/
├── index.html                               # Enhanced SecOps Dashboard (Root Entry Point)
├── styles.css                               # High-Contrast Cyber SOC Dark Theme
├── app.js                                   # Ingestion, Heuristics, Quarantine & Export Engine
├── vercel.json                              # Vercel Configuration & Hardened Security Headers
├── .gitignore                               # Clean OS and IDE ignore rules
├── README.md                                # Comprehensive capstone documentation
├── LINKEDIN_POST.md                         # Publication-ready internship completion post
└── docs/                                    # Technical Specifications & Reports
    ├── security-architecture.md             # System design, data flow & threat model
    ├── testing-and-verification-report.md   # Functional, adversarial & performance test results
    └── demo-walkthrough.md                  # Video demonstration script & step-by-step guide
```

---

## ⚡ 1-Click Vercel Deployment Guide

AegisTrace is optimized for native static hosting on **Vercel** with zero build configuration:

### Method 1: Using the Vercel CLI (Recommended & Fastest)
```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Deploy directly from the project directory
cd codomax-cybersecurity-capstone
vercel

# 3. Deploy to production
vercel --prod
```
Vercel will output your live URL: `https://<your-project-name>.vercel.app`.

### Method 2: Via Vercel Web Dashboard
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import this repository folder or drag and drop it into the Vercel dashboard.
3. Keep the default settings:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** *None*
   - **Output Directory:** `./`
4. Click **Deploy**. Your dashboard will be live with full HTTPS, edge caching, and hardened security headers from `vercel.json`!

---

## 💻 Local Testing

Open `index.html` directly in any web browser, or launch a quick local server:
```bash
python -m http.server 3000
```
Navigate to `http://localhost:3000`.

---

## 📚 Deliverable Verification Matrix

| Deliverable | Location | Status |
| :--- | :--- | :---: |
| **Capstone Overview & Setup** | [README.md](file:///c:/Users/AYAN%20MONDAL/Desktop/codomax-cybersecurity-capstone/README.md) | ✅ Complete |
| **Enhanced Triage Dashboard** | [index.html](file:///c:/Users/AYAN%20MONDAL/Desktop/codomax-cybersecurity-capstone/index.html) | ✅ Complete |
| **Vercel Hardened Config** | [vercel.json](file:///c:/Users/AYAN%20MONDAL/Desktop/codomax-cybersecurity-capstone/vercel.json) | ✅ Complete |
| **Security Architecture Specification** | [docs/security-architecture.md](file:///c:/Users/AYAN%20MONDAL/Desktop/codomax-cybersecurity-capstone/docs/security-architecture.md) | ✅ Complete |
| **Testing & Verification Report** | [docs/testing-and-verification-report.md](file:///c:/Users/AYAN%20MONDAL/Desktop/codomax-cybersecurity-capstone/docs/testing-and-verification-report.md) | ✅ Complete |
| **Demo Walkthrough Guide** | [docs/demo-walkthrough.md](file:///c:/Users/AYAN%20MONDAL/Desktop/codomax-cybersecurity-capstone/docs/demo-walkthrough.md) | ✅ Complete |
| **LinkedIn Announcement** | [LINKEDIN_POST.md](file:///c:/Users/AYAN%20MONDAL/Desktop/codomax-cybersecurity-capstone/LINKEDIN_POST.md) | ✅ Complete |

---

## 👨‍💻 Author & Acknowledgments

- **Intern:** Debsumi Sengupta
- **ID:** `CDS/INT/2026/26637657`
- **Program:** Virtual Internship in Cybersecurity & Ethical Hacking
- **Organization:** Codomax Digital Solutions
