// Source: Matthew Crum resume, Sep 2026. Phone number intentionally omitted (public site).
export const profile = {
  name: 'Matthew Crum',
  title: 'Security Analyst',
  headline: 'Security Analyst, Application Security',
  location: 'Greater Chicago Area',
  email: 'murcwehttam@gmail.com',
  linkedin: 'https://www.linkedin.com/in/matthew-crum',
  github: 'https://github.com/I-Am-Crumbles',
  summary:
    'Application security analyst with three years of hands-on vulnerability triage in a large-scale bug bounty environment: 6,700+ reports validated across web, API, mobile, cloud, host, and LLM targets. Skilled at turning complex findings into clear, actionable guidance for technical and non-technical audiences. Experienced in training analysts and improving triage workflows through scripting and AI-assisted automation.',
};

export const skillGroups = [
  { label: 'Application Security', items: 'Vulnerability validation and triage, severity and impact assessment, OWASP Top 10, web/API/mobile/cloud security, LLM application security' },
  { label: 'AI-Assisted Automation', items: 'LLM agents (Claude), prompt and workflow design, human-in-the-loop systems' },
  { label: 'Tools', items: 'Burp Suite, Python, Bash, Linux CLI' },
  { label: 'Professional', items: 'Analyst training, technical documentation, presentations, stakeholder communication' },
];

export interface Job { role: string; org: string; where: string; dates: string; bullets: string[] }

export const experience: Job[] = [
  {
    role: 'Key results (last two years)',
    org: 'Synack',
    where: 'Remote',
    dates: 'Aug 2023 - Present',
    bullets: [
      'Triaged 5,000+ vulnerability reports and adjudicated $3.3M in researcher payouts, ranking #4 in output on a team of 10-12 analysts.',
      'Triaged 675+ critical-severity findings, including RCE, SQL injection, account takeover, and authentication bypass.',
      '96.8% of validated findings accepted by customers; 93.5% of triage decisions upheld in peer review.',
      'Trained 10+ new analysts: led core training sessions and reviewed their triage decisions until they were cleared for independent adjudication.',
    ],
  },
  {
    role: 'Security Analyst',
    org: 'Synack',
    where: 'Remote',
    dates: 'Mar 2026 - Present',
    bullets: [
      'Serve as an escalation point for complex technical and operational issues; deliver internal technical presentations on complex security concepts.',
      'Review and arbitrate severity and payout decisions for high-impact submissions, weighing technical validity, business risk, and platform policy.',
      'Designed and built an AI-assisted triage tool using Claude that checks submissions for scope, validity, and duplicates and generates analyst notes and draft researcher communications to support my human-reviewed triage workflow.',
    ],
  },
  {
    role: 'Associate Security Analyst',
    org: 'Synack',
    where: 'Remote',
    dates: 'Dec 2023 - Mar 2026',
    bullets: [
      'Triaged and validated vulnerability submissions across web, API, mobile, cloud, host, and LLM targets, with a focus on access control/IDOR, XSS, and SQL injection (50%+ of volume).',
      'Wrote remediation guidance and explained findings to technical and non-technical stakeholders.',
      'Built and maintained internal workflow tooling and Python automation scripts using API-driven processes.',
      'Served as backup for the support team, resolving researcher disputes about report outcomes, including reversing decisions when warranted.',
      'Assisted with patch verification, responsible disclosure workflows, and vulnerability documentation.',
    ],
  },
  {
    role: 'Security Analyst Intern',
    org: 'Synack',
    where: 'Remote',
    dates: 'Aug 2023 - Dec 2023',
    bullets: [
      'Validated vulnerability reports alongside senior analysts, building hands-on web app security experience.',
    ],
  },
  {
    role: 'Cybersecurity Mentor',
    org: 'Fullstack Academy',
    where: 'Remote',
    dates: 'Nov 2022 - May 2023',
    bullets: ['Taught and mentored cybersecurity students remotely, maintaining a 9.5/10 average satisfaction score.'],
  },
];

export const certifications = [
  { name: 'Certified AppSec Pentester (CAPen)', date: 'May 2024' },
  { name: 'eLearnSecurity Web Application Penetration Tester (eWPT)', date: 'Apr 2024' },
  { name: 'eLearnSecurity Junior Penetration Tester (eJPT)', date: 'Aug 2023' },
  { name: 'University of Illinois Chicago Certificate in Cybersecurity', date: 'Jun 2022' },
  { name: 'CompTIA Security+ (expired 2025)', date: 'Sep 2022' },
];

export const projects = [
  {
    name: 'i-am-crumbles.github.io',
    desc: 'Lab-notebook portfolio with 50+ web security writeups (PortSwigger, HackTheBox, OWASP WebGoat); hardware hacking and a vulnerable-app series in progress.',
  },
];
