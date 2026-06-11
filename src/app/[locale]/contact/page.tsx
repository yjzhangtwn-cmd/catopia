import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("title") };
}

export default async function Contact() {
  const t = await getTranslations("contact");

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-foreground/50">{t("subtitle")}</p>
      </div>

      <ContactForm />
    </div>
  );
}
