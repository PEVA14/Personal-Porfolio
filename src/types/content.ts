export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A string (or any value) authored once per language. */
export type Localized<T = string> = Record<Locale, T>;

/** Marks content that is known to be missing. Rendered as nothing, never invented. */
export type Pending = { pending: true; note: string };
export const pending = (note: string): Pending => ({ pending: true, note });
export const isPending = (value: unknown): value is Pending =>
  typeof value === "object" && value !== null && "pending" in value;

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
};

/* ---------- Case studies ---------- */

export type CaseStudySectionId =
  "overview" | "context" | "challenge" | "product" | "engineering" | "details" | "outcome";

/** Blocks a case-study section can be composed of. Add new kinds here. */
export type CaseStudyBlock =
  | { kind: "prose"; body: Localized<string[]> }
  | { kind: "list"; items: Localized<string[]> }
  | { kind: "facts"; items: { value: string; label: Localized }[] }
  | {
      kind: "sequence";
      caption?: Localized;
      steps: { title: Localized; body: Localized }[];
    }
  | { kind: "pairs"; items: { title: Localized; body: Localized }[] }
  | { kind: "image"; image: ImageAsset; caption?: Localized; layout?: "full" | "inset" }
  | { kind: "image-pair"; images: [ImageAsset, ImageAsset]; caption?: Localized }
  | { kind: "plate"; label: Localized; ratio?: string };

export type CaseStudySection = {
  id: CaseStudySectionId;
  /** Optional heading override; otherwise the section's default label is used. */
  heading?: Localized;
  lede?: Localized;
  blocks: CaseStudyBlock[];
};

/* ---------- Project presentation ---------- */

/** A project's own visual world, framed by the portfolio's editorial system. */
export type ProjectWorld = {
  background: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  line: string;
};

/** Schematic screen drawn while a real screenshot is missing. */
export type ScreenKind =
  | "storefront"
  | "product"
  | "checkout"
  | "projection"
  | "diff"
  | "ios-log"
  | "ios-progress"
  | "ios-history";

/** One screenshot position in a composition. `image` replaces the schematic. */
export type MediaSlot = {
  screen: ScreenKind;
  label: Localized;
  image?: ImageAsset;
};

/* ---------- Projects ---------- */

export type Project = {
  slug: string;
  title: string;
  shortTitle?: string;
  year: number | Pending;
  category: Localized | Pending;
  /** One-line description for the index and cards. */
  summary: Localized | Pending;
  role?: Localized;
  /** Context line, e.g. a hackathon or a team size. */
  context?: Localized;
  technologies?: string[];
  featured?: { order: number };
  thumbnail?: ImageAsset;
  images?: ImageAsset[];
  /** Visual world + screenshot slots used by featured compositions and previews. */
  presentation?: {
    /** Featured composition: flagship (immersive browser stack), data (artifacts on a field), devices (phone stage). */
    layout: "flagship" | "data" | "devices";
    world: ProjectWorld;
    media: MediaSlot[];
  };
  /** Short scannable capability/feature lines shown on featured compositions. */
  highlights?: Localized<string[]>;
  externalUrl?: string | Pending;
  repositoryUrl?: string | Pending;
  caseStudy?: {
    /** Short headline at the top of the case study. */
    headline: Localized;
    sections: CaseStudySection[];
  };
};

/* ---------- Experience ---------- */

export type ExperienceEntry = {
  id: string;
  role: Localized;
  organization: Localized;
  /** ISO-ish strings; `end: null` means present. */
  start: string;
  end: string | null;
  summary: Localized;
  highlights: Localized<string[]>;
  /** Verified numbers worth setting typographically. */
  metrics?: { value: string; label: Localized }[];
  /** Links an entry to a project case study. */
  projectSlug?: string;
};
