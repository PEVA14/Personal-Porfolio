import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/content/experience";
import { formatPeriod } from "@/lib/format";
import { getDictionary, localePath } from "@/lib/i18n";

export async function Experience() {
  const { locale, t } = await getDictionary();

  return (
    <section id="experience" aria-labelledby="experience-title" className="shell pt-20 md:pt-28">
      <SectionHeader
        id="experience-title"
        number="03"
        title={t.experience.title}
        aside={t.experience.aside}
      />

      <ol className="mt-2">
        {experience.map((entry) => (
          <li key={entry.id} className="grid-editorial rule-b gap-y-5 py-7 md:py-8" data-reveal>
            <p className="meta col-span-4 flex items-center gap-2 self-start md:col-span-2 md:pt-2">
              {entry.end === null && (
                <span className="bg-accent size-1.5 rounded-full" aria-hidden />
              )}
              <span className={entry.end === null ? "text-ink" : "text-ink-muted"}>
                {formatPeriod(entry.start, entry.end, locale, t.experience.present)}
              </span>
            </p>

            <div className="col-span-4 md:col-span-6 lg:col-span-5">
              <h3 className="display text-[clamp(1.4rem,1.15rem+0.9vw,2rem)] leading-tight">
                {entry.role[locale]}
              </h3>
              <p className="meta text-accent mt-1.5">{entry.organization[locale]}</p>
              <p className="text-ink-soft mt-3 max-w-[56ch] text-[0.97rem]">
                {entry.summary[locale]}
              </p>

              <div className="meta mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                {entry.highlights[locale].length > 0 && (
                  <details className="group/d w-full">
                    <summary className="hover:text-accent inline-flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
                      {t.experience.more}
                      <span
                        className="transition-transform duration-300 group-open/d:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <ul className="mt-3 max-w-[60ch] space-y-2 font-sans text-[0.95rem] tracking-normal normal-case">
                      {entry.highlights[locale].map((h) => (
                        <li key={h} className="text-ink-soft grid grid-cols-[1.25rem_1fr]">
                          <span className="text-wine" aria-hidden>
                            —
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                {entry.projectSlug && (
                  <Link
                    prefetch
                    href={localePath(locale, `/work/${entry.projectSlug}`)}
                    className="text-accent group inline-flex items-center gap-2"
                  >
                    {t.experience.relatedCase}
                    <span data-arrow="e" aria-hidden>
                      →
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {entry.metrics && (
              <dl className="col-span-4 grid grid-cols-3 gap-x-4 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-8">
                {entry.metrics.map((m) => (
                  <div
                    key={m.value}
                    className="border-rule flex flex-col-reverse gap-2 border-t pt-2.5"
                  >
                    <dt className="meta text-ink-muted">{m.label[locale]}</dt>
                    <dd className="display text-[clamp(1.6rem,1.1rem+1.8vw,2.9rem)] leading-none whitespace-nowrap">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
