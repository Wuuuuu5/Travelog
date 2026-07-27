import Link from "next/link"
import { Globe2, User as UserIcon, LogOut, UserCircle2, ChevronDown } from "lucide-react"

type NavbarProps = {
  variant?: "solid" | "transparent"
}

const Navbar = ({ variant = "solid" }: NavbarProps) => {
  const transparent = variant === "transparent"

  return (
    <>
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-20"
          : "sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Globe2 className="size-5" />
          </span>
          <span className={`text-lg font-bold tracking-tight ${transparent ? "text-white" : "text-slate-900"}`}>
            Travelog
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-8 text-sm font-medium md:flex ${
            transparent ? "text-white/80" : "text-slate-500"
          }`}
        >
          {[
            { href: "/search", label: "Explore" },
            { href: "/search?sort=savings", label: "Best deals" },
            { href: "/#how", label: "How it works" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative py-1 transition-colors hover:text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:block ${
              transparent ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
            }`}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            <UserIcon className="size-4" />
            Sign up
          </Link>
        </div>
      </div>
    </header>
    </>
  )
}

export default Navbar
