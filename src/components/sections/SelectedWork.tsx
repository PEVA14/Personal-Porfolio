import Link from "next/link";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { MetaList } from "@/components/ui/MetaList";
import { featuredProjects } from "@/content/projects";
import { known, pad } from "@/lib/format";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale, Project } from "@/types/content";
import type { Dictionary } from "@/content/translations/en";

/** Each featured slot has its own composition inside the same grid system. */
const compositions = ["wide", "offset", "portrait"] as const;
type Composition = (typeof compositions)[number];

export async function SelectedWork() {
  const { locale, t } = await getDictionary();

  return (
    <section id="work" aria-labelledby="work-title" className="shell pt-20 md:pt-28">
      <header className="grid-editorial rule-t items-baseline pt-4">
        <p className="meta text-wine col-span-1">(01)</p>
        <h2 id="work-title" className="meta col-span-3 md:col-span-4 lg:col-span-5">
          {t.work.eyebrow}
        </h2>
        <p className="meta text-ink-muted col-span-4 hidden text-right md:col-span-3 md:block lg:col-span-6">
          {t.work.count}
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-28 md:mt-20 md:gap-40 lg:gap-48">
        {featuredProjects.map((project, i) => (
          <FeaturedProject
            key={project.slug}
            project={project}
            index={i}
            composition={compositions[i % compositions.length]}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </section>
  );
}

function FeaturedProject({
  project,
  index,
  composition,
  locale,
  t,
}: {
  project: Project;
  index: number;
  composition: Composition;
  locale: Locale;
  t: Dictionary;
}) {
  const href = localePath(locale, `/work/${project.slug}`);
  const number = pad(index + 1);
  const summary = known(project.summary)?.[locale];
  const year = known(project.year);
  const meta = [
    { label: t.work.role, value: project.role?.[locale] ?? null },
    { label: t.work.context, value: project.context?.[locale] ?? null },
    { label: t.work.stack, value: project.technologies?.slice(0, 4).join(", ") ?? null },
  ];

  const visual = (ratio: string, sizes: string) => (
    <ProjectVisual
      image={project.thumbnail}
      locale={locale}
      title={project.shortTitle ?? project.title}
      figure={`Fig. ${number}`}
      pendingLabel={t.work.imagePending}
      ratio={ratio}
      sizes={sizes}
      priority={index === 0}
    />
  );

  // Stretched link: the title link covers the whole article, so the image,
  // text and CTA all respond as one target while keeping a single tab stop.
  const title = (size: string) => (
    <h3 className={`display ${size}`}>
      <Link prefetch href={href} className="after:absolute after:inset-0 after:content-['']">
        {project.title}
      </Link>
    </h3>
  );

  const cta = (
    <p className="meta text-accent mt-8 flex items-center gap-2" aria-hidden>
      {t.work.view}
      <span data-arrow="e">→</span>
    </p>
  );

  const numberLabel = (
    <p className="meta text-wine flex items-baseline gap-3">
      <span>{number}</span>
      <span className="text-ink-muted">{known(project.category)?.[locale]}</span>
      {year && <span className="text-ink-muted ml-auto">{year}</span>}
    </p>
  );

  if (composition === "wide") {
    return (
      <article className="group relative" data-reveal>
        <div className="mb-6 md:mb-8">{numberLabel}</div>
        {title("text-display mb-8 md:mb-10")}
        <div className="hidden md:block">{visual("16/9", "(min-width: 1680px) 1600px, 100vw")}</div>
        <div className="md:hidden">{visual("4/5", "100vw")}</div>
        <div className="grid-editorial mt-8 gap-y-8 md:mt-10">
          <div className="col-span-4 md:col-span-5 lg:col-span-6">
            {summary && <p className="text-lede text-ink-soft max-w-[44ch]">{summary}</p>}
            {cta}
          </div>
          <MetaList
            items={meta}
            className="col-span-4 md:col-span-3 lg:col-span-5 lg:col-start-8"
          />
        </div>
      </article>
    );
  }

  if (composition === "offset") {
    return (
      <article className="group grid-editorial relative gap-y-8" data-reveal>
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          {visual("4/3", "(min-width: 1024px) 66vw, 100vw")}
        </div>
        <div className="col-span-4 flex flex-col md:col-span-6 lg:col-span-4 lg:pt-[18%]">
          {numberLabel}
          {title("text-headline mt-6")}
          {summary && <p className="text-ink-soft mt-5 max-w-[42ch]">{summary}</p>}
          <MetaList items={meta} className="mt-8" />
          {cta}
        </div>
      </article>
    );
  }

  return (
    <article className="group grid-editorial relative gap-y-8" data-reveal>
      <div className="col-span-4 flex flex-col md:col-span-4 lg:col-span-5 lg:col-start-2 lg:row-start-1">
        {numberLabel}
        {title("text-headline mt-6 max-w-[12ch]")}
        {summary && <p className="text-ink-soft mt-5 max-w-[40ch]">{summary}</p>}
        <MetaList items={meta} className="mt-8" />
        {cta}
      </div>
      <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-24">
        {visual("4/5", "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw")}
      </div>
    </article>
  );
}
