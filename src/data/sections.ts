export interface SubSection { slug: string; title: string; blurb: string }
export interface Section { slug: string; title: string; blurb: string; subs: SubSection[] }

export const sections: Section[] = [
  {
    slug: 'web-app-security',
    title: 'Web App Security',
    blurb: 'Labs, writeups and notes on finding and exploiting web vulnerabilities.',
    subs: [
      { slug: 'portswigger', title: 'PortSwigger', blurb: 'Web Security Academy labs: SQLi, auth, SSRF, XXE, XSS and more.' },
      { slug: 'htb', title: 'HackTheBox', blurb: 'Vulnerable box writeups.' },
      { slug: 'owasp-webgoat', title: 'OWASP / WebGoat', blurb: 'OWASP Top 10 walkthroughs.' },
    ],
  },
  { slug: 'hardware-hacking', title: 'Hardware Hacking', blurb: 'Teardowns, UART/JTAG, firmware, and the projects behind them.', subs: [] },
  { slug: 'homelab', title: 'Homelab', blurb: 'Home lab builds and tooling.', subs: [] },
  { slug: 'photography', title: 'Photography', blurb: 'Galleries and portfolios.', subs: [] },
];
