import { notFound } from "next/navigation";

/** Sends unmatched URLs to the localized, designed 404 in [lang]/not-found. */
export default function CatchAll() {
  notFound();
}
