# gpuprices.io

Static Next.js 15 site for GPU and AI infrastructure comparisons.

## Stack

- Next.js 15 (App Router) + TypeScript
- TailwindCSS
- MDX content via `next-mdx-remote`
- Plausible (pageviews only)
- Vercel (SSG)

## Develop

```
npm install
cp .env.example .env.local   # adjust values
npm run dev
```

## Add a page

1. Drop a new `.mdx` file under `content/` — filename becomes the slug (e.g.
   `content/h100-vs-b200.mdx` -> `/h100-vs-b200`).
2. Frontmatter only needs `title` and `description`.
3. The home page list and `sitemap.xml` pick it up automatically.

## Deploy

Push to GitHub, import in Vercel, set `NEXT_PUBLIC_SITE_URL` and
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Vercel auto-deploys on push to `main`.

After first deploy, submit `/sitemap.xml` to Google Search Console.
