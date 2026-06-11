import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeScript } from "@/components/theme-script";
import { ThemeRestorer } from "@/components/theme-restorer";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const localeMeta = {
  en: {
    title: "Catopia | Custom Software & AI Solutions for Latin America",
    description:
      "Catopia empowers businesses in Paraguay and Latin America with custom software development, digital transformation, and AI-powered workflows.",
    keywords: [
      "software development Paraguay",
      "digital solutions LATAM",
      "AI for business",
      "workflow automation",
      "digital transformation Paraguay",
      "custom software",
      "web development Paraguay",
    ],
    ogLocale: "en_US",
  },
  es: {
    title: "Catopia | Software a Medida y Soluciones de IA para Latinoamérica",
    description:
      "Catopia impulsa empresas en Paraguay y Latinoamérica con desarrollo de software a medida, transformación digital y flujos de trabajo potenciados por inteligencia artificial.",
    keywords: [
      "desarrollo de software Paraguay",
      "soluciones digitales LATAM",
      "inteligencia artificial empresas",
      "automatización de procesos",
      "transformación digital Paraguay",
      "software a medida",
      "desarrollo web Paraguay",
    ],
    ogLocale: "es_PY",
  },
  pt: {
    title:
      "Catopia | Software Sob Medida e Soluções de IA para a América Latina",
    description:
      "A Catopia impulsiona empresas no Paraguai e na América Latina com desenvolvimento de software sob medida, transformação digital e fluxos de trabalho potencializados por inteligência artificial.",
    keywords: [
      "desenvolvimento de software Paraguai",
      "soluções digitais América Latina",
      "inteligência artificial empresas",
      "automação de processos",
      "transformação digital",
      "software sob medida",
      "desenvolvimento web",
    ],
    ogLocale: "pt_BR",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMeta[locale as keyof typeof localeMeta] ?? localeMeta.en;

  return {
    metadataBase: new URL("https://catopia.chenantunez.com"),
    title: { default: meta.title, template: "%s | Catopia" },
    description: meta.description,
    keywords: [...meta.keywords],
    authors: [{ name: "Catopia" }],
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url: `https://catopia.chenantunez.com/${locale}`,
      siteName: "Catopia",
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://catopia.chenantunez.com/${locale}`,
      languages: {
        en: "https://catopia.chenantunez.com/en",
        es: "https://catopia.chenantunez.com/es",
        pt: "https://catopia.chenantunez.com/pt",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeRestorer />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
