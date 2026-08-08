"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react"

// ---------------------------------------------------------------------------
// Custom check-in / check-out range calendar.
//
// Deliberately not the native <input type="date"> picker — this one matches
// Travelog's design system, supports proper range selection with hover
// preview, and behaves identically across browsers. Dates are handled in
// local time as YYYY-MM-DD strings so New Zealand users never see UTC
// off-by-one dates.
// ---------------------------------------------------------------------------

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function toISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function todayISO(): string {
  const d = new Date()
  return toISO(d.getFullYear(), d.getMonth(), d.getDate())
}

function formatField(iso: string): string {
  if (!iso) return ""
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("en-NZ", { weekday: "short", day: "numeric", month: "short" })
}

interface MonthGridProps {
  year: number
  month: number // 0-indexed
  checkIn: string
  checkOut: string
  hovered: string
  minISO: string
  onPick: (iso: string) => void
  onHover: (iso: string) => void
}

function MonthGrid({ year, month, checkIn, checkOut, hovered, minISO, onPick, onHover }: MonthGridProps) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7 // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // While picking a check-out date, preview the range up to the hovered day.
  const previewEnd = checkIn && !checkOut && hovered > checkIn ? hovered : checkOut

  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="w-64">
      <p className="text-center font-display text-sm font-semibold text-foreground">
        {MONTHS[month]} {year}
      </p>
      <div className="mt-2 grid grid-cols-7 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1 text-[11px] font-medium uppercase text-muted-foreground">
            {w}
          </span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`blank-${i}`} />
          const iso = toISO(year, month, day)
          const disabled = iso < minISO
          const isStart = iso === checkIn
          const isEnd = checkOut ? iso === checkOut : false
          const inRange = checkIn !== "" && previewEnd !== "" && iso > checkIn && iso < previewEnd
          const isPreviewEnd = !checkOut && previewEnd !== "" && iso === previewEnd

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onPick(iso)}
              onMouseEnter={() => onHover(iso)}
              onFocus={() => onHover(iso)}
              aria-label={formatField(iso)}
              aria-pressed={isStart || isEnd}
              className={`relative m-0.5 flex h-8 items-center justify-center rounded-lg text-sm transition-colors ${
                disabled
                  ? "cursor-not-allowed text-muted-foreground/40"
                  : isStart || isEnd
                    ? "bg-primary font-semibold text-primary-foreground"
                    : isPreviewEnd
                      ? "bg-primary/70 font-semibold text-primary-foreground"
                      : inRange
                        ? "bg-accent/15 font-medium text-foreground"
                        : "text-foreground hover:bg-secondary"
              }`}
            >
              {day}
              {iso === todayISO() && !isStart && !isEnd && (
                <span className="absolute bottom-0.5 size-1 rounded-full bg-accent" aria-hidden />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  anchorRef,
}: {
  checkIn: string
  checkOut: string
  onChange: (checkIn: string, checkOut: string) => void
  // Element the calendar should anchor below — defaults to the date fields
  // themselves, but callers can pass e.g. the whole search bar so the
  // calendar always sits in the same place, unaffected by the width of
  // whatever's next to it.
  anchorRef?: React.RefObject<HTMLElement | null>
}) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState("")
  const wrapRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const minISO = todayISO()

  // Month shown in the left grid, as [year, monthIndex].
  const initial = checkIn >= minISO ? checkIn : minISO
  const [viewYM, setViewYM] = useState<[number, number]>(() => {
    const [y, m] = initial.split("-").map(Number)
    return [y, m - 1]
  })

  // The popover is portaled to <body> (see render below) so it can escape the
  // hero section's `overflow-hidden`/`h-screen` clipping. Since it's no longer
  // a normal-flow descendant, position it ourselves from the trigger's rect —
  // anchored below the fields, in document coordinates so it scrolls with the
  // page like a normal element instead of needing its own internal scrolling.
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
  })

  useLayoutEffect(() => {
    if (!open) return
    function place() {
      const trigger = anchorRef?.current ?? wrapRef.current
      const pop = popoverRef.current
      if (!trigger || !pop) return
      const margin = 16
      const gap = 12
      const rect = trigger.getBoundingClientRect()
      const width = pop.offsetWidth

      let left = Math.min(rect.left, window.innerWidth - width - margin)
      left = Math.max(margin, left)

      setPopoverStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY + gap,
        left: left + window.scrollX,
        visibility: "visible",
      })
    }
    place()
    window.addEventListener("resize", place)
    return () => window.removeEventListener("resize", place)
  }, [open, viewYM, anchorRef])

  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      const target = e.target as Node
      if (wrapRef.current?.contains(target)) return
      if (popoverRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  function shiftMonth(delta: number) {
    setViewYM(([y, m]) => {
      const d = new Date(y, m + delta, 1)
      return [d.getFullYear(), d.getMonth()]
    })
  }

  const [vy, vm] = viewYM
  const next = new Date(vy, vm + 1, 1)
  const atCurrentMonth = vy === Number(minISO.slice(0, 4)) && vm === Number(minISO.slice(5, 7)) - 1

  function pick(iso: string) {
    if (!checkIn || checkOut || iso <= checkIn) {
      // Start (or restart) the range.
      onChange(iso, "")
    } else {
      onChange(checkIn, iso)
      setOpen(false)
    }
  }

  const nights =
    checkIn && checkOut
      ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000)
      : 0

  const fieldClass = (active: boolean) =>
    `flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-colors md:py-2 ${
      active ? "bg-secondary/80 ring-1 ring-primary/40" : "hover:bg-secondary/60"
    }`

  return (
    <div ref={wrapRef} className="relative flex flex-col md:flex-row md:items-center">
      <button type="button" onClick={() => setOpen((v) => !v)} className={fieldClass(open && !checkIn)}>
        <CalendarDays className="size-5 shrink-0 text-primary" />
        <span>
          <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Check-in
          </span>
          <span className={`block text-sm font-medium ${checkIn ? "text-foreground" : "text-muted-foreground"}`}>
            {checkIn ? formatField(checkIn) : "Add date"}
          </span>
        </span>
      </button>

      <div className="hidden h-10 w-px bg-border md:block" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={fieldClass(open && Boolean(checkIn) && !checkOut)}
      >
        <CalendarDays className="size-5 shrink-0 text-primary" />
        <span>
          <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Check-out
          </span>
          <span className={`block text-sm font-medium ${checkOut ? "text-foreground" : "text-muted-foreground"}`}>
            {checkOut ? formatField(checkOut) : "Add date"}
          </span>
        </span>
      </button>

      {open && createPortal(
        <div
          ref={popoverRef}
          style={popoverStyle}
          className="z-40 w-max max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-popover p-4 text-popover-foreground shadow-2xl"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              disabled={atCurrentMonth}
              aria-label="Previous month"
              className="flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-xs font-medium text-muted-foreground">
              {!checkIn || checkOut ? "Select your check-in date" : "Now pick a check-out date"}
            </p>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
              className="flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="mt-3 flex gap-6" onMouseLeave={() => setHovered("")}>
            <MonthGrid
              year={vy}
              month={vm}
              checkIn={checkIn}
              checkOut={checkOut}
              hovered={hovered}
              minISO={minISO}
              onPick={pick}
              onHover={setHovered}
            />
            <div className="hidden sm:block">
              <MonthGrid
                year={next.getFullYear()}
                month={next.getMonth()}
                checkIn={checkIn}
                checkOut={checkOut}
                hovered={hovered}
                minISO={minISO}
                onPick={pick}
                onHover={setHovered}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <p className="text-xs text-muted-foreground">
              {nights > 0 ? (
                <>
                  <span className="font-semibold text-foreground">{nights}</span>{" "}
                  {nights === 1 ? "night" : "nights"} selected
                </>
              ) : checkIn ? (
                "Now pick a check-out date"
              ) : (
                "Prices update for your dates"
              )}
            </p>
            <div className="flex items-center gap-2">
              {(checkIn || checkOut) && (
                <button
                  type="button"
                  onClick={() => onChange("", "")}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-3" />
                  Clear dates
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Done
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
