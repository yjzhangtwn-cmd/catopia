import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

function discoverRoutes(): string[] {
  const localeDir = join(process.cwd(), "src/app/[locale]");
  const routes: string[] = [""];
  try {
    for (const entry of readdirSync(localeDir, { withFileTypes: true })) {
      if (
        entry.isDirectory() &&
        existsSync(join(localeDir, entry.name, "page.tsx"))
      ) {
        routes.push(`/${entry.name}`);
      }
    }
  } catch {}
  return routes;
}

const nextConfig: NextConfig = {
  env: {
    APP_ROUTES: JSON.stringify(discoverRoutes()),
  },
};

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
initOpenNextCloudflareForDev();

export default withNextIntl(nextConfig);
