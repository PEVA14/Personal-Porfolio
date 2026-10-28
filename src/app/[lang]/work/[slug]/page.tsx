import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CaseStudyBlocks } from "@/components/case-study/CaseStudyBlocks";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { MetaList } from "@/components/ui/MetaList";
import { caseStudySlugs, getProject, projects } from "@/content/projects";
import { known, pad } from "@/lib/format";
import { getDictionary, localePath } from "@/lib/i18n";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale, t } = await getDictionary();
  const project = getProject(slug);
  if (!project?.caseStudy) return {};
  const description = known(project.summary)?.[locale] ?? t.meta.workDescription;
  const path = `/work/${slug}`;
  return {
    title: project.title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: { en: path, es: localePath("es", path), "x-default": path },
    },
    openGraph: {
      title: project.title,
      description,
      url: localePath(locale, path),
      type: "article",
    },
  };
}

// The slug is URL data: keep it behind Suspense so navigations get an instant shell.
export default function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/[lang]/work/[slug]">["params"] }) {
  const { slug } = await params;
  const { locale, t } = await getDictionary();
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const order = projects.indexOf(project);
  const number = pad(order + 1);
  const year = known(project.year);
  const external = known(project.externalUrl);
  const repo = known(project.repositoryUrl);
  const sections = project.caseStudy.sections;

  const withCase = projects.filter((p) => p.caseStudy);
  const next = withCase[(withCase.indexOf(project) + 1) % withCase.length];

  return (
    <article>
      <header className="shell pt-8 md:pt-14">
        <div className="meta rule-b flex items-baseline justify-between pb-4">
          <Link
            href={`${localePath(locale)}#work`}
            className="group hover:text-accent inline-flex items-center gap-2 transition-colors"
          >
            <span data-arrow="e" className="rotate-180" aria-hidden>
              →
            </span>
            {t.caseStudy.back}
          </Link>
          <span className="text-ink-muted flex gap-4">
            <span className="text-wine">{number}</span>
            <span className="hidden sm:inline">{known(project.category)?.[locale]}</span>
            {year && <span>{year}</span>}
          </span>
        </div>

        <h1 className="display text-display mt-12 md:mt-20" data-hero-line>
          {project.title}
        </h1>

        <div className="grid-editorial mt-10 gap-y-10 md:mt-14">
          <p
            className="display text-title text-ink-soft col-span-4 max-w-[26ch] md:col-span-5 lg:col-span-7"
            data-hero-fade
          >
            {project.caseStudy.headline[locale]}
          </p>
          <div
            className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9"
            data-hero-fade
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <MetaList
              items={[
                { label: t.caseStudy.role, value: project.role?.[locale] ?? null },
                { label: t.caseStudy.context, value: project.context?.[locale] ?? null },
                { label: t.caseStudy.stack, value: project.technologies?.join(", ") ?? null },
              ]}
            />
            {(external || repo) && (
              <ul className="meta rule-t flex gap-6 pt-3">
                {external && (
                  <li>
                    <a
                      href={external}
                      target="_blank"
                      rel="noopener"
                      className="text-accent group inline-flex gap-1.5"
                    >
                      {t.caseStudy.visit}{" "}
                      <span data-arrow="ne" aria-hidden>
                        ↗
                      </span>
                      <span className="sr-only">{t.a11y.newTab}</span>
                    </a>
                  </li>
                )}
                {repo && (
                  <li>
                    <a
                      href={repo}
                      target="_blank"
                      rel="noopener"
                      className="text-accent group inline-flex gap-1.5"
                    >
                      {t.caseStudy.repository}{" "}
                      <span data-arrow="ne" aria-hidden>
                        ↗
                      </span>
                      <span className="sr-only">{t.a11y.newTab}</span>
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </header>

      <div
        className="shell mt-14 md:mt-20"
        data-hero-fade
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <ProjectVisual
          image={project.thumbnail}
          locale={locale}
          title={project.shortTitle ?? project.title}
          figure={`Fig. ${number}`}
          pendingLabel={t.work.imagePending}
          ratio="16/9"
          sizes="(min-width: 1680px) 1600px, 100vw"
          priority
        />
      </div>

      <div className="shell mt-20 md:mt-32">
        <nav aria-label={t.caseStudy.contents} className="meta mb-16 hidden md:block">
          <ol className="flex flex-wrap gap-x-8 gap-y-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-accent transition-colors">
                  <span className="text-wine mr-2">{pad(i + 1)}</span>
                  {s.heading?.[locale] ?? t.caseStudy.sections[s.id]}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="grid-editorial rule-t gap-y-8 pt-5 pb-20 md:pb-28"
          >
            <div className="col-span-4 md:col-span-2 lg:col-span-3">
              <h2 id={`${section.id}-title`} className="meta flex gap-3 lg:sticky lg:top-24">
                <span className="text-wine">{pad(i + 1)}</span>
                {section.heading?.[locale] ?? t.caseStudy.sections[section.id]}
              </h2>
            </div>
            <div className="col-span-4 md:col-span-6 lg:col-span-9" data-reveal>
              {section.lede && (
                <p className="display text-title mb-10 max-w-[30ch] md:mb-14">
                  {section.lede[locale]}
                </p>
              )}
              <CaseStudyBlocks
                blocks={section.blocks}
                ctx={{
                  locale,
                  title: project.shortTitle ?? project.title,
                  pendingLabel: t.work.imagePending,
                }}
              />
            </div>
          </section>
        ))}
      </div>

      {next && next.slug !== project.slug && (
        <nav aria-label={t.caseStudy.next} className="shell">
          <Link
            prefetch
            href={localePath(locale, `/work/${next.slug}`)}
            className="group rule-t block pt-5 pb-20 md:pb-28"
          >
            <span className="meta text-ink-muted">{t.caseStudy.next}</span>
            <span className="display text-display group-hover:text-accent mt-6 flex items-baseline justify-between gap-6 transition-colors duration-500">
              {next.shortTitle ?? next.title}
              <span data-arrow="e" className="text-[0.5em]" aria-hidden>
                →
              </span>
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
