import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

export type ContentMeta = Omit<ContentItem, "content">;

async function readMdxFile(slug: string): Promise<ContentItem | null> {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR);
  return entries
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  return readMdxFile(slug);
}

export async function getAllContent(): Promise<ContentMeta[]> {
  const slugs = await getAllSlugs();
  const items = await Promise.all(slugs.map(readMdxFile));
  return items
    .filter((x): x is ContentItem => x !== null)
    .map(({ content: _content, ...meta }) => meta);
}
