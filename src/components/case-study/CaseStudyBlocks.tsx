import Image from "next/image";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { pad } from "@/lib/format";
import type { CaseStudyBlock, Locale } from "@/types/content";

type Ctx = { locale: Locale; title: string; pendingLabel: string };

export function CaseStudyBlocks({ blocks, ctx }: { blocks: CaseStudyBlock[]; ctx: Ctx }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {blocks.map((block, i) => (
        <Block key={i} block={block} ctx={ctx} index={i} />
      ))}
    </div>
  );
}

function Block({ block, ctx, index }: { block: CaseStudyBlock; ctx: Ctx; index: number }) {
  const { locale } = ctx;

  switch (block.kind) {
    case "prose":
      return (
        <div className="text-ink-soft max-w-[62ch] space-y-5 text-[1.075rem]">
          {block.body[locale].map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      );

    case "list":
      return (
        <ul className="max-w-[62ch]">
          {block.items[locale].map((item, i) => (
            <li
              key={item}
              className="rule-t text-ink-soft last:rule-b grid grid-cols-[2.5rem_1fr] py-3.5"
            >
              <span className="meta text-wine pt-[0.3rem]">{pad(i + 1)}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "facts":
      return (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 xl:grid-cols-5">
          {block.items.map((f) => (
            <div key={f.label.en} className="rule-t flex flex-col-reverse gap-3 pt-3">
              <dt className="meta text-ink-muted">{f.label[locale]}</dt>
              <dd className="display text-[clamp(2.5rem,1.6rem+3vw,4.5rem)] leading-none">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "sequence":
      return (
        <figure>
          {block.caption && (
            <figcaption className="meta text-ink-muted mb-6">{block.caption[locale]}</figcaption>
          )}
          <ol className="border-rule bg-rule grid gap-px overflow-hidden border md:grid-cols-2 xl:grid-cols-3">
            {block.steps.map((step, i) => (
              <li
                key={step.title.en}
                className="bg-paper flex flex-col gap-3 p-5 md:p-6"
                data-reveal
                style={{ "--reveal-delay": i * 70 } as React.CSSProperties}
              >
                <span className="meta text-wine flex items-center gap-3">
                  {pad(i + 1)}
                  {i < block.steps.length - 1 && (
                    <span className="text-ink-muted" aria-hidden>
                      →
                    </span>
                  )}
                </span>
                <span className="display text-[1.45rem] leading-tight">{step.title[locale]}</span>
                <span className="text-ink-soft text-[0.97rem]">{step.body[locale]}</span>
              </li>
            ))}
          </ol>
        </figure>
      );

    case "pairs":
      return (
        <dl className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.title.en} className="rule-t pt-4">
              <dt className="display text-[1.35rem] leading-tight">{item.title[locale]}</dt>
              <dd className="text-ink-soft mt-3 max-w-[48ch]">{item.body[locale]}</dd>
            </div>
          ))}
        </dl>
      );

    case "image":
      return (
        <figure className={block.layout === "full" ? "lg:-ml-[calc(33.333%+0.5rem)]" : undefined}>
          <div
            className="bg-plate relative overflow-hidden"
            style={{ aspectRatio: `${block.image.width}/${block.image.height}` }}
          >
            <Image
              src={block.image.src}
              alt={block.image.alt[locale]}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="meta text-ink-muted mt-3">{block.caption[locale]}</figcaption>
          )}
        </figure>
      );

    case "image-pair":
      return (
        <figure>
          <div className="grid gap-4 md:grid-cols-2">
            {block.images.map((img) => (
              <div
                key={img.src}
                className="bg-plate relative overflow-hidden"
                style={{ aspectRatio: `${img.width}/${img.height}` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt[locale]}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {block.caption && (
            <figcaption className="meta text-ink-muted mt-3">{block.caption[locale]}</figcaption>
          )}
        </figure>
      );

    case "plate":
      return (
        <figure>
          <ProjectVisual
            locale={locale}
            title={ctx.title}
            figure={`Fig. ${pad(index + 1)} — ${block.label[locale]}`}
            pendingLabel={ctx.pendingLabel}
            ratio={block.ratio ?? "16/9"}
            sizes="100vw"
          />
        </figure>
      );
  }
}
