/** UI copy. Spanish must mirror this shape (enforced by the Dictionary type). */
export const en = {
  meta: {
    title: "Pablo Vargas — Software Engineer & Product Builder",
    description:
      "Pablo Vargas is a software engineer and product builder in Guadalajara, Mexico, building digital products from the systems underneath them to the interfaces people use.",
    workDescription: "Case study by Pablo Vargas, Software Engineer & Product Builder.",
  },
  a11y: {
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    primaryNav: "Primary",
    home: "Pablo Vargas — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    language: "Language",
    switchTo: "Ver en español",
    newTab: "(opens in a new tab)",
    cvUnavailable: "CV — coming soon",
  },
  nav: {
    work: "Work",
    experience: "Experience",
    about: "About",
    contact: "Contact",
    cv: "CV",
  },
  hero: {
    role: "Software Engineer & Product Builder",
    statement: ["I build digital", "products from idea", "to implementation."],
    support:
      "Software engineer focused on thoughtful digital products — from the systems underneath them to the interfaces people actually use.",
    basedIn: "Based in",
    availability: "Open to opportunities",
    cue: "Selected work",
  },
  work: {
    eyebrow: "Selected work",
    count: "Three projects",
    role: "Role",
    year: "Year",
    stack: "Stack",
    context: "Context",
    view: "View case study",
    imagePending: "Imagery in preparation",
  },
  index: {
    title: "Project index",
    columns: { number: "No.", project: "Project", category: "Discipline", year: "Year" },
    caseStudy: "Case study",
    noCaseStudy: "Details forthcoming",
    note: "A broader record of things I’ve built. Featured projects open a case study.",
  },
  experience: {
    title: "Experience",
    present: "Present",
    relatedCase: "Read the case study",
  },
  about: {
    eyebrow: "About",
    title: ["Engineer by training.", "Builder by nature."],
    body: [
      "I study Computer Science and Engineering at Tecnológico de Monterrey in Guadalajara. The degree gives me the foundations; building real things is how I find out what they’re for.",
      "The work I enjoy most sits between disciplines: the data model that makes a feature possible and the interface that makes it obvious. I like owning both — and the unglamorous parts in between, like state, edge cases and the details nobody notices until they’re wrong.",
    ],
    educationTitle: "Education",
    gpa: "GPA",
    beyondTitle: "Beyond software",
    beyond:
      "Away from the keyboard it’s video games, movies, writing, art and music — and animals, whenever there’s one around. They’re where most of my sense of pacing, tone and detail comes from.",
    portraitPending: "Portrait forthcoming",
  },
  contact: {
    eyebrow: "Contact",
    title: "Have something worth building?",
    cta: "Let’s talk.",
    email: "Email",
  },
  caseStudy: {
    back: "All work",
    sections: {
      overview: "Overview",
      context: "Context",
      challenge: "Challenge",
      product: "Product & UX",
      engineering: "Engineering",
      details: "Selected details",
      outcome: "Outcome",
    },
    role: "Role",
    year: "Year",
    stack: "Stack",
    context: "Context",
    visit: "Visit site",
    repository: "Repository",
    next: "Next project",
    contents: "Contents",
  },
  footer: {
    built: "Designed and built by Pablo Vargas.",
    top: "Back to top",
  },
  notFound: {
    title: "Nothing here.",
    body: "The page you’re looking for doesn’t exist or has moved.",
    home: "Return home",
  },
};

export type Dictionary = typeof en;
