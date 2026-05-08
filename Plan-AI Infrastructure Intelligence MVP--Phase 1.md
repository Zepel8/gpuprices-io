# Plan: GPU Prices MVP — Validation Launch

## TL;DR

Static Next.js 15 site with MDX content. 6–7 pages. Plausible pageview analytics. Deploy to Vercel. Ship in 2–3 days.

This is a **content/SEO validation project**, not a platform. Build the minimum to test whether the niche ranks and converts.

---

## Stack

- Next.js 15 (App Router) + TypeScript + TailwindCSS
- shadcn/ui (only what's needed: button, card, table)
- MDX via `next-mdx-remote` (filesystem content)
- Plausible (pageviews only, no custom events)
- Vercel (static export / SSG)

---

## Pages (6–7 total)

| # | Route | Type |
|---|-------|------|
| 1 | `/` | Homepage |
| 2 | `/runpod-vs-vast` | Comparison |
| 3 | `/a100-vs-h100` | Comparison |
| 4 | `/best-gpu-for-llama-inference` | Workload guide |
| 5 | `/best-gpu-for-flux` | Workload guide |
| 6 | `/4090-vs-a100-benchmark` | Benchmark |
| 7 | `/claude-vs-gpt-cost` | Token cost |

All pages live at the root: `/[slug]`. No nested categories, no `[...slugs]`.

---

## Project Structure

```
gpuprices-io/
├── app/
│   ├── page.tsx              # Homepage
│   ├── [slug]/page.tsx       # All content pages
│   ├── layout.tsx            # Plausible script + nav + footer
│   ├── sitemap.ts            # Auto from content/
│   ├── robots.ts
│   └── globals.css
├── content/                  # 6 .mdx files (one per non-home page)
├── lib/
│   ├── content.ts            # readMdx(slug), getAllSlugs()
│   └── utils.ts
├── components/
│   ├── nav.tsx
│   ├── footer.tsx
│   └── mdx-components.tsx    # Table, headings, code
├── next.config.ts
└── package.json
```

---

## Frontmatter (minimal)

```yaml
---
title: "..."
description: "..."
---
```

That's it. Title + description drive `<title>`, meta description, and OG tags via `generateMetadata`. No keywords array, no JSON-LD, no schema generators.

---

## Implementation (2–3 days)

### Day 1 — Setup + shell
- `create-next-app` with TS + Tailwind + App Router
- Add shadcn (button, card, table only)
- Build `nav.tsx`, `footer.tsx`, root layout with Plausible `<script>` tag
- Build homepage with hero + links to the 6 content pages

### Day 2 — Content pipeline + pages
- `lib/content.ts`: read MDX from `content/{slug}.mdx`, parse frontmatter with `gray-matter`
- `app/[slug]/page.tsx` with `generateStaticParams()` and `generateMetadata()`
- `mdx-components.tsx` with styled headings, table, code
- Write the 6 MDX files (mock data is fine for validation)
- `sitemap.ts` listing `/` + all slugs; `robots.ts` allowing all

### Day 3 — Polish + deploy
- Mobile pass, dark mode if trivial (skip if not)
- `npm run build`, fix anything broken
- Push to GitHub, connect Vercel, set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- Submit sitemap to Google Search Console
- Verify Plausible receives pageviews

---

## What we are NOT building

- ❌ ISR / revalidation API routes
- ❌ Hierarchical `[...slugs]` routes
- ❌ Custom Plausible events (pageviews only)
- ❌ JSON-LD / Article schema / breadcrumb schema
- ❌ Affiliate click tracking infrastructure
- ❌ Search (client-side or hosted)
- ❌ Database migration plans / pricing API integrations
- ❌ Listing/index pages per category
- ❌ Content categories or taxonomy
- ❌ Author fields, OG image generation, Twitter cards beyond defaults
- ❌ FUTURE_SCALING.md or any forward-looking docs

If validation succeeds, revisit. Until then, none of this earns its keep.

---

## Done = Launched

- [ ] 7 pages render at production URL
- [ ] Sitemap submitted to GSC
- [ ] Plausible shows pageviews
- [ ] Lighthouse > 80 on mobile

That's the bar. Ship it.
