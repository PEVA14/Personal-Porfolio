/** Editorial definition list for project metadata (Role / Year / Stack …). */
export function MetaList({
  items,
  className = "",
}: {
  items: { label: string; value: string | null }[];
  className?: string;
}) {
  const rows = items.filter((item): item is { label: string; value: string } => !!item.value);
  if (rows.length === 0) return null;
  return (
    <dl className={`text-[0.95rem] ${className}`}>
      {rows.map((row) => (
        <div key={row.label} className="rule-t grid grid-cols-[6.5rem_1fr] gap-4 py-2.5">
          <dt className="meta text-ink-muted pt-[0.2rem]">{row.label}</dt>
          <dd className="text-ink-soft">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
