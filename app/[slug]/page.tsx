import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, loadContent } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const mod = await loadContent(slug);
  if (!mod) return {};
  return {
    title: mod.title,
    description: mod.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: mod.title,
      description: mod.description,
      url: `/${slug}`,
      type: "article",
    },
  };
}

export default async function ContentPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const mod = await loadContent(slug);
  if (!mod) notFound();

  const Content = mod.default;
  return (
    <article className="prose-content">
      <h1>{mod.title}</h1>
      <p className="lead text-lg opacity-80 -mt-2">{mod.description}</p>
      <Content />
    </article>
  );
}
