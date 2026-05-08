import fs from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentModule = {
  default: ComponentType;
  title: string;
  description: string;
};

export type ContentMeta = {
  slug: string;
  title: string;
  description: string;
};

export async function getAllSlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR);
  return entries
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

function extractExport(source: string, name: string): string | undefined {
  const re = new RegExp(
    `^export\\s+const\\s+${name}\\s*=\\s*("(?:[^"\\\\]|\\\\.)*")\\s*;?\\s*$`,
    "m",
  );
  const m = source.match(re);
  if (!m) return undefined;
  try {
    return JSON.parse(m[1]) as string;
  } catch {
    return undefined;
  }
}

export async function getMetaBySlug(slug: string): Promise<ContentMeta | null> {
  try {
    const file = path.join(CONTENT_DIR, `${slug}.mdx`);
    const raw = await fs.readFile(file, "utf8");
    const title = extractExport(raw, "title");
    const description = extractExport(raw, "description");
    if (!title || !description) return null;
    return { slug, title, description };
  } catch {
    return null;
  }
}

export async function loadContent(slug: string): Promise<ContentModule | null> {
  try {
    const mod = (await import(`../content/${slug}.mdx`)) as ContentModule;
    return mod;
  } catch {
    return null;
  }
}

export async function getAllContentMeta(): Promise<ContentMeta[]> {
  const slugs = await getAllSlugs();
  const items = await Promise.all(slugs.map((slug) => getMetaBySlug(slug)));
  return items.filter((x): x is ContentMeta => x !== null);
}
