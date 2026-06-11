"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `${t("name")}: ${form.name}\n${t("email")}: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:catopia@chenantunez.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "w-full rounded-lg border border-foreground/20 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-foreground/25 transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="name">
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="email">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="subject">
          {t("subject")}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="message">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          value={form.message}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-foreground/40">{t("hint")}</p>
        <button
          type="submit"
          className="rounded-lg bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-80 transition-opacity cursor-pointer"
        >
          {t("send")}
        </button>
      </div>
    </form>
  );
}
