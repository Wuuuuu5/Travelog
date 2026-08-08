import { SearchX } from "lucide-react"
import { HotelCard } from "@/components/hotel-card"
import { searchHotels } from "@/lib/hotels"

type SearchResultsProps = {
  destination: string
  checkIn: string
  checkOut: string
  guests: number
  sort: "price" | "rating"
}

function formatDateLabel(iso: string) {
  if (!iso) return ""
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("en-NZ", { day: "numeric", month: "short" })
}

export function SearchResults({ destination, checkIn, checkOut, guests, sort }: SearchResultsProps) {
  const hotels = searchHotels({ destination, sort })
  const dateLabel = checkIn && checkOut ? `${formatDateLabel(checkIn)} – ${formatDateLabel(checkOut)}` : "Any dates"

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {destination ? `Stays in ${destination}` : "All New Zealand stays"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {dateLabel} · {guests} {guests === 1 ? "adult" : "adults"} · {hotels.length}{" "}
          {hotels.length === 1 ? "stay" : "stays"} found
        </p>
      </div>

      {hotels.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <p className="font-display text-lg font-semibold text-foreground">No stays match &ldquo;{destination}&rdquo;</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try a different region, like Queenstown, Auckland or Rotorua.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  )
}
