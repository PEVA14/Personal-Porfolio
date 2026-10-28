import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { en } from "@/content/translations/en";
import { es } from "@/content/translations/es";
import { toLocalePath } from "@/lib/i18n-shared";
import { locales, type Locale, type Localized } from "@/types/content";

const dictionaries = { en, es } as const;

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Resolves the locale from the [lang] root segment. Server-only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}

export const pick = <T>(value: Localized<T>, locale: Locale): T => value[locale];

/** English lives at the root; Spanish under /es. */
export const localePath = (locale: Locale, path = "/") => toLocalePath(locale, path);
