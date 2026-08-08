import { SiteFooter } from "@/components/footer"
import SearchBar from "@/components/search/searchbar"
import { SearchResults } from "@/components/search/search-results"

export const metadata = {
  title: "Search NZ hotels",
  description:
    "Compare New Zealand hotel prices across every connected booking provider. Filter by region, price and rating.",
}

const VALID_SORTS = ["price", "rating"] as const
type Sort = (typeof VALID_SORTS)[number]

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    destination?: string
    checkIn?: string
    checkOut?: string
    guests?: string
    sort?: string
  }>
}) {
  const { destination = "", checkIn = "", checkOut = "", guests: rawGuests, sort: rawSort } = await searchParams
  const sort: Sort = (VALID_SORTS as readonly string[]).includes(rawSort ?? "") ? (rawSort as Sort) : "price"
  const guests = Math.min(8, Math.max(1, Number(rawGuests) || 2))

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <SearchBar
            initialDestination={destination}
            initialCheckIn={checkIn}
            initialCheckOut={checkOut}
            initialGuests={guests}
          />
        </div>
      </div>
      <main className="flex-1 bg-secondary/30">
        <SearchResults destination={destination} checkIn={checkIn} checkOut={checkOut} guests={guests} sort={sort} />
      </main>
      <SiteFooter />
    </div>
  )
}
