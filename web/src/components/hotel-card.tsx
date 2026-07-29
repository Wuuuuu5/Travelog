import Link from "next/link"
import { Star, MapPin } from "lucide-react"
import { PROVIDERS, cheapestPrice, type Hotel } from "@/lib/hotels"

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const { providerId, price } = cheapestPrice(hotel)
  const provider = PROVIDERS[providerId]

  return (
    <Link
      href={`/search?destination=${encodeURIComponent(hotel.region)}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative flex h-36 items-start justify-end bg-gradient-to-br from-primary/25 to-accent/25 p-4">
        <span className="flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
          <Star className="size-3.5 fill-accent text-accent" />
          {hotel.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <MapPin className="size-3.5" />
          {hotel.region}
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary">
          {hotel.name}
        </h3>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="block text-[11px] text-muted-foreground">From</span>
            <span className="font-display text-xl font-bold text-foreground">NZ${price}</span>
            <span className="text-xs text-muted-foreground"> /night</span>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-2 rounded-full" style={{ backgroundColor: provider.color }} />
            {provider.name}
          </span>
        </div>
      </div>
    </Link>
  )
}
