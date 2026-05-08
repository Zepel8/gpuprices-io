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
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""))
    .sort();
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
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await loadContent(slug);
      if (!mod) return null;
      return { slug, title: mod.title, description: mod.description };
    }),
  );
  return items.filter((x): x is ContentMeta => x !== null);
}
