import Link from "next/link"
import { Search, GitCompareArrows, Map, ArrowRight } from "lucide-react"
import { SiteFooter } from "@/components/footer"
import Hero from "@/components/hero"
import { HotelCard } from "@/components/hotel-card"
import { PriceBattle } from "@/components/price-battle"
import { Reveal } from "@/components/reveal"
import { PROVIDERS, searchHotels, getHotel } from "@/lib/hotels"

const STEPS = [
  {
    icon: Search,
    title: "Search once",
    body: "Tell Travelog where you want to go. We instantly query every connected booking provider for that destination.",
  },
  {
    icon: GitCompareArrows,
    title: "Compare everything",
    body: "See each provider's price, refund policy and availability side by side so the cheapest real option is obvious.",
  },
  {
    icon: Map,
    title: "See where it is",
    body: "Every stay is pinned on an interactive map, so you know exactly how close you are to the places you care about.",
  },
]

export default function HomePage() {
  const trending = searchHotels({ sort: "rating" }).slice(0, 6)
  const providers = Object.values(PROVIDERS)
  const battleHotel = getHotel("queenstown-alpine") ?? trending[0]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />

        {/* Providers strip */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:px-6 md:flex-row md:justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Comparing live NZD prices from leading booking providers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {providers.map((p) => (
                <span
                  key={p.id}
                  className="flex items-center gap-2 font-display text-base font-semibold text-foreground/70"
                >
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Price battle */}
        <Reveal>
          <PriceBattle hotel={battleHotel} />
        </Reveal>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">How it works</span>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              One search. Every price. Zero guesswork.
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Metasearch means we don&apos;t sell the rooms — we find them across every New Zealand booking site and send you to the cheapest source.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 130} className="grid">
                <div className="relative rounded-2xl border border-border bg-card p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="size-5" />
                  </span>
                  <span className="absolute right-6 top-6 font-display text-3xl font-bold text-border">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Trending stays */}
        <section className="bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-accent">Trending now</span>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Top-rated NZ stays travellers are comparing
                  </h2>
                </div>
                <Link
                  href="/search"
                  className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-accent sm:flex"
                >
                  View all
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trending.map((hotel, i) => (
                <Reveal key={hotel.id} delay={(i % 3) * 110} className="grid">
                  <HotelCard hotel={hotel} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
          <div className="overflow-hidden rounded-3xl bg-hero px-8 py-14 text-center text-hero-foreground sm:px-16">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to find your best price?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-hero-foreground/70">
              Start a search and watch Travelog compare providers, prices and locations in seconds.
            </p>
            <Link
              href="/search"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              <Search className="size-4" />
              Search hotels now
            </Link>
          </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
