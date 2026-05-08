import type { Metadata } from "next";
import Script from "next/script";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gpuprices.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GPU Prices — AI infrastructure comparisons & benchmarks",
    template: "%s | GPU Prices",
  },
  description:
    "Practical GPU and AI infrastructure comparisons, benchmarks, and token-cost guides for builders.",
  openGraph: {
    type: "website",
    siteName: "GPU Prices",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto w-full max-w-3xl px-5 py-10">{children}</main>
        <Footer />
        <Script
          async
          src="https://plausible.io/js/pa-xpOTWfTOgj27PQeHsPwcu.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </body>
    </html>
  );
}
