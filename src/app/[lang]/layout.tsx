import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { profile } from "@/content/profile";
import { getDictionary, localePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { locales } from "@/types/content";
import "../globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#151514" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s — ${profile.name}` },
    description: t.meta.description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    alternates: {
      canonical: localePath(locale),
      languages: { en: "/", es: "/es", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
      url: localePath(locale),
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

/**
 * Runs before paint: applies the stored or system theme (no flash) and
 * enables motion classes only when the visitor allows motion.
 */
const bootScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t;if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("motion")}catch(e){}})()`;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, t } = await getDictionary();

  return (
    <html
      lang={locale === "es" ? "es-MX" : "en"}
      className={`${instrument.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      {/* Extensions (e.g. Grammarly) inject attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="meta bg-ink text-paper fixed top-3 left-3 z-[100] -translate-y-24 px-4 py-3 focus:translate-y-0"
        >
          {t.a11y.skip}
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
