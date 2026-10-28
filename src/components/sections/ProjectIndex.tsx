import { IndexList, type IndexRow } from "@/components/projects/IndexList";
import { projects } from "@/content/projects";
import { known, pad } from "@/lib/format";
import { getDictionary, localePath } from "@/lib/i18n";

export async function ProjectIndex() {
  const { locale, t } = await getDictionary();

  const rows: IndexRow[] = projects.map((p, i) => ({
    slug: p.slug,
    number: pad(i + 1),
    title: p.shortTitle ?? p.title,
    category: known(p.category)?.[locale] ?? null,
    year: known(p.year)?.toString() ?? null,
    summary: known(p.summary)?.[locale] ?? null,
    href: p.caseStudy ? localePath(locale, `/work/${p.slug}`) : null,
    thumbnail: p.thumbnail,
  }));

  const years = projects.map((p) => known(p.year)).filter((y): y is number => y !== null);
  const range =
    years.length === 0
      ? null
      : Math.min(...years) === Math.max(...years)
        ? `${Math.min(...years)}`
        : `${Math.min(...years)}—${Math.max(...years)}`;

  return (
    <section id="index" aria-labelledby="index-title" className="shell pt-32 md:pt-48">
      <header className="grid-editorial rule-t items-baseline gap-y-6 pt-4">
        <p className="meta text-wine col-span-1">(02)</p>
        <h2
          id="index-title"
          className="display text-headline col-span-3 md:col-span-5 lg:col-span-6"
        >
          {t.index.title}
        </h2>
        {range && (
          <p className="meta text-ink-muted col-span-4 md:col-span-2 md:text-right lg:col-span-5">
            {range}
          </p>
        )}
        <p className="text-ink-muted col-span-4 max-w-[46ch] md:col-span-5 md:col-start-2 lg:col-span-4 lg:col-start-2">
          {t.index.note}
        </p>
      </header>

      <IndexList
        rows={rows}
        locale={locale}
        labels={{
          number: t.index.columns.number,
          project: t.index.columns.project,
          category: t.index.columns.category,
          year: t.index.columns.year,
          caseStudy: t.index.caseStudy,
          noCaseStudy: t.index.noCaseStudy,
          imagePending: t.work.imagePending,
        }}
      />
    </section>
  );
}
