import Link from "next/link";
import {
  AppWindow,
  BrowserFrame,
  PhoneFrame,
  SlotScreen,
  worldStyle,
} from "@/components/media/Frames";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseBlock, featuredProjects } from "@/content/projects";
import type { Dictionary } from "@/content/translations/en";
import { known, pad } from "@/lib/format";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale, Project } from "@/types/content";

type Props = { project: Project; number: string; href: string; locale: Locale; t: Dictionary };

export async function SelectedWork() {
  const { locale, t } = await getDictionary();

  return (
    <section id="work" aria-labelledby="work-title" className="pt-16 md:pt-24">
      <div className="shell">
        <SectionHeader id="work-title" number="01" title={t.work.eyebrow} aside={t.work.aside} />
      </div>

      <div className="mt-6 md:mt-10">
        {featuredProjects.map((project, i) => {
          const props: Props = {
            project,
            number: pad(i + 1),
            href: localePath(locale, `/work/${project.slug}`),
            locale,
            t,
          };
          switch (project.presentation?.layout) {
            case "flagship":
              return <Flagship key={project.slug} {...props} />;
            case "data":
              return <DataField key={project.slug} {...props} />;
            default:
              return <DeviceStage key={project.slug} {...props} />;
          }
        })}
      </div>

      <p className="shell meta text-ink-muted mt-6">{t.work.schematic}</p>
    </section>
  );
}

/* ---------- Shared pieces ---------- */

function Cta({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <Link prefetch href={href} className={`meta group inline-flex items-center gap-2 ${className}`}>
      {label}
      <span data-arrow="e" aria-hidden>
        →
      </span>
    </Link>
  );
}

function Facts({
  project,
  locale,
  className = "",
  limit = 4,
}: {
  project: Project;
  locale: Locale;
  className?: string;
  limit?: number;
}) {
  const facts = caseBlock(project, "facts")?.items.slice(0, limit) ?? [];
  if (facts.length === 0) return null;
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 ${className}`}>
      {facts.map((f) => (
        <div
          key={f.label.en}
          className="flex flex-col-reverse gap-1.5 border-t border-current/20 pt-2.5"
        >
          <dt className="meta opacity-75">{f.label[locale]}</dt>
          <dd className="display text-[clamp(2rem,1.4rem+2.2vw,3.5rem)] leading-none">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- 01 · Flagship: immersive product world, then an editorial explanation ---------- */

function Flagship({ project, number, href, locale, t }: Props) {
  const p = project.presentation!;
  const [main, detail, mobile] = p.media;
  const year = known(project.year);

  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <div
        style={worldStyle(p.world)}
        className="border-rule overflow-hidden border-y bg-(--w-bg) text-(--w-ink)"
      >
        <div className="shell pt-8 md:pt-12">
          <p className="meta flex flex-wrap justify-between gap-x-6 gap-y-1 text-(--w-muted)">
            <span>
              <span className="text-(--w-accent)">{number}</span> ·{" "}
              {known(project.category)?.[locale]}
            </span>
            <span>
              {project.role?.[locale]}
              {year && ` · ${year}`}
            </span>
          </p>
          <h3
            id={`${project.slug}-title`}
            className="display mt-4 text-[clamp(4.5rem,0.5rem+16vw,18.5rem)] leading-[0.8] tracking-[-0.055em] md:mt-6"
          >
            <Link
              prefetch
              href={href}
              className="transition-colors duration-500 hover:text-(--w-accent)"
            >
              {project.title}
            </Link>
          </h3>

          <Link
            prefetch
            href={href}
            tabIndex={-1}
            aria-hidden
            className="group relative mt-8 -mb-[6%] block md:mt-12 lg:-mb-[9%]"
            data-reveal
          >
            <BrowserFrame
              ratio="16/9"
              className="transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:-translate-y-2 md:mr-[14%]"
            >
              <SlotScreen slot={main} locale={locale} sizes="(min-width: 1024px) 80vw, 100vw" />
            </BrowserFrame>
            {detail && (
              <BrowserFrame
                ratio="4/3"
                className="absolute top-[30%] right-0 hidden w-[38%] transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:-translate-y-5 md:block"
              >
                <SlotScreen slot={detail} locale={locale} sizes="40vw" />
              </BrowserFrame>
            )}
            {mobile && (
              <PhoneFrame className="absolute top-[18%] -left-[2%] hidden w-[15%] transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:-translate-y-4 lg:block">
                <SlotScreen slot={mobile} locale={locale} sizes="16vw" />
              </PhoneFrame>
            )}
          </Link>
        </div>
      </div>

      {/* Editorial explanation */}
      <div className="shell grid-editorial gap-y-10 pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <p className="display text-[clamp(1.5rem,1.15rem+1.3vw,2.4rem)] leading-[1.12]">
            {known(project.summary)?.[locale]}
          </p>
          <Cta href={href} label={t.work.view} className="text-accent mt-8" />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <Facts project={project} locale={locale} />
          {project.highlights && (
            <div className="mt-10">
              <p className="meta text-ink-muted mb-2">{t.work.capabilities}</p>
              <ul className="grid gap-x-6 sm:grid-cols-2">
                {project.highlights[locale].map((h, i) => (
                  <li key={h} className="rule-b grid grid-cols-[2rem_1fr] py-2.5 text-[0.98rem]">
                    <span className="meta text-wine pt-[0.25rem]">{pad(i + 1)}</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------- 02 · Data: analytical artifacts on a saturated field ---------- */

function DataField({ project, number, href, locale, t }: Props) {
  const p = project.presentation!;
  const [chart, diff] = p.media;
  const notes = caseBlock(project, "pairs")?.items ?? [];

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      style={worldStyle(p.world)}
      className="overflow-hidden bg-(--w-bg) text-(--w-ink)"
    >
      <div className="shell grid-editorial gap-y-12 py-16 md:py-24">
        <div className="col-span-4 flex flex-col md:col-span-8 lg:col-span-4">
          <span
            className="display text-[clamp(5rem,2rem+10vw,11rem)] leading-[0.8] tracking-[-0.05em] opacity-25"
            aria-hidden
          >
            {number}
          </span>
          <p className="meta mt-6 text-(--w-muted)">{known(project.category)?.[locale]}</p>
          <h3
            id={`${project.slug}-title`}
            className="display mt-2 text-[clamp(3rem,1.6rem+5vw,6.5rem)] leading-[0.9] tracking-[-0.045em]"
          >
            <Link prefetch href={href} className="link-draw">
              {project.title}
            </Link>
          </h3>
          <p className="meta mt-5 text-(--w-ink)">{project.context?.[locale]}</p>
          <p className="mt-5 max-w-[40ch] text-(--w-muted)">{known(project.summary)?.[locale]}</p>
          <Facts project={project} locale={locale} limit={3} className="mt-8 sm:grid-cols-3" />
          <p className="meta mt-8 text-(--w-muted)">{project.technologies?.join(" · ")}</p>
          <Cta href={href} label={t.work.view} className="mt-8 text-(--w-ink)" />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:pl-6">
          <Link
            prefetch
            href={href}
            tabIndex={-1}
            aria-hidden
            className="group relative block"
            data-reveal
          >
            <AppWindow
              ratio="16/10"
              className="transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:-translate-y-2"
            >
              <SlotScreen slot={chart} locale={locale} sizes="(min-width: 1024px) 60vw, 100vw" />
            </AppWindow>
            {diff && (
              <AppWindow
                ratio="4/3"
                className="absolute -bottom-[10%] -left-[4%] w-[36%] transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:-translate-y-4 md:-left-[7%]"
              >
                <SlotScreen slot={diff} locale={locale} sizes="25vw" />
              </AppWindow>
            )}
          </Link>

          {notes.length > 0 && (
            <ol className="mt-[12%] grid gap-x-8 gap-y-5 sm:grid-cols-2 md:mt-14 md:ml-[33%]">
              {notes.map((n, i) => (
                <li key={n.title.en} className="border-t border-(--w-line) pt-3">
                  <p className="meta flex gap-3">
                    <span className="text-(--w-muted)">{pad(i + 1)}</span>
                    {n.title[locale]}
                  </p>
                  <p className="mt-1.5 text-[0.93rem] text-(--w-muted)">{n.body[locale]}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------- 03 · Devices: a native-iOS stage that breaks its frame ---------- */

function DeviceStage({ project, number, href, locale, t }: Props) {
  const p = project.presentation;
  const phones = p?.media ?? [];

  return (
    <article aria-labelledby={`${project.slug}-title`} className="shell pt-20 pb-6 md:pt-28">
      <div className="grid-editorial items-end gap-y-6">
        <div className="col-span-4 md:col-span-5 lg:col-span-7">
          <p className="meta text-ink-muted">
            <span className="text-wine">{number}</span> · {known(project.category)?.[locale]} ·{" "}
            {project.context?.[locale]}
          </p>
          <h3
            id={`${project.slug}-title`}
            className="display mt-4 max-w-[13ch] text-[clamp(2.6rem,1.4rem+4.4vw,6rem)] leading-[0.92] tracking-[-0.04em]"
          >
            <Link prefetch href={href} className="hover:text-accent transition-colors duration-500">
              {project.title}
            </Link>
          </h3>
        </div>
        <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9">
          <p className="text-ink-soft">{known(project.summary)?.[locale]}</p>
        </div>
      </div>

      {p && (
        <Link
          prefetch
          href={href}
          tabIndex={-1}
          aria-hidden
          style={worldStyle(p.world)}
          className="group relative mt-[clamp(6rem,14vw,13rem)] flex items-end justify-center gap-[3%] bg-(--w-bg) px-[6%] pb-[5%] text-(--w-ink)"
          data-reveal
        >
          {phones.map((slot, i) => {
            const center = i === 1;
            return (
              <PhoneFrame
                key={slot.screen}
                className={`transition-transform duration-[1.2s] ease-(--ease-editorial) ${
                  center
                    ? "z-10 -mt-[22%] w-[30%] group-hover:-translate-y-3 md:w-[24%]"
                    : "-mt-[8%] w-[26%] group-hover:-translate-y-1.5 md:w-[20%]"
                }`}
              >
                <SlotScreen slot={slot} locale={locale} sizes="25vw" />
              </PhoneFrame>
            );
          })}
          <span className="meta absolute bottom-4 left-4 hidden text-(--w-muted) md:block">
            {project.technologies?.join(" · ")}
          </span>
          <span className="meta absolute right-4 bottom-4 hidden text-(--w-muted) md:block">
            {phones.map((s) => s.label[locale]).join(" / ")}
          </span>
        </Link>
      )}

      <div className="grid-editorial mt-8 gap-y-6 md:mt-10">
        {project.highlights && (
          <ul className="col-span-4 grid grid-cols-2 gap-x-6 md:col-span-8 md:grid-cols-3 lg:col-span-8">
            {project.highlights[locale].map((h, i) => (
              <li key={h} className="rule-b flex gap-3 py-2.5 text-[0.98rem]">
                <span className="meta text-wine pt-[0.25rem]">{pad(i + 1)}</span>
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className="col-span-4 flex items-end md:col-span-8 lg:col-span-3 lg:col-start-10 lg:justify-end">
          <Cta href={href} label={t.work.view} className="text-accent" />
        </div>
      </div>
    </article>
  );
}
