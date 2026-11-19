export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4 font-mono">
      <span className="text-xs text-[var(--amber)] uppercase tracking-wider font-semibold">
        System.LimitException: 404
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold font-sans text-[var(--ink)]">
        Governor limit exceeded: page not found.
      </h1>
      <p className="text-xs text-[var(--muted)] max-w-md">
        The requested URL executed 101 queries and could not locate the record on the server.
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-2 border border-hairline text-xs hover:border-[var(--accent)] text-[var(--ink)] rounded-sm transition-colors"
      >
        Return to Root Org
      </a>
    </div>
  );
}
