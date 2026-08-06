"use client"

import { useEffect, useRef, useState, type ComponentProps } from "react"
import { Moon, Sun } from "lucide-react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> }
}

type ThemeToggleProps = {
  transparent?: boolean
}

export function ThemeToggle({ transparent = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className="size-9" aria-hidden />
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark"
    const doc = document as ViewTransitionDocument

    if (!doc.startViewTransition || !buttonRef.current) {
      setTheme(nextTheme)
      return
    }

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = doc.startViewTransition(() => {
      setTheme(nextTheme)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 550,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex size-9 items-center justify-center rounded-full transition-colors ${
        transparent
          ? "text-hero-foreground hover:bg-hero-foreground/10"
          : "text-foreground hover:bg-muted"
      }`}
    >
      {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
    </button>
  )
}
