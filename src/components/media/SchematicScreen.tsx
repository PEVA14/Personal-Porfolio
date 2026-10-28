import type { ScreenKind } from "@/types/content";

/*
 * Schematic stand-ins for screenshots. They describe layout intent only —
 * no invented copy, prices, numbers or data. Each fills its frame and
 * inherits the project world (--w-*) variables.
 */

type BarProps = { w: string; h?: string; o?: number; accent?: boolean; className?: string };

function Bar({ w, h = "0.45rem", o = 0.16, accent, className = "" }: BarProps) {
  return (
    <i
      className={`block shrink-0 rounded-[2px] ${accent ? "bg-(--w-accent)" : "bg-(--w-ink)"} ${className}`}
      style={{ width: w, height: h, opacity: accent ? 1 : o }}
    />
  );
}

/** Abstract product object — a capsule silhouette, not a real product render. */
function Capsule({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block ${className}`}>
      <span className="absolute inset-x-[22%] top-0 h-[16%] rounded-t-[3px] bg-(--w-accent) opacity-80" />
      <span className="absolute inset-x-0 top-[14%] bottom-0 rounded-[6px] border border-(--w-line) bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.08)_40%,transparent)]" />
      <span className="absolute inset-x-[12%] top-[46%] h-[22%] rounded-[2px] bg-(--w-ink) opacity-10" />
    </span>
  );
}

function Storefront() {
  return (
    <div className="absolute inset-0 flex flex-col gap-[5%] p-[4%]">
      <div className="flex items-center justify-between">
        <Bar w="11%" h="0.6rem" o={0.7} />
        <div className="flex w-[40%] justify-center gap-[8%]">
          {[0, 1, 2, 3].map((i) => (
            <Bar key={i} w="18%" o={0.22} />
          ))}
        </div>
        <span className="size-3 rounded-full border border-(--w-line)" />
      </div>
      <div className="grid flex-[1.4] grid-cols-[1fr_1.1fr] gap-[5%]">
        <div className="flex flex-col justify-center gap-[7%]">
          <Bar w="22%" accent h="0.35rem" />
          <Bar w="92%" h="1.4rem" o={0.8} />
          <Bar w="70%" h="1.4rem" o={0.8} />
          <div className="mt-[3%] flex flex-col gap-2">
            <Bar w="80%" o={0.18} />
            <Bar w="62%" o={0.18} />
          </div>
          <span className="mt-[4%] block h-[1.6rem] w-[34%] rounded-full bg-(--w-accent) opacity-90" />
        </div>
        <div className="relative grid place-items-center rounded-[4px] bg-(--w-ink)/[0.05]">
          <Capsule className="h-[72%] w-[16%]" />
          <Capsule className="absolute top-[30%] left-[24%] h-[52%] w-[12%] opacity-60" />
          <Capsule className="absolute top-[30%] right-[24%] h-[52%] w-[12%] opacity-60" />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-[3%]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="grid flex-1 place-items-center rounded-[3px] bg-(--w-ink)/[0.05]">
              <Capsule className="h-[60%] w-[18%]" />
            </div>
            <Bar w="70%" o={0.4} />
            <Bar w="35%" o={0.2} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Product() {
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-[6%] p-[6%]">
      <div className="grid place-items-center rounded-[4px] bg-(--w-ink)/[0.05]">
        <Capsule className="h-[62%] w-[22%]" />
      </div>
      <div className="flex flex-col justify-center gap-[5%]">
        <Bar w="30%" o={0.3} />
        <Bar w="85%" h="1.1rem" o={0.8} />
        <Bar w="28%" h="0.7rem" o={0.5} />
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-6 flex-1 rounded-[3px] border ${i === 1 ? "border-(--w-accent)" : "border-(--w-line)"}`}
            />
          ))}
        </div>
        <span className="block h-7 w-full rounded-full bg-(--w-accent) opacity-90" />
        <div className="flex flex-col gap-2.5 border-t border-(--w-line) pt-3">
          <Bar w="90%" o={0.14} />
          <Bar w="76%" o={0.14} />
          <Bar w="84%" o={0.14} />
        </div>
      </div>
    </div>
  );
}

function Checkout() {
  return (
    <div className="absolute inset-0 flex flex-col gap-[3.5%] px-[8%] pt-[18%] pb-[8%]">
      <Bar w="55%" h="0.8rem" o={0.8} />
      <div className="flex items-center gap-1.5 py-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex flex-1 items-center gap-1.5">
            <span
              className={`size-2 rounded-full ${i < 2 ? "bg-(--w-accent)" : "bg-(--w-ink) opacity-20"}`}
            />
            {i < 2 && <span className="h-px flex-1 bg-(--w-line)" />}
          </span>
        ))}
      </div>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="flex h-[7%] items-center rounded-[4px] border border-(--w-line) px-2"
        >
          <Bar w={`${40 + i * 9}%`} h="0.3rem" o={0.2} />
        </span>
      ))}
      <div className="mt-auto flex flex-col gap-2 border-t border-(--w-line) pt-3">
        <span className="flex justify-between">
          <Bar w="35%" h="0.3rem" o={0.25} />
          <Bar w="18%" h="0.3rem" o={0.25} />
        </span>
        <span className="flex justify-between">
          <Bar w="25%" h="0.45rem" o={0.7} />
          <Bar w="24%" h="0.45rem" o={0.7} />
        </span>
      </div>
      <span className="block h-[7%] w-full rounded-full bg-(--w-accent) opacity-90" />
    </div>
  );
}

/** Day-by-day balance against a reserve threshold — schematic shape only. */
function Projection() {
  const points = [
    62, 60, 64, 58, 55, 57, 52, 49, 53, 47, 44, 46, 41, 38, 40, 35, 31, 33, 29, 26, 28, 24, 21, 25,
    30, 34, 31, 36, 40, 38,
  ];
  const step = 100 / (points.length - 1);
  const path = points
    .map((y, i) => `${i ? "L" : "M"}${(i * step).toFixed(2)} ${100 - y}`)
    .join(" ");
  const reserve = 30;
  const breach = points.findIndex((y) => y < reserve);
  return (
    <div className="absolute inset-0 flex flex-col gap-[5%] p-[4.5%]">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <Bar w="7rem" h="0.4rem" o={0.4} />
          <Bar w="11rem" h="0.9rem" o={0.85} />
        </div>
        <div className="hidden gap-[1.2rem] sm:flex">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-end gap-1.5">
              <Bar w="3rem" h="0.3rem" o={0.35} />
              <Bar w="4.2rem" h="0.75rem" o={i === 2 ? 1 : 0.7} accent={i === 2} />
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex-1">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
        >
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="0"
              x2="100"
              y1={y}
              y2={y}
              stroke="var(--w-line)"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <line
            x1="0"
            x2="100"
            y1={100 - reserve}
            y2={100 - reserve}
            stroke="#ff8f8f"
            strokeDasharray="4 4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path d={`${path} L100 100 L0 100 Z`} fill="var(--w-accent)" opacity="0.08" />
          <path
            d={path}
            fill="none"
            stroke="var(--w-accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ff8f8f] bg-(--w-surface)"
          style={{ left: `${breach * step}%`, top: `${100 - points[breach]}%` }}
        />
        <span
          className="absolute top-0 bottom-0 w-px bg-[#ff8f8f] opacity-40"
          style={{ left: `${breach * step}%` }}
        />
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 6 }, (_, i) => (
          <Bar key={i} w="1.6rem" h="0.25rem" o={0.25} />
        ))}
      </div>
    </div>
  );
}

function Diff() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-[9%] p-[9%]">
      <Bar w="45%" h="0.45rem" o={0.6} />
      {[
        [78, 52],
        [64, 70],
        [40, 58],
      ].map(([a, b], i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <span
            className="block h-2 rounded-[2px] bg-(--w-ink) opacity-25"
            style={{ width: `${a}%` }}
          />
          <span className="block h-2 rounded-[2px] bg-(--w-accent)" style={{ width: `${b}%` }} />
        </div>
      ))}
    </div>
  );
}

function IosHeader() {
  return (
    <div className="flex flex-col gap-2">
      <Bar w="28%" h="0.3rem" o={0.4} />
      <Bar w="62%" h="1rem" o={0.9} />
    </div>
  );
}

function IosLog() {
  return (
    <div className="absolute inset-0 flex flex-col gap-[4%] px-[7%] pt-[20%] pb-[8%]">
      <IosHeader />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-2 rounded-[10px] bg-(--w-ink)/[0.06] p-[6%]">
          <Bar w={`${45 + i * 8}%`} h="0.45rem" o={0.75} />
          <div className="flex gap-1.5">
            {Array.from({ length: 4 }, (_, j) => (
              <span
                key={j}
                className={`h-[0.9rem] flex-1 rounded-[4px] ${j <= i ? "bg-(--w-accent) opacity-80" : "bg-(--w-ink) opacity-10"}`}
              />
            ))}
          </div>
        </div>
      ))}
      <span className="mt-auto ml-auto grid size-9 place-items-center rounded-full bg-(--w-accent) text-lg leading-none text-white">
        +
      </span>
    </div>
  );
}

function IosProgress() {
  const bars = [30, 42, 38, 55, 50, 64, 61, 72, 70, 84];
  return (
    <div className="absolute inset-0 flex flex-col gap-[5%] px-[7%] pt-[20%] pb-[8%]">
      <IosHeader />
      <div className="flex rounded-[8px] bg-(--w-ink)/[0.08] p-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-5 flex-1 rounded-[6px] ${i === 1 ? "bg-(--w-ink)/20" : ""}`}
          />
        ))}
      </div>
      <div className="flex flex-1 items-end gap-[3%] border-b border-(--w-line) pb-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-[3px] ${i === bars.length - 1 ? "bg-(--w-accent)" : "bg-(--w-ink) opacity-25"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col gap-1.5 rounded-[10px] bg-(--w-ink)/[0.06] p-[8%]">
            <Bar w="50%" h="0.3rem" o={0.4} />
            <Bar w="70%" h="0.8rem" o={0.85} />
          </div>
        ))}
      </div>
    </div>
  );
}

function IosHistory() {
  const filled = new Set([1, 3, 4, 8, 10, 11, 15, 17, 18, 22, 24, 25, 29, 31, 32]);
  return (
    <div className="absolute inset-0 flex flex-col gap-[5%] px-[7%] pt-[20%] pb-[8%]">
      <IosHeader />
      <div className="grid grid-cols-7 gap-[6%]">
        {Array.from({ length: 35 }, (_, i) => (
          <span
            key={i}
            className={`aspect-square rounded-full ${filled.has(i) ? "bg-(--w-accent)" : "bg-(--w-ink) opacity-10"}`}
          />
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-(--w-line) py-1.5"
          >
            <Bar w={`${40 + i * 10}%`} h="0.4rem" o={0.6} />
            <Bar w="15%" h="0.3rem" o={0.3} />
          </div>
        ))}
      </div>
    </div>
  );
}

const screens: Record<ScreenKind, () => React.ReactElement> = {
  storefront: Storefront,
  product: Product,
  checkout: Checkout,
  projection: Projection,
  diff: Diff,
  "ios-log": IosLog,
  "ios-progress": IosProgress,
  "ios-history": IosHistory,
};

export function SchematicScreen({ kind }: { kind: ScreenKind }) {
  const Screen = screens[kind];
  return (
    <div className="absolute inset-0 text-(--w-ink)" aria-hidden>
      <Screen />
    </div>
  );
}
