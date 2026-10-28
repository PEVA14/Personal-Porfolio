import { NextResponse, type NextRequest } from "next/server";
import { caseStudySlugs } from "@/content/projects";
import { LOCALE_COOKIE, stripLocale } from "@/lib/i18n-shared";

/**
 * English is served unprefixed (rewritten to /en internally); Spanish lives
 * under /es. A stored Spanish preference redirects unprefixed visits to /es.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // /en/* is an internal path — redirect to the canonical unprefixed URL.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = stripLocale(pathname);
    return NextResponse.redirect(url, 308);
  }

  // Case studies stream behind Suspense, where notFound() can't set a 404 status
  // (and dynamicParams is unavailable with Cache Components), so gate slugs here.
  const slug = stripLocale(pathname).match(/^\/work\/([^/]+)\/?$/)?.[1];
  if (slug && !caseStudySlugs.includes(slug)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${pathname.startsWith("/es") ? "es" : "en"}/not-found`;
    return NextResponse.rewrite(url);
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) return NextResponse.next();

  if (request.cookies.get(LOCALE_COOKIE)?.value === "es") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata routes and anything with a file extension.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
