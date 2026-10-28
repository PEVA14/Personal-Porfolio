import { pending, type Project } from "@/types/content";

/**
 * Every project on the site lives here. To add one, append an object —
 * the Project Index, featured work, sitemap and /work/[slug] pick it up.
 *
 * Rules: only verified facts. Unknown values use `pending(...)` and are
 * simply not rendered. Images go in /public/images/projects/<slug>/.
 */
export const projects: Project[] = [
  {
    slug: "neogen",
    title: "NEOGEN",
    year: 2026,
    category: { en: "Commerce / Full-stack", es: "Comercio / Full-stack" },
    summary: {
      en: "A bilingual commerce platform with real payments, inventory and shipping — where product polish and transactional correctness have to hold at the same time.",
      es: "Una plataforma de comercio bilingüe con pagos, inventario y envíos reales, donde el cuidado del producto y la exactitud transaccional tienen que sostenerse al mismo tiempo.",
    },
    role: { en: "Software Engineer", es: "Software Engineer" },
    context: {
      en: "Professional work · NEOGEN E-Commerce",
      es: "Trabajo profesional · NEOGEN E-Commerce",
    },
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Mercado Pago", "Skydropx"],
    featured: { order: 1 },
    // TODO(pablo): add the public storefront URL once it should be linked.
    externalUrl: pending("Public URL not yet provided"),
    caseStudy: {
      headline: {
        en: "Commerce where the interface and the ledger both have to be right.",
        es: "Comercio donde la interfaz y las cuentas tienen que estar bien a la vez.",
      },
      sections: [
        {
          id: "overview",
          lede: {
            en: "NEOGEN is a bilingual commerce platform. I work on it as a software engineer across the storefront, checkout, payments, shipping and the operational tooling behind them.",
            es: "NEOGEN es una plataforma de comercio bilingüe. Trabajo en ella como software engineer: tienda, checkout, pagos, envíos y las herramientas operativas que los sostienen.",
          },
          blocks: [
            {
              kind: "facts",
              items: [
                { value: "~85", label: { en: "Products", es: "Productos" } },
                { value: "~147", label: { en: "SKUs", es: "SKUs" } },
                { value: "~44", label: { en: "Pages", es: "Páginas" } },
                { value: "~14", label: { en: "API endpoints", es: "Endpoints de API" } },
                { value: "~37", label: { en: "Server actions", es: "Server actions" } },
              ],
            },
          ],
        },
        {
          id: "challenge",
          lede: {
            en: "A storefront can look finished long before it is correct. The hard part is everything that happens after someone presses “Pay”.",
            es: "Una tienda puede verse terminada mucho antes de ser correcta. Lo difícil es todo lo que pasa después de que alguien presiona “Pagar”.",
          },
          blocks: [
            {
              kind: "prose",
              body: {
                en: [
                  "Payment providers notify asynchronously, sometimes more than once. Two customers can reach checkout for the last unit of the same SKU. Shipping has to be created only for orders that are actually paid. Every one of those cases has to leave the system in a state that is consistent — and explainable to the person operating it.",
                  "At the same time, none of that complexity should leak into the experience. Browsing, choosing a variant and checking out need to feel calm, in either language.",
                ],
                es: [
                  "Los proveedores de pago notifican de forma asíncrona, a veces más de una vez. Dos clientes pueden llegar al checkout por la última unidad del mismo SKU. Un envío solo debe generarse para pedidos realmente pagados. Cada uno de esos casos tiene que dejar el sistema en un estado consistente, y explicable para quien lo opera.",
                  "Al mismo tiempo, nada de esa complejidad debería filtrarse a la experiencia. Explorar, elegir una variante y pagar tiene que sentirse tranquilo, en cualquiera de los dos idiomas.",
                ],
              },
            },
          ],
        },
        {
          id: "product",
          lede: {
            en: "Bilingual from the content model up, not translated at the end.",
            es: "Bilingüe desde el modelo de contenido, no traducido al final.",
          },
          blocks: [
            // TODO(pablo): replace with real storefront screenshots in /public/images/projects/neogen/.
            {
              kind: "plate",
              label: { en: "Storefront imagery", es: "Imágenes de la tienda" },
              ratio: "16/9",
            },
            {
              kind: "list",
              items: {
                en: [
                  "A catalog of roughly 85 products and 147 SKUs, structured so variants stay legible to customers.",
                  "A complete checkout flow connected to Mercado Pago.",
                  "Order access that works for customers without exposing anyone else’s order.",
                  "Operational workflows so the team can follow orders from payment to shipment.",
                ],
                es: [
                  "Un catálogo de alrededor de 85 productos y 147 SKUs, estructurado para que las variantes sigan siendo claras para el cliente.",
                  "Un flujo de checkout completo conectado a Mercado Pago.",
                  "Acceso a pedidos que funciona para el cliente sin exponer los pedidos de nadie más.",
                  "Flujos operativos para que el equipo pueda seguir cada pedido del pago al envío.",
                ],
              },
            },
          ],
        },
        {
          id: "engineering",
          lede: {
            en: "The order lifecycle is modeled as explicit state, and every external event is treated as something that may arrive late, twice, or not at all.",
            es: "El ciclo de vida del pedido se modela como estado explícito, y cada evento externo se trata como algo que puede llegar tarde, dos veces o nunca.",
          },
          blocks: [
            {
              kind: "sequence",
              caption: {
                en: "The path of an order — simplified",
                es: "El recorrido de un pedido, simplificado",
              },
              steps: [
                {
                  title: { en: "Checkout", es: "Checkout" },
                  body: {
                    en: "Server actions validate the cart against current stock and price.",
                    es: "Las server actions validan el carrito contra el inventario y precio vigentes.",
                  },
                },
                {
                  title: { en: "Inventory hold", es: "Reserva de inventario" },
                  body: {
                    en: "Units are held under row-level locks so concurrent buyers can’t oversell a SKU.",
                    es: "Las unidades se reservan con bloqueos a nivel de fila para que compradores concurrentes no sobrevendan un SKU.",
                  },
                },
                {
                  title: { en: "Payment", es: "Pago" },
                  body: {
                    en: "The customer pays through Mercado Pago’s payment flows.",
                    es: "El cliente paga mediante los flujos de pago de Mercado Pago.",
                  },
                },
                {
                  title: { en: "Webhook", es: "Webhook" },
                  body: {
                    en: "Signed notifications are verified, then processed idempotently.",
                    es: "Las notificaciones firmadas se verifican y luego se procesan de forma idempotente.",
                  },
                },
                {
                  title: { en: "Order state", es: "Estado del pedido" },
                  body: {
                    en: "Transitions are guarded with optimistic locking, so stale writes fail loudly.",
                    es: "Las transiciones se protegen con optimistic locking, así que las escrituras obsoletas fallan de forma explícita.",
                  },
                },
                {
                  title: { en: "Shipping", es: "Envío" },
                  body: {
                    en: "Paid orders move into fulfillment through the Skydropx integration.",
                    es: "Los pedidos pagados pasan a surtido mediante la integración con Skydropx.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "details",
          blocks: [
            {
              kind: "pairs",
              items: [
                {
                  title: { en: "Idempotent event handling", es: "Manejo idempotente de eventos" },
                  body: {
                    en: "Replayed or duplicated payment events resolve to the same outcome instead of double-applying.",
                    es: "Los eventos de pago repetidos o duplicados producen el mismo resultado en lugar de aplicarse dos veces.",
                  },
                },
                {
                  title: { en: "Concurrency control", es: "Control de concurrencia" },
                  body: {
                    en: "Optimistic locking on orders and row-level locks on inventory — each where its trade-off fits.",
                    es: "Optimistic locking en pedidos y bloqueos a nivel de fila en inventario, cada uno donde su compromiso encaja.",
                  },
                },
                {
                  title: { en: "Trust boundaries", es: "Fronteras de confianza" },
                  body: {
                    en: "Signed webhooks, HMAC-protected order access and rate limiting on sensitive surfaces.",
                    es: "Webhooks firmados, acceso a pedidos protegido con HMAC y rate limiting en superficies sensibles.",
                  },
                },
                {
                  title: { en: "Hardened delivery", es: "Entrega reforzada" },
                  body: {
                    en: "Content-Security-Policy and HSTS configured at the platform level.",
                    es: "Content-Security-Policy y HSTS configurados a nivel de plataforma.",
                  },
                },
                {
                  title: { en: "Tests where money moves", es: "Pruebas donde se mueve dinero" },
                  body: {
                    en: "Automated tests around payment, shipping, checkout and operations workflows.",
                    es: "Pruebas automatizadas alrededor de los flujos de pago, envío, checkout y operación.",
                  },
                },
              ],
            },
          ],
        },
        // TODO(pablo): add an "outcome" section once there are shareable results.
      ],
    },
  },
  {
    slug: "fintrace",
    title: "Fintrace",
    year: 2026,
    category: { en: "FinTech / Go", es: "FinTech / Go" },
    summary: {
      en: "A cash-flow planner that projects balances day by day and flags when a reserve would be breached — built in 36 hours for Capital One’s challenge at HackMTY.",
      es: "Un planificador de flujo de efectivo que proyecta saldos día a día y avisa cuándo se rompería una reserva. Hecho en 36 horas para el reto de Capital One en HackMTY.",
    },
    role: {
      en: "Go engine, HTTP API & React frontend",
      es: "Motor en Go, API HTTP y frontend en React",
    },
    context: {
      en: "HackMTY 2026 · Team of 2 · 36 hours",
      es: "HackMTY 2026 · Equipo de 2 · 36 horas",
    },
    technologies: ["Go", "React", "TypeScript", "Docker", "DuckDB"],
    featured: { order: 2 },
    // TODO(pablo): add repository / demo URLs if they should be public.
    repositoryUrl: pending("Repository URL not yet provided"),
    caseStudy: {
      headline: {
        en: "Financial logic you can trust, built against a 36-hour clock.",
        es: "Lógica financiera confiable, construida contra un reloj de 36 horas.",
      },
      sections: [
        {
          id: "overview",
          lede: {
            en: "Fintrace helps plan cash flow: it projects an account forward one day at a time and shows exactly when a reserve would be breached — and what changes if you move a payment.",
            es: "Fintrace ayuda a planear el flujo de efectivo: proyecta una cuenta hacia adelante día por día y muestra exactamente cuándo se rompería una reserva, y qué cambia si mueves un pago.",
          },
          blocks: [
            {
              kind: "facts",
              items: [
                { value: "36 h", label: { en: "Build time", es: "Tiempo de desarrollo" } },
                { value: "2", label: { en: "People", es: "Personas" } },
                { value: "~75", label: { en: "Go tests", es: "Pruebas en Go" } },
              ],
            },
          ],
        },
        {
          id: "context",
          blocks: [
            {
              kind: "prose",
              body: {
                en: [
                  "Built at HackMTY 2026 for the Capital One challenge, in a team of two. I built the Go financial engine, the HTTP API and the React frontend, working against Capital One’s Nessie sandbox API.",
                ],
                es: [
                  "Hecho en HackMTY 2026 para el reto de Capital One, en un equipo de dos. Construí el motor financiero en Go, la API HTTP y el frontend en React, trabajando sobre la API sandbox Nessie de Capital One.",
                ],
              },
            },
          ],
        },
        {
          id: "engineering",
          blocks: [
            {
              kind: "pairs",
              items: [
                {
                  title: { en: "Integer-cents arithmetic", es: "Aritmética en centavos enteros" },
                  body: {
                    en: "Money never touches floating point, so projections don’t drift.",
                    es: "El dinero nunca pasa por punto flotante, así que las proyecciones no se desvían.",
                  },
                },
                {
                  title: { en: "Day-by-day projection", es: "Proyección día a día" },
                  body: {
                    en: "Balances are simulated daily, which makes the exact breach date visible.",
                    es: "Los saldos se simulan diariamente, lo que hace visible la fecha exacta de la ruptura.",
                  },
                },
                {
                  title: {
                    en: "Server-computed what-ifs",
                    es: "Escenarios calculados en servidor",
                  },
                  body: {
                    en: "Scenario diffs are computed by the engine, keeping one source of truth for the math.",
                    es: "Las diferencias entre escenarios las calcula el motor, con una sola fuente de verdad para las cuentas.",
                  },
                },
                {
                  title: { en: "Tested under pressure", es: "Probado bajo presión" },
                  body: {
                    en: "Around 75 Go tests written during the hackathon itself, then shipped with Docker on Render.",
                    es: "Alrededor de 75 pruebas en Go escritas durante el propio hackathon, y desplegado con Docker en Render.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "gym-tracker",
    title: "iOS Gym & Progress Tracker",
    shortTitle: "Gym Tracker",
    year: pending("Year not yet provided"),
    category: { en: "Native iOS", es: "iOS nativo" },
    summary: {
      en: "A native iOS app for logging workouts, tracking body measurements and seeing progression over time — deployed to and used on my own iPhone.",
      es: "Una app nativa de iOS para registrar entrenamientos, medir el cuerpo y ver el progreso en el tiempo. Instalada y en uso en mi propio iPhone.",
    },
    context: { en: "Personal product", es: "Producto personal" },
    technologies: ["Swift", "SwiftUI"],
    featured: { order: 3 },
    caseStudy: {
      headline: {
        en: "A product with exactly one user — which makes every rough edge impossible to ignore.",
        es: "Un producto con exactamente un usuario, lo que hace imposible ignorar cualquier detalle mal resuelto.",
      },
      sections: [
        {
          id: "overview",
          lede: {
            en: "I wanted a training log that fit the way I actually train, so I built one natively in Swift and SwiftUI and put it on my phone.",
            es: "Quería un registro de entrenamiento que se adaptara a cómo entreno de verdad, así que construí uno nativo en Swift y SwiftUI y lo instalé en mi teléfono.",
          },
          blocks: [
            {
              kind: "list",
              items: {
                en: [
                  "Workout logging and history",
                  "Body measurements",
                  "Progression tracking with charts",
                  "Local notifications",
                  "Local, on-device persistence",
                ],
                es: [
                  "Registro e historial de entrenamientos",
                  "Medidas corporales",
                  "Seguimiento de progreso con gráficas",
                  "Notificaciones locales",
                  "Persistencia local en el dispositivo",
                ],
              },
            },
          ],
        },
        {
          id: "product",
          blocks: [
            // TODO(pablo): replace with real screenshots in /public/images/projects/gym-tracker/.
            {
              kind: "plate",
              label: { en: "App screens", es: "Pantallas de la app" },
              ratio: "4/3",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "mexicanos-primero",
    title: "Educational Resource Matching Platform",
    shortTitle: "Mexicanos Primero",
    year: pending("Year not yet provided"),
    category: { en: "Education / Full-stack", es: "Educación / Full-stack" },
    summary: {
      en: "An educational resource matching platform for Mexicanos Primero, built in a five-person team. I worked across backend, frontend, UX and testing — a Node.js REST API, a normalized SQL model of ~20 entities, matching, search and filtering.",
      es: "Una plataforma de vinculación de recursos educativos para Mexicanos Primero, hecha en un equipo de cinco. Trabajé en backend, frontend, UX y pruebas: una API REST en Node.js, un modelo SQL normalizado de ~20 entidades, vinculación, búsqueda y filtros.",
    },
    context: { en: "Team of 5", es: "Equipo de 5" },
    technologies: ["Node.js", "SQL", "React"],
  },
  {
    slug: "petfeeder",
    title: "PetFeeder",
    year: pending("Year not yet provided"),
    category: { en: "IoT", es: "IoT" },
    summary: pending("Description not yet provided"),
  },
  {
    slug: "food-bank",
    // TODO(pablo): confirm the project's real name.
    title: "Food Bank project",
    shortTitle: "Food Bank",
    year: pending("Year not yet provided"),
    category: pending("Category not yet provided"),
    summary: pending("Description not yet provided"),
  },
  {
    slug: "marie-js",
    // TODO(pablo): confirm the project's real name and what it does with MARIE.js.
    title: "MARIE.js project",
    shortTitle: "MARIE.js",
    year: pending("Year not yet provided"),
    category: pending("Category not yet provided"),
    summary: pending("Description not yet provided"),
  },
  {
    slug: "unity-game",
    // TODO(pablo): confirm the game's title.
    title: "Unity game",
    year: pending("Year not yet provided"),
    category: { en: "Game", es: "Videojuego" },
    summary: pending("Description not yet provided"),
    technologies: ["Unity"],
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured!.order - b.featured!.order);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const caseStudySlugs = projects.filter((p) => p.caseStudy).map((p) => p.slug);
