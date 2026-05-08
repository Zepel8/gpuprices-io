export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/15 mt-16">
      <div className="mx-auto w-full max-w-3xl px-5 py-6 text-sm opacity-70">
        <p>
          © {new Date().getFullYear()} gpuprices.io — Independent comparisons. No vendor
          partnerships unless disclosed.
        </p>
      </div>
    </footer>
  );
}
