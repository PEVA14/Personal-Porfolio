import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/content/projects";
import { siteUrl } from "@/lib/site";
import { toLocalePath } from "@/lib/i18n-shared";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...caseStudySlugs.map((slug) => `/work/${slug}`)];
  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${siteUrl}${path === "/" ? "" : path}`,
        es: `${siteUrl}${toLocalePath("es", path)}`,
      },
    },
  }));
}
