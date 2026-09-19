# Portfolio

Source for https://i-am-crumbles.github.io/, a personal lab notebook that happens to be a portfolio:
application security writeups, hardware hacking, and photography.

Built with [Astro](https://astro.build) and deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml`.

## Layout

- `src/content/<section>/<subsection>/*.md`: writeups (frontmatter: `title`, `date`)
- `src/assets/images/`: images referenced by writeups (converted to WebP at build time)
- `src/data/sections.ts`: the site's sections and subsections
- `src/data/resume.ts`: resume content

## Develop

```
npm install
npm run dev
```

The previous Jekyll blog is preserved on the `legacy-jekyll-blog` branch.
