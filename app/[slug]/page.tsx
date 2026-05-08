import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `/${slug}`,
      type: "article",
    },
  };
}

export default async function ContentPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const item = await getContentBySlug(slug);
  if (!item) notFound();

  return (
    <article className="prose-content">
      <h1>{item.title}</h1>
      <p className="lead text-lg opacity-80 -mt-2">{item.description}</p>
      <MDXRemote source={item.content} components={mdxComponents} />
    </article>
  );
}
