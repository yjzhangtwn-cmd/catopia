"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/navigation";

export function LocaleSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const fullPath = usePathname(); // e.g. /es or /es/about

  function toggle() {
    const nextLocale = locale === "en" ? "es" : "en";
    // Strip the current locale prefix to get the bare path
    const stripped = fullPath.replace(new RegExp(`^/${locale}`), "") || "/";
    router.replace(stripped, { locale: nextLocale });
  }

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="text-xs font-mono px-2 py-1 rounded-md border border-foreground/20 hover:bg-foreground/8 transition-colors cursor-pointer"
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
