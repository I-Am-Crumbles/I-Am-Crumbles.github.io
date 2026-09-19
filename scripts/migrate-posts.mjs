// One-off migration: pulls posts + images out of the old Jekyll blog's git history and writes them
// into src/content + src/assets. Reads via `git show` because one old filename contains "?" which
// Windows cannot check out.
//
// usage: node scripts/migrate-posts.mjs <old-blog-clone> <group> [<group> ...]
//   groups: portswigger | htb | owasp-webgoat
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const AREA = 'web-app-security';
const OWASP_TOP10 = /^_posts\/\d{4}-\d{2}-\d{2}-(Vulnerable-and-Outdated-Components|Security-Misconfiguration|Insecure-Design|Injection|Cryptographic_Failures|Broken-Access-Control)\.md$/;

// oldImgDir: folder under docs/assets/images in the old blog. slugPrefix: stripped from the filename slug.
const groups = {
  portswigger: { match: /^_posts\/.*PortSwigger/, oldImgDir: 'portswigger', slugPrefix: /^PortSwigger-/, titlePrefix: /^PortSwigger\s*[-–]\s*/ },
  htb: { match: /^_posts\/.*-HTB-/, oldImgDir: 'HTB', slugPrefix: /^HTB-/, titlePrefix: /^(HTB|Hack ?The ?Box)\s*[-–:]\s*/i },
  'owasp-webgoat': { match: (p) => /^_posts\/.*-WebGoat-/.test(p) || OWASP_TOP10.test(p), oldImgDir: 'webgoat', slugPrefix: /^(WebGoat-)/, titlePrefix: /^OWASP Top 10 WebGoat\s*[-–:]\s*/i },
};

const [OLD, ...wanted] = process.argv.slice(2);
if (!OLD || wanted.length === 0) throw new Error('usage: node migrate-posts.mjs <old-blog-clone> <group>...');

const git = (...args) => execFileSync('git', ['-C', OLD, ...args], { encoding: 'buffer', maxBuffer: 1 << 28 });
const files = git('ls-tree', '-r', '--name-only', 'HEAD').toString('utf8').split('\n').filter(Boolean);
const fileSet = new Set(files);

for (const name of wanted) {
  const g = groups[name];
  if (!g) throw new Error(`unknown group ${name}`);
  const postDir = `src/content/${AREA}/${name}`;
  const imgRoot = `src/assets/images/${name}`;
  const oldRoot = `docs/assets/images/${g.oldImgDir}/`;
  mkdirSync(postDir, { recursive: true });
  const report = { group: name, posts: 0, images: 0, missingImages: [], titles: [] };

  const match = typeof g.match === 'function' ? g.match : (p) => g.match.test(p);
  for (const path of files.filter(match)) {
    const [, date, rawSlug] = /^_posts\/(\d{4}-\d{2}-\d{2})-(.+)\.md$/.exec(path);
    const slug = rawSlug.replace(/[?&]/g, '').replace(g.slugPrefix, '').toLowerCase();
    const lines = git('show', `HEAD:${path}`).toString('utf8').replace(/\r\n/g, '\n').split('\n');
    const first = lines.findIndex((l) => l.trim());
    if (!/^#/.test(lines[first])) throw new Error(`${path}: first line is not a heading: ${lines[first]}`);
    const title = lines[first].replace(/^#+\s*/, '').replace(/\*\*/g, '').trim().replace(g.titlePrefix, '');
    let body = lines.slice(first + 1).join('\n').replace(/^\n+/, '');

    body = body.replace(/\(\/docs\/assets\/images\/([^/)]+)\/([^)]+)\)/g, (whole, dir, p) => {
      if (dir !== g.oldImgDir) throw new Error(`${path}: unexpected image dir ${dir}`);
      report.images++;
      if (!fileSet.has(oldRoot + decodeURI(p))) report.missingImages.push(`${slug}: ${p}`);
      return `(../../../assets/images/${name}/${p})`;
    });

    writeFileSync(join(postDir, `${slug}.md`), `---\ntitle: ${JSON.stringify(title)}\ndate: ${date}\nsection: ${name}\n---\n\n${body}`);
    report.posts++;
    report.titles.push(`${date} ${slug} -> ${title}`);
  }

  // images only (skips the placeholder test.txt files the old blog used to create folders)
  for (const f of files.filter((f) => f.startsWith(oldRoot) && /\.(png|jpe?g|gif|webp)$/i.test(f))) {
    const out = join(imgRoot, f.slice(oldRoot.length));
    mkdirSync(dirname(out), { recursive: true });
    if (!existsSync(out)) writeFileSync(out, git('show', `HEAD:${f}`));
  }
  console.log(JSON.stringify(report, null, 2));
}
