import type { Localized } from "@/types/content";

/**
 * Single source of truth for identity, links and assets.
 * Anything marked TODO is intentionally left empty rather than guessed.
 */
export const profile = {
  name: "Pablo Vargas",
  title: {
    en: "Software Engineer & Product Builder",
    es: "Ingeniero de Software y Product Builder",
  },
  location: { en: "Guadalajara, MX", es: "Guadalajara, MX" } satisfies Localized,

  // TODO(pablo): confirm the public contact address. Contact UI hides email while null.
  email: null as string | null,

  social: {
    github: { label: "GitHub", handle: "PEVA14", url: "https://github.com/PEVA14" },
    linkedin: {
      label: "LinkedIn",
      handle: "pablo-vargas-astorga",
      url: "https://www.linkedin.com/in/pablo-vargas-astorga",
    },
  },

  /** Drop the PDF at /public/Pablo_Vargas_CV.pdf — the nav detects it at build time. */
  cv: { path: "/Pablo_Vargas_CV.pdf", fileName: "Pablo_Vargas_CV.pdf" },

  /** Drop the portrait at /public/images/about/pablo.jpg (4:5, ≥1600px tall recommended). */
  portrait: {
    path: "/images/about/pablo.jpg",
    width: 1600,
    height: 2000,
    alt: {
      en: "Portrait of Pablo Vargas",
      es: "Retrato de Pablo Vargas",
    } satisfies Localized,
  },

  education: {
    school: { en: "Tecnológico de Monterrey", es: "Tecnológico de Monterrey" },
    campus: { en: "Campus Guadalajara", es: "Campus Guadalajara" },
    degree: {
      en: "B.S. Computer Science and Engineering",
      es: "Ingeniería en Tecnologías Computacionales",
    },
    graduation: { en: "Expected July 2028", es: "Egreso previsto: julio 2028" },
    gpa: "98/100",
    scholarship: { en: "60% academic merit scholarship", es: "Beca al mérito académico del 60%" },
  },

  interests: {
    en: ["video games", "movies", "writing", "art", "music", "animals"],
    es: ["videojuegos", "cine", "escritura", "arte", "música", "animales"],
  } satisfies Localized<string[]>,
} as const;
