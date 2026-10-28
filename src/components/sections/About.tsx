import Image from "next/image";
import { profile } from "@/content/profile";
import { publicAssetExists } from "@/lib/assets";
import { getDictionary } from "@/lib/i18n";

export async function About() {
  const { locale, t } = await getDictionary();
  const { education: edu, portrait } = profile;
  const hasPortrait = publicAssetExists(portrait.path);

  const facts = [
    { label: edu.school[locale], value: edu.campus[locale] },
    { label: edu.degree[locale], value: edu.graduation[locale] },
    { label: t.about.gpa, value: edu.gpa },
    { label: edu.scholarship[locale], value: null },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="shell pt-32 md:pt-48">
      <div className="grid-editorial rule-t gap-y-12 pt-4">
        <p className="meta text-wine col-span-1">(04)</p>
        <p className="meta col-span-3 md:col-span-7 lg:col-span-11">{t.about.eyebrow}</p>

        <h2
          id="about-title"
          className="display text-statement col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-1"
        >
          {t.about.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <figure className="col-span-4 md:col-span-4 lg:col-span-5" data-reveal>
          <div className="bg-plate relative aspect-[4/5] overflow-hidden">
            {hasPortrait ? (
              <Image
                src={portrait.path}
                alt={portrait.alt[locale]}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale-[0.15]"
              />
            ) : (
              <div
                className="plate absolute inset-0"
                role="img"
                aria-label={t.about.portraitPending}
              >
                <span className="meta text-ink-muted absolute right-4 bottom-4">
                  {t.about.portraitPending}
                </span>
              </div>
            )}
          </div>
          <figcaption className="meta text-ink-muted mt-3 flex justify-between">
            <span>{profile.name}</span>
            <span>{profile.location[locale]}</span>
          </figcaption>
        </figure>

        <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 lg:pt-2">
          <div className="text-lede text-ink-soft max-w-[40ch] space-y-6">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="meta text-ink-muted mb-3">{t.about.educationTitle}</h3>
            <dl>
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rule-t flex flex-wrap justify-between gap-x-6 gap-y-1 py-3"
                >
                  <dt>{f.label}</dt>
                  {f.value && <dd className="text-ink-muted">{f.value}</dd>}
                </div>
              ))}
            </dl>
          </div>

          <aside className="mt-14 grid grid-cols-[1.75rem_1fr]" aria-labelledby="beyond-title">
            <span className="meta text-wine pt-[0.2rem]" aria-hidden>
              ※
            </span>
            <div>
              <h3 id="beyond-title" className="meta text-ink-muted">
                {t.about.beyondTitle}
              </h3>
              <p className="text-ink-soft mt-3 max-w-[46ch]">{t.about.beyond}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
