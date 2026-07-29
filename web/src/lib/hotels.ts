export type Provider = {
  id: string
  name: string
  color: string
}

export type Hotel = {
  id: string
  name: string
  region: string
  rating: number
  prices: Record<string, number>
}

export const PROVIDERS: Record<string, Provider> = {
  nzstay: { id: "nzstay", name: "NZStay", color: "#2563eb" },
  roomhopper: { id: "roomhopper", name: "RoomHopper", color: "#f59e0b" },
  kiwibeds: { id: "kiwibeds", name: "KiwiBeds", color: "#16a34a" },
  wanderlodge: { id: "wanderlodge", name: "Wanderlodge", color: "#db2777" },
  trekstay: { id: "trekstay", name: "TrekStay", color: "#7c3aed" },
}

const HOTELS: Hotel[] = [
  {
    id: "queenstown-alpine",
    name: "Queenstown Alpine Lodge",
    region: "Queenstown",
    rating: 4.8,
    prices: { nzstay: 289, roomhopper: 305, kiwibeds: 274, wanderlodge: 312, trekstay: 298 },
  },
  {
    id: "auckland-harbour-view",
    name: "Auckland Harbour View Hotel",
    region: "Auckland",
    rating: 4.6,
    prices: { nzstay: 210, roomhopper: 198, kiwibeds: 225, wanderlodge: 205, trekstay: 219 },
  },
  {
    id: "wellington-cityside",
    name: "Wellington Cityside Suites",
    region: "Wellington",
    rating: 4.5,
    prices: { nzstay: 175, roomhopper: 182, kiwibeds: 169, wanderlodge: 190, trekstay: 178 },
  },
  {
    id: "rotorua-geyser-retreat",
    name: "Rotorua Geyser Retreat",
    region: "Rotorua",
    rating: 4.7,
    prices: { nzstay: 195, roomhopper: 188, kiwibeds: 202, wanderlodge: 199, trekstay: 191 },
  },
  {
    id: "bay-of-islands-marina",
    name: "Bay of Islands Marina Resort",
    region: "Bay of Islands",
    rating: 4.9,
    prices: { nzstay: 340, roomhopper: 365, kiwibeds: 329, wanderlodge: 352, trekstay: 338 },
  },
  {
    id: "christchurch-garden-inn",
    name: "Christchurch Garden Inn",
    region: "Christchurch",
    rating: 4.3,
    prices: { nzstay: 152, roomhopper: 149, kiwibeds: 160, wanderlodge: 155, trekstay: 148 },
  },
  {
    id: "dunedin-heritage-house",
    name: "Dunedin Heritage House",
    region: "Dunedin",
    rating: 4.4,
    prices: { nzstay: 168, roomhopper: 174, kiwibeds: 165, wanderlodge: 171, trekstay: 169 },
  },
  {
    id: "fiordland-wilderness-camp",
    name: "Fiordland Wilderness Camp",
    region: "Fiordland",
    rating: 4.8,
    prices: { nzstay: 260, roomhopper: 278, kiwibeds: 249, wanderlodge: 265, trekstay: 255 },
  },
]

export function cheapestPrice(hotel: Hotel) {
  const [providerId, price] = Object.entries(hotel.prices).reduce((min, entry) =>
    entry[1] < min[1] ? entry : min,
  )
  return { providerId, price }
}

type SearchOptions = {
  destination?: string
  sort?: "rating" | "price"
}

export function searchHotels({ destination, sort }: SearchOptions = {}) {
  let results = destination
    ? HOTELS.filter((h) => h.region.toLowerCase().includes(destination.trim().toLowerCase()))
    : [...HOTELS]

  if (sort === "rating") {
    results = [...results].sort((a, b) => b.rating - a.rating)
  } else if (sort === "price") {
    results = [...results].sort((a, b) => cheapestPrice(a).price - cheapestPrice(b).price)
  }

  return results
}

export function getHotel(id: string) {
  return HOTELS.find((h) => h.id === id)
}
