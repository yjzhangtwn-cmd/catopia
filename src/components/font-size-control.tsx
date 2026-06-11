"use client";

import { useSyncExternalStore } from "react";

const SIZES = [
  { key: "sm", px: "16px", display: 10 },
  { key: "md", px: "18px", display: 13 },
  { key: "lg", px: "20px", display: 16 },
] as const;

type SizeKey = (typeof SIZES)[number]["key"];

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): SizeKey {
  const fs = document.documentElement.style.getPropertyValue("font-size");
  if (fs === "16px") return "sm";
  if (fs === "20px") return "lg";
  return "md";
}

export function FontSizeControl() {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => "md");

  function setSize(key: SizeKey) {
    const size = SIZES.find((s) => s.key === key)!;
    document.documentElement.style.setProperty("font-size", size.px);
    localStorage.setItem("font-size", key);
  }

  return (
    <div
      className="flex items-center border border-foreground/20 rounded-md overflow-hidden"
      aria-label="Font size"
    >
      {SIZES.map(({ key, display }) => (
        <button
          key={key}
          onClick={() => setSize(key)}
          aria-pressed={current === key}
          aria-label={`Font size ${key}`}
          style={{ fontSize: `${display}px` }}
          className={`px-1.5 py-1 leading-none cursor-pointer transition-colors ${
            current === key
              ? "bg-foreground/10 text-foreground"
              : "text-foreground/40 hover:bg-foreground/5 hover:text-foreground/70"
          }`}
        >
          A
        </button>
      ))}
    </div>
  );
}
