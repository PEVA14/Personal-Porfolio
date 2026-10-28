import { IndexList, type IndexRow } from "@/components/projects/IndexList";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    tech: p.technologies?.slice(0, 3).join(" · ") ?? null,
    summary: known(p.summary)?.[locale] ?? null,
    href: p.caseStudy ? localePath(locale, `/work/${p.slug}`) : null,
    world: p.presentation?.world,
    slot: p.presentation?.media[0],
  }));

  const withCase = rows.filter((r) => r.href).length;

  return (
    <section id="index" aria-labelledby="index-title" className="shell pt-20 md:pt-28">
      <SectionHeader
        id="index-title"
        number="02"
        title={t.index.title}
        aside={`${pad(rows.length)} · ${t.index.aside}`}
      />
      <div className="grid-editorial mt-5 gap-y-4">
        <p className="text-ink-soft col-span-4 max-w-[52ch] md:col-span-5">{t.index.note}</p>
        <p className="meta text-ink-muted col-span-4 md:col-span-3 md:text-right lg:col-span-4 lg:col-start-9">
          <span className="text-accent">{pad(withCase)}</span> {t.index.caseStudy} ·{" "}
          {pad(rows.length - withCase)} {t.index.noCaseStudy}
        </p>
      </div>

      <IndexList
        rows={rows}
        locale={locale}
        labels={{
          number: t.index.columns.number,
          project: t.index.columns.project,
          category: t.index.columns.category,
          stack: t.caseStudy.stack,
          year: t.index.columns.year,
          caseStudy: t.index.caseStudy,
          noCaseStudy: t.index.noCaseStudy,
          imagePending: t.work.imagePending,
        }}
      />
    </section>
  );
}
