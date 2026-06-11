import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeScript } from "@/components/theme-script";
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
    title: "Catopia | Software Development & Digital Solutions with AI",
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
    title: "Catopia | Desarrollo de Software & Soluciones Digitales con IA",
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
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
