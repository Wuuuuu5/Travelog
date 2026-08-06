"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

type ThemeToggleProps = {
  transparent?: boolean
}

const ThemeToggle = ({ transparent = false }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [burst, setBurst] = useState(false)

  const toggle = () => {
    const root = document.documentElement
    root.classList.add("theme-transitioning")
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 450)
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
    setBurst(true)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      onAnimationEnd={() => setBurst(false)}
      aria-label="Toggle theme"
      className={`group relative flex size-9 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 ${
        transparent ? "text-hero-foreground hover:bg-hero-foreground/10" : "text-foreground hover:bg-muted"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full bg-accent/25 dark:bg-primary/30 ${
          burst ? "animate-theme-burst" : "opacity-0"
        }`}
      />
      <Sun className="relative size-[18px] rotate-0 scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:-rotate-180 dark:scale-0" />
      <Moon className="absolute size-[18px] rotate-180 scale-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:rotate-0 dark:scale-100" />
    </button>
  )
}

export default ThemeToggle
