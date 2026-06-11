"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function ThemeRestorer() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const isDark = stored === "dark" || (stored === null && prefersDark);
      document.documentElement.classList.toggle("dark", isDark);
    } catch {}
  }, [pathname]);

  return null;
}
