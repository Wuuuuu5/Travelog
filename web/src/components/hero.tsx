import SearchBar from "./search/searchbar"
import HeroSkyline from "@/components/hero-skyline"

const Herosection = () => {
  return (
    <section className="relative h-[calc(100vh-1px)] overflow-hidden bg-hero text-hero-foreground">
      {/* Gradient wash so text stays readable over the background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-hero via-hero/85 to-transparent" />

      <HeroSkyline />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 pb-28 pt-28 sm:px-6">
        <div className="max-w-2xl">
          <span className="animate-rise-fade inline-flex items-center gap-2 rounded-full border border-hero-foreground/15 bg-hero-foreground/5 px-3 py-1 text-xs font-medium text-hero-foreground/80 backdrop-blur">
            <span className="size-1.5 rounded-full bg-green-500" />
            Comparing 5 booking providers across Aotearoa
          </span>

          <h1
            className="animate-rise-fade mt-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Every New Zealand hotel price in 
            <br />one search.
          </h1>
          <p
            className="animate-rise-fade mt-5 max-w-xl text-pretty text-base leading-relaxed text-hero-foreground/75 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Travelog scans listings across New Zealand&apos;s booking sites, then shows you the best price in NZD, real
            availability, and exactly where each stay sits on the map — from the Bay of Islands to Fiordland.
          </p>
        </div>

        {/* Wider than the text column so the four search fields have room to breathe */}
        <div className="animate-rise-fade relative z-20 mt-8 max-w-3xl" style={{ animationDelay: "360ms" }}>
          <SearchBar />
        </div>

        <div
          className="animate-rise-fade mt-6 flex max-w-2xl flex-wrap items-center gap-x-8 gap-y-3 text-sm text-hero-foreground/70"
          style={{ animationDelay: "500ms" }}
        >
          <span className="flex items-center gap-2">
            <strong className="font-display text-lg text-hero-foreground">3,500+</strong> NZ stays indexed
          </span>
          <span className="flex items-center gap-2">
            <strong className="font-display text-lg text-hero-foreground">16</strong> regions
          </span>
          <span className="flex items-center gap-2">
            <strong className="font-display text-lg text-hero-foreground">NZ$0</strong> booking fees
          </span>
        </div>
      </div>
    </section>
  )
}

export default Herosection
