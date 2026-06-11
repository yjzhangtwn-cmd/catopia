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
  app/
    page.tsx         # Root redirect: / → /en
    [locale]/        # App Router pages (home, services, about, contact)
  components/        # Nav, Footer, ThemeToggle, LocaleSwitch, FontSizeControl, ThemeScript, FontSizeScript
  i18n/              # next-intl routing, request config, navigation helpers
messages/
  en.json            # English (en-US) translations
  es.json            # Spanish (es-PY) translations
  pt.json            # Brazilian Portuguese (pt-BR) translations
wrangler.jsonc       # Cloudflare Worker config
open-next.config.ts  # OpenNext/Cloudflare adapter config
```

## i18n

- Supported locales: `en` (en-US), `es` (es-PY), `pt` (pt-BR)
- URL-based locale prefix: `/en/...`, `/es/...`, `/pt/...`
- No middleware — Next.js 16's `proxy.ts` is forced to Node.js runtime, which OpenNext Cloudflare does not support. Locale detection is handled entirely via `setRequestLocale(locale)` in each page.
- Root `/` redirects to `/en` via `src/app/page.tsx`
- Client components use `useTranslations()`, server components use `getTranslations()`
- Always use `usePathname` and `useRouter` from `@/i18n/navigation` (not `next/navigation`) in client components

## Theme and UI preferences

- Dark/light toggle via `ThemeScript` in `<head>` (reads `localStorage`, falls back to `prefers-color-scheme`) and `ThemeToggle` component using `useSyncExternalStore`
- Font size control (S / M / L → 16px / 18px / 20px root) via `FontSizeScript` + `FontSizeControl`; scales all `rem`-based Tailwind utilities automatically
- Both preferences persist in `localStorage` and are restored before hydration (no flash) and on every route navigation via `ThemeRestorer`
