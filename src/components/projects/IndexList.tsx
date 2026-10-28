"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SlotScreen, worldStyle } from "@/components/media/Frames";
import type { Locale, MediaSlot, ProjectWorld } from "@/types/content";

export type IndexRow = {
  slug: string;
  number: string;
  title: string;
  category: string | null;
  year: string | null;
  tech: string | null;
  summary: string | null;
  href: string | null;
  world?: ProjectWorld;
  slot?: MediaSlot;
};

type Labels = {
  number: string;
  project: string;
  category: string;
  stack: string;
  year: string;
  caseStudy: string;
  noCaseStudy: string;
  imagePending: string;
};

const rowGrid =
  "grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 md:grid-cols-[3.5rem_minmax(0,5fr)_minmax(0,3fr)_4rem_1.5rem] lg:grid-cols-[3.5rem_minmax(0,4fr)_minmax(0,3fr)_minmax(0,3fr)_4rem_1.5rem] md:gap-x-6";

/**
 * Editorial catalog. Case-study rows flood with cobalt on hover and show a
 * preview in the project's own visual world; summary-only rows expand in
 * place (works on touch); unknown rows stay quiet.
 */
export function IndexList({
  rows,
  locale,
  labels,
}: {
  rows: IndexRow[];
  locale: Locale;
  labels: Labels;
}) {
  const [active, setActive] = useState<IndexRow | null>(null);
  const [canPreview, setCanPreview] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanPreview(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Scrolling moves rows under a still cursor; hide rather than show a stale preview.
  useEffect(() => {
    if (!active) return;
    const hide = () => setActive(null);
    window.addEventListener("scroll", hide, { passive: true, once: true });
    return () => window.removeEventListener("scroll", hide);
  }, [active]);

  // Eased follow; snaps when reduced motion is requested.
  useEffect(() => {
    if (!active || !canPreview) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const tick = () => {
      const p = pos.current;
      const k = reduce ? 1 : 0.16;
      p.x += (p.tx - p.x) * k;
      p.y += (p.ty - p.y) * k;
      if (preview.current) preview.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, canPreview]);

  const target = (e: React.PointerEvent) => ({ x: e.clientX + 32, y: e.clientY - 150 });

  const track = (e: React.PointerEvent) => {
    const { x, y } = target(e);
    pos.current.tx = x;
    pos.current.ty = y;
  };

  const enter = (row: IndexRow) => (e: React.PointerEvent) => {
    if (!canPreview || !row.href) return setActive(null);
    if (!active) {
      const { x, y } = target(e);
      pos.current = { x, y, tx: x, ty: y };
    }
    setActive(row);
  };

  return (
    <div className="mt-10 md:mt-12" onPointerMove={track} onPointerLeave={() => setActive(null)}>
      <div
        className={`${rowGrid} meta text-ink-muted border-ink hidden border-b pb-2.5 md:grid`}
        aria-hidden
      >
        <span>{labels.number}</span>
        <span>{labels.project}</span>
        <span>{labels.category}</span>
        <span className="hidden lg:block">{labels.stack}</span>
        <span>{labels.year}</span>
        <span />
      </div>

      <ul>
        {rows.map((row) => {
          const linked = !!row.href;
          const cells = (
            <>
              <span
                className={`meta relative ${linked ? "text-accent group-hover:text-accent-ink" : "text-wine"}`}
              >
                {row.number}
              </span>
              <span className="display relative text-[clamp(1.35rem,1.05rem+1vw,2.1rem)] leading-tight transition-transform duration-500 ease-(--ease-editorial) group-hover:translate-x-2">
                {row.title}
              </span>
              <span className="meta text-ink-muted relative col-start-2 row-start-2 mt-1 group-hover:text-current md:col-start-auto md:row-start-auto md:mt-0">
                {row.category ?? "—"}
              </span>
              <span className="meta text-ink-muted relative hidden group-hover:text-current lg:block">
                {row.tech ?? "—"}
              </span>
              <span className="meta text-ink-muted relative col-start-3 row-start-1 text-right group-hover:text-current md:col-start-auto md:row-start-auto md:text-left">
                {row.year ?? "—"}
              </span>
              <span
                className="meta relative col-start-3 row-start-2 text-right md:col-start-auto md:row-start-auto"
                aria-hidden
              >
                {linked ? (
                  <span data-arrow="ne" className="text-accent group-hover:text-accent-ink">
                    ↗
                  </span>
                ) : row.summary ? (
                  <Plus />
                ) : null}
              </span>
            </>
          );
          const rowClass = `${rowGrid} group relative w-full py-3.5 text-left md:py-4`;

          return (
            <li key={row.slug} className="rule-b" onPointerEnter={enter(row)}>
              {linked ? (
                <Link
                  prefetch
                  href={row.href!}
                  className={`${rowClass} hover:text-accent-ink focus-visible:text-accent-ink transition-colors duration-300`}
                >
                  {/* Cobalt flood */}
                  <span
                    className="bg-accent absolute inset-y-0 -right-3 -left-3 origin-left scale-x-0 transition-transform duration-500 ease-(--ease-editorial) group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    aria-hidden
                  />
                  {cells}
                  <span className="sr-only">— {labels.caseStudy}</span>
                </Link>
              ) : row.summary ? (
                <details className="group/details">
                  <summary
                    className={`${rowClass} hover:bg-paper-raised cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
                  >
                    {cells}
                  </summary>
                  <p className="text-ink-soft max-w-[62ch] pb-6 pl-[3.25rem] md:pl-[5rem]">
                    {row.summary}
                  </p>
                </details>
              ) : (
                <div className={`${rowClass} text-ink-muted`}>
                  {cells}
                  <span className="sr-only">— {labels.noCaseStudy}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {canPreview && (
        <div
          ref={preview}
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-30 w-[24rem]"
        >
          <div
            className={`transition-[opacity,scale,rotate] duration-500 ease-(--ease-editorial) ${active ? "scale-100 rotate-[-2deg] opacity-100" : "scale-90 rotate-0 opacity-0"}`}
          >
            {active?.world && active.slot && (
              <div
                style={worldStyle(active.world)}
                className="bg-(--w-bg) p-4 text-(--w-ink) shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-(--w-surface) ring-1 ring-(--w-line)">
                  <SlotScreen slot={active.slot} locale={locale} sizes="384px" />
                </div>
                <p className="meta mt-3 flex justify-between text-(--w-muted)">
                  <span>
                    {active.number} — {active.title}
                  </span>
                  <span>{active.slot.label[locale]}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Plus() {
  return (
    <span className="relative inline-block size-2.5 align-middle">
      <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
      <span className="absolute top-0 left-1/2 h-full w-px bg-current transition-transform duration-300 group-open/details:scale-y-0 group-open/details:rotate-90" />
    </span>
  );
}
