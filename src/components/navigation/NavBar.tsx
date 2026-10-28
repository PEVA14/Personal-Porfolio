"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import type { Locale } from "@/types/content";

type Labels = {
  name: string;
  role: string;
  menu: string;
  close: string;
  cv: string;
  home: string;
  primaryNav: string;
  openMenu: string;
  closeMenu: string;
  themeToLight: string;
  themeToDark: string;
  language: string;
  switchTo: string;
  newTab: string;
  cvUnavailable: string;
};

type Props = {
  locale: Locale;
  homeHref: string;
  /** `secondary` links only show in the desktop bar from lg up (always in the mobile menu). */
  links: { href: string; label: string; secondary?: boolean }[];
  /** Public path of the CV, or null while the PDF hasn't been added. */
  cv: string | null;
  labels: Labels;
};

export function NavBar({ locale, homeHref, links, cv, labels }: Props) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Keep focus inside the panel while it is open.
      if (e.key === "Tab" && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          button?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          button?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  const cvLink = cv ? (
    <a href={cv} target="_blank" rel="noopener" className="group inline-flex items-center gap-1">
      {labels.cv}
      <span data-arrow="ne" aria-hidden>
        ↗
      </span>
      <span className="sr-only">{labels.newTab}</span>
    </a>
  ) : (
    <span className="text-ink-muted cursor-not-allowed" title={labels.cvUnavailable}>
      <span aria-hidden>{labels.cv}</span>
      <span className="sr-only">{labels.cvUnavailable}</span>
    </span>
  );

  return (
    <header
      data-compact={compact || undefined}
      className="group/header bg-paper/0 data-[compact]:bg-paper data-[compact]:border-rule sticky top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-500"
    >
      <div className="shell flex h-16 items-center justify-between gap-6 transition-[height] duration-500 ease-(--ease-editorial) group-data-[compact]/header:h-12 md:h-20">
        <Link
          href={homeHref}
          aria-label={labels.home}
          className="meta group flex items-baseline gap-3"
        >
          <span className="text-ink group-hover:text-accent font-medium transition-colors">
            {labels.name}
          </span>
          <span className="text-ink-muted hidden xl:inline">— {labels.role}</span>
        </Link>

        <nav aria-label={labels.primaryNav} className="meta hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href} className={link.secondary ? "hidden lg:block" : undefined}>
                <Link href={link.href} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="hover:text-accent transition-colors">{cvLink}</li>
          </ul>
          <span className="bg-rule h-4 w-px" aria-hidden />
          <div className="flex items-center gap-5">
            <ThemeToggle toLight={labels.themeToLight} toDark={labels.themeToDark} />
            <LanguageToggle locale={locale} label={labels.language} switchTo={labels.switchTo} />
          </div>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="meta -mr-3 flex h-11 items-center gap-2 px-3 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden>{open ? labels.close : labels.menu}</span>
          <span className="relative block h-2.5 w-4" aria-hidden>
            <span
              className={`bg-ink absolute left-0 h-px w-4 transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`}
            />
            <span
              className={`bg-ink absolute left-0 h-px w-4 transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`}
            />
          </span>
          <span className="sr-only">{open ? labels.closeMenu : labels.openMenu}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="bg-paper fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto md:hidden"
      >
        <nav aria-label={labels.primaryNav} className="shell flex min-h-full flex-col pt-6 pb-8">
          <ul className="border-rule border-t">
            {links.map((link, i) => (
              <li key={link.href} className="border-rule border-b">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display flex items-baseline justify-between py-4 text-[2.5rem] leading-none"
                >
                  {link.label}
                  <span className="meta text-wine">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="meta mt-auto flex items-center justify-between gap-6 pt-10">
            {cvLink}
            <div className="flex items-center gap-6">
              <ThemeToggle toLight={labels.themeToLight} toDark={labels.themeToDark} />
              <LanguageToggle locale={locale} label={labels.language} switchTo={labels.switchTo} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
