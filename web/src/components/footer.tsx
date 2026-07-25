import Link from "next/link"
import { Globe2 } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe2 className="size-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">Travelog</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Search once, compare everywhere. Travelog scans New Zealand hotel prices in NZD across every major booking
            site so you never overpay.
          </p>
        </div>

        {[
          { title: "Product", links: ["Explore hotels", "Best deals", "Price alerts", "Map search"] },
          { title: "Company", links: ["About", "Careers", "Press", "Partners"] },
          { title: "Support", links: ["Help center", "Contact", "Privacy", "Terms"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}>
                  <Link href="/search" className="transition-colors hover:text-accent">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Travelog. Prices shown are illustrative and aggregated from sample providers.
        </div>
      </div>
    </footer>
  )
}
