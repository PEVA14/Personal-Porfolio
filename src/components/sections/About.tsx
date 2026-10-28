import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/content/profile";
import { publicAssetExists } from "@/lib/assets";
import { getDictionary } from "@/lib/i18n";

export async function About() {
  const { locale, t } = await getDictionary();
  const { education: edu, portrait } = profile;
  const hasPortrait = publicAssetExists(portrait.path);

  const figures = [
    { value: edu.gpa, label: t.about.gpa },
    { value: "60%", label: t.about.scholarship },
    { value: "2028", label: t.about.graduation },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="shell pt-20 md:pt-28">
      <SectionHeader
        id="about-title"
        number="04"
        title={t.about.eyebrow}
        aside={profile.location[locale]}
      />

      <div className="grid-editorial mt-8 gap-y-10 md:mt-10">
        {/* Portrait: the largest human element on the page. */}
        <figure
          className="relative col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1"
          data-reveal
        >
          <div className="bg-plate relative aspect-[4/5] overflow-hidden">
            {hasPortrait ? (
              <Image
                src={portrait.path}
                alt={portrait.alt[locale]}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div
                className="plate absolute inset-0"
                role="img"
                aria-label={t.about.portraitPending}
              >
                <span
                  className="display text-ink/[0.06] absolute inset-0 grid place-items-center text-[clamp(8rem,22vw,22rem)] leading-none select-none"
                  aria-hidden
                >
                  PV
                </span>
                {/* Crop marks */}
                {[
                  "top-6 left-6 border-t border-l",
                  "top-6 right-6 border-t border-r",
                  "bottom-6 left-6 border-b border-l",
                  "bottom-6 right-6 border-b border-r",
                ].map((c) => (
                  <span key={c} className={`border-ink-muted absolute size-5 ${c}`} aria-hidden />
                ))}
                <span className="meta text-ink-muted absolute right-6 bottom-12">
                  {t.about.portraitPending}
                </span>
              </div>
            )}
            <span className="meta text-wine bg-paper absolute top-0 left-0 px-3 py-2">Fig. 04</span>
          </div>
          <figcaption className="meta text-ink-muted mt-3">{t.about.caption}</figcaption>
        </figure>

        {/* Headline overlaps the photograph on wide screens. */}
        <p
          className="display relative z-10 col-span-4 text-[clamp(2.4rem,1.2rem+4.4vw,6rem)] leading-[1.08] tracking-[-0.04em] md:col-span-4 md:self-end lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mt-[10%] lg:self-start"
          aria-hidden
        >
          {t.about.title.map((line, i) => (
            // Earlier lines stack above later ones so highlight boxes never cover descenders.
            <span
              key={line}
              className="relative block"
              style={{ zIndex: t.about.title.length - i }}
            >
              <span
                className={`bg-paper box-decoration-clone pr-3 lg:pl-3 ${i === 1 ? "text-accent" : ""}`}
              >
                {line}
              </span>
            </span>
          ))}
        </p>

        <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:row-start-2">
          <div className="text-ink-soft max-w-[48ch] space-y-4 text-[1.06rem]">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="col-span-4 self-end md:col-span-8 lg:col-span-5 lg:col-start-8 lg:row-start-3">
          <p className="meta text-ink-muted mb-3">{t.about.educationTitle}</p>
          <p className="border-ink border-t pt-3 text-[1.02rem]">
            {edu.school[locale]} — {edu.campus[locale]}
            <span className="text-ink-muted block">{edu.degree[locale]}</span>
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-x-4">
            {figures.map((f) => (
              <div
                key={f.label}
                className="border-rule flex flex-col-reverse gap-2 border-t pt-2.5"
              >
                <dt className="meta text-ink-muted">{f.label}</dt>
                <dd className="display text-[clamp(1.8rem,1.2rem+2vw,3.2rem)] leading-none">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Off the clock — an editorial line, not chips. */}
      <div className="grid-editorial rule-t mt-14 gap-y-4 pt-5 md:mt-20">
        <h3 className="meta text-wine col-span-4 md:col-span-2 lg:col-span-3 lg:pt-3">
          {t.about.beyondTitle}
        </h3>
        <div className="col-span-4 md:col-span-6 lg:col-span-9">
          <p className="display text-[clamp(1.6rem,1.1rem+2vw,3.2rem)] leading-[1.1] tracking-[-0.03em]">
            {t.about.interests.map((interest, i) => (
              <span key={interest} className="inline-block whitespace-nowrap">
                {interest}
                <sup className="meta text-wine ml-1 align-super text-[0.65rem]">
                  {String(i + 1).padStart(2, "0")}
                </sup>
                {i < t.about.interests.length - 1 && (
                  <span className="text-ink-muted mx-[0.3em]">/</span>
                )}
              </span>
            ))}
          </p>
          <p className="text-ink-muted mt-4 max-w-[52ch]">{t.about.beyond}</p>
        </div>
      </div>
    </section>
  );
}
