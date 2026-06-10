# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**catopia** — a Next.js 16 app built to run on Cloudflare Workers via the OpenNext adapter.

## Package Manager

This project uses **Bun**. Always use `bun` instead of `npm`/`yarn`/`pnpm`.

## Commands

```bash
bun dev          # Next.js dev server at localhost:3000 (Node.js runtime, not Cloudflare)
bun preview      # Build and preview using the actual Cloudflare Workers runtime locally
bun build        # Next.js production build only
bun run deploy   # Build with OpenNext and deploy to Cloudflare
bun lint         # ESLint
bun run cf-typegen  # Regenerate cloudflare-env.d.ts after adding Wrangler bindings
```

## Architecture

### Two Runtimes
- `bun dev` runs on Node.js — use for fast iteration.
- `bun preview` runs on the Cloudflare Workers runtime — required to test Cloudflare-specific features (bindings, caching, image optimization).

### Cloudflare Integration
- **`open-next.config.ts`** — configures the OpenNext/Cloudflare adapter. R2 incremental cache is available here (currently commented out).
- **`wrangler.jsonc`** — Cloudflare Worker config. Worker name: `calm-bread-8df3`. Bindings defined here: `ASSETS` (static files), `IMAGES` (image optimization), `WORKER_SELF_REFERENCE` (self-reference for caching).
- **`cloudflare-env.d.ts`** — auto-generated TypeScript types for Cloudflare bindings; regenerate with `bun run cf-typegen` after changing `wrangler.jsonc`.
- **`.dev.vars`** — local-only environment variables passed to the Wrangler dev runtime (equivalent of `.env` for Cloudflare).
- Cloudflare bindings are accessible at runtime via `getCloudflareContext()` from `@opennextjs/cloudflare`. This also works in `bun dev` because `next.config.ts` calls `initOpenNextCloudflareForDev()`.

### Icons
Use **Lucide React** (`lucide-react`) for all icons. Import named components directly: `import { IconName } from "lucide-react"`. Do not add SVG files or other icon libraries.

### Next.js App Router
All pages live under `src/app/[locale]/` using the App Router. Tailwind CSS v4 is configured via PostCSS (`postcss.config.mjs`).

### i18n
Supported locales: `en` (en-US) and `es` (es-PY), configured in `src/i18n/routing.ts`.

- **`src/proxy.ts`** — next-intl middleware (Next.js 16 calls this "proxy"). Reads the `Accept-Language` request header and redirects `/` → `/en` or `/es` automatically.
- **`src/i18n/routing.ts`** — locale list and default locale.
- **`src/i18n/request.ts`** — server-side next-intl config; loads the correct `messages/*.json` file.
- **`messages/en.json`** / **`messages/es.json`** — translation files. Add new keys here when adding UI text.
- In Server Components use `getTranslations("namespace")` from `next-intl/server`. In Client Components use `useTranslations("namespace")`.
- Per-locale SEO metadata (title, description, keywords, OG locale, hreflang) lives in `src/app/[locale]/layout.tsx` via `generateMetadata`.

### Rendering Strategy
This project uses OpenNext on Cloudflare Workers — do **not** add `output: 'export'` to `next.config.ts` (it would break the Workers setup). Instead, every page file must explicitly opt into static rendering:

```ts
export const dynamic = "force-static";
```

Add this to every `page.tsx` (and `route.ts` where applicable). The locale is in the URL path so pages can still be fully static even with i18n.
