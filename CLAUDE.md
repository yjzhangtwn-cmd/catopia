# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**catopia** — a Next.js 16 app built to run on Cloudflare Workers via the OpenNext adapter.

## Package Manager

This project uses **Bun**. Always use `bun` instead of `npm`/`yarn`/`pnpm`.

## Commands

```bash
bun dev              # Next.js dev server at localhost:3000 (Node.js runtime, not Cloudflare)
bun preview          # Build and preview using the actual Cloudflare Workers runtime locally
bun build            # Next.js production build only
bun run deploy       # Build with OpenNext and deploy to Cloudflare
bun run lint         # prettier --check . && eslint . (both must pass)
bun run format       # prettier --write . (auto-fix formatting)
bun run cf-typegen   # Regenerate cloudflare-env.d.ts after adding Wrangler bindings
```

## Architecture

### Two Runtimes

- `bun dev` runs on Node.js — use for fast iteration.
- `bun preview` runs on the Cloudflare Workers runtime — required to test Cloudflare-specific features (bindings, caching, image optimization).

### Cloudflare Integration

- **`open-next.config.ts`** — configures the OpenNext/Cloudflare adapter. R2 incremental cache is available here (currently commented out).
- **`wrangler.jsonc`** — Cloudflare Worker config. Worker name: `catopia`. Bindings defined here: `ASSETS` (static files), `IMAGES` (image optimization), `WORKER_SELF_REFERENCE` (self-reference for caching).
- **`cloudflare-env.d.ts`** — auto-generated TypeScript types for Cloudflare bindings; regenerate with `bun run cf-typegen` after changing `wrangler.jsonc`.
- **`.dev.vars`** — local-only environment variables passed to the Wrangler dev runtime (equivalent of `.env` for Cloudflare).
- Cloudflare bindings are accessible at runtime via `getCloudflareContext()` from `@opennextjs/cloudflare`. This also works in `bun dev` because `next.config.ts` calls `initOpenNextCloudflareForDev()`.

### Icons

Use **Lucide React** (`lucide-react`) for all icons. Import named components directly: `import { IconName } from "lucide-react"`. Do not add SVG files or other icon libraries.

### Next.js App Router

All pages live under `src/app/[locale]/` using the App Router. Tailwind CSS v4 is configured via PostCSS (`postcss.config.mjs`).

### i18n

Supported locales: `en` (en-US), `es` (es-PY), and `pt` (pt-BR), configured in `src/i18n/routing.ts`.

**No middleware.** Next.js 16's `proxy.ts` (the new middleware file) is forced to run on the Node.js runtime, which OpenNext Cloudflare does not support. Since all pages use `force-static` + `setRequestLocale`, locale detection works without middleware. The root `/` redirects to `/en` via `src/app/page.tsx`. Do **not** add `proxy.ts` or `middleware.ts` — it will break `bun preview`/`bun run deploy`.

- **`src/app/page.tsx`** — root redirect: `redirect('/en')`.
- **`src/i18n/routing.ts`** — locale list and default locale.
- **`src/i18n/request.ts`** — server-side next-intl config; loads the correct `messages/*.json` file.
- **`messages/en.json`** / **`messages/es.json`** / **`messages/pt.json`** — translation files. Add new keys to all three when adding UI text.
- In Server Components use `getTranslations("namespace")` from `next-intl/server`. In Client Components use `useTranslations("namespace")`.
- Per-locale SEO metadata (title, description, keywords, OG locale, hreflang) lives in `src/app/[locale]/layout.tsx` via `generateMetadata`.
- Use `usePathname` and `useRouter` from `@/i18n/navigation` (not `next/navigation`) for locale-aware routing in Client Components.

### Rendering Strategy

This project uses OpenNext on Cloudflare Workers — do **not** add `output: 'export'` to `next.config.ts` (it would break the Workers setup). Instead, every page file must explicitly opt into static rendering:

```ts
export const dynamic = "force-static";
```

Add this to every `page.tsx` (and `route.ts` where applicable). The locale is in the URL path so pages can still be fully static even with i18n.

**Critical:** `force-static` pages cannot call `headers()` at render time. Because next-intl normally reads the locale from a request header, you must call `setRequestLocale(locale)` at the top of every `page.tsx`, `layout.tsx`, and `generateMetadata` function before any `getTranslations()` or `getMessages()` call:

```ts
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // must come before getTranslations
  const t = await getTranslations("namespace");
  // ...
}
```

Omitting `setRequestLocale` silently falls back to the default locale (`en`) on every page.
