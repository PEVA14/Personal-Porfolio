/** Consistent section identity: "01 / SELECTED WORK" on a strong rule. */
export function SectionHeader({
  id,
  number,
  title,
  aside,
  onField = false,
  className = "",
}: {
  id: string;
  number: string;
  title: string;
  aside?: React.ReactNode;
  /** Use on cobalt/wine fields. */
  onField?: boolean;
  className?: string;
}) {
  return (
    <header
      className={`flex items-end justify-between gap-6 border-t pt-3 ${onField ? "border-on-field-rule" : "border-ink"} ${className}`}
    >
      <h2 id={id} className="display text-section flex items-baseline gap-[0.4em] uppercase">
        <span className={`meta text-[0.8rem] ${onField ? "text-on-field-muted" : "text-wine"}`}>
          {number} /
        </span>
        {title}
      </h2>
      {aside && (
        <div
          className={`meta hidden pb-1 text-right md:block ${onField ? "text-on-field-muted" : "text-ink-muted"}`}
        >
          {aside}
        </div>
      )}
    </header>
  );
}
