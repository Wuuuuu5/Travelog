"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Users, Search, Minus, Plus, Loader2 } from "lucide-react"

// This is the search box shown on the hero section: destination, dates, and guest count.
// When submitted it doesn't fetch anything itself — it just builds a query string
// (e.g. ?destination=Queenstown&checkIn=2026-08-01) and sends the user to /search,
// where the actual results page reads those params and does the real search.

const MIN_GUESTS = 1
const MAX_GUESTS = 8

// Small hardcoded list used to power the destination autocomplete dropdown below.
const DESTINATIONS = [
  "Auckland",
  "Queenstown",
  "Wellington",
  "Rotorua",
  "Christchurch",
  "Bay of Islands",
  "Fiordland",
  "Dunedin",
]

type SearchBarProps = {
  initialDestination?: string
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
  className?: string
}

const SearchBar = ({
  initialDestination = "",
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 2,
  className = "",
}: SearchBarProps) => {
  const router = useRouter()

  // Each field of the form gets its own piece of state. They start out prefilled
  // from props so this component can also be reused to show a search that's
  // already in progress (e.g. re-opening the search bar on the results page).
  const [destination, setDestination] = useState(initialDestination)
  const [checkIn, setCheckIn] = useState(initialCheckIn)
  const [checkOut, setCheckOut] = useState(initialCheckOut)
  const [guests, setGuests] = useState(() =>
    Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, Math.round(initialGuests) || 2)),
  )

  // Whether the destination autocomplete dropdown is currently visible.
  const [showList, setShowList] = useState(false)

  // pending is true while we're navigating to /search — used to show a spinner
  // on the submit button so the click doesn't feel dead while the route changes.
  const [pending, startTransition] = useTransition()

  // Live-filter the destination list as the user types, capped to 6 results
  // so the dropdown doesn't get huge.
  const suggestions = DESTINATIONS.filter((d) =>
    d.toLowerCase().includes(destination.trim().toLowerCase()),
  ).slice(0, 6)

  // Builds the /search URL from whatever the user has filled in and navigates there.
  // `dest` lets us pass a destination directly (used when clicking a suggestion),
  // since state updates from setDestination() wouldn't be visible yet in this same call.
  const submit = (dest?: string) => {
    const q = (dest ?? destination).trim()
    const params = new URLSearchParams()
    if (q) params.set("destination", q)
    if (checkIn) params.set("checkIn", checkIn)
    if (checkOut) params.set("checkOut", checkOut)
    if (guests !== 2) params.set("guests", String(guests)) // only include guests if it's not the default

    startTransition(() => {
      router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`)
    })
  }

  return (
    <div className={`relative ${className}`}>
      <form
        onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
          e.preventDefault()
          submit()
        }}
        className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-lg md:flex-row md:items-center"
      >
        {/* Destination text field — typing here also opens the suggestions dropdown below */}
        <div className="relative flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 md:py-2 hover:bg-secondary/60">
          <MapPin className="size-5 shrink-0 text-primary" />
          <div className="flex-1">
            <label className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Destination
            </label>
            <input
              value={destination}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDestination(e.target.value)
                setShowList(true)
              }}
              onFocus={() => setShowList(true)}
              // Delay hiding the list on blur so a click on a suggestion (which
              // also blurs the input) has time to register before it disappears.
              onBlur={() => setTimeout(() => setShowList(false), 150)}
              placeholder="Try Queenstown, Auckland or Rotorua"
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="hidden h-10 w-px bg-border md:block" />

        {/* Plain HTML date inputs for check-in/check-out (native browser date picker) */}
        <div className="flex items-center gap-3 px-3 py-2.5 md:py-2">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Check in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckIn(e.target.value)}
              className="bg-transparent text-sm font-medium text-foreground outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Check out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckOut(e.target.value)}
              className="bg-transparent text-sm font-medium text-foreground outline-none"
            />
          </div>
        </div>

        <div className="hidden h-10 w-px bg-border md:block" />

        {/* Guest counter — plain +/- buttons that clamp between MIN_GUESTS and MAX_GUESTS */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 md:py-2 hover:bg-secondary/60">
          <Users className="size-5 shrink-0 text-primary" />
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Guests
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
                disabled={guests <= MIN_GUESTS}
                aria-label="Remove a guest"
                className="flex size-5 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
              >
                <Minus className="size-3" />
              </button>
              <span className="min-w-14 text-center text-sm font-medium text-foreground" aria-live="polite">
                {guests} {guests === 1 ? "adult" : "adults"}
              </span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                disabled={guests >= MAX_GUESTS}
                aria-label="Add a guest"
                className="flex size-5 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90 disabled:opacity-80"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          {pending ? "Comparing…" : "Compare"}
        </button>
      </form>

      {/* Autocomplete dropdown — only shows once the user has typed something
          and there's at least one matching destination */}
      {showList && destination && suggestions.length > 0 && (
        <ul className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                // Stops the input's onBlur from firing before the click registers,
                // which would otherwise close the list right as it's being clicked.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setDestination(s)
                  submit(s)
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-popover-foreground hover:bg-secondary"
              >
                <MapPin className="size-4 text-muted-foreground" />
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
