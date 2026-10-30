import { openSync, readSync, closeSync } from "node:fs";
import { join } from "node:path";

const cache = new Map<string, number>();

/** Width/height ratio of a PNG in /public, read from its header at build time. */
export function getImageAspect(publicPath: string, fallback = 16 / 9): number {
  const cached = cache.get(publicPath);
  if (cached) return cached;

  let aspect = fallback;
  try {
    const fd = openSync(join(process.cwd(), "public", publicPath), "r");
    const header = Buffer.alloc(24);
    readSync(fd, header, 0, 24, 0);
    closeSync(fd);
    // PNG: 8-byte signature, then the IHDR chunk with width/height at bytes 16-23.
    if (header.readUInt32BE(0) === 0x89504e47) {
      const width = header.readUInt32BE(16);
      const height = header.readUInt32BE(20);
      if (width && height) aspect = width / height;
    }
  } catch {
    // Missing or unreadable file: keep the fallback ratio.
  }

  cache.set(publicPath, aspect);
  return aspect;
}
