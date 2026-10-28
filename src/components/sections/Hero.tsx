import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { profile } from "@/content/profile";
import { getDictionary, localePath } from "@/lib/i18n";
import { pad } from "@/lib/format";

export async function Hero() {
  const { locale, t } = await getDictionary();
  const lines = t.hero.statement;

  return (
    <section
      aria-labelledby="hero-title"
      className="shell flex min-h-[calc(100svh-4rem)] flex-col pt-6 pb-8 md:min-h-[calc(100svh-5rem)] md:pt-10 md:pb-10"
    >
      {/* Masthead strip */}
      <div
        className="grid-editorial meta rule-b gap-y-2 pb-4"
        data-hero-fade
        style={{ "--i": 0 } as React.CSSProperties}
      >
        <h1 id="hero-title" className="col-span-4 md:col-span-3 lg:col-span-4">
          <span className="text-ink block font-medium">{profile.name}</span>
          <span className="text-ink-muted block">{t.hero.role}</span>
        </h1>
        <p className="text-ink-muted col-span-2 md:col-span-3 lg:col-span-4 lg:col-start-7">
          {t.hero.basedIn}
          <br />
          <span className="text-ink">{profile.location[locale]}</span>
        </p>
        <p className="col-span-2 flex items-start gap-2.5 md:col-span-2 md:justify-end md:text-right lg:col-span-2">
          <span
            className="pulse bg-accent relative mt-[0.3rem] inline-block size-1.5 shrink-0 rounded-full"
            aria-hidden
          />
          <span>{t.hero.availability}</span>
        </p>
      </div>

      {/* Statement */}
      <p className="display text-statement mt-[clamp(3rem,10vh,8rem)] max-w-[15ch] text-balance lg:text-[clamp(4rem,1rem+6.4vw,9.25rem)] lg:leading-[0.92]">
        <span className="sr-only">{lines.join(" ")}</span>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.06em]" aria-hidden>
            <span data-hero-line style={{ "--i": i } as React.CSSProperties}>
              {i === lines.length - 1 ? (
                <>
                  {line.slice(0, -1)}
                  <span className="text-accent">{line.slice(-1)}</span>
                </>
              ) : (
                line
              )}
            </span>
          </span>
        ))}
      </p>

      {/* Footer row: cue, contents, supporting copy */}
      <div
        className="grid-editorial mt-auto gap-y-10 pt-14 md:pt-20"
        data-hero-fade
        style={{ "--i": 3 } as React.CSSProperties}
      >
        <p className="text-lede text-ink-soft col-span-4 max-w-[38ch] md:col-span-5 lg:col-span-5 lg:col-start-8 lg:row-start-1">
          {t.hero.support}
        </p>

        <ol className="meta col-span-4 hidden md:col-span-3 md:block lg:col-span-3 lg:col-start-4 lg:row-start-1">
          {featuredProjects.map((p, i) => (
            <li key={p.slug} className="rule-t first:border-t-0">
              <Link
                prefetch
                href={localePath(locale, `/work/${p.slug}`)}
                className="group hover:text-accent flex items-baseline gap-4 py-2 transition-colors"
              >
                <span className="text-wine">{pad(i + 1)}</span>
                <span>{p.shortTitle ?? p.title}</span>
                <span
                  data-arrow="e"
                  className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <a
          href="#work"
          className="meta group col-span-4 flex items-end gap-2 self-end md:col-span-8 lg:col-span-3 lg:col-start-1 lg:row-start-1"
        >
          {t.hero.cue}
          <span data-arrow="s" aria-hidden>
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
