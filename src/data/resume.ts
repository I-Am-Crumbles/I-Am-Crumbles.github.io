// Source: final draft resume (2026). Phone number intentionally omitted (public site).
export const profile = {
  name: 'Matthew Crum',
  title: 'Security Analyst',
  location: 'Greater Chicago Area',
  email: 'murcwehttam@gmail.com',
  linkedin: 'https://www.linkedin.com/in/matthew-crum',
  github: 'https://github.com/I-Am-Crumbles',
  summary:
    'Application security professional with hands-on experience validating and triaging vulnerabilities across web, API, and mobile targets in a large-scale bug bounty environment. Skilled at turning complex findings into clear, actionable guidance for technical and non-technical audiences. Experienced in technical mentorship, cross-functional collaboration, and improving operational workflows through scripting and AI-assisted automation.',
};

export const skillGroups = [
  { label: 'Application Security', items: 'Vulnerability validation and triage, OWASP Top 10, web/API/mobile security, penetration testing methodologies' },
  { label: 'AI-Assisted Automation', items: 'LLM agents (Claude), prompt and workflow design, human-in-the-loop systems' },
  { label: 'Tools', items: 'Burp Suite, Python, Bash, Linux CLI' },
  { label: 'Professional', items: 'Technical documentation, training and presentations, stakeholder communication' },
];

export interface Job { role: string; org: string; where: string; dates: string; bullets: string[] }

export const experience: Job[] = [
  {
    role: 'Security Analyst',
    org: 'Synack',
    where: 'Remote',
    dates: 'Mar 2026 – Present',
    bullets: [
      'Serve as an escalation point for complex technical and operational issues across vulnerability operations workflows.',
      'Review and arbitrate severity and payout decisions for high-impact submissions, weighing technical validity, business risk, and platform policy.',
      'Independently designed and built an AI-assisted triage tool using Claude that checks submissions for scope, validity, and duplicates and generates analyst notes and draft researcher communications to support my human-reviewed triage workflow.',
      'Mentor and train analysts and cross-functional stakeholders to improve consistency and technical quality.',
      'Deliver internal technical presentations that explain complex security concepts with real-world examples.',
    ],
  },
  {
    role: 'Associate Security Analyst',
    org: 'Synack',
    where: 'Remote',
    dates: 'Dec 2023 – Mar 2026',
    bullets: [
      'Triaged and validated vulnerability submissions across web, API, mobile, and host targets, including SQL Injection, SSRF, IDOR, XSS, CSRF, and Remote Code Execution.',
      'Wrote remediation guidance and explained findings to technical and non-technical stakeholders.',
      'Supported high-priority vulnerability submissions requiring detailed technical analysis, stakeholder communication, and consistent decision-making.',
      'Built and maintained internal workflow tooling and Python automation scripts using API-driven processes.',
      'Collaborated across Vulnerability Operations, Support, and other teams to investigate and resolve technical issues.',
      'Served as a backup for the support team, addressing researcher concerns about report outcomes and resolving disputes, including reversing decisions when warranted.',
      'Assisted with patch verification, responsible disclosure workflows, and vulnerability documentation.',
    ],
  },
  {
    role: 'Security Analyst Intern',
    org: 'Synack',
    where: 'Remote',
    dates: 'Aug 2023 – Dec 2023',
    bullets: [
      'Reviewed and validated vulnerability reports alongside senior analysts in a large bug bounty program, building hands-on web app security and pentesting experience.',
    ],
  },
  {
    role: 'Cybersecurity Mentor',
    org: 'Fullstack Academy',
    where: 'Remote',
    dates: 'Nov 2022 – May 2023',
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
