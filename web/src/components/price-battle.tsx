import { Trophy } from "lucide-react"
import { PROVIDERS, type Hotel } from "@/lib/hotels"

export function PriceBattle({ hotel }: { hotel: Hotel }) {
  const entries = Object.entries(hotel.prices)
    .map(([providerId, price]) => ({ provider: PROVIDERS[providerId], price }))
    .sort((a, b) => a.price - b.price)

  const best = entries[0]
  const worst = entries[entries.length - 1]
  const savings = worst.price - best.price

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">Live price battle</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {hotel.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{hotel.region}</p>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            The same room, the same night — priced differently by every provider. Travelog checks them all so you
            book the cheapest one.
          </p>
          {savings > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Trophy className="size-4" />
              Save NZ${savings} vs the highest price
            </div>
          )}
        </div>

        <ul className="flex flex-col gap-3">
          {entries.map(({ provider, price }, i) => (
            <li
              key={provider.id}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                i === 0 ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <span className="flex items-center gap-2 font-medium text-foreground">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: provider.color }} />
                {provider.name}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-foreground">NZ${price}</span>
                {i === 0 && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                    Best
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
