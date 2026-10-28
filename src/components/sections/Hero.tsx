import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { profile } from "@/content/profile";
import { publicAssetExists } from "@/lib/assets";
import { getDictionary, localePath } from "@/lib/i18n";

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

export async function Hero() {
  const { locale, t } = await getDictionary();
  const flagship = featuredProjects[0];
  const hasCv = publicAssetExists(profile.cv.path);

  const currently = [
    {
      label: t.hero.building,
      value: (
        <Link prefetch href={localePath(locale, `/work/${flagship.slug}`)} className="link-draw">
          {flagship.title}
        </Link>
      ),
    },
    { label: t.hero.studying, value: t.hero.studyingValue },
    { label: t.hero.based, value: profile.location[locale] },
    {
      label: t.hero.status,
      value: (
        <span className="text-accent inline-flex items-center gap-2">
          <span
            className="pulse bg-accent relative inline-block size-1.5 rounded-full"
            aria-hidden
          />
          {t.hero.availability}
        </span>
      ),
    },
  ];

  const links = [
    { label: profile.social.github.label, href: profile.social.github.url },
    { label: profile.social.linkedin.label, href: profile.social.linkedin.url },
    ...(hasCv ? [{ label: t.nav.cv, href: profile.cv.path }] : []),
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="shell flex min-h-[calc(100svh-4rem)] flex-col pt-5 pb-6 md:min-h-[calc(100svh-5rem)] md:pt-6"
    >
      <p
        className="meta text-ink-muted rule-b flex justify-between pb-3"
        data-hero-fade
        style={d(0)}
      >
        <span>{t.hero.portfolio}</span>
        <span className="hidden sm:inline">{profile.location[locale]}</span>
      </p>

      {/* Identity first: whose site this is, then what they do. */}
      <h1 id="hero-title" className="mt-8 md:mt-10">
        {/* Font size lives on the clipping wrapper so its em-based padding clears descenders. */}
        <span className="display -mb-[0.2em] block overflow-hidden pb-[0.2em] text-[clamp(3.4rem,0.4rem+10.8vw,11.75rem)] leading-[0.86] tracking-[-0.045em]">
          <span data-hero-line style={d(0)} className="block">
            {profile.name}
          </span>
        </span>
        <span
          className="display text-accent mt-3 block text-[clamp(1.35rem,0.95rem+1.7vw,2.6rem)] leading-tight md:mt-4"
          data-hero-fade
          style={d(1)}
        >
          {t.hero.role}
        </span>
      </h1>

      <div className="grid-editorial mt-10 flex-1 gap-y-10 md:mt-14 lg:mt-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p className="display text-[clamp(1.9rem,1.1rem+2.7vw,3.9rem)] leading-[1.02]">
            <span className="sr-only">{t.hero.statement.join(" ")}</span>
            {t.hero.statement.map((line, i) => (
              <span
                key={i}
                className="md:-mb-[0.14em] md:block md:overflow-hidden md:pb-[0.2em]"
                aria-hidden
              >
                <span data-hero-line style={d(i + 1)}>
                  {i === t.hero.statement.length - 1 ? (
                    <>
                      {line.slice(0, -1)}
                      <span className="text-accent">{line.slice(-1)}</span>
                    </>
                  ) : (
                    `${line} `
                  )}
                </span>
              </span>
            ))}
          </p>
          <p
            className="text-lede text-ink-soft mt-6 max-w-[44ch] md:mt-8"
            data-hero-fade
            style={d(3)}
          >
            {t.hero.support}
          </p>
        </div>

        {/* Editorial metadata, set with rules and alignment — not a card. */}
        <aside
          aria-label={t.hero.currently}
          className="col-span-4 md:col-span-5 lg:col-span-4 lg:col-start-9 lg:pt-2"
          data-hero-fade
          style={d(4)}
        >
          <p className="meta text-wine mb-3">{t.hero.currently}</p>
          <dl className="border-ink border-t">
            {currently.map((row) => (
              <div
                key={row.label}
                className="rule-b grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-2.5"
              >
                <dt className="meta text-ink-muted">{row.label}</dt>
                <dd className="text-[0.98rem]">{row.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="meta mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="group hover:text-accent transition-colors"
                >
                  {l.label}{" "}
                  <span data-arrow="ne" aria-hidden>
                    ↗
                  </span>
                  <span className="sr-only">{t.a11y.newTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div
        className="border-ink mt-12 flex items-baseline justify-between gap-6 border-t pt-3"
        data-hero-fade
        style={d(5)}
      >
        <a
          href="#work"
          className="meta group hover:text-accent flex items-center gap-2 transition-colors"
        >
          <span className="text-wine">01 /</span> {t.hero.cue}
          <span data-arrow="s" aria-hidden>
            ↓
          </span>
        </a>
        <ul className="meta text-ink-muted hidden gap-6 md:flex">
          {featuredProjects.map((p) => (
            <li key={p.slug}>
              <Link
                prefetch
                href={localePath(locale, `/work/${p.slug}`)}
                className="hover:text-accent transition-colors"
              >
                {p.shortTitle ?? p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
