"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function ThemeRestorer() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const isDark =
        storedTheme === "dark" || (storedTheme === null && prefersDark);
      document.documentElement.classList.toggle("dark", isDark);
    } catch {}

    try {
      const storedSize = localStorage.getItem("font-size");
      document.documentElement.style.setProperty(
        "font-size",
        storedSize === "sm" ? "16px" : storedSize === "lg" ? "20px" : "18px",
      );
    } catch {}
  }, [pathname]);

  return null;
}
