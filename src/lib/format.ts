import { isPending, type Locale, type Pending } from "@/types/content";

const monthFormat: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }),
  es: new Intl.DateTimeFormat("es-MX", { month: "short", year: "numeric", timeZone: "UTC" }),
};

/** "2026-02" → "Feb 2026"; "2026" → "2026". */
export function formatPeriodPoint(value: string, locale: Locale): string {
  const [year, month] = value.split("-");
  if (!month) return year;
  const label = monthFormat[locale].format(new Date(Date.UTC(Number(year), Number(month) - 1)));
  return label.replace(".", "").replace(/^\w/, (c) => c.toUpperCase());
}

export function formatPeriod(start: string, end: string | null, locale: Locale, present: string) {
  const from = formatPeriodPoint(start, locale);
  if (end === start) return from;
  return `${from} — ${end ? formatPeriodPoint(end, locale) : present}`;
}

export const pad = (n: number) => String(n).padStart(2, "0");

/** Returns the value, or null when the content is known to be missing. */
export function known<T>(value: T | Pending | undefined): T | null {
  if (value === undefined || isPending(value)) return null;
  return value;
}
