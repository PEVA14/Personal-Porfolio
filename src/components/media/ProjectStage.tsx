import { AppWindow, BrowserFrame, PhoneFrame, SlotScreen, worldStyle } from "./Frames";
import type { Locale, Project } from "@/types/content";

/** A project's world band with its key screens — the case-study opener. */
export function ProjectStage({ project, locale }: { project: Project; locale: Locale }) {
  const p = project.presentation;
  if (!p) return null;
  const [first, ...rest] = p.media;

  return (
    <div
      style={worldStyle(p.world)}
      className="overflow-hidden bg-(--w-bg) px-[5%] pt-[5%] text-(--w-ink)"
    >
      {p.layout === "devices" ? (
        <div className="flex items-end justify-center gap-[3%] pb-[4%]">
          {p.media.map((slot, i) => (
            <PhoneFrame
              key={slot.screen}
              className={i === 1 ? "w-[26%] md:w-[20%]" : "w-[22%] md:w-[16%]"}
            >
              <SlotScreen slot={slot} locale={locale} sizes="20vw" />
            </PhoneFrame>
          ))}
        </div>
      ) : p.layout === "data" ? (
        <div className="relative mx-auto max-w-5xl pb-[8%]">
          <AppWindow ratio="16/10">
            <SlotScreen slot={first} locale={locale} sizes="80vw" priority />
          </AppWindow>
          {rest[0] && (
            <AppWindow ratio="4/3" className="absolute -bottom-[2%] -left-[4%] w-[32%]">
              <SlotScreen slot={rest[0]} locale={locale} sizes="25vw" />
            </AppWindow>
          )}
        </div>
      ) : (
        <div className="relative mx-auto -mb-[4%] max-w-6xl">
          <BrowserFrame ratio="16/9" className="md:mr-[12%]">
            <SlotScreen slot={first} locale={locale} sizes="80vw" priority />
          </BrowserFrame>
          {rest[0] && (
            <BrowserFrame
              ratio="4/3"
              className="absolute top-[26%] right-0 hidden w-[36%] md:block"
            >
              <SlotScreen slot={rest[0]} locale={locale} sizes="35vw" />
            </BrowserFrame>
          )}
        </div>
      )}
    </div>
  );
}
