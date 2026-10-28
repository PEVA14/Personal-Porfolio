import Link from "next/link";
import { getDictionary, localePath } from "@/lib/i18n";

export default async function NotFound() {
  const { locale, t } = await getDictionary();
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="meta text-wine">404</p>
      <h1 className="display text-statement mt-6">{t.notFound.title}</h1>
      <p className="text-ink-soft mt-6 max-w-[40ch]">{t.notFound.body}</p>
      <Link href={localePath(locale)} className="meta text-accent group mt-10 inline-flex gap-2">
        {t.notFound.home}{" "}
        <span data-arrow="e" aria-hidden>
          →
        </span>
      </Link>
    </section>
  );
}
