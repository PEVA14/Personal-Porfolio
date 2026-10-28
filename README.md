# Pablo Vargas — Portfolio

Personal site for Pablo Vargas, Software Engineer & Product Builder.
Next.js 16 (App Router, Cache Components), React 19, TypeScript (strict), Tailwind CSS 4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
npm run format
```

## Where things live

| What                                               | Where                                 |
| -------------------------------------------------- | ------------------------------------- |
| Identity, email, social links, education           | `src/content/profile.ts`              |
| Every project (index, featured work, case studies) | `src/content/projects.ts`             |
| Experience timeline                                | `src/content/experience.ts`           |
| UI copy (EN / ES)                                  | `src/content/translations/{en,es}.ts` |
| Content types                                      | `src/types/content.ts`                |
| Design tokens (color, type scale, grid)            | `src/app/globals.css`                 |

### Adding a project

Append an object to `projects` in `src/content/projects.ts`. It appears in the
Project Index automatically. Add `featured: { order }` to feature it, and a
`caseStudy` to give it a `/work/<slug>` page (and a sitemap entry). Unknown
facts use `pending("…")` and are simply not rendered — never invent them.

Case-study sections are composed from typed blocks (`prose`, `list`, `facts`,
`sequence`, `pairs`, `image`, `image-pair`, `plate`); see `CaseStudyBlock`.

### Assets

| Asset          | Path                             | Notes                                                                              |
| -------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| CV             | `public/Pablo_Vargas_CV.pdf`     | The nav's CV link activates automatically once the file exists (checked at build). |
| Portrait       | `public/images/about/pablo.jpg`  | 4:5, ≥1600×2000. Replaces the placeholder plate automatically.                     |
| Project images | `public/images/projects/<slug>/` | Reference them from `thumbnail` / `images` / case-study blocks.                    |

Until real imagery exists, projects render an intentional “imagery in
preparation” plate — no stock photos or fake screenshots.

## Architecture notes

- **i18n:** all routes live under `src/app/[lang]` (statically generated for
  `en` and `es`). `src/proxy.ts` serves English unprefixed (`/work/neogen`)
  and Spanish under `/es`. The language toggle stores a `lang` cookie; a
  stored Spanish preference redirects unprefixed visits to `/es`.
- **Theme:** an inline boot script applies the stored or system theme before
  paint (no flash). Switching uses a View Transition wipe when available.
- **Motion:** CSS-only, progressively enhanced. A single `IntersectionObserver`
  reveals `[data-reveal]` elements; nothing is hidden without JS or with
  `prefers-reduced-motion`.
- **Client JS** is limited to the nav (scroll state, menu, theme, language),
  the reveal observer and the Project Index hover preview.

## Open TODOs (content)

Search the code for `TODO(pablo)`:

- Public contact email (`profile.email`) — Contact uses LinkedIn until set.
- NEOGEN public URL; Fintrace repository/demo URLs.
- Real names, years and descriptions for PetFeeder, Food Bank, MARIE.js and the Unity game.
- Years for Gym Tracker and Mexicanos Primero.
- Project screenshots, portrait and CV PDF.
- Set `NEXT_PUBLIC_SITE_URL` once the domain is final (see `.env.example`).
