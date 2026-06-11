import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catopia.chenantunez.com";

const routes = JSON.parse(process.env.APP_ROUTES ?? '[""]') as string[];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
