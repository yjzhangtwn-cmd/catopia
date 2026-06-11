# Catopia

Landing page for **Catopia de Chen Antúnez** — a software and AI solutions firm based in Paraguay. Built with Next.js 16 and deployed to Cloudflare Workers via the OpenNext adapter.

## Stack

- **Next.js 16** (App Router, Turbopack) — `force-static` pages
- **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare)
- **Tailwind CSS v4**
- **next-intl** — i18n with `en` (en-US) and `es` (es-PY) locales
- **Bun** as the package manager and runtime

## Development

```bash
bun install          # install dependencies
bun dev              # Next.js dev server at localhost:3000 (Node.js runtime)
bun preview          # build + preview on the actual Cloudflare Workers runtime
```

## Code quality

```bash
bun run lint         # prettier --check + eslint
bun run format       # prettier --write (auto-fix formatting)
```

## Deploy

```bash
bun run deploy       # build with OpenNext and deploy to Cloudflare
```

## Project structure

```
src/
  app/[locale]/      # App Router pages (home, services, about, contact)
  components/        # Nav, Footer, ThemeToggle, LocaleSwitch, ThemeScript
  i18n/              # next-intl routing, request config, navigation helpers
  proxy.ts           # next-intl middleware (locale detection + routing)
messages/
  en.json            # English translations
  es.json            # Spanish translations
wrangler.jsonc       # Cloudflare Worker config
open-next.config.ts  # OpenNext/Cloudflare adapter config
```

## i18n

- URL-based locale prefix: `/en/...` and `/es/...`
- `src/proxy.ts` — next-intl middleware handles locale detection and redirects (`/` → `/en` or `/es`)
- All static pages call `setRequestLocale(locale)` at the top for compatibility with `force-static`
- Client components use `useTranslations()`, server components use `getTranslations()`

## Theme

Dark/light mode via a `ThemeScript` in `<head>` (reads `localStorage`, falls back to `prefers-color-scheme`). The toggle uses `useSyncExternalStore` to stay in sync with the DOM without hydration mismatches.
