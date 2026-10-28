"use client";

import { usePathname } from "next/navigation";
import { rememberLocale, stripLocale, toLocalePath } from "@/lib/i18n-shared";
import { locales, type Locale } from "@/types/content";

/** EN / ES. A full navigation keeps the proxy's cookie-based routing simple and correct. */
export function LanguageToggle({
  locale,
  label,
  switchTo,
}: {
  locale: Locale;
  label: string;
  switchTo: string;
}) {
  const path = stripLocale(usePathname() ?? "/");

  return (
    <div role="group" aria-label={label} className="flex items-center gap-1.5">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <span className="text-ink-muted" aria-hidden>
              /
            </span>
          )}
          {l === locale ? (
            <span aria-current="true" className="text-ink">
              {l.toUpperCase()}
            </span>
          ) : (
            <a
              href={toLocalePath(l, path)}
              hrefLang={l}
              lang={l}
              aria-label={switchTo}
              onClick={(e) => {
                rememberLocale(l);
                e.preventDefault();
                window.location.assign(toLocalePath(l, path) + window.location.hash);
              }}
              className="text-ink-muted hover:text-accent -my-3 py-3 transition-colors"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
