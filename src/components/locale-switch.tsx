"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const locales = [
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇵🇾", label: "ES" },
  { code: "pt", flag: "🇧🇷", label: "PT" },
] as const;

type Locale = (typeof locales)[number]["code"];

export function LocaleSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: e.target.value as Locale });
  }

  return (
    <select
      value={locale}
      onChange={onChange}
      aria-label="Switch language"
      className="text-xs font-mono px-2 py-1 rounded-md border border-foreground/20 hover:bg-foreground/8 transition-colors cursor-pointer bg-transparent"
    >
      {locales.map(({ code, flag, label }) => (
        <option key={code} value={code}>
          {flag} {label}
        </option>
      ))}
    </select>
  );
}
