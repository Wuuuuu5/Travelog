export default function SearchLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="h-[76px] animate-pulse rounded-2xl border border-border bg-secondary/60 md:h-[68px]" />
        </div>
      </div>
      <main className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="h-7 w-64 animate-pulse rounded-md bg-secondary/60" />
          <div className="mt-2 h-4 w-48 animate-pulse rounded-md bg-secondary/60" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="h-36 animate-pulse bg-secondary/60" />
                <div className="space-y-2 p-5">
                  <div className="h-3 w-20 animate-pulse rounded bg-secondary/60" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-secondary/60" />
                  <div className="mt-4 h-6 w-24 animate-pulse rounded bg-secondary/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
