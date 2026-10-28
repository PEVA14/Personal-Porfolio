import { profile } from "@/content/profile";
import { getDictionary } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export async function PersonJsonLd() {
  const { locale } = await getDictionary();
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title[locale],
    url: siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Guadalajara", addressCountry: "MX" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Tecnológico de Monterrey" },
    sameAs: [profile.social.github.url, profile.social.linkedin.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
