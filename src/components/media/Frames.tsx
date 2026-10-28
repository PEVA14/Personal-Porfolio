import Image from "next/image";
import { SchematicScreen } from "./SchematicScreen";
import type { Locale, MediaSlot, ProjectWorld } from "@/types/content";

/** Exposes a project's world as CSS variables for everything inside it. */
export const worldStyle = (world: ProjectWorld) =>
  ({
    "--w-bg": world.background,
    "--w-surface": world.surface,
    "--w-ink": world.ink,
    "--w-muted": world.muted,
    "--w-accent": world.accent,
    "--w-line": world.line,
  }) as React.CSSProperties;

/** Screen contents: the real screenshot when present, otherwise a labelled schematic. */
export function SlotScreen({
  slot,
  locale,
  sizes,
  priority,
}: {
  slot: MediaSlot;
  locale: Locale;
  sizes: string;
  priority?: boolean;
}) {
  if (slot.image) {
    return (
      <Image
        src={slot.image.src}
        alt={slot.image.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    );
  }
  return <SchematicScreen kind={slot.screen} />;
}

/** Minimal desktop browser: a hairline toolbar, no fake URLs. */
export function BrowserFrame({
  children,
  ratio = "16/10",
  className = "",
}: {
  children: React.ReactNode;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[6px] bg-(--w-surface) shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55)] ring-1 ring-(--w-line) ${className}`}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-(--w-line) px-3 md:h-8">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-[7px] rounded-full bg-(--w-muted) opacity-40" />
        ))}
        <span className="mx-auto h-3 w-1/3 max-w-56 rounded-full bg-(--w-ink) opacity-[0.07]" />
      </div>
      <div className="relative" style={{ aspectRatio: ratio }}>
        {children}
      </div>
    </div>
  );
}

/** Generic modern iPhone silhouette (no brand marks). */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.4rem] bg-[#0b0b0c] p-[0.45rem] shadow-[0_40px_70px_-25px_rgb(0_0_0/0.6)] ring-1 ring-white/10 ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-(--w-surface)">
        <span className="absolute top-2 left-1/2 z-10 h-[0.9rem] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

/** Frameless application window, for dashboards and artifacts. */
export function AppWindow({
  children,
  ratio,
  className = "",
}: {
  children: React.ReactNode;
  ratio: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[6px] bg-(--w-surface) shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)] ring-1 ring-(--w-line) ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
}
