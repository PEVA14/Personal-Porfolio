import { profile } from "@/content/profile";
import { getDictionary } from "@/lib/i18n";

export async function SiteFooter() {
  const { t } = await getDictionary();
  const { github, linkedin } = profile.social;

  return (
    <footer className="shell meta text-ink-muted">
      <div className="rule-t flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p>{t.footer.built}</p>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {[linkedin, github].map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="hover:text-accent transition-colors"
              >
                {s.label} <span aria-hidden>↗</span>
                <span className="sr-only">{t.a11y.newTab}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="#main" className="hover:text-accent transition-colors">
              {t.footer.top} <span aria-hidden>↑</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
