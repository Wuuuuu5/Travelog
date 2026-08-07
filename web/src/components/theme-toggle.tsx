"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

type ThemeToggleProps = {
  transparent?: boolean
}

const ThemeToggle = ({ transparent = false }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`flex size-9 items-center justify-center rounded-full ${
        transparent ? "text-hero-foreground hover:bg-hero-foreground/10" : "text-foreground hover:bg-muted"
      }`}
    >
      <Sun className="size-[18px] dark:hidden" />
      <Moon className="hidden size-[18px] dark:block" />
    </button>
  )
}

export default ThemeToggle
