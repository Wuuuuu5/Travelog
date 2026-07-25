"use client"

import Link from "next/link"
import { useState } from "react"
import {
  MapPin,
  Mail,
  CalendarDays,
  LogOut,
  Check,
  Pencil,
  Heart,
  Star,
  MessageSquare,
  History,
  Search,
  Trash2,
  Users,
  Globe2,
} from "lucide-react"

// Placeholder data — swap for real auth/favorites/reviews once those exist
const placeholderUser = {
  name: "Kiri Ngata",
  email: "kiri@example.com",
  home: "",
  memberSince: new Date().toISOString(),
}

const placeholderSavedStays: Array<{ id: string; name: string; city: string }> = []
const placeholderReviews: Array<{
  id: string
  hotelName: string
  city: string
  stars: number
  text: string
  date: string
}> = []
const placeholderRecentSearches: Array<{
  destination: string
  checkIn: string
  checkOut: string
  guests: number
  ts: number
}> = []

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(placeholderUser.name)
  const [home, setHome] = useState(placeholderUser.home)
  const [saved, setSaved] = useState(false)

  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const memberSince = new Date(placeholderUser.memberSince).toLocaleDateString("en-NZ", {
    month: "long",
    year: "numeric",
  })

  function handleSave() {
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const stats = [
    { icon: Heart, label: "Saved stays", value: String(placeholderSavedStays.length) },
    { icon: MessageSquare, label: "Reviews written", value: String(placeholderReviews.length) },
    { icon: History, label: "Recent searches", value: String(placeholderRecentSearches.length) },
    { icon: CalendarDays, label: "Member since", value: memberSince },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe2 className="size-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">Travelog</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Header card */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="h-28 bg-primary" />
          <div className="px-6 pb-6 sm:px-8">
            <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <span className="flex size-20 items-center justify-center rounded-2xl border-4 border-card bg-accent text-2xl font-bold text-accent-foreground">
                  {initials}
                </span>
                <div className="pb-1">
                  <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                    {name}
                  </h1>
                  <p className="text-sm text-muted-foreground">{placeholderUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    <Pencil className="size-4" />
                    Edit profile
                  </button>
                )}
                <button
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-bold text-foreground">{s.value}</p>
                    <p className="truncate text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Left column: details + recent searches */}
          <div className="space-y-6 lg:col-span-1">
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Account details</h2>
                {saved && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                    <Check className="size-4" /> Saved
                  </span>
                )}
              </div>

              {editing ? (
                <div className="mt-4 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Full name
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Home town
                    </span>
                    <input
                      value={home}
                      onChange={(e) => setHome(e.target.value)}
                      placeholder="e.g. Wellington"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSave}
                      className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                    >
                      Save changes
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false)
                        setName(placeholderUser.name)
                        setHome(placeholderUser.home)
                      }}
                      className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <dl className="mt-4 space-y-4">
                  <Detail icon={<Mail className="size-4" />} label="Email" value={placeholderUser.email} />
                  <Detail
                    icon={<MapPin className="size-4" />}
                    label="Home town"
                    value={home || "Not set"}
                  />
                  <Detail
                    icon={<CalendarDays className="size-4" />}
                    label="Member since"
                    value={memberSince}
                  />
                </dl>
              )}
            </section>

            {/* Recent searches */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <History className="size-4 text-primary" />
                  Recent searches
                </h2>
                {placeholderRecentSearches.length > 0 && (
                  <button className="text-xs font-medium text-muted-foreground transition-colors hover:text-accent">
                    Clear
                  </button>
                )}
              </div>
              {placeholderRecentSearches.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Your searches will show up here so you can jump back in.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {placeholderRecentSearches.map((s) => (
                    <li key={s.ts}>
                      <Link
                        href="/search"
                        className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 transition-colors hover:border-primary/40"
                      >
                        <Search className="size-4 shrink-0 text-primary" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-foreground">
                            {s.destination || "All of New Zealand"}
                          </span>
                          <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="size-3" />
                              {s.guests}
                            </span>
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Right column: saved stays + my reviews */}
          <div className="space-y-8 lg:col-span-2">
            <section>
              <div className="mb-4 flex items-center gap-2">
                <Heart className="size-5 text-accent" />
                <h2 className="font-display text-lg font-bold text-foreground">Saved stays</h2>
                {placeholderSavedStays.length > 0 && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                    {placeholderSavedStays.length}
                  </span>
                )}
              </div>
              {placeholderSavedStays.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                  <Heart className="mx-auto size-8 text-muted-foreground/50" />
                  <p className="mt-3 font-display text-base font-semibold text-foreground">No saved stays yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tap the heart on any hotel to keep it here for later.
                  </p>
                  <Link
                    href="/search"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    <Search className="size-4" />
                    Browse hotels
                  </Link>
                </div>
              ) : null}
            </section>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <MessageSquare className="size-5 text-primary" />
                <h2 className="font-display text-lg font-bold text-foreground">My reviews</h2>
                {placeholderReviews.length > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {placeholderReviews.length}
                  </span>
                )}
              </div>
              {placeholderReviews.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                  <p className="font-display text-base font-semibold text-foreground">No reviews yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Visit any hotel page and leave a comment about your stay — it&apos;ll appear here too.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {placeholderReviews.map((r) => (
                    <li key={r.id} className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{r.hotelName}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.city} ·{" "}
                            {new Date(r.date).toLocaleDateString("en-NZ", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3.5 ${i < r.stars ? "fill-accent text-accent" : "text-border"}`}
                              />
                            ))}
                          </span>
                          <button
                            aria-label={`Delete your review of ${r.hotelName}`}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{r.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <p className="text-center text-xs text-muted-foreground">Travelog</p>
      </footer>
    </div>
  )
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="text-sm font-medium text-foreground">{value}</dd>
      </div>
    </div>
  )
}
