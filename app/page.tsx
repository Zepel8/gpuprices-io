import Link from "next/link";
import type { Metadata } from "next";
import { getAllContentMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "GPU Pricing Comparison for AI Workloads",
  description:
    "Compare GPU cloud pricing, VRAM requirements, and AI workload costs across popular GPUs and providers.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const items = await getAllContentMeta();
  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          GPU Pricing Comparison for AI Workloads
        </h1>
        <p className="text-lg opacity-80">
          Compare GPU cloud pricing, VRAM requirements, benchmarks, and token-cost
          tradeoffs for builders shipping AI workloads. No fluff, just numbers.
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

          <li>
            <Link
              href="/deepseek-r1-vram-requirements"
              className="block rounded-lg border border-black/10 dark:border-white/15 p-4 hover:border-accent transition-colors"
            >
              <div className="font-semibold">
                DeepSeek R1 VRAM Requirements &amp; Hardware Guide
              </div>
              <div className="text-sm opacity-70 mt-1">
                Breaking down the exact VRAM requirements to run DeepSeek R1
                across different quantized models (8B, 14B, 32B, 70B, to full
                671B), with cost math for local hardware vs. cloud GPUs.
              </div>
            </Link>
          </li>

          <li>
            <Link
              href="/can-you-run-flux-on-gtx-1050-2gb"
              className="block rounded-lg border border-black/10 dark:border-white/15 p-4 hover:border-accent transition-colors"
            >
              <div className="font-semibold">
                Can You Run FLUX.1 on a GTX 1050 2GB? (Low VRAM Survival Guide)
              </div>
              <div className="text-sm opacity-70 mt-1">
                The hard truth about running FLUX.1 on older 2GB/4GB cards,
                extreme quantization limits, and the cheapest alternatives for
                budget-strapped builders.
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
