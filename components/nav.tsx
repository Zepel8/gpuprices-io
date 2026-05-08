import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-black/10 dark:border-white/15">
      <div className="mx-auto w-full max-w-3xl px-5 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          gpuprices<span className="text-accent">.io</span>
        </Link>
        <nav className="text-sm opacity-80">
          <Link href="/" className="hover:opacity-100">Home</Link>
        </nav>
      </div>
    </header>
  );
}
