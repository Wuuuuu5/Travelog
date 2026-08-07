// Decorative city skyline along the hero's bottom edge, modelled on Auckland:
// a dense continuous run of towers with the Sky Tower rising through the middle.
// Purely visual — each lit "window" dot glows on hover but doesn't link anywhere.
//
// Windows come from a seeded PRNG rather than Math.random() so server and client
// render the exact same layout (Math.random would cause a hydration mismatch).

type Tier = {
  /** Width in px. */
  width: number
  /** Height as a % of the parent building. */
  height: number
}

type Building = {
  width: number
  /** Height as a % of the skyline strip. */
  height: number
  /** Narrower tiers stacked on top, for stepped silhouettes. */
  tiers?: Tier[]
}

const BUILDINGS: Building[] = [
  { width: 18, height: 22 },
  { width: 26, height: 30 },
  { width: 14, height: 18 },
  { width: 30, height: 38, tiers: [{ width: 18, height: 18 }] },
  { width: 22, height: 26 },
  { width: 34, height: 44 },
  { width: 16, height: 20 },
  { width: 28, height: 34 },
  { width: 20, height: 24 },
  { width: 38, height: 52, tiers: [{ width: 24, height: 16 }] },
  { width: 24, height: 30 },
  { width: 16, height: 21 },
  { width: 32, height: 40 },
  { width: 20, height: 27 },
  { width: 26, height: 33 },
  { width: 24, height: 31 },
  { width: 18, height: 23 },
  { width: 36, height: 47, tiers: [{ width: 22, height: 15 }] },
  { width: 20, height: 25 },
  { width: 30, height: 36 },
  { width: 16, height: 19 },
  { width: 42, height: 58, tiers: [{ width: 26, height: 14 }] },
  { width: 22, height: 28 },
  { width: 28, height: 35 },
  { width: 18, height: 22 },
  { width: 34, height: 43 },
  { width: 24, height: 29 },
  { width: 20, height: 26 },
  { width: 38, height: 50, tiers: [{ width: 22, height: 17 }] },
  { width: 26, height: 32 },
  { width: 16, height: 20 },
  { width: 30, height: 39 },
  { width: 22, height: 27 },
  { width: 40, height: 54, tiers: [{ width: 24, height: 15 }] },
  { width: 18, height: 24 },
  { width: 28, height: 34 },
  { width: 24, height: 30 },
  { width: 16, height: 19 },
  { width: 32, height: 41 },
  { width: 20, height: 25 },
  { width: 26, height: 33 },
  { width: 14, height: 18 },
  { width: 22, height: 28 },
]

/** Where the Sky Tower slots into the run of buildings. */
const TOWER_INDEX = 15

/** mulberry32 — small deterministic PRNG so window layout is stable across renders. */
function makeRng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Win = { left: number; top: number }

/** Lays a dense grid of windows over a rect, keeping a random share of them lit. */
function makeWindows(seed: number, widthPx: number, heightPct: number, lit = 0.72): Win[] {
  const cols = Math.max(2, Math.round(widthPx / 5))
  const rows = Math.max(3, Math.round(heightPct / 2.6))
  const rng = makeRng(seed)
  const out: Win[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (rng() > lit) continue
      out.push({ left: ((col + 0.5) / cols) * 100, top: ((row + 0.5) / rows) * 100 })
    }
  }

  return out
}

// Transition is scoped to just the properties that change on hover — with ~2k
// dots on screen, `transition-all` would be needlessly expensive.
const DOT =
  "pointer-events-auto absolute size-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-foreground/50 transition-[transform,background-color,box-shadow] duration-300 hover:scale-[4] hover:bg-accent hover:shadow-[0_0_8px_var(--accent)]"

const Windows = ({
  seed,
  width,
  height,
  lit,
}: {
  seed: number
  width: number
  height: number
  lit?: number
}) => (
  <>
    {makeWindows(seed, width, height, lit).map((w, i) => (
      <span key={i} aria-hidden="true" className={DOT} style={{ left: `${w.left}%`, top: `${w.top}%` }} />
    ))}
  </>
)

/**
 * Auckland's Sky Tower, top to bottom: a long needle antenna with a small collar,
 * a funnel flaring out into the observation pod, the wide deck ring, a banded
 * section of service floors, then the shaft splaying toward the base. The pod
 * sits around the height of the tallest neighbouring towers with the needle well
 * above them — roughly the real 328m-vs-190m relationship.
 */
const SkyTower = () => (
  <div className="relative flex h-full shrink-0 flex-col items-center" style={{ width: 34 }}>
    {/* Needle antenna */}
    <div className="bg-hero-foreground/30" style={{ width: 2, height: "30%" }} />

    {/* Small collar partway down the needle */}
    <div className="bg-hero-foreground/25" style={{ width: 6, height: "1.5%" }} />
    <div className="bg-hero-foreground/30" style={{ width: 3, height: "4%" }} />

    {/* Funnel flaring out into the pod */}
    <div
      className="bg-hero-foreground/16"
      style={{ width: 18, height: "8%", clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }}
    />

    {/* Main pod band — brightly lit */}
    <div className="relative bg-hero-foreground/22" style={{ width: 26, height: "5%" }}>
      <Windows seed={901} width={26} height={8} lit={0.95} />
    </div>

    {/* Observation deck — the widest ring, sloping out then back in */}
    <div
      className="relative bg-hero-foreground/25"
      style={{
        width: 32,
        height: "4%",
        clipPath: "polygon(12% 0, 88% 0, 100% 45%, 78% 100%, 22% 100%, 0 45%)",
      }}
    >
      <Windows seed={903} width={30} height={6} lit={0.9} />
    </div>

    {/* Deck underside coning back in */}
    <div
      className="bg-hero-foreground/18"
      style={{ width: 26, height: "4%", clipPath: "polygon(0 0, 100% 0, 73% 100%, 27% 100%)" }}
    />

    {/* Banded service floors */}
    <div
      className="bg-hero-foreground/16"
      style={{
        width: 10,
        height: "10%",
        backgroundImage:
          "repeating-linear-gradient(to bottom, var(--hero-foreground) 0 1px, transparent 1px 4px)",
        opacity: 0.35,
      }}
    />

    {/* Shaft — thin all the way down, widening only slightly at the base */}
    <div
      className="relative bg-hero-foreground/14"
      style={{ width: 10, height: "33.5%", clipPath: "polygon(30% 0, 70% 0, 88% 100%, 12% 100%)" }}
    >
      <Windows seed={902} width={4} height={24} lit={0.45} />
    </div>
  </div>
)

const HeroSkyline = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center gap-px overflow-hidden sm:h-36">
      {BUILDINGS.map((building, i) => {
        const tiers = building.tiers ?? []
        const baseHeight = 100 - tiers.reduce((sum, t) => sum + t.height, 0)

        return (
          <div key={i} className="contents">
            {i === TOWER_INDEX && <SkyTower />}

            <div
              className="relative flex shrink-0 flex-col items-center"
              style={{ width: building.width, height: `${building.height}%` }}
            >
              {tiers.map((tier, ti) => (
                <div
                  key={ti}
                  className="relative rounded-t-sm bg-hero-foreground/12"
                  style={{ width: tier.width, height: `${tier.height}%` }}
                >
                  <Windows
                    seed={i * 7 + ti + 1}
                    width={tier.width}
                    height={building.height * (tier.height / 100)}
                  />
                </div>
              ))}

              <div
                className="relative w-full rounded-t-sm bg-hero-foreground/10"
                style={{ height: `${baseHeight}%` }}
              >
                <Windows seed={i * 7} width={building.width} height={building.height * (baseHeight / 100)} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HeroSkyline
