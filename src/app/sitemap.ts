import type { MetadataRoute } from "next";
import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catopia.chenantunez.com";

function getRoutes(): string[] {
  const localeDir = join(process.cwd(), "src/app/[locale]");
  const routes = [""];

  try {
    for (const entry of readdirSync(localeDir, { withFileTypes: true })) {
      if (
        entry.isDirectory() &&
        existsSync(join(localeDir, entry.name, "page.tsx"))
      ) {
        routes.push(`/${entry.name}`);
      }
    }
  } catch {
    // if scanning fails, sitemap only includes locale roots
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getRoutes();

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
