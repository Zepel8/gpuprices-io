# GPU Prices Worklog

## 2026-05-08 - MVP Simplification And Launch Baseline

### Context

- Original plan was an overbuilt AI infrastructure intelligence site with many content
  categories, advanced SEO abstractions, ISR, custom analytics events, schema systems,
  future database considerations, and 18 planned content pages.
- The project was intentionally simplified into a validation-stage SEO/content MVP.

### Decision

Build only what is needed to validate search demand quickly:

- Static Next.js site.
- Root-level `[slug]` pages only.
- Filesystem MDX content.
- Basic metadata.
- Plausible pageviews only.
- No scale-oriented architecture until validation succeeds.

### Implemented Baseline

- Homepage plus 6 content pages:
  - `/runpod-vs-vast`
  - `/a100-vs-h100`
  - `/best-gpu-for-llama-inference`
  - `/best-gpu-for-flux`
  - `/4090-vs-a100-benchmark`
  - `/claude-vs-gpt-cost`
- `app/[slug]/page.tsx` handles all content pages.
- `content/*.mdx` files export `title` and `description`.
- `lib/content.ts` reads slugs and extracts metadata without compiling MDX during
  metadata generation.
- `sitemap.ts` and `robots.ts` auto-generate from content.
- Layout includes nav, footer, and Plausible.

### Commits

- `029cdb0 initial mvp`
- `e648876 fix: 修复部署问题并更新代码`
- `f368c24 fix: 升级MDX 文件`
- `7656967 fix:修复MDX调用问题`
- `d3aa46b remove unused next-mdx-remote dep`
- `b0a2685 chore: switch to new plausible script format`

### Verification From Previous Session

- Build passed after MDX routing fixes.
- Generated routes included:
  - `/`
  - all 6 content pages
  - `/robots.txt`
  - `/sitemap.xml`
- Plausible was switched to the newer `pa-xpOTWfTOgj27PQeHsPwcu.js` script format.
- Plausible verification later passed.

### Launch Follow-Up

- Site was deployed to Vercel.
- Domain: `gpuprices.io`.
- Recommended next task was Google Search Console:
  - Add `gpuprices.io` as a Domain property.
  - Verify via DNS TXT record.
  - Submit `sitemap.xml`.
  - Request indexing for homepage and the 6 content pages if available.
- Recommendation after GSC submission: wait 1-2 weeks before expanding content.

### Operating Constraint

The site is still in validation mode. Do not add platform features, database-backed
pricing, search, taxonomies, category pages, or advanced SEO machinery until search
data justifies it.

## 2026-05-16 - First GSC Signal Content Iteration

### Context

- Site has been deployed on Vercel for about one week.
- Google Search Console showed the first 2 impressions.
- Early queries:
  - `gpu pricing comparison`
  - `flux.1 schnell vram requirements`
- Homepage URL appeared in GSC: `https://www.gpuprices.io/`.

### Decision

Continue with a small content-only iteration. Do not add product features, new
architecture, analytics events, database work, ISR, search, or category systems.

### Changes

- Tuned homepage metadata and H1 toward `GPU Pricing Comparison for AI Workloads`.
- Added dedicated long-tail page:
  - `/flux-1-schnell-vram-requirements`
- Added an internal link from:
  - `/best-gpu-for-flux`
  - to `/flux-1-schnell-vram-requirements`
- Updated `CLAUDE.md` with the recovered project preset and current GSC state.

### Commit

- `5821017 content: target early GSC query signals`

### Deployment

- Vercel deployment corresponds to commit `5821017`.

### Verification Notes

- Claude Code found and killed 4 stuck Node/Next build processes:
  - 2 `npm run build` processes
  - 2 `next build` processes
- `git diff --check` passed, with only LF/CRLF line ending warnings.
- `npm run lint` was skipped because `next lint` is deprecated/interactive in the
  current setup and ESLint is not configured.
- Local `npm run build` should not be used as a blocker on this machine while the
  build hang issue is unresolved. Use Vercel build logs for deployment validation.

### Watch Next

- Confirm Vercel deployment for `5821017` is Ready.
- Confirm these URLs load after deployment:
  - `https://gpuprices.io/`
  - `https://gpuprices.io/flux-1-schnell-vram-requirements`
  - `https://gpuprices.io/best-gpu-for-flux`
- Observe GSC for 7-14 days.
- Track whether impressions grow for:
  - `gpu pricing comparison`
  - `flux.1 schnell vram requirements`
- Do not make broad site changes during the observation window unless Vercel build
  fails or pages are inaccessible.
