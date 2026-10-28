"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProjectVisual } from "./ProjectVisual";
import type { ImageAsset, Locale } from "@/types/content";

export type IndexRow = {
  slug: string;
  number: string;
  title: string;
  category: string | null;
  year: string | null;
  summary: string | null;
  href: string | null;
  thumbnail?: ImageAsset;
};

type Labels = {
  number: string;
  project: string;
  category: string;
  year: string;
  caseStudy: string;
  noCaseStudy: string;
  imagePending: string;
};

const rowGrid =
  "grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 md:grid-cols-[4rem_minmax(0,5fr)_minmax(0,3fr)_5rem_2rem] md:gap-x-6";

/**
 * Editorial index. Rows with a case study link out; rows with only a summary
 * expand in place (works on touch); on fine pointers a preview follows the cursor.
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

  const track = (e: React.PointerEvent) => {
    pos.current.tx = e.clientX + 28;
    pos.current.ty = e.clientY - 120;
  };

  const enter = (row: IndexRow) => (e: React.PointerEvent) => {
    if (!canPreview) return;
    if (!active) {
      pos.current.x = pos.current.tx = e.clientX + 28;
      pos.current.y = pos.current.ty = e.clientY - 120;
    }
    setActive(row);
  };

  return (
    <div className="mt-14 md:mt-20" onPointerMove={track} onPointerLeave={() => setActive(null)}>
      <div className={`${rowGrid} meta text-ink-muted rule-b hidden pb-3 md:grid`} aria-hidden>
        <span>{labels.number}</span>
        <span>{labels.project}</span>
        <span>{labels.category}</span>
        <span>{labels.year}</span>
        <span />
      </div>

      <ul>
        {rows.map((row) => {
          const cells = (
            <>
              <span className="meta text-wine">{row.number}</span>
              <span className="display text-title transition-transform duration-500 ease-(--ease-editorial) group-hover:translate-x-1.5">
                {row.title}
              </span>
              <span className="meta text-ink-muted col-start-2 row-start-2 mt-1.5 md:col-start-auto md:row-start-auto md:mt-0">
                {row.category ?? "—"}
              </span>
              <span className="meta text-ink-muted col-start-3 row-start-1 text-right md:col-start-auto md:row-start-auto md:text-left">
                {row.year ?? "—"}
              </span>
              <span
                className="meta text-accent col-start-3 row-start-2 text-right md:col-start-auto md:row-start-auto"
                aria-hidden
              >
                {row.href ? <span data-arrow="ne">↗</span> : row.summary ? <Plus /> : null}
              </span>
            </>
          );
          const rowClass = `${rowGrid} group py-5 md:py-6 w-full text-left`;

          return (
            <li key={row.slug} className="rule-b" onPointerEnter={enter(row)}>
              {row.href ? (
                <Link
                  prefetch
                  href={row.href}
                  className={`${rowClass} hover:text-accent transition-colors`}
                >
                  {cells}
                  <span className="sr-only">— {labels.caseStudy}</span>
                </Link>
              ) : row.summary ? (
                <details className="group/details">
                  <summary
                    className={`${rowClass} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
                  >
                    {cells}
                  </summary>
                  <p className="text-ink-soft max-w-[60ch] pb-7 pl-[3.25rem] md:pl-[5.5rem]">
                    {row.summary}
                  </p>
                </details>
              ) : (
                <div className={rowClass}>
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
          className="pointer-events-none fixed top-0 left-0 z-30 w-[22rem]"
        >
          <div
            className={`transition-[opacity,scale] duration-500 ease-(--ease-editorial) ${active ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            {active && (
              <ProjectVisual
                image={active.thumbnail}
                locale={locale}
                title={active.title}
                figure={active.number}
                pendingLabel={active.href ? labels.caseStudy : labels.noCaseStudy}
                ratio="4/3"
                sizes="352px"
              />
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
