import { profile } from "@/content/profile";
import { publicAssetExists } from "@/lib/assets";
import { getDictionary } from "@/lib/i18n";

/** Closing spread on the wine field: the page begins and ends with Pablo. */
export async function Contact() {
  const { locale, t } = await getDictionary();
  const { linkedin, github } = profile.social;
  const hasCv = publicAssetExists(profile.cv.path);

  // Primary CTA prefers email; until it is configured, LinkedIn is the channel.
  const primary = profile.email ? `mailto:${profile.email}` : linkedin.url;

  const channels = [
    ...(profile.email
      ? [
          {
            label: t.contact.email,
            value: profile.email,
            href: `mailto:${profile.email}`,
            external: false,
          },
        ]
      : []),
    { label: linkedin.label, value: `in/${linkedin.handle}`, href: linkedin.url, external: true },
    { label: github.label, value: `@${github.handle}`, href: github.url, external: true },
    ...(hasCv
      ? [{ label: t.nav.cv, value: profile.cv.fileName, href: profile.cv.path, external: true }]
      : []),
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-field-wine text-on-field [&_:focus-visible]:outline-on-field mt-20 md:mt-28"
    >
      <div className="shell pt-6 pb-10 md:pb-14">
        <header className="border-on-field-rule flex items-end justify-between gap-6 border-t pt-3">
          <p className="display text-section flex items-baseline gap-[0.4em] uppercase">
            <span className="meta text-on-field-muted text-[0.8rem]">05 /</span>
            {t.contact.eyebrow}
          </p>
          <p className="meta text-on-field-muted hidden md:block">{t.hero.availability}</p>
        </header>

        <h2
          id="contact-title"
          className="display text-on-field-muted mt-14 max-w-[20ch] text-[clamp(1.8rem,1.2rem+2.4vw,3.6rem)] leading-[1.02] md:mt-20"
        >
          {t.contact.title}
        </h2>
        <a
          href={primary}
          {...(profile.email ? {} : { target: "_blank", rel: "noopener" })}
          className="display group mt-2 inline-flex items-baseline gap-[0.08em] text-[clamp(4.2rem,0.8rem+15vw,17rem)] leading-[0.84] tracking-[-0.055em]"
        >
          <span className="link-draw">{t.contact.cta}</span>
          <span data-arrow="ne" className="text-[0.42em]" aria-hidden>
            ↗
          </span>
          {!profile.email && <span className="sr-only">{t.a11y.newTab}</span>}
        </a>

        <div className="grid-editorial border-on-field-rule mt-16 gap-y-10 border-t pt-6 md:mt-24">
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <p className="display text-[clamp(1.6rem,1.2rem+1.4vw,2.6rem)] leading-none">
              {profile.name}
            </p>
            <p className="meta text-on-field-muted mt-3">{t.hero.role}</p>
            <p className="meta text-on-field-muted mt-1">{profile.location[locale]}</p>
          </div>
          <ul className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7">
            {channels.map((c) => (
              <li key={c.label} className="border-on-field-rule border-b first:border-t">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                  className="group flex items-baseline justify-between gap-6 py-3.5"
                >
                  <span className="meta text-on-field-muted">{c.label}</span>
                  <span className="flex items-baseline gap-2 text-lg">
                    <span className="link-draw">{c.value}</span>
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
      </div>
    </section>
  );
}
