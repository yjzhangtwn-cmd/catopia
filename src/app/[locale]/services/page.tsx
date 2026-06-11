import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Code2, Bot, CheckCircle } from "lucide-react";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  return { title: t("title") };
}

const softwarePoints = {
  en: [
    "Web & mobile applications",
    "Internal business tools",
    "API & system integrations",
    "Legacy system modernisation",
  ],
  es: [
    "Aplicaciones web y móvil",
    "Herramientas internas de gestión",
    "Integraciones de APIs y sistemas",
    "Modernización de sistemas legados",
  ],
  pt: [
    "Aplicativos web e mobile",
    "Ferramentas internas de gestão",
    "Integrações de APIs e sistemas",
    "Modernização de sistemas legados",
  ],
};

const aiPoints = {
  en: [
    "Document & data processing agents",
    "Customer-facing chatbots",
    "Automated reporting pipelines",
    "Multi-step AI workflow orchestration",
  ],
  es: [
    "Agentes de procesamiento de documentos y datos",
    "Chatbots para atención al cliente",
    "Pipelines de reportes automatizados",
    "Orquestación de flujos de trabajo con IA",
  ],
  pt: [
    "Agentes de processamento de documentos e dados",
    "Chatbots para atendimento ao cliente",
    "Pipelines de relatórios automatizados",
    "Orquestração de fluxos de trabalho com IA",
  ],
};

export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const lang = locale === "es" ? "es" : locale === "pt" ? "pt" : "en";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <div className="flex flex-col gap-2 mb-8 md:mb-12">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-foreground/60">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Custom Software */}
        <div className="flex flex-col gap-5 p-5 sm:p-8 rounded-xl border border-foreground/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-foreground/5">
              <Code2 size={22} />
            </div>
            <h2 className="text-lg font-semibold">{t("software.title")}</h2>
          </div>
          <p className="text-sm text-foreground/65 leading-relaxed">
            {t("software.description")}
          </p>
          <ul className="flex flex-col gap-2">
            {softwarePoints[lang].map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-foreground/60"
              >
                <CheckCircle size={15} className="mt-0.5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Workflows */}
        <div className="flex flex-col gap-5 p-5 sm:p-8 rounded-xl border border-foreground/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-foreground/5">
              <Bot size={22} />
            </div>
            <h2 className="text-lg font-semibold">{t("ai.title")}</h2>
          </div>
          <p className="text-sm text-foreground/65 leading-relaxed">
            {t("ai.description")}
          </p>
          <ul className="flex flex-col gap-2">
            {aiPoints[lang].map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-foreground/60"
              >
                <CheckCircle size={15} className="mt-0.5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
