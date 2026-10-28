import type { ExperienceEntry } from "@/types/content";

/** Newest first. `end: null` renders as “Present”. */
export const experience: ExperienceEntry[] = [
  {
    id: "authentic-english",
    role: { en: "Software Engineer / Technical Lead", es: "Software Engineer / Líder técnico" },
    organization: { en: "Authentic English", es: "Authentic English" },
    start: "2026-02",
    end: null,
    summary: {
      en: "Sole technical lead for a language school: I own the public website, lead and administrative systems, and technology training for roughly 20 staff serving 200+ students and 4 corporate clients.",
      es: "Único líder técnico de una escuela de idiomas: soy responsable del sitio público, los sistemas de prospectos y administración, y la capacitación tecnológica de unas 20 personas que atienden a más de 200 alumnos y 4 clientes corporativos.",
    },
    highlights: {
      en: [
        "Built a React/TypeScript + PostgreSQL (Neon) inquiry-routing and admin workflow with Resend, cutting average first response from ~24 hours to under 10 minutes.",
        "Rebuilt the production site to ~1.1s p75 LCP with zero CLS on mobile.",
        "Automated reporting workflows, saving an estimated ~30 staff-hours per week.",
      ],
      es: [
        "Construí un flujo de enrutamiento de solicitudes y administración con React/TypeScript + PostgreSQL (Neon) y Resend, que redujo el primer tiempo de respuesta promedio de ~24 horas a menos de 10 minutos.",
        "Reconstruí el sitio en producción a ~1.1 s de LCP p75 y CLS de cero en móvil.",
        "Automaticé flujos de reportes, con un ahorro estimado de ~30 horas de trabajo por semana.",
      ],
    },
    metrics: [
      {
        value: "<10 min",
        label: { en: "First response, down from ~24 h", es: "Primera respuesta, antes ~24 h" },
      },
      { value: "1.1 s", label: { en: "p75 LCP · zero CLS", es: "LCP p75 · CLS cero" } },
      {
        value: "~30 h",
        label: { en: "Staff-hours saved weekly", es: "Horas ahorradas por semana" },
      },
    ],
  },
  {
    id: "neogen",
    role: { en: "Software Engineer", es: "Software Engineer" },
    organization: { en: "NEOGEN E-Commerce", es: "NEOGEN E-Commerce" },
    start: "2026",
    end: null,
    summary: {
      en: "Engineering a bilingual commerce platform end to end — storefront, checkout, Mercado Pago payments, Skydropx shipping and the operational workflows behind them.",
      es: "Desarrollo de punta a punta de una plataforma de comercio bilingüe: tienda, checkout, pagos con Mercado Pago, envíos con Skydropx y los flujos operativos que los sostienen.",
    },
    highlights: {
      en: [
        "Payment webhooks with signature verification and idempotent event handling.",
        "Inventory holds under row-level locks and order transitions guarded by optimistic locking.",
        "Automated tests around payment, shipping, checkout and operations.",
      ],
      es: [
        "Webhooks de pago con verificación de firma y manejo idempotente de eventos.",
        "Reservas de inventario con bloqueos a nivel de fila y transiciones de pedido protegidas con optimistic locking.",
        "Pruebas automatizadas para pagos, envíos, checkout y operación.",
      ],
    },
    metrics: [
      { value: "~147", label: { en: "SKUs", es: "SKUs" } },
      { value: "~14", label: { en: "API endpoints", es: "Endpoints de API" } },
      { value: "~37", label: { en: "Server actions", es: "Server actions" } },
    ],
    projectSlug: "neogen",
  },
  {
    id: "freelance-medical",
    role: { en: "Freelance Web Developer", es: "Desarrollador web freelance" },
    organization: { en: "Private medical practice", es: "Consultorio médico privado" },
    start: "2025",
    end: "2025",
    summary: {
      en: "Owned end-to-end delivery of a production website for a client: requirements, implementation, deployment and handoff.",
      es: "Me encargué de la entrega completa de un sitio en producción para un cliente: requerimientos, implementación, despliegue y entrega.",
    },
    highlights: { en: [], es: [] },
  },
];
