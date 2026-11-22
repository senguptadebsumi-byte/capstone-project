# AegisTrace v3.0 — Video Demonstration & Walkthrough Guide
### Module 06 Capstone Project &bull; Cybersecurity & Ethical Hacking Virtual Internship
**Codomax Digital Solutions**

---

## 📋 Demonstration Overview

| Parameter | Details |
| :--- | :--- |
| **Presenter** | **Ayan Mondal** (Intern ID: `CDS/INT/2026/26637504`) |
| **Track** | Cybersecurity & Ethical Hacking Virtual Internship |
| **Project Title** | AegisTrace v3.0 — Security Log & Alert Triage Workbench |
| **Deployment Target** | **Vercel** (`https://<your-project>.vercel.app`) |
| **Target Video Length** | **3 to 5 Minutes** |
| **Recommended Tools** | OBS Studio, Loom, or Windows Game Bar (`Win + G`) |
| **Resolution & Format** | 1080p (1920x1080), 30 or 60 FPS, Clear Microphone Audio |

---

## 🎬 Step-by-Step Recording Script & Timeline

### Scene 1: Introduction & Internship Overview (0:00 – 0:45)
**Screen Display:** Browser tab showing live AegisTrace dashboard on Vercel with Intern details (`Ayan Mondal`, `CDS/INT/2026/26637504`, Codomax Digital Solutions).

**Spoken Script:**
> *"Hello everyone! My name is Ayan Mondal, Intern ID CDS/INT/2026/26637504, and this is my Module 06 Capstone Project for the Cybersecurity & Ethical Hacking Virtual Internship at Codomax Digital Solutions.*  
>  
> *During this internship, we explored vulnerability assessment, network defense, ethical hacking methodologies, and incident response. For my final capstone project, I built **AegisTrace v3.0 — a SecOps Security Log Analyzer & Incident Triage Workbench**, deployed live on Vercel. It is engineered to empower SOC analysts to rapidly ingest, normalize, and triage multi-vector security telemetry directly within a zero-trust, client-side browser sandbox without risking sensitive data leaks."*

---

### Scene 2: Live Workbench Tour & HUD Architecture (0:45 – 1:30)
**Screen Display:** Full browser window showing the live AegisTrace dashboard on Vercel.

**Actions:**
1. Point out the top bar: Intern badge, "SOC Sensor Active" pulse indicator, live **UTC SOC Clock**, live **DEFCON Threat Index Status**, and the **Tactical Sound Toggle**.
2. Click **"Sound ON"** to demonstrate tactical Web Audio API sound effects.
3. Show the **Severity Distribution Bar** and the top 5 metric cards (**Total Events**, **Critical Incidents**, **High Alerts**, **Medium Warnings**, **Active IoCs**).

**Spoken Script:**
> *"Here is the live AegisTrace dashboard deployed on Vercel. Notice our tactical HUD at the top featuring a synchronized UTC SOC clock, automated DEFCON threat level indicators, and a synthesized audio feedback engine.  
>  
> The dashboard visualizes real-time metrics and a dynamic severity distribution ratio. AegisTrace is built with zero runtime dependencies and a hardened Content Security Policy in `vercel.json`—meaning it runs 100% locally with zero external network tracking or database dependencies. Sensitive security logs never leave the analyst's machine."*

---

### Scene 3: Scenario Triage, Search & Live Simulation (1:30 – 3:00)
**Screen Display:** Focus on Telemetry Ingestion panel and Event Stream table.

**Actions:**
1. Click the **"SSH Brute-Force & Root Breach"** preset. Watch the metrics and distribution bar instantly adjust.
2. In the search box, type `198.51.100.45` to show live real-time query highlighting (`<mark>`).
3. Show the table rows: Point out the progression from `Failed password` (`T1110.001`), to `Accepted password for root` (`T1078.003`), to the critical command injection alert `T1059.004`.
4. Click the **"⚡ + Inject Live Attack Event"** button once or twice to show dynamic incoming attack lines appearing live in the feed!
5. In the Adversary IoC list on the left, click **"Isolate"** next to `198.51.100.45` to showcase the simulated host quarantine state (`[QUARANTINED]`).

**Spoken Script:**
> *"Let's demonstrate our heuristic detection engine in action. With one click on our 'SSH Brute-Force' scenario, AegisTrace processes the raw auth log lines.  
>  
> Notice how it identifies an automated brute-force attack from IP 198.51.100.45, maps it to MITRE ATT&CK Technique T1110, flags the subsequent unauthorized root login, and immediately catches a malicious curl-to-bash command injection payload!  
>  
> We can also inject dynamic simulated attacks on the fly using our '+ Inject Live Attack Event' button, and immediately quarantine hostile adversary IPs with one click!"*

---

### Scene 4: Deep Dive Modal & Incident Response Playbooks (3:00 – 3:50)
**Screen Display:** Click the **"Triage &rarr;"** button on the `RULE_CMD_INJECT_C2` or `RULE_PATH_TRAVERSAL_PASSWD` event.

**Actions:**
1. The detail modal opens smoothly.
2. Show the parsed fields: Timestamp, Attacker IP, Identity, MITRE Technique ID.
3. Show the **Raw Normalized Telemetry Line**.
4. Highlight the **Automated SecOps Remediation Playbook** box with numbered response steps (e.g., host quarantine, process termination, egress firewall blocking).
5. Click **"Copy Containment CLI Command"**; show the toast notification.
6. Close modal with `Escape`.
7. Click **".MD"** and **".JSON"** export buttons; show the downloaded reports.

**Spoken Script:**
> *"When an analyst clicks 'Triage' on any event, AegisTrace opens an incident investigation drawer. Here, the analyst gets the normalized event metadata, the exact raw log string, and an actionable remediation playbook based on NIST SP 800-61 guidelines, complete with a copy-ready CLI containment command.  
>  
> Once the triage is complete, the analyst can export a formal Markdown triage report, raw JSON incident data, or CSV logs for auditing and handoff to Tier-3 incident response teams."*

---

### Scene 5: Codebase Architecture & Conclusion (3:50 – 4:30)
**Screen Display:** VS Code or workspace folder showing:
- `index.html`, `styles.css`, `app.js`
- `vercel.json` (highlight security headers)
- `docs/security-architecture.md`
- `docs/testing-and-verification-report.md`

**Spoken Script:**
> *"Taking a quick look at the project architecture: the entire app is streamlined for Vercel with `vercel.json` enforcing strict Content-Security-Policy headers and HTTP Strict Transport Security. In `app.js`, all user input is sanitized against Cross-Site Scripting before touching the DOM, ensuring that even hostile log payloads cannot compromise the analyst's workstation.  
>  
> I want to express my sincere gratitude to Codomax Digital Solutions for this incredible Cybersecurity & Ethical Hacking Virtual Internship. Thank you for watching!"*

---

## ✅ Pre-Recording Verification Checklist

- [ ] Browser zoom level set to 100% or 110% for optimal readability.
- [ ] Vercel live website loaded and verified over HTTPS.
- [ ] Sound toggle tested (audio audible through mic/desktop capture).
- [ ] Sample presets tested (`Mixed`, `Auth`, `Web`, `Firewall`).
- [ ] Live attack injection button tested.
- [ ] Export buttons tested and downloads folder clear.
