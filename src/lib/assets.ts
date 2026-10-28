import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/** True when a file exists under /public. Evaluated at build/prerender time. */
export function publicAssetExists(publicPath: string): boolean {
  return existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}
