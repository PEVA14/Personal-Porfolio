import Link from "next/link";
import { experience } from "@/content/experience";
import { formatPeriod } from "@/lib/format";
import { getDictionary, localePath } from "@/lib/i18n";

export async function Experience() {
  const { locale, t } = await getDictionary();

  return (
    <section id="experience" aria-labelledby="experience-title" className="shell pt-32 md:pt-48">
      <div className="grid-editorial rule-t gap-y-10 pt-4">
        <header className="col-span-4 md:col-span-8 lg:col-span-4">
          <div className="flex items-baseline gap-6 lg:sticky lg:top-24 lg:flex-col lg:gap-4">
            <p className="meta text-wine">(03)</p>
            <h2 id="experience-title" className="display text-headline">
              {t.experience.title}
            </h2>
          </div>
        </header>

        <ol className="col-span-4 md:col-span-8 lg:col-span-8">
          {experience.map((entry) => (
            <li
              key={entry.id}
              className="grid-editorial rule-b gap-y-4 py-8 first:pt-1 md:py-10 lg:[grid-template-columns:repeat(8,minmax(0,1fr))]"
              data-reveal
            >
              <p className="meta text-ink-muted col-span-4 md:col-span-2 md:pt-2">
                {formatPeriod(entry.start, entry.end, locale, t.experience.present)}
              </p>
              <div className="col-span-4 md:col-span-6">
                <h3 className="display text-title">{entry.role[locale]}</h3>
                <p className="meta text-ink-muted mt-2">{entry.organization[locale]}</p>
                <p className="text-ink-soft mt-5 max-w-[58ch]">{entry.summary[locale]}</p>
                {entry.highlights[locale].length > 0 && (
                  <ul className="mt-5 max-w-[60ch] space-y-2.5">
                    {entry.highlights[locale].map((h) => (
                      <li
                        key={h}
                        className="text-ink-soft grid grid-cols-[1.25rem_1fr] text-[0.97rem]"
                      >
                        <span className="text-wine" aria-hidden>
                          —
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {entry.projectSlug && (
                  <Link
                    prefetch
                    href={localePath(locale, `/work/${entry.projectSlug}`)}
                    className="meta text-accent group mt-6 inline-flex items-center gap-2"
                  >
                    {t.experience.relatedCase}
                    <span data-arrow="e" aria-hidden>
                      →
                    </span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
