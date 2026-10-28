import { profile } from "@/content/profile";
import { getDictionary } from "@/lib/i18n";

export async function Contact() {
  const { t } = await getDictionary();
  const { linkedin, github } = profile.social;
  // Primary CTA prefers email; until it is configured, LinkedIn is the channel.
  const primary = profile.email
    ? { href: `mailto:${profile.email}`, external: false }
    : { href: linkedin.url, external: true };

  const channels = [
    profile.email && {
      label: t.contact.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
    },
    { label: linkedin.label, value: `in/${linkedin.handle}`, href: linkedin.url, external: true },
    { label: github.label, value: `@${github.handle}`, href: github.url, external: true },
  ].filter(Boolean) as { label: string; value: string; href: string; external: boolean }[];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="shell pt-32 pb-16 md:pt-48 md:pb-24"
    >
      <div className="rule-t grid-editorial gap-y-10 pt-4">
        <p className="meta text-wine col-span-1">(05)</p>
        <p className="meta col-span-3 md:col-span-7 lg:col-span-11">{t.contact.eyebrow}</p>

        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <h2 id="contact-title" className="display text-headline text-ink-muted max-w-[18ch]">
            {t.contact.title}
          </h2>
          <a
            href={primary.href}
            {...(primary.external ? { target: "_blank", rel: "noopener" } : {})}
            className="display text-display group hover:text-accent mt-2 inline-flex items-baseline gap-[0.12em] transition-colors duration-500"
          >
            {t.contact.cta}
            <span data-arrow="ne" className="text-accent text-[0.6em]" aria-hidden>
              ↗
            </span>
            {primary.external && <span className="sr-only">{t.a11y.newTab}</span>}
          </a>
        </div>

        <ul className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          {channels.map((c) => (
            <li key={c.label} className="rule-t last:rule-b">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                className="group hover:text-accent flex items-baseline justify-between gap-6 py-4 transition-colors"
              >
                <span className="meta text-ink-muted">{c.label}</span>
                <span className="flex items-baseline gap-2 text-lg">
                  {c.value}
                  <span data-arrow="ne" aria-hidden>
                    ↗
                  </span>
                  {c.external && <span className="sr-only">{t.a11y.newTab}</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
