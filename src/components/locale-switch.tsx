"use client";

import { ChevronDown } from "lucide-react";
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
    <div className="relative flex items-center">
      <select
        value={locale}
        onChange={onChange}
        aria-label="Switch language"
        className="appearance-none text-xs font-mono pl-2 pr-6 py-1 rounded-md border border-foreground/20 bg-background text-foreground hover:bg-foreground/8 transition-colors cursor-pointer"
      >
        {locales.map(({ code, flag, label }) => (
          <option
            key={code}
            value={code}
            className="bg-background text-foreground"
          >
            {flag} {label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        className="absolute right-1.5 pointer-events-none text-foreground/50"
      />
    </div>
  );
}
