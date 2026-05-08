import Link from "next/link";
import { getAllContentMeta } from "@/lib/content";

export default async function HomePage() {
  const items = await getAllContentMeta();
  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          GPU Prices &amp; AI Infrastructure, Compared.
        </h1>
        <p className="text-lg opacity-80">
          Practical comparisons, benchmarks, and token-cost breakdowns for builders shipping
          AI workloads. No fluff, just numbers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Guides &amp; comparisons</h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${item.slug}`}
                className="block rounded-lg border border-black/10 dark:border-white/15 p-4 hover:border-accent transition-colors"
              >
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm opacity-70 mt-1">{item.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
