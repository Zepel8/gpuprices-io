# GPU Prices Project Preset

## Project

- Path: `q:\gpuprices-io`
- Domain: `gpuprices.io`
- Purpose: validation-stage SEO/content project for GPU and AI infrastructure comparisons.
- Bias: launch fast, keep architecture minimal, avoid building for scale until validation data says it is worth it.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- MDX content with `@next/mdx` and `remark-gfm`
- Plausible analytics with the current `pa-xpOTWfTOgj27PQeHsPwcu.js` script in `app/layout.tsx`
- Vercel static generation

## Architecture

- Homepage: `app/page.tsx`
- Content route: `app/[slug]/page.tsx`
- Content files: `content/*.mdx`
- Content metadata: `export const title` and `export const description` at the top of each MDX file
- Metadata extraction: `lib/content.ts` scans source text for exported strings, avoiding MDX compilation during metadata reads
- Sitemap and robots are generated from the content directory

## Current State From Previous Session

- 1 homepage plus 6 MDX content pages exist.
- Build previously passed with all pages statically generated.
- Plausible verification previously passed.
- The project was considered ready for Google Search Console submission.
- Main recommendation was to wait for SEO/indexing data before adding content or features.
- As of 2026-05-16, the site has been deployed on Vercel for about one week and Google Search Console shows 2 impressions.
- First visible GSC queries: `gpu pricing comparison` for the homepage and `flux.1 schnell vram requirements`.
- The next content iteration added a dedicated `flux-1-schnell-vram-requirements` page and tuned the homepage toward GPU pricing comparison intent.

## Operating Rules

- Do not add ISR, API revalidation, databases, pricing feeds, category systems, search, custom analytics events, JSON-LD generators, or advanced SEO abstractions unless validation succeeds.
- Do not add more content during the initial observation window unless explicitly requested.
- Preserve simple root-level routes like `/runpod-vs-vast`.
- Keep changes small and deployment-oriented.
- Before meaningful changes, run `npm run build` when practical.

## Suggested Next Steps

1. Verify Google Search Console has `sitemap.xml` submitted for `gpuprices.io`.
2. Check indexed URL count and search query impressions.
3. If impressions are appearing, continue with a small content-only push based on real GSC queries.
4. Keep the next iteration limited to 2-3 new pages or refreshes; do not add platform features yet.
5. If there is no meaningful growth after the validation window, avoid expanding the product surface.
